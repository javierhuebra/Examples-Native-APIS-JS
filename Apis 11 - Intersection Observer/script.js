"use strict";

const cajas=document.querySelectorAll(".caja");

const verifyVisibility = (entries)=>{ //siempre nos va a devolver un arreglo, por eso nombre entries
    for(const entry of entries){
        if(entry.isIntersecting){
            console.log("Se esta viendo la caja:",entry.target.textContent);
        }
    }
}
const options ={
    rootMargin:"-60px",
    //treshold: [0.5]
}
const observer = new IntersectionObserver(verifyVisibility,options);//si le agrego la propiedad options activo las options de arriba para modificar cuando se activa la visibilidad.

for (const caja of cajas){
    observer.observe(caja);
}