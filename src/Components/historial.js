import { React, useState, useEffect, useRef } from 'react';
import { firestore } from '../firebase/credenciales';
import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore'
import styles from './verTodasHerramientas.module.css'

export default function Historial(props){

    const itemsRef = useRef([])
    const [herramientas, setHerramientas] = useState([{}])
    const [historial,setHistorial] = useState([{}])
    
    const edicion = props.editar
    var filtroNombre = props.nombre
    if(filtroNombre === undefined) filtroNombre = ''

    
    useEffect(()=>{
        // fetchTools()
        fetchHistorial()
    },[])

    const fetchTools = async () => { 
        const {docs} = await getDocs(collection(firestore, "herramientasInsumos"));
        const toolsArray = docs.map(tool =>({...tool.data()}))
        setHerramientas(toolsArray)
    };



    const fetchHistorial = async () => { 
        const querySnapshot = await getDocs(collection(firestore,'historial'))
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          })
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
                <a href={tool.nombre.toLowerCase()} className={styles.toolLink}><h2>{tool.nombre}</h2></a>
                <p>Categoría: {tool.cat1 +', '+ tool.cat2}</p>
                <p>Ubicación: {tool.ubicacion}</p>
                <p>Cantidad: {tool.cantidad}</p>
                <p>Cantidad en uso: {tool.cantidadTomada}</p>
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