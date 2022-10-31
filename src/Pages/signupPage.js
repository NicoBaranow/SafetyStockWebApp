import React, { useState } from 'react';
import { auth, firestore } from '../firebase/credenciales';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc} from 'firebase/firestore'
import { useLocation } from 'wouter';

import styles from './signUpPage.module.css'

export default function NavBar(){

    const [, setLocation] = useLocation();
    
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')    
    const [errorMessage ,setErrorMessage] = useState(null)

    const usuario = { 
        nombre: nombre,
        apellido: apellido,
        email: email,
        admin: false
    }

    async function RegistrarUsuario(nombre, apellido, email, password){
        const user  = await createUserWithEmailAndPassword(auth,email,password) //crea el usuario en Firebase Auth
            .then((usuarioFirebase)=>{
                return usuarioFirebase.user
            })

        try{
            await setDoc(doc(firestore, `usuarios`, user.uid),{
                ...usuario,
                id:user.uid
            })   //carga los datos a firestore, al fichero de /usuarios/UID de profesor
            setLocation('/')
        }
        catch (error) {
            console.error("Error al subir la información a la base de datos: ", error);
        }
    }

    function submitHandler(event){
        event.preventDefault()
        RegistrarUsuario(nombre, apellido, email, password) //funcion para registrar usuarios y subirlos a la base de datos con todos sus campos
        .catch((error) => { //si en RegistrarUsuario() surge un error...
            if(error.code === 'auth/invalid-email') setErrorMessage("formato de email incorrecto")
            if(error.code === 'auth/weak-password') setErrorMessage("la contraseña es demasiado débil")
            if(error.code === 'auth/email-already-in-use') setErrorMessage("el email ya está en uso") 
          });
    }

    return(
        
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.title}>Safety Stock</div>
                <div className={styles.subtitle}>Inicia sesión para continuar</div>
                
                <div className={`${styles.inputContainer} ${styles.ic2}`}>
                    <input id="nombre" className={styles.input} type="text" placeholder=" "  onChange={(e)=>{setNombre(e.target.value)}}/>
                    <div className={`${styles.cut} ${styles.cutNombre}`}></div>
                    <label to="nombre" className={styles.placeholder}>Nombre</label>
                </div>

                <div className={`${styles.inputContainer} ${styles.ic2}`}>
                    <input id="apellido" className={styles.input} type="text" placeholder=" "  onChange={(e)=>{setApellido(e.target.value)}}/>
                    <div className={`${styles.cut} ${styles.cutNombre}`}></div>
                    <label to="apellido" className={styles.placeholder}>Apellido</label>
                </div>
                
                <div className={`${styles.inputContainer} ${styles.ic2}`}>
                    <input id="email" className={styles.input} type="email" placeholder=" "  onChange={(e)=>{setEmail(e.target.value)}}/>
                    <div className={`${styles.cut} ${styles.cutShort}`}></div>
                    <label to="email" className={styles.placeholder}>Email</label>
                </div>
                
                <div className={`${styles.inputContainer} ${styles.ic2}`}>
                    <input id="password" className={styles.input} type="password" placeholder=" " onChange={(e)=>{setPassword(e.target.value)}} />
                    <div className={styles.cut}></div>
                    <label to="password" className={styles.placeholder}>Contraseña</label>
                </div>
        
                <button type="submit" className={styles.submit}>Registrarse</button>
                <a className={styles.formLink} href='/login'>¿Ya tenés cuenta? Inicia sesión</a>
                {errorMessage ? <div className={styles.errorMessage}>Error, {errorMessage}</div> : <span></span>}

            </form>

    )
}