import {React} from 'react';
import Header from '../Components/header'
import ToolImage from '../Components/getImage'
import EditTool from '../Components/editTool'

export default function SingleTool({headerName, admin, tool}){
    console.log(admin)
    return(
        <div>
            <Header name = {headerName} admin = {admin}/>
            <div>
                <h1>{tool.nombre}</h1>
                <h3>Cantidad actual: {tool.cantidad}</h3>
                <h3>Cantidad ideal: {tool.cantidadIdeal}</h3>
                {admin !== undefined && <h3>Cantidad mínima: {tool.cantidadMinima}</h3>}
                <h3>Categoria: {tool.cat1}</h3>
                <h3>{tool.cat2 && tool.cat2 !== "" && `Subcategoría: ${tool.cat2}`}</h3>
                <h3>{tool.cat3 && tool.cat3 !== "" && `Subcategoría: ${tool.cat3}`}</h3>
                {admin !== undefined && <h3>Ubicación: {tool.ubicacion}</h3>}
                
                <ToolImage codigo = {tool.codigo}/>
                {admin && <EditTool codigo = {tool.codigo}/>}
            </div>

        </div>
    )
}
