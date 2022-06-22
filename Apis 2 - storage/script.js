"use strict";

/* localStorage.setItem("nombre","pedro");//con setItem definimos lo que vamos a almacenar y lo mandamos.
//si yo borro la asignacion de nombre, va a seguir mostrandose porque en algun momento se guardó en localstorage.
console.log(localStorage);

console.log(localStorage.getItem("nombre"));//con getItem traemos las cosas guardadas

let nombre = localStorage.getItem("nombre");//ahora muestro la variable y tiene el valor del nombre guardado

console.log(nombre);

sessionStorage.setItem("apellido","huebra");//ahora se guarda de forma volatil, esta guardado hasta que cierro el programa.
console.log(sessionStorage.getItem("apellido"));

setTimeout(()=>{
    sessionStorage.removeItem("apellido"); //se elimina a los 2 segundos de haberlo creado, puede usarse en localstorage tambien.
},2000);

//el metodo clear() limpia todo

localStorage.clear(); */
const idioma=localStorage.getItem("idioma");//aca se guarda el item del localstorage

const modal=document.querySelector(".modal-overlay");
const definirIdioma = ()=>{
    document.querySelector(".en").addEventListener("click",()=>{
        localStorage.setItem("idioma","en");
        cerrarModal();
        document.querySelector(".datos").style.display="flex";
        document.querySelector(".idioma").innerHTML=`Idioma seteado, recargar`;
    })


    document.querySelector(".es").addEventListener("click",()=>{
        localStorage.setItem("idioma","es");
        cerrarModal();
        document.querySelector(".datos").style.display="flex";
        document.querySelector(".idioma").innerHTML=`Idioma seteado, recargar`;
    })
    
}
document.querySelector(".borrar").addEventListener("click",()=>{
    localStorage.clear();
    document.querySelector(".idioma").innerHTML=`Idioma borrado, recargar`
    
})
const cerrarModal = () =>{
    
    modal.style.animation = "desaparecer 1s forwards"
    setTimeout(()=>modal.style.display="none",1000);
}


if(idioma === null) definirIdioma(); //checkea si hay algun idioma seteado en el localstorage
else {
    console.log(`El idioma es: ${idioma}`);
    modal.style.display="none";
    document.querySelector(".datos").style.display="flex";
    document.querySelector(".idioma").innerHTML=`Idioma: ${idioma}`
}