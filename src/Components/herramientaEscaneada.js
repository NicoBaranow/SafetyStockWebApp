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

    var barcode = ''
    var interval;
    
    useEffect(()=>{
        fetchUsers()
    },[])
    
    const fetchUsers = async ()=>{
        const {docs} = await getDocs(collection(firestore, "usuarios"));
        const usersArray = docs.map(singleUser =>({uid: singleUser.id, ...singleUser.data()}))
        setUsers(usersArray)
    };

    const fetchTools = async (id)=>{
        const docRef = doc(firestore, "herramientasInsumos", id)
        getDoc(docRef)
        .then((doc)=>{
            setHerramienta(doc)
        })
    };


    const ScannedTools = () =>{
        scanned.map((singleCode)=>{
            fetchTools(singleCode).then(()=>{
                console.log(herramientaTomada)
                // return(
                    
                // )
            })
        })




    }

    function handleBarcode(scannedBarcode){
        setScanned((prevValue)=> [...prevValue, scannedBarcode])
    }

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

    document.addEventListener('keydown',(event)=>{
        if (interval) clearInterval(interval);
        if(event.code === 'Enter'){
            if(barcode) handleBarcode(barcode)
            barcode = ''
            return;
        }

        if (event.key !=='Shift') barcode+= event.key
        interval = setInterval(()=> barcode= '', 20);
    })

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
                <ScannedTools/>
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