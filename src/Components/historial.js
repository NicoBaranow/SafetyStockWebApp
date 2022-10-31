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
        const path = collection(firestore, "historial", user, 'historial')
        const [docs, loading, error] = useCollectionData(path)

        return(
            <div>
                {docs?.map(doc=>{
                    return(
                        <div>
                            a
                            {doc.nombreHerramienta}
                        </div>
                    )
                })}
            </div>
        )

    }

    const Historial = () => {
        return(
            users.map(user=> {
                return <UserHistorial key={user.id} user={user.id}/>
            })
        )
    }
        
    return (
        <Historial/>
    )
}