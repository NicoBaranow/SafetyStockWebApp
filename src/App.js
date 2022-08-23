
import React, { useState,useEffect } from 'react';
import { Route,Switch } from "wouter";

import { auth, firestore} from './firebase/credenciales'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDocs, getDoc, collection } from 'firebase/firestore'

import Home from './Pages/homePage'
import LoginPage from './Pages/loginPage'
import SignupPage from './Pages/signupPage'
import Page404 from './Pages/Page404'
import Loading from './Pages/loading'
import Herramientas from './Pages/Admin/administrarHerramientas'
import Profesores from './Pages/Admin/profesores';
import Faltantes from './Pages/Admin/faltantes';
import Historial from './Pages/Admin/historial';
import Buscar from './Pages/search';
import SingleToolPage from './Pages/singleProductPage'
import NotAllowed from './Components/notAllowed';

import './appStyle.css'
 

function App() {
    
    var pathname = window.location.pathname

    const [userParams, setUserParams] = useState({})
    const [loading,setLoading] = useState(false)
    const [herramientas, setHerramientas] = useState([{}])
    var herramientaExiste;
    var singleTool = {}
    var nombre = userParams.nombre
    var admin = userParams.admin

    const [scanned, setScanned] = useState('')
    var barcode = ''
    var interval;

    async function getParams(uid){
        ///Busca la informacion especifica de un documento dentro de /usuarios/ con un UID especifico 
        ///retornando los datos del profesor 
        const docRef = doc(firestore, `usuarios/${uid}`)
        const docSnap = getDoc(docRef)
        return ((await docSnap).data())
    }

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },2000)
    },[pathname])

    useEffect(()=>{
        fetchTools()
        onAuthStateChanged(auth, (user)=>{
            if (user){
                getParams(user.uid).then((crudeParams)=> {
                    setUserParams(crudeParams)
                })
            }
            else setUserParams({})
        })
    },[])
    
    document.addEventListener('keydown',(event)=>{
        ///Lee constantemenete codigos de barras
        
        if (interval) clearInterval(interval);
        if(event.code === 'Enter'){
            if(barcode) handleBarcode(barcode)
            barcode = ''
            return;
        }
        if (event.key !=='Shift') barcode+= event.key
        interval = setInterval(()=> barcode= '', 20);
    })

    function handleBarcode(scannedBarcode){
        setScanned(scannedBarcode)
    }

    const fetchTools = async ()=>{
        const {docs} = await getDocs(collection(firestore, "herramientasInsumos"))
        const toolsArray = docs.map(tool =>({...tool.data()}))
        setHerramientas(toolsArray)
    };

    const SingleHerramienta = () => { 
        if(herramientas) {
            for(var i=0; i<herramientas.length;i++){
                const url = document.URL
                const toolName = herramientas[i].nombre.toLowerCase().replaceAll(" ", "%20")
                if(window.location.href.indexOf(herramientas[i].nombre) > -1) {
                    herramientaExiste = true
                    singleTool = herramientas[i]
                    break
                }
                
        }}

    }

    return (
        <div className='body'>
            <SingleHerramienta/>
            {loading && (pathname!=='/signup' && pathname!=='/login') ? <Loading/>:
            <Switch>
                <Route path='/' component={()=>(<Home name = {nombre} admin = {admin}/>)}></Route>
                <Route path='/login' component={()=>(<LoginPage/>)}></Route>
                <Route path='/signup' component={()=>(<SignupPage />)}></Route>
                <Route path='/buscar' component={()=>(<Buscar name = {nombre} admin = {admin}/>)}></Route>
                {herramientaExiste && <Route component={()=>(<SingleToolPage name = {nombre} admin = {admin} tool = {singleTool}/>)}></Route>}
                
                {/* Admin pages */}
            
                <Route 
                    path={'/herramientas'} 
                    component={()=>admin ? (<Herramientas name = {nombre} admin = {admin} barcode = {scanned}/>) : <NotAllowed />}
                ></Route>
                <Route 
                    path={'/profesores'} 
                    component={()=>admin ? (<Profesores name = {nombre} admin = {admin}/>) : <NotAllowed />}
                ></Route>
                <Route 
                    path={'/faltantes'} 
                    component={()=>admin ? (<Faltantes name = {nombre} admin = {admin} />) : <NotAllowed />}
                ></Route>
                <Route 
                    path={'/historial'} 
                    component={()=>admin ? (<Historial name = {nombre} admin = {admin}/>) : <NotAllowed />}
                ></Route>
                
                <Route >{()=>(<Page404/>)}</Route>
            </Switch>
            }
        </div>
    );
}
export default App;
