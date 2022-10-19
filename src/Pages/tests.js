import React, { Component,useState } from 'react'
import BarcodeReader from 'react-barcode-reader'


export default function Tests(){
    const [result,setResult] = useState([])

    const handleScan = (data)=>{
        console.log(data)

        setResult((prevValue)=>[...prevValue,data])
    }

    return(
        <div>
            <BarcodeReader
                onScan={handleScan}
            />
            {result}

        </div>
    )
}