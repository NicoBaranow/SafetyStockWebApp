import {React,useState} from 'react';
import Header from '../Components/header'

import VerHerramientas from '../Components/verTodasHerramientas'

export default function Buscar(props){
    
    const [search,setSearch] = useState('')

    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Buscar herramientas e insumos dentro del pañol</h1>
            <input
                onChange={(e)=>{setSearch(e.target.value)}}
                placeholder = 'Buscar por nombre'
                type='text'
            />
            <VerHerramientas editar = {false} nombre = {search}/>
        </div>
    )
}
