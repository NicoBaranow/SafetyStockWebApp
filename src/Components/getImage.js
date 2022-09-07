
import { React, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function GetImage(props){

    const codigo = props.codigo
    
    const [url,setUrl] = useState()
    
    const fetchImage = async () =>{
        const storage = getStorage();
        getDownloadURL(ref(storage,`herramientasEInsumos/${codigo}`))
            //when image url is ready
        .then((url) => setUrl(url))

        .catch((error) => {
            // Handle any errors
            console.log('Ha habido un error al mostrar la imagen: '+ error)
        });
    }

    function Image () {
        return(
            <div>
                <img alt = "" src={url} className = "toolImage"></img>
            </div>
        )
    }

    const ToolImage = () =>{
        fetchImage()
        return Image()
    }

    return <ToolImage/>

  }