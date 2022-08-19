import { React, useState, useEffect } from 'react';
import './headerStyle.css'
import { auth } from '../firebase/credenciales';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function NavBar(props){

    const [user, setUser] = useState(null)

    useEffect( () => {
        onAuthStateChanged(auth, (user) =>{
            if (user){
                setUser(user)
            }
        })
    },[])

    function cerrarSesion() {
        signOut(auth)
        setUser(null)
    }

    const InvitedHeader = (
        <div className='header'>
        <div className='header--titleLogo'>
            <h2 className='header--title'>Safety Stock</h2>
            {/* <img className='header--logo' src='' alt='Logo'></img> */}
        </div>
        <ul className='header--links'>
            <li>
                <a href='buscar'>Buscar</a>
            </li>
        </ul>
        <a className='header--account' href='/login'>Iniciar sesión o regístrate</a>
    </div>
    )

    const AdminHeader = (
    <header className='header'>
        <div className='header--titleLogo'>
            <h2 className='header--title'>Safety Stock</h2>
            {/* <img className='header--logo' src='' alt='Logo'></img> */}
        </div>
        <ul className='header--links'>
            <li>
                <a href='buscar'>Buscar</a>
            </li>
            <li>
                <a href='/herramientas'>Administrar herramientas</a>
            </li>
            <li>
                <a href='profesores'>Profesores</a>
            </li>
            <li>
                <a href='faltantes'>Faltantes</a>
            </li>
            <li>
                <a href='Historial'>Historial</a>
            </li>
        </ul>
        <p className='header--account' onClick={cerrarSesion}>{user && `Cerrar sesion de ${props.name}`}</p>
    </header>
    )

    const UserHeader = (
    <div className='header'>
        <div className='header--titleLogo'>
            <h2 className='header--title'>Safety Stock</h2>
            {/* <img className='header--logo' src='' alt='Logo'></img> */}
        </div>
        <ul className='header--links'>
            <li>
                <a href='buscar'>Buscar</a>
            </li>
            <li>
                <a href='mis-herramientas'>Mis herramientas</a>
            </li>
            <li>
                <a href='historial/name'>Mi historial</a>
            </li>
        </ul>
        <p className='header--account' onClick={cerrarSesion}>{user && `Cerrar sesion de ${props.name}`}</p>
    </div>
    )

    function Header (){

        if(user){
            if(props.admin){
                return AdminHeader
            }
            else return UserHeader
        }
        else return InvitedHeader
    }

    return(
        <header>{Header()}</header> //Dependiendo de si hay usuario, y si este es o no administrador, se muestran distintos headers
    )
}