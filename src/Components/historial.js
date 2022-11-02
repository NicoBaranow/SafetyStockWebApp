import { React, useState, useEffect } from 'react';
import { firestore } from '../firebase/credenciales';
import { doc, getDocs, collection, query, where, updateDoc, increment } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styles from './verTodasHerramientas.module.css'

export default function Historial(props){

    const [users,setUsers] = useState([])

    useEffect(()=>{
        fetchUsers()
    },[])

    const fetchUsers = async () => { 
        const {docs} = await getDocs(collection(firestore, "usuarios"))
        const usersArray = docs.map(user =>({...user.data()}))
        setUsers(usersArray)
    }

    const modificarCantidad = async (tool, user, cantidadParcial) => {
        var idToModify
        var cantidadADevolver

        if(!cantidadParcial) cantidadADevolver = tool.cantidadTomada
        else cantidadADevolver = cantidadParcial
        
        const q = query(collection(firestore, "historial", user.id, "historial"), where("nombreHerramienta", "==", tool.nombreHerramienta), where("date", "==", tool.date), where("codigo", "==", tool.codigo));
        const querySnapshot = await getDocs(q);
        querySnapshot?.forEach((document) => idToModify = document.id);
        
        const historialDoc = doc(firestore,"historial", user.id, "historial", idToModify)
        const toolDoc = doc(firestore, "herramientasInsumos", tool.codigo);

        await updateDoc(toolDoc, {
            cantidadTomada: increment(-cantidadADevolver)
        })
        await updateDoc(historialDoc,{
            cantidadTomada: increment(-cantidadADevolver)
        })
    }

    const DevolucionParcial = ({tool, user}) => {

        const [cantidadADevolver, setCantidadADevolver] = useState(0)

        const increaseCount = () => {if (tool.cantidadTomada>cantidadADevolver) setCantidadADevolver(cantidadADevolver+1)}
        const decreaseCount = () => {if (cantidadADevolver>=1) setCantidadADevolver(cantidadADevolver-1)}

        return(
            <h4>
                {'Devolver: '}
                <button onClick={increaseCount}>+</button>
                {cantidadADevolver}
                <button onClick={decreaseCount}>-</button>
                <br></br>
                <br></br>
                <button onClick={()=>modificarCantidad(tool, user, cantidadADevolver ).then(()=>setCantidadADevolver(0))}>Devolver parcialmente</button> 
            </h4>
        )
    }

    const UserHistorial = ({user}) => {
        
        const path = collection(firestore, "historial", user.id, 'historial')
        const [docs, loading] = useCollectionData(path)
        const [available, setAvailable] = useState(false)

        docs?.forEach(doc=>{
            const index = docs?.indexOf(doc)
            if (doc.cantidadTomada===0) {
                docs.splice(index,1)
                setAvailable(true)
            }
        })

        if(!loading && docs.length>0) 
        return(
            <div>
                <h2>Profesor: {user.nombre + ' ' + user.apellido}</h2>
                {docs?.map(doc=>{
                    console.log(doc)
                    return(
                        <div>
                            <h3>Herramienta en uso: {doc.nombreHerramienta}</h3>
                            <h4>Cantidad en uso: {doc.cantidadTomada}</h4>
                            <h4>Fecha: {doc.date}</h4>
                            <DevolucionParcial tool={doc} user = {user}/>
                            <button onClick={()=>modificarCantidad(doc, user)}>Devolver todo</button>
                        </div>
                    )
                })}
                <br></br>
                <br></br>
            </div>
        )
    }

    const Historial = () => {
        return(
            users.map(user=> {
                return <UserHistorial key={user.id} user={user}/>
            })
        )
    }
        
    return (
        <Historial/>
    )
}