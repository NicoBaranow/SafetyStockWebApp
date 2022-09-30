import {React,useState,useEffect} from 'react';
import Header from '../../Components/header'

import { auth, firestore} from '../../firebase/credenciales';
import { collection, getDocs, deleteDoc, doc  } from 'firebase/firestore';

export default function Profesores(props){
    
    const currentUser = auth.currentUser;

    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetchUsers()
    },[])
    
    const fetchUsers = async ()=>{
        const {docs} = await getDocs(collection(firestore, "usuarios"));
        const usersArray = docs.map(singleUser =>({uid: singleUser.id, ...singleUser.data()}))
        setUsers(usersArray)
    };
    
    function handleClick(uid){
        deleteDoc (doc(firestore,'usuarios',uid))
        .then((data)=> {
            console.log(data)
            window.location.reload(true)
        })
    }

    const usersList = users.map(user =>(
            <div key={user.uid}>
                <div>{'Nombre del profesor: ' + user.nombre + ' ' + user.apellido}</div>
                <div>{'Email del profesor: ' + user.email}</div>
                <div>{`¿Es administrador?:  ${user.admin ? 'Si' : 'No'} `}</div>
                {currentUser.uid !== user.uid && <button onClick = {()=>handleClick(user.uid)} >Eliminar usuario</button>}
                <br/>
                <br/>
                <br/>
            </div>
    ))

    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Profesores habilitados</h1>
            {usersList}
        </div>
    )
}