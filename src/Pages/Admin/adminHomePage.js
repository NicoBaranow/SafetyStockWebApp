import React from 'react';
import Header from '../../Components/header'
import HerramientaEscaneada from '../../Components/herramientaEscaneada'

export default function navBar(props){

    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Homepage</h1>
            {props.isScanned ? <div>Item escaneado!</div> : <div>Aún no se ha escaneado ningún elemento</div>}
            <HerramientaEscaneada/>
        </div>
    )
}