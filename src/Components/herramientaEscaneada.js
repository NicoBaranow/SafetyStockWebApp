import {React, useState, useEffect} from "react"
import { firestore } from '../firebase/credenciales';
import { collection, getDocs, getDoc, doc  } from 'firebase/firestore';

export default function HerramientaEscaneada(){

    const [scanned, setScanned] = useState('')
    const [profesor, setProfesor] = useState()
    const [users, setUsers] = useState([])
    const [historial, setHistorial] = useState([])
    const [herramientaTomada, setHerramienta] = useState([])
    const [cantidadTomada, setCantidad] = useState([])
    const [codigoHerramienta, setCodigoHeramienta] = useState([])
    
    let code = "";
    let reading = false;
    
    useEffect(()=>{
        fetchUsers()
    },[])
    
    document.addEventListener('keypress', e => {
      //usually scanners throw an 'Enter' key at the end of read
        if (e.keyCode === 13) {
            if(code.length > 10) {
                setScanned((prevValue)=> [...prevValue, code])             
                console.log(scanned);
                code = "";
            }
        } else {
            code += e.key; //while this is not an 'enter' it stores the every key            
        }
    
        //run a timeout of 200ms at the first read and clear everything
        if(!reading) {
            reading = true;
            setTimeout(() => {
                code = "";
                reading = false;
            }, 200);  //200 works fine for me but you can adjust it
        }
    });


    const fetchUsers = async ()=>{
        const {docs} = await getDocs(collection(firestore, "usuarios"));
        const usersArray = docs.map(singleUser =>({uid: singleUser.id, ...singleUser.data()}))
        setUsers(usersArray)
    };

    // const fetchTools = async (id)=>{
    //     const docRef = doc(firestore, "herramientasInsumos", id)
    //     getDoc(docRef)
    //     .then((doc)=>{
    //         console.log(doc)
    //     })
    // };

    // const ScannedTools = () =>{
    //     scanned.map((singleCode)=>{
    //         fetchTools(singleCode).then(()=>{
    //             console.log(herramientaTomada)
    //             // return(

    //             // )
    //         })
    //     })
    // }


    function handleSubmit(){
        setScanned()
        setHistorial((prevHistorial)=>{ return(
            [ ...prevHistorial, 
                {
                    nombre: profesor
                    // [
                    //     //construir objeto y luego agregarlo al array con .push va a ser más fácil
                    // ]   
                }
            ] 
        )})
    }

    return(
        <div>
            {scanned ? 
            <div>
                <select 
                    name="profesor" 
                    id="profesor" 
                    required = {true} 
                    value = {profesor} 
                    onChange={(e)=>{setProfesor(e.target.value)}}>
                    <option value="none">Seleccione un profesor</option>
                    {users.map((user)=>{
                        return <option value={user.uid} key={user.uid}>{user.nombre + ' ' + user.apellido}</option>
                        })
                    }
                </select>
                <br/>
                <br/>
                {/* <ScannedTools/> */}
                {scanned}
                <br/>
                <br/>
                <button onClick={handleSubmit}>Confirmar</button>
            </div> 
            : 
            <div>
                <div>Escanee un código de barras</div>
            </div>
            }
        </div>
    )
    
}