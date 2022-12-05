import {React, useState, useEffect} from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../firebase/credenciales';
import { useLocation } from 'wouter';
import styles from './editTool.module.css'

export default function EditTool(props){

    const codigo = props.codigo
    const [, setLocation] = useLocation();
    const [editar, setEditar] = useState(false)
    const [toolInfo, setToolInfo] = useState({})
    const [editCategory, setEditCategory] = useState()
    const [editValue, setEditValue] = useState('')

    useEffect(()=>{
        getToolDoc()

    },[])

    const getToolDoc = async () =>{
        const docRef = doc(firestore, "herramientasInsumos", codigo);
        const docSnap = await getDoc(docRef);
        docSnap.exists() && setToolInfo(docSnap.data())
    }

    const updateToolDoc = async () =>{
        const docRef = doc(firestore, "herramientasInsumos", codigo);
        const newUrl = editValue.toLowerCase().replaceAll(' ',"%20")
        console.log("La URL nueva es " + newUrl)
        await updateDoc(docRef, {
            [editCategory]: editValue
        })
        .then(()=>{
            console.log("Edicion completa")
            if(editCategory === 'nombre') setLocation(`${newUrl}`)
            window.location.reload();
        })
        .catch(error=>{
            console.log("Ha habido un error al cargar la informacion " + error)
        })
    }

    const handleEdit = (e) =>{
        e.preventDefault()
        updateToolDoc()
    }
console.log(toolInfo)
    return(
        <div>
            <button onClick={()=>setEditar((value)=>!value)}>Editar herramienta</button>
            {editar && (
                    <div>
                        <form onSubmit={handleEdit}>
                            <select 
                                name="editCategory" 
                                onChange={(e)=>{setEditCategory(e.target.value)}}
                                value = {editCategory}>
                                <option value='none'>Seleccionar categoría</option>
                                {Object.keys(toolInfo).map((e)=>{
                                    return(
                                        <option key={e} value={e}>
                                            {e==='nombre' && 'Nombre'}
                                            {e==='ubicacion' && 'Ubicación'}
                                            {e==='cat1' && 'Categoria'}
                                            {e==='cat2' && 'Subcategoría'}
                                            {e==='cat3' && 'Segunad Subcategoría'}
                                            {e==='cantidad' && 'Cantidad'}
                                            {e==='cantidadIdeal' && 'Cantidad Ideal'}
                                            {e==='cantidadTomada' && 'Cantidad tomada'}
                                            {e==='cantidadMinima' && 'Cantidad mínima'}
                                            {e==='codigo' && 'Código'}
                                        </option>    
                                        )
                                    })}
                            </select>
                            <input 
                                type = "text"
                                required = {true} 
                                onChange={(e)=>{setEditValue(e.target.value)}}
                                className={styles.input}
                            />
                            <input type="submit" value="Confirmar edición"/>
                        </form>
                    </div>
                )}
        </div>
    )
}