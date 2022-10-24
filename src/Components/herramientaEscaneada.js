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
        fetchTools()
    },[])

    useEffect(()=>{
        scanned.map((singleCode)=>{
            allTools.map((singleTool)=>{
                if (singleTool.codigo === singleCode){
                    setHerramientasTomadas((prevValue)=>[...prevValue,singleTool])
                }
            })   
        })        
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

    const handleScan = (data)=> setScanned((prevValue)=>{
        if(!prevValue.includes(data)) return [...prevValue,data]
        else return [...prevValue]
    })
    
    const handleSubmit = ()=> {
        setHistorial()
    }

    const handleDelete = (toolCode)=> {
        var array = scanned
        console.log('New Array to modify: ' + array)
        var index = scanned.indexOf(toolCode)
        console.log("Index del elemento a eliminar: " + index)
        array.splice(index,1)
        console.log("Array modificado: " + array)
        setScanned(array)
        console.log('Scanned state modificado es: '+ scanned)
    }
    
    const ScannedTool = ({tool}) => {
        const [cantidadTomada,setCantidadTomada] = useState(1)
        
        const increaseCount = () => {if (cantidadTomada>=1) setCantidadTomada(cantidadTomada+1)}
        const decreaseCount = () => {if (cantidadTomada>1) setCantidadTomada(cantidadTomada-1)}
        
        return(
            <div>
                <h3>{'Producto: '+ tool.nombre}</h3> 
                <h4>{'Cantidad: '+ tool.cantidad}</h4>
                <div>
                    <h4>{'Cantidad tomada: '}</h4>
                    <button onClick={increaseCount}>+</button>
                    {cantidadTomada}
                    <button onClick={decreaseCount}>-</button>
                </div>
                <br/>
                <button onClick={() => handleDelete(tool.codigo)}>Eliminar selección</button>
                <br/>
            </div>
            )
            
        }

    const ScannedTools = () =>{
        return(
            scanned.map((singleCode)=>{
                return(
                    allTools.map((singleTool)=>{
                        if (singleTool.codigo === singleCode){
                            return <ScannedTool 
                            tool = {singleTool}
                            key = {singleTool.codigo}
                            />
                        }
                    })
                    )  
            })        
            )    
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
                <ScannedTools/>
                <br/>
                <br/>
                <br/>
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