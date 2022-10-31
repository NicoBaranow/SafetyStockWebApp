import { React, useState, useEffect, useRef } from 'react';
import { firestore } from '../firebase/credenciales';
import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styles from './verTodasHerramientas.module.css'

export default function Historial(props){

    const [herramientas, setHerramientas] = useState([{}])
    const [users,setUsers] = useState([])
    const [historial,setHistorial] = useState([{}])

    useEffect(()=>{
        fetchTools()
        fetchUsers()
    },[])

    const fetchTools = async () => { 
        const {docs} = await getDocs(collection(firestore, "herramientasInsumos"));
        const toolsArray = docs.map(tool =>({...tool.data()}))
        setHerramientas(toolsArray)
    };

    const fetchUsers = async () => { 
        const {docs} = await getDocs(collection(firestore, "usuarios"))
        const usersArray = docs.map(user =>({...user.data()}))
        setUsers(usersArray)
    }

    function handleDelete(uid){
        deleteDoc (doc(firestore,'herramientasInsumos',uid))
        .then(()=> {
            fetchTools()
        })
    }

    const UserHistorial = ({user}) => {
//FALTA CONSEGUIR EL UID DE CADA HERRAMIENTA DEL HISTORIAL Y PASARLO AL HANDLEDELETE

        const path = collection(firestore, "historial", user.id, 'historial')
        const [docs, loading, error] = useCollectionData(path)
        if(!loading&&docs.length>0) 
        return(
            <div>
                <h2>Profesor: {user.nombre + ' ' + user.apellido}</h2>
                {docs?.map(doc=>{
                    return(
                        <div>
                            <h3>Herramienta en uso: {doc.nombreHerramienta}</h3>
                            <h4>Cantidad en uso: {doc.cantidadTomada}</h4>
                            <h4>Fecha: {doc.date}</h4>
                        </div>
                    )
                })}
                <button onClick={()=>handleDelete(user.id)}>Eliminar del historial</button>
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