import { React, useState, useEffect } from 'react';
import { auth } from '../firebase/credenciales';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import styles from './headerStyle.module.css'
import openMenu from '../Images/openMenu50.png'
import closeMenu from '../Images/closeMenu50.png'

export default function NavBar(props){

    const [mobile, setMobile] = useState(false)
    const [user, setUser] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)

    useEffect( () => {
        onAuthStateChanged(auth, (user) =>{
            if (user){
                setUser(user)
            }
        })
    },[])

    const handleClick = () => setMobile(value=>!value)
    const handleResize = () => setWidth(window.innerWidth)
    
    window.addEventListener('resize', handleResize)

    function cerrarSesion() {
        signOut(auth)
        setUser(null)
    }

    const BrowserHeader = () => {

        const InvitedHeader = (
            <div className={styles.header}>
            <div className={styles.headerTitleLogo}>
                <a href = '/' className={styles.headerTitle}> <h2>Safety Stock</h2></a>
                {/* <img className='header--logo' src='' alt='Logo'></img> */}
            </div>
            <ul className={styles.headerLinks}>
                <li>
                    <a href='buscar'>Buscar</a>
                </li>
            </ul>
            <a className={styles.headerAccount} href='/login'>Iniciar sesión o regístrate</a>
        </div>
        )
    
        const UserHeader = (
            <header className={styles.header}>
                <div className={styles.headerTitleLogo}>
                    <a href = '/' className={styles.headerTitle}> <h2>Safety Stock</h2></a>
                    {/* <img className='header--logo' src='' alt='Logo'></img> */}
                </div>
                <ul className={styles.headerLinks}>
                    <li>
                        <a href='buscar'>Buscar</a>
                    </li>
                    <li>
                        <a href='mis-herramientas'>Mis herramientas</a>
                    </li>
                    <li>
                        <a href='mi-historial'>Mi historial</a>
                    </li>
                </ul>
                <p className={styles.headerAccount} onClick={cerrarSesion}>{user && `Cerrar sesion`}</p>
            </header>
        )
    
        const AdminHeader = (
            <header className={styles.header}>
                <div className={styles.headerTitleLogo}>
                    <a href = '/' className={styles.headerTitle}> <h2>Safety Stock</h2></a>
                    {/* <img className='header--logo' src='' alt='Logo'></img> */}
                </div>
                <ul className={styles.headerLinks}>
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
                        <a href='historial'>Historial</a>
                    </li>
                </ul>
                <p className={styles.headerAccount} onClick={cerrarSesion}>{user && `Cerrar sesion`}</p>
            </header>
        )

        if(user && props.admin) return AdminHeader
        if(user && !props.admin) return UserHeader
        if(!user) return InvitedHeader
    }

    const MobileHeader = () => {

        const InvitedHeaderMobile = (
            <header className={styles.header}>
                <div className={styles.headerTitleLogo}>
                    <a href = '/' className={styles.headerTitle}> <h2>Safety Stock</h2></a>
                    {/* <img className='header--logo' src='' alt='Logo'></img> */}
                </div>
                <ul id={styles.navBar} 
                className={mobile ? styles.headerLinks : styles.headerLinksHidden}>
                    <li>
                        <a href='buscar'>Buscar</a>
                    </li>
                    <li>
                        <a className={styles.headerAccount} href='/login'>Iniciar sesión o regístrate</a>
                    </li>
                </ul>
                <div className={styles.mobileIconContainer} onClick={handleClick}><img className={styles.mobileIcon} src={mobile? closeMenu : openMenu}></img></div>
            </header>
        )
    
        const UserHeaderMobile = (
            <header className={styles.header}>
                <div className={styles.headerTitleLogo}>
                    <a href = '/' className={styles.headerTitle}> <h2>Safety Stock</h2></a>
                    {/* <img className='header--logo' src='' alt='Logo'></img> */}
                </div>
                <ul id={styles.navBar} 
                className={mobile ? styles.headerLinks : styles.headerLinksHidden}>
                    <li>
                        <a href='buscar'>Buscar</a>
                    </li>
                    <li>
                        <a href='mis-herramientas'>Mis herramientas</a>
                    </li>
                    <li>
                        <a href='historial/name'>Mi historial</a>
                    </li>
                    <li>
                        <p className={styles.headerAccount} onClick={cerrarSesion}>{user && `Cerrar sesion`}</p>
                    </li>
                </ul>
                <div className={styles.mobileIconContainer} onClick={handleClick}><img className={styles.mobileIcon} src={mobile? closeMenu : openMenu}></img></div>
            </header>
            
        )
    
        const AdminHeaderMobile = (
            <header className={styles.header}>
                <div className={styles.headerTitleLogo}>
                    <a href = '/' className={styles.headerTitle}> <h2>Safety Stock</h2></a>
                    {/* <img className='header--logo' src='' alt='Logo'></img> */}
                </div>
                <ul id={styles.navBar} 
                className={mobile ? styles.headerLinks : styles.headerLinksHidden}>
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
                        <a href='historial'>Historial</a>
                    </li>
                    <li>
                        <p className={styles.headerAccount} onClick={cerrarSesion}>{user && `Cerrar sesion`}</p>
                    </li>
                </ul>
                <div className={styles.mobileIconContainer} onClick={handleClick}><img className={styles.mobileIcon} src={mobile? closeMenu : openMenu}></img></div>
            </header>
        )

        if(user && props.admin) return AdminHeaderMobile
        if(user && !props.admin) return UserHeaderMobile
        if(!user) return InvitedHeaderMobile
    }

    const Header = () => width>1024 ? <BrowserHeader/> : <MobileHeader/>

    return(
        <Header/>
    )
}