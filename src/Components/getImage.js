
import { React } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function getImage(props){

    const codigo = props.codigo
    function Image (url) {
        console.log(url)
        return(
            <div>
                <img alt = "No image" src={url} className = "toolImage"></img>
            </div>
        )
    }

    const NoImage = () => { 
        return(
            <div>
                <h3>No hay imagen para esta herramienta</h3>
            </div>
        )
    }

    const ToolImage = () =>{

        const storage = getStorage();
        getDownloadURL(ref(storage,`herramientasEInsumos/${codigo}`))
        .then((url) => {
            // `url` is the download URL for the tool
            return Image(url)

        })
        .catch((error) => {
            // Handle any errors
            console.log('Ha habido un error al mostrar la imagen: '+ error)
            return <NoImage/>
        });
    }


    return(
        <ToolImage/>
        
    ) 
  }