import { React, useState, useEffect, useRef } from 'react';
import Barcode from 'react-barcode';

import { firestore } from '../firebase/credenciales';
import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore'

import ReactToPrint from "react-to-print";

import styles from './verTodasHerramientas.module.css'

export default function VerHerramientas(props){

    const itemsRef = useRef([])
    const [herramientas, setHerramientas] = useState([{}])
    
    const edicion = props.editar
    var filtroNombre = props.nombre
    if(filtroNombre === undefined) filtroNombre = ''

    useEffect(()=>{
        fetchTools()
        itemsRef.current = itemsRef.current.slice(0, herramientas.length);
    },[])

    const fetchTools = async ()=>{
        const {docs} = await getDocs(collection(firestore, "herramientasInsumos"));
        const toolsArray = docs.map(tool =>({...tool.data()}))
        setHerramientas(toolsArray)
    };

    function handleDelete(uid){
        deleteDoc (doc(firestore,'herramientasInsumos',uid))
        .then(()=> {
            fetchTools()
        })
    }

    const Tool = ({ tool, index }) => {
        if(tool.nombre.toLowerCase().includes(filtroNombre.toLowerCase())) return(
            <div key={tool.codigo}>
                <div><h2>{tool.nombre}</h2></div>
                <p>Categoría: {tool.cat1 +', '+ tool.cat2}</p>
                <p>Ubicación: {tool.ubicacion}</p>
                <p>Cantidad:    {tool.cantidad}</p>
                {edicion && (
                    <div>
                        <button onClick = {()=>handleDelete(tool.codigo)}>Eliminar herramienta</button>
                        <ReactToPrint
                            trigger={() => (<button>Imprimir codigo de barras</button>)}
                            content={() => {return itemsRef.current[index]}}
                        />
                        <div key={tool.codigo} className = {styles.barcode}>
                            <Barcode 
                                key={tool.codigo}
                                ref={(el) => (itemsRef.current[index] = el)}
                                value = {tool.codigo ? tool.codigo : ""}
                            />
                        </div>
                    </div>
                )}

            </div>
        )

    }


    const Tools = () => {
        return (
            herramientas.map((item, index) =>{ 
                if(item.codigo) {
                    return item.nombre !== 'prueba' && <Tool key={item.codigo} tool={item} index={index} />
                }})
        )
    }
        
    return (
        <Tools/>
    )
}