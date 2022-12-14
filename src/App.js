import React, { useState,useEffect } from 'react';
import { Route,Switch } from "wouter";

import { auth, firestore} from './firebase/credenciales'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDocs, getDoc, collection } from 'firebase/firestore'

import Home from './Pages/homePage'
import AdminHome from './Pages/Admin/adminHomePage'
import LoginPage from './Pages/loginPage'
import SignupPage from './Pages/signupPage'
import Page404 from './Pages/Page404'
import Herramientas from './Pages/Admin/administrarHerramientas'
import Profesores from './Pages/Admin/profesores';
import Faltantes from './Pages/Admin/faltantes';
import Historial from './Pages/Admin/historial';
import Buscar from './Pages/search';
import SingleToolPage from './Pages/singleProductPage'
import NotAllowed from './Components/notAllowed';
import TestPage from './Pages/tests'
import MisHerramientas from './Pages/misHerramientas'
import MiHistorial from './Pages/miHistorial'
import './appStyle.css'
 

function App() {
    

    const [userParams, setUserParams] = useState({})
    const [herramientas, setHerramientas] = useState([])
    const [urlCoincide, setUrlCoincide] = useState(false)
    const [singleTool, setSingleTool] = useState({})
    var nombre = userParams.nombre
    var admin = userParams.admin

    async function getParams(uid){
        ///Busca la informacion especifica de un documento dentro de /usuarios/ con un UID especifico 
        ///retornando los datos del profesor 
        const docRef = doc(firestore, `usuarios/${uid}`)
        const docSnap = getDoc(docRef)
        return ((await docSnap).data())
    }


    useEffect(()=>{
        fetchTools().then(()=>{
            SingleHerramienta()
        })
        onAuthStateChanged(auth, (user)=>{
            if (user){
                getParams(user.uid).then((crudeParams)=> {
                    setUserParams(crudeParams)
                })
            }
            else setUserParams({})
        })
    },[])
    
    const fetchTools = async ()=>{
        const {docs} = await getDocs(collection(firestore, "herramientasInsumos"))
        const toolsArray = docs.map(tool =>({...tool.data()}))
        setHerramientas(toolsArray)
    };

    const SingleHerramienta = () => {
        return( 
            herramientas.map((item)=>{
                if(item.nombre && urlCoincide!==true){
                const nombre = item.nombre.trim().toLowerCase().replaceAll(' ',"%20")
                    if(window.location.href.indexOf(nombre)>-1) {
                        setUrlCoincide(true)
                        setSingleTool(item)
                    }      
                }
            })
        )

    }


    return (
        <div className='body'>
            <SingleHerramienta/>
            <Switch>
                <Route path='/' component={()=>admin ? (<AdminHome name = {nombre} admin = {admin}/>):(<Home name = {nombre} admin = {admin}/>)}></Route>
                <Route path='/login' component={()=>(<LoginPage/>)}></Route>
                <Route path='/test' component={()=>(<TestPage/>)}></Route>
                <Route path='/signup' component={()=>(<SignupPage />)}></Route>
                <Route path='/mis-herramientas' component={()=>(<MisHerramientas name = {nombre} admin = {admin} userId = {userParams.id}/>)}></Route>
                <Route path='/mi-historial' component={()=>(<MiHistorial name = {nombre} admin = {admin} userId = {userParams.id}/>)}></Route>
                <Route path='/buscar' component={()=>(<Buscar name = {nombre} admin = {admin}/>)}></Route>
                {urlCoincide===true && <Route component={()=>(<SingleToolPage headerName = {nombre} admin = {admin} tool = {singleTool}/>)}></Route>}
                
                {/* Admin pages */}

                <Route 
                    path={'/herramientas'} 
                    component={()=>admin ? (<Herramientas name = {nombre} admin = {admin} />) : <NotAllowed />}
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
                    component={()=>admin ? (<Historial name = {nombre} admin = {admin} userId = {userParams.id}/>) : <NotAllowed />}
                ></Route>
                
                {urlCoincide===false && <Route >{()=>(<Page404/>)}</Route>}
            </Switch>
            
        </div>
    );
}
export default App;
