import {React, useState, useEffect} from "react"
import { firestore } from '../firebase/credenciales';
import { collection, getDocs, getDoc, doc  } from 'firebase/firestore';
import BarcodeReader from 'react-barcode-reader'


export default function HerramientaEscaneada(){

    const [scanned, setScanned] = useState([])
    const [profesor, setProfesor] = useState()
    const [users, setUsers] = useState([])
    const [historial, setHistorial] = useState([])
    const [allTools, setTools] = useState([])
    const [herramientasTomadas, setHerramientasTomadas] = useState([])
    
    useEffect(()=>{
        fetchUsers()
    },[])

    useEffect(()=>{
        fetchTools()
        ScannedTools()
    },[scanned])    

    const fetchUsers = async ()=>{
        const {docs} = await getDocs(collection(firestore, "usuarios"));
        const usersArray = docs.map(singleUser =>({uid: singleUser.id, ...singleUser.data()}))
        setUsers(usersArray)
    };

    const fetchTools = async ()=>{
        const {docs} = await getDocs(collection(firestore, "herramientasInsumos"));
        const toolsArray = docs.map(tool =>({...tool.data()}))
        setTools(toolsArray)
    };

    const handleScan = (data)=> setScanned((prevValue)=>[...prevValue,data])
    
    const handleSubmit = ()=> {
    }

    const ScannedTools = () =>{
        scanned.map((singleCode)=>{
            allTools.map((singleTool)=>{
                if (singleTool.codigo === singleCode){
                    setHerramientasTomadas((prevValue)=>[...prevValue,singleTool])
                }
            })                    
        })           
    }
        
    const ScannedTool = () => {
        const [cantidadTomada,setCantidadTomada] = useState(1)
        
        const increaseCount = () => {if (cantidadTomada>=1) setCantidadTomada(cantidadTomada+1)}
        const decreaseCount = () => {if (cantidadTomada>1) setCantidadTomada(cantidadTomada-1)}
        
        herramientasTomadas.map((herramienta)=>{            
            return(
                <div>
                    <h3>{'Producto: '+ herramienta.nombre}</h3> 
                    <h4>{'Cantidad: '+ herramienta.cantidad}</h4>
                    <br/>
                    <div>
                        <button onClick={increaseCount}>+</button>
                        {cantidadTomada}
                        <button onClick={decreaseCount}>-</button>
                    </div>
                </div>
            )
        })
    }

    return(
        
        <div>
            <BarcodeReader onScan={handleScan}/>
            {scanned.length>0 ? 
            <div>
                <select 
                    name="profesor" 
                    id="profesor" 
                    required = {true} 
                    value = {profesor} 
                    onChange={(e)=>{setProfesor(e.target.value)}}>
                    <option value="none">Seleccione un profesor</option>
                    {users.map((user)=>{
                        return <option value={user.uid} key={user.uid}>{user.nombre + ' ' + user.apellido}</option>
                        })
                    }
                </select>
                <br/>
                <ScannedTool/>
                <button onClick={handleSubmit}>Confirmar selección</button>
            </div> 
            : 
            <div>
                <div>Escanee un código de barras</div>
            </div>
            }
        </div>
    )
    
}