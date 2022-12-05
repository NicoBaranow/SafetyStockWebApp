import {React, useState, useEffect} from "react"
import { firestore } from '../firebase/credenciales';
import { collection, getDocs, doc, updateDoc, addDoc  } from 'firebase/firestore';
import BarcodeReader from 'react-barcode-reader'

export default function HerramientaEscaneada(){

    const [scanned, setScanned] = useState([])
    const [profesor, setProfesor] = useState()
    const [users, setUsers] = useState([])
    const [historial, setHistorial] = useState([])
    const [allTools, setTools] = useState([])
    
    var cantidades = []    
    var date = new Date()

    useEffect(()=>{
        fetchUsers()
        fetchTools()
    },[scanned])


    const fetchUsers = async () => {
        const {docs} = await getDocs(collection(firestore, "usuarios"));
        const usersArray = docs.map(singleUser =>({uid: singleUser.id, ...singleUser.data()}))
        setUsers(usersArray)
    };

    const fetchTools = async () => {
        const {docs} = await getDocs(collection(firestore, "herramientasInsumos"));
        const toolsArray = docs.map(tool =>({...tool.data()}))
        setTools(toolsArray)
    };

    const updateHistorial = async (historial) => {
        console.log(historial)
        await addDoc(collection(firestore, 'historial', profesor, 'historial'), historial)
        .then(()=>{
            setHistorial([])
            setScanned([])
        })
    }

    const updateTool = async (tool) => {
        var index = allTools.findIndex(obj=>obj.codigo===tool.codigo)
        var cantidadTomadaRegistrada = allTools[index].cantidadTomada

        
        console.log('Cantidad Tomada actualmente en firebase: '+ cantidadTomadaRegistrada)
        console.log('cantidad tomada ahora: ' + tool.cantidadTomada)
        console.log(cantidadTomadaRegistrada+tool.cantidadTomada)

        const docRef = doc(firestore, "herramientasInsumos", tool.codigo);
        await updateDoc(docRef, {
            cantidadTomada: (cantidadTomadaRegistrada+tool.cantidadTomada)
        })
    }

    const handleScan = (data)=> setScanned((prevValue)=>{
        if(!prevValue.includes(data)) return [...prevValue,data]
        else return [...prevValue]
    })
    
    const handleDelete = (toolCode)=> setScanned(scanned.filter(a => a !== toolCode))
    
    var minutes = date.getMinutes()
    var hours = date.getHours()
    if(minutes<10) minutes = '0' + minutes
    if(hours<10) hours = '0' + hours
    const fecha = date.getDate()+"-"+(date.getMonth()+1)+"-"+ date.getFullYear()+" "+hours+":"+minutes+"h"

    const handleSubmit = ()=> {
        scanned.map((singleCode)=>{
            allTools.map((singleTool)=>{
                if (singleTool.codigo === singleCode){
                    var index = cantidades.findIndex(obj=>obj.codigo===singleCode)
                    setHistorial(prevValue=>[...prevValue,{
                        nombreHerramienta: singleTool.nombre,
                        ubicacion: singleTool.ubicacion,
                        cantidadTomada: cantidades[index].cantidadTomada,
                        cantidadTomadaTotal: cantidades[index].cantidadTomada,
                        codigo: singleTool.codigo,
                        date: fecha
                    }])
                }
            })   
        })
        
        historial.map(singleHistorial=>{
            if(singleHistorial.cantidadTomada){
                console.log(singleHistorial)
                updateHistorial(singleHistorial)
                updateTool(singleHistorial)
            }
        })
    }


    const ScannedTool = ({tool}) => {
        const [cantidadTomada,setCantidadTomada] = useState(1)

        const increaseCount = () => {if (cantidadTomada>0 && tool.cantidad>cantidadTomada+tool.cantidadTomada) setCantidadTomada(cantidadTomada+1)}
        const decreaseCount = () => {if (cantidadTomada>1) setCantidadTomada(cantidadTomada-1)}

        var index = cantidades.findIndex(obj=>obj.codigo===tool.codigo)
        if (index !== -1) cantidades[index] = {codigo:tool.codigo, cantidadTomada:cantidadTomada}
        else cantidades.push({codigo:tool.codigo, cantidadTomada:cantidadTomada})

        return(
            <div>
                <h3>{'Producto: '+ tool.nombre}</h3> 
                <h4>{'Cantidad: '+ tool.cantidad}</h4>
                <h4>{'Cantidad tomada actual: '+ tool.cantidadTomada}</h4>
                <div>
                    <h4>
                        {'Cantidad tomada: '}
                        <button onClick={increaseCount}>+</button>
                        {cantidadTomada}
                        <button onClick={decreaseCount}>-</button>
                    </h4>
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
                    <form>
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
                        <input onClick={handleSubmit} type="submit" value="Confirmar seleccion"/>
                    </form>
                </div>
            : 
            <div>
                <div>Escanee un código de barras</div>
            </div>
            }
        </div>
    )
    
}