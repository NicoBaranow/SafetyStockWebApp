import {React,useState} from 'react';
import Header from '../Components/header'
import styles from './search.module.css'
import VerHerramientas from '../Components/verTodasHerramientas'

export default function Buscar(props){
    
    const [search,setSearch] = useState('')

    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Buscar herramientas e insumos dentro del pañol</h1>
            <div className={styles.search}>
                <input
                    onChange={(e)=>{setSearch(e.target.value)}}
                    placeholder = 'Buscar por nombre'
                    type='text'
                    className={styles.searchTerm}
                />
            </div>
            <VerHerramientas editar = {false} nombre = {search}/>
        </div>
    )
}