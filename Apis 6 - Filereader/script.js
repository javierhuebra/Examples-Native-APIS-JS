"use strict";

const archivo = document.getElementById('archivo');
archivo.addEventListener("change",(e)=>{
    leerArchivo(archivo.files);
})

const leerArchivo = ar =>{
    for(let i=0;i<ar.length;i++){
        const reader = new FileReader(); //trabaja con lecturas de archivos
        reader.readAsText(ar[i]);
        reader.addEventListener("load",(e)=>{
        console.log(JSON.parse(e.target.result));
    });
    }
    
}






