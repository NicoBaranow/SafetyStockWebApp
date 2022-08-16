import { React, useState, useEffect, useRef } from 'react';
import Barcode from 'react-barcode';

import { storage, firestore } from '../firebase/credenciales';
import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'

import ReactToPrint from "react-to-print";

import styles from './verTodasHerramientas.module.css'

export default function VerHerramientas(){

    const itemsRef = useRef([])
    const [herramientas, setHerramientas] = useState([{}])
    
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

    function displayImage(codigo){
        getDownloadURL(ref(storage, `herramientasEInsumos/${codigo}`))
            .then((url) => {
                const img = document.getElementById('myimg');
                img.setAttribute('src', url);
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                    case 'storage/unauthorized':
                    break;
                  case 'storage/canceled':
                    break;
                  case 'storage/unknown':
                      break;
                }
              });
    }

    const Tool = ({ tool, index }) => {
        displayImage(tool.codigo)
        return(
            <div key={tool.codigo}>
                <div>Nombre: {tool.nombre}</div>
                <div>Categoría: {tool.cat1 +', '+ tool.cat2}</div>
                <div>Ubicación: {tool.ubicacion}</div>
                <div>Cantidad: {tool.cantidad}</div>
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
                <br/>
                <img id="myimg"></img>
                <br/>
                <br/>
                <br/>
                
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