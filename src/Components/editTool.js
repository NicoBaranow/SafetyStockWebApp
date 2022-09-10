import {React, useState, useEffect} from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../firebase/credenciales';


export default function EditTool(props){

    const codigo = props.codigo
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
        const docRef = doc(firestore, "cities", "DC");
        await updateDoc(docRef, {
        editCategory: editValue
        }).then(()=>{
            console.log("Edicion completa")
        });
    }

    const handleEdit = () =>{
        updateToolDoc()
    }

    const Edit = () =>{

        return (
            <div>
                <button onClick={()=>setEditar((value)=>!value)}>Editar herramienta</button>
                {editar && (
                    <div>
                        <form onSubmit={handleEdit}>
                            <select name="editCategory" onChange={(e)=>{setEditCategory(e.target.value)}}>
                                <option value='none'>Seleccionar categria</option>
                                {Object.keys(toolInfo).map((e)=>{
                                    return(
                                        <option key={e} value={e}>{e}</option>    
                                        )
                                    })}
                            </select>
                            <input type = 'text' required = {true} onChange={(e) =>{setEditValue(e.target.value)}}/>
                            <button type="submit">Editar herramienta</button>
                        </form>
                    </div>
                )}
            </div>
        )
    }

    return(
        <Edit/>
    )
}