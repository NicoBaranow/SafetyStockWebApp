import {React, useState, useEffect} from "react"
import { firestore } from '../firebase/credenciales';
import { collection, getDocs, getDoc, doc  } from 'firebase/firestore';
import BarcodeReader from 'react-barcode-reader'


export default function HerramientaEscaneada(){

    const [scanned, setScanned] = useState('')
    const [profesor, setProfesor] = useState()
    const [users, setUsers] = useState([])
    const [historial, setHistorial] = useState([])
    const [allTools, setTools] = useState([])
    const [cantidadTomada, setCantidad] = useState([])
    const [codigoHerramienta, setCodigoHeramienta] = useState([])
    
    useEffect(()=>{
        fetchUsers()
        fetchTools()
    },[])

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
        return(
            scanned.map((singleCode)=>{
                return(
                    allTools.map((singleTool)=>{
                        if (singleTool.codigo === singleCode){
                            return <ScannedTool 
                            nombre = {singleTool.nombre}
                            cantidad = {singleTool.cantidad}
                            ubicacion = {singleTool.ubicacion}
                            />
                        }
                    })
                )  
            })        
        )    
    }
    
    const ScannedTool = ({nombre, cantidad, ubicacion})=> {
        return (
            <div>
                <h3>{'Producto: ' + nombre}</h3> 
                <h4>{'Cantidad: '+ cantidad}</h4>
                <h4>{'Ubicación: ' + ubicacion}</h4>
                <br/>
            </div>
        )
    }

    return(
        
        <div>
            <BarcodeReader onScan={handleScan}/>
            {scanned ? 
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