import React from 'react';
import Header from '../../Components/header'
import Historial from '../../Components/historial';

export default function VerHistorial(props){
    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Historial de utilización de herramientas e insumos</h1>
            <br></br>
            <Historial/>
        </div>
    )
}