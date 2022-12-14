import { React, useState } from 'react';

import { storage, firestore } from '../firebase/credenciales';
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import BarcodeReader from 'react-barcode-reader'

import { subcategorias } from '../data/data';

export default function AgregarHerramienta(props){

    const form = document.getElementById('formHerramienta') 

    const [nombre,setNombre] = useState('')
    const [ubicacion,setUbicacion] = useState('')
    const [codigo,setCodigo] = useState(props.barcode)
    const [cantidad,setCantidad] = useState()
    const [cantidadMinima,setCantidadMinima] = useState()
    const [cantidadIdeal,setCantidadIdeal] = useState()
    const [cat1,setCat1] = useState('')
    const [cat2,setCat2] = useState('')
    const [cat3,setCat3] = useState('')
    const [imageUpload, setImageUpload] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [scanned, setScanned] = useState([])

    const herraminetaInsumo = {
        nombre: nombre,
        ubicacion:ubicacion,
        codigo:codigo,
        cantidad:cantidad,
        cantidadMinima:cantidadMinima,
        cantidadIdeal:cantidadIdeal,
        cantidadTomada:0,
        cat1:cat1,
        cat2:cat2,
        cat3:cat3
    }

    async function addTool(){
        try{
            await setDoc(doc(firestore, `herramientasInsumos`, codigo),herraminetaInsumo)   //carga los datos a firestore
        }
        catch (error) {
            setErrorMessage(error)
        }
    }
    
    async function uploadImage(){
        if(imageUpload == null) {
            return setErrorMessage("No se ha seleccionado ninguna foto")
        }
        const imageRef = ref(storage, `herramientasEInsumos/${codigo}`)
        uploadBytes(imageRef, imageUpload)
            .then((img) => {
                console.log("imagen cargada correctamente", img)
            })
            .catch((error) => {
            // Handle any errors
                console.log("error al subir la imagen",error)
                setErrorMessage("Error al subir la imagen")

            });
    }

    async function SubmitHandler(event){
        event.preventDefault()
        addTool()
        uploadImage().then(()=>{
            setSuccessMessage("Herramienta creada correctamente!")
            form.reset()
        })
    }

    const handleScan = (data)=> setScanned(data)

    return(
        <div>
            <BarcodeReader onScan={handleScan}/>
            <form autoComplete="off" id = 'formHerramienta' onSubmit={SubmitHandler}>
                <label>
                    C??digo de barras
                    <input 
                    type="text" 
                    id='codigo'
                    required = {true}
                    // value={scanned}
                    onChange={(e)=>{setCodigo(e.target.value)}}/>
                </label>
                <label>
                    Nombre
                    <input 
                    type="name" 
                    id='nombre'
                    required = {true}
                    onChange={(e)=>{setNombre(e.target.value)}}/>
                </label>
                <label>
                    Cantidad
                    <input 
                    type="number" 
                    id='cantidad'
                    required = {true}
                    onChange={(e)=>{setCantidad(e.target.valueAsNumber)}}/>
                </label>
                <label>
                    Cantidad m??nima
                    <input 
                    type="number" 
                    id='cantidadMinima'
                    required = {true}
                    onChange={(e)=>{setCantidadMinima(e.target.valueAsNumber)}}/>
                </label>
                <label>
                    Cantidad ideal
                    <input 
                    type="number" 
                    id='cantidad'
                    required = {true}
                    onChange={(e)=>{setCantidadIdeal(e.target.valueAsNumber)}}/>
                </label>
                <label>
                    Ubicaci??n
                    <input 
                    type="text" 
                    id='text'
                    required = {true}
                    onChange={(e)=>{setUbicacion(e.target.value)}}/>
                </label>
                <label>
                    Categor??a
                <select name="cat1" id="cat1" required = {true} onChange={(e)=>{setCat1(e.target.value)}}>
                    <option value="herramientas">Herramientas</option>
                    <option value="electronica">Electronica</option>
                    <option value="electricidad">Electricidad</option>
                    <option value="pinturas">Pinturas</option>
                    <option value="ferreteria">Ferreter??a</option>
                </select>
                </label>
            
                {cat1 && <label>
                Subcategor??a
                    <select name="cat2" id="cat2" required = {true} onChange={(e)=>{setCat2(e.target.value)}}>
                    <option value="none">Seleccione una subcategor??a</option>
                    {subcategorias.map(item => {
                        if (cat1 === item.parent) return <option key={item.key} value={item.text}>{item.text}</option>
                        }
                        )}
                    </select>
                </label>}
            
                {cat2 && <label>
                Subcategor??a    
                    <select name="cat3" id="cat3" onChange={(e)=>{setCat3(e.target.value)}}>
                    <option value="none">Seleccione una subcatgor??a</option>
                    {subcategorias.map(item => {
                        if (cat2 === item.parent) return <option key={item.key} value={item.text}>{item.text}</option>
                        }
                        )}
                    </select>
                </label>}

                <label>
                    Subir Imagen
                    <input type='file'accept="image/png, image/jpeg" onChange={(event) =>setImageUpload(event.target.files[0])}/>
                </label>
                
                <input type="submit" value="Cargar"/>

            </form>
            <br/>
            <br/>
            {errorMessage ? <div>{errorMessage}</div> : <span>{successMessage}</span>}
            <br/>
        </div>
    )

}
