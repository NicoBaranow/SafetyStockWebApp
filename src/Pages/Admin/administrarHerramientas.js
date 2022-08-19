import { React} from 'react';

import Header from '../../Components/header'
import AgregarHerramienta from '../../Components/agregarHerramientas'
import VerHerramientas from '../../Components/verTodasHerramientas'

import './herramientas.css'

export default function HerramientasPage(props){
    

    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h2>Agregar herramienta o insumo nuevo</h2>
            <AgregarHerramienta barcode = {props.barcode}/>
            <h2>Herraminetas existentes</h2>
            <VerHerramientas editar = {true}/>
        </div>
    )
}