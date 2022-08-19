import {React,useState,useEffect} from 'react';
import Header from '../../Components/header'

import { collection, getDocs} from 'firebase/firestore';
import { firestore } from '../../firebase/credenciales';

// import styles from './faltantes.module.css'

export default function Faltantes(props){

    const [faltantes,setFaltantes] = useState([])

    useEffect(()=>{
        const obtenerFaltantes = async ()=>{
            const {docs} = await getDocs(collection(firestore, "herramientasInsumos"));
            const faltantes = docs.map(singleTool =>({uid: singleTool.id, ...singleTool.data()}))
            setFaltantes(faltantes)
            };
        
        obtenerFaltantes()
    },[])

    const allFaltantes = faltantes.map(faltante=>{
        if(faltante.cantidadIdeal < faltante.cantidad && faltante.cantidad!== ''){
            return(
                <div key = {faltante.codigo}>
                    <h2>{faltante.nombre}</h2>
                    <div>Categoría: {faltante.cat1} </div>
                    <div>Cantidad actual: {faltante.cantidad}</div>
                    <div>Cantidad mínima: {faltante.cantidadMinima}</div>
                    <div>Cantidad ideal: {faltante.cantidadIdeal}</div>
                    <div>Cantidad a comprar: {faltante.cantidadIdeal - faltante.cantidad}</div>
                    <br/>
                </div>
            )
        }
    })


    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Lista de materiales a comprar</h1>
            {allFaltantes}
        </div>
    )
}