import {React,useState} from 'react';
import Header from '../Components/header'
import ToolImage from '../Components/getImage'

export default function SingleTool({headerName, admin, tool}){
    console.log(tool)
    return(
        <div>
            <Header name = {headerName} admin = {admin}/>
            <div>
                <h1>{tool.nombre}</h1>
                <h3>Cantidad actual: {tool.cantidad}</h3>
                <h3>Cantidad ideal: {tool.cantidadIdeal}</h3>
                <h3>Cantidad mínima: {tool.cantidadMinima}</h3>
                <h3>Categoria: {tool.cat1}</h3>
                <h3>Subcategoría: {tool.cat2}</h3>
                <h3>{tool.cat3 && `Subcategoría: ${tool.cat3}`}</h3>
                <h3>Ubicación: {tool.ubicacion}</h3>
                
                <ToolImage codigo = {tool.codigo}/>
            </div>

        </div>
    )
}
