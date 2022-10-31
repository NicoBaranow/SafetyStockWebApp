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
        fetchHistorial()
    },[])

    const fetchTools = async () => { 
        const {docs} = await getDocs(collection(firestore, "herramientasInsumos"));
        const toolsArray = docs.map(tool =>({...tool.data()}))
        setHerramientas(toolsArray)
    };

    const fetchUsers = async () => { 
        const {docs} = await getDocs(collection(firestore, "usuarios"))
        const usersArray = docs.map(user =>user.id)
        setUsers(usersArray)
    }
    
    const FetchUsersHistorial = (path) => {
        const [docs, loading, error] = useCollectionData(path)
        console.log(docs)
    }

    const path = collection(firestore, "historial", 'u101mlCunFP6MIq1S86gJSFRT403', "historial")
    const [docs, loading, error] = useCollectionData(path)
    console.log(docs)

    const fetchHistorial = async () => {

    }

    function handleDelete(uid){
        deleteDoc (doc(firestore,'herramientasInsumos',uid))
        .then(()=> {
            fetchTools()
        })
    }


    const Historial = () => {
        return (
            users.map(user=>{
                FetchUsersHistorial(user)
            })
        )
    }
        
    return (
        <Historial/>
    )
}