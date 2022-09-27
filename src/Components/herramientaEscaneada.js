import {React, useState, useEffect} from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../firebase/credenciales';
import { useLocation } from 'wouter';

export default function HerramientaEscaneada(props){

    const [scanned, setScanned] = useState([])
    var barcode = ''
    var interval;

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
        setScanned(prevValue=>[...prevValue, scannedBarcode])
    }

    return(
        <div>
            
        </div>
    )
    
}