import {React,useState} from 'react';
import Header from '../Components/header'

import Historial from '../Components/historial'

export default function MisHerramientas(props){
    const [search,setSearch] = useState('')
    console.log(props.userId)
    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Mi historial de uso</h1>
            {/* <input
                onChange={(e)=>{setSearch(e.target.value)}}
                placeholder = 'Buscar por nombre'
                type='text'
            /> */}
            <Historial admin = {props.admin} userId = {props.userId}/>
        </div>
    )
}
