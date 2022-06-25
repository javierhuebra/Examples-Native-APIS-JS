"use strict";

const archivo = document.getElementById('archivo');
archivo.addEventListener("change",(e)=>{
    leerArchivo(archivo.files);
    
})
var fragmentoImagen = document.createDocumentFragment("");
const leerArchivo = ar =>{
    /* for(let i=0;i<ar.length;i++){ //PARA ARCHIVOS DE TEXTO
        const reader = new FileReader(); //trabaja con lecturas de archivos
        reader.readAsText(ar[i]);
        reader.addEventListener("load",(e)=>{
        console.log(JSON.parse(e.target.result));
    }); */
   
    for(let i=0;i<ar.length;i++){
        const reader = new FileReader(); //trabaja con lecturas de archivos
        reader.readAsDataURL(ar[i]);
        reader.addEventListener("load",(e)=>{
            //let newImg = `<img src='${e.currentTarget.result}'>`;
            var newImg = document.createElement("IMG");
            newImg.src=`${e.currentTarget.result}`;
            fragmentoImagen.appendChild(newImg);
            console.log(fragmentoImagen);
            document.querySelector(".resultado").appendChild(fragmentoImagen);
   
    });
    
    
    } 
}



    






