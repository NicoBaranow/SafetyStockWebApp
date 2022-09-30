import React from 'react';
import Header from '../../Components/header'
import HerramientaEscaneada from '../../Components/herramientaEscaneada'

export default function navBar(props){
    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Homepage</h1>
            <HerramientaEscaneada/>
        </div>
    )   
}