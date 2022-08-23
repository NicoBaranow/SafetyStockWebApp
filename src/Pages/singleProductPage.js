import {React,useState} from 'react';
import Header from '../Components/header'

export default function SingleTool(props){


    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>La herramienta es...</h1>

        </div>
    )
}
