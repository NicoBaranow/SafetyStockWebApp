import {React,useState} from 'react';
import Header from '../Components/header'
import ToolImage from '../Components/getImage'

export default function SingleTool({headerName, admin, tool}){
    
    return(
        <div>
            <Header name = {headerName} admin = {admin}/>
            <div>
                <h1>{tool.nombre}</h1>
                <h3>Cantidad actual: {tool.cantidad}</h3>
                <ToolImage codigo = {tool.codigo}/>
            </div>

        </div>
    )
}
