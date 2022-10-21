import {React, useState, useEffect} from "react"
import { firestore } from '../firebase/credenciales';
import { collection, getDocs, doc, updateDoc,  } from 'firebase/firestore';
import BarcodeReader from 'react-barcode-reader'


export default function HerramientaEscaneada(){

    const [scanned, setScanned] = useState('')
    const [profesor, setProfesor] = useState()
    const [users, setUsers] = useState([])
    const [allTools, setTools] = useState([])
    const [herramientasTomadas,setHerramientasTomadas] = useState([])
    
    useEffect(()=>{
        fetchUsers()
        fetchTools()
    },[])

    useEffect(()=>{
        fetchUsers()
        fetchTools()
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

    const updateToolDoc = async (codigo,value) =>{
        const docRef = doc(firestore, "herramientasInsumos", codigo);
        await updateDoc(docRef, {
            cantidadTomada: value
        })
        .then(()=>{
            console.log("Edicion completa")
        })
        .catch(error=>{
            console.log("Ha habido un error al cargar la informacion " + error)
        })
    }

    const handleScan = (data)=> {
        setScanned((prevValue)=>[...prevValue,data])
        ScannedTools()
    }
    
    const handleSubmit = ()=> {

    }

    {/* ScannedTools debería guarda las herramientas escaneadas en un state */}
    {/* ScannedTool renderiza la herramienta tomada con las props que se le dan */}
    {/* Tengo que guardar las herramietnas que se renderizan en ScannedTool en un state para poder saber cuales son y armar un historial de uso con ese state*/}


    const ScannedTools = () =>{
            scanned.map((singleCode)=>{
                    allTools.map((singleTool)=>{
                        if (singleTool.codigo === singleCode){
                            setHerramientasTomadas((prevValue)=>[...prevValue,singleTool])
                            console.log(herramientasTomadas)
                        }
                    })
            })        
        }
        
    const ScannedTool = ({nombre, cant})=> {
        const [cantidadTomada,setCantidadTomada] = useState(cant)

        const increaseCount = () => {if (cantidadTomada>=1) setCantidadTomada(cantidadTomada+1)}
        const decreaseCount = () => {if (cantidadTomada>1) setCantidadTomada(cantidadTomada-1)}

        herramientasTomadas.map((singleTool)=>{
            return (
                <div>
                    <h3>{'Herramienta: '+ singleTool.nombre}</h3> 
                    <h4>
                        Cantidad tomada:
                        <button onClick={decreaseCount}>-</button>
                        {cantidadTomada}
                        <button onClick={increaseCount}>+</button>
                    </h4>
                    <button onClick={increaseCount}>Eliminar selección</button>
                    <br/>
                    <br/>
                </div>
            )
        })
    }


    return(
        
        <div>
            <BarcodeReader onScan={handleScan}/>
            {scanned ? 
            <div>
                <br/>
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
                <ScannedTools/> 
                <br/>
                <br/>
                <br/>
                <button onClick={handleSubmit}>Confirmar selección de herramientas</button>
            </div> 
            : 
            <div>
                <div>Escanee un código de barras</div>
            </div>
            }
        </div>
    )
    
}