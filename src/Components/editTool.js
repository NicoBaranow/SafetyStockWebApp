import {React, useState, useEffect} from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../firebase/credenciales';
import { useLocation } from 'wouter';

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
                                <option value='none'>Seleccionar categria</option>
                                {Object.keys(toolInfo).map((e)=>{
                                    return(
                                        <option key={e} value={e}>{e}</option>    
                                        )
                                    })}
                            </select>
                            <input 
                                type = "text"
                                required = {true} 
                                onChange={(e)=>{setEditValue(e.target.value)}}
                            />
                            <input type="submit" value="Editar herramienta"/>
                        </form>
                    </div>
                )}
        </div>
    )
}