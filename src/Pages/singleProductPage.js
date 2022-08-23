import {React,useState} from 'react';
import Header from '../Components/header'

export default function SingleTool(props){

    const tool = {
        nombre: props.tool.nombre,
        cantidad: props.cantidad,
        cantMin: props.cantidadMinima,
        cantIdeal: props.cantidadIdeal,
        cat1: props.cat1,
        cat2: props.cat2,
        cat3: props.cat3,
        codigo: props.codigo,
        ubicacion: props.ubicacion
    }

    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <div>
                <h1>{tool.nombre}</h1>
            </div>

        </div>
    )
}
