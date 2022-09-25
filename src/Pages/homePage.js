import React from 'react';
import Header from '../Components/header'

export default function navBar(props){

    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Homepage</h1>
        </div>
        
    )
}