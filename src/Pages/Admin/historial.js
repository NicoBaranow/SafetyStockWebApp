import React from 'react';
import Header from '../../Components/header'

export default function Faltantes(props){
    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Historial de utilización de herramientas e insumos</h1>
        </div>
    )
}