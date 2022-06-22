"use strict";

const circulo = document.querySelector(".circulo");
const rectangulo = document.querySelector(".rectangulo");

circulo.addEventListener("dragstart",(e)=>{
    e.dataTransfer.setData("clase",e.target.className);//e.target.className es la clase de lo que se arrastra
    console.log(e.dataTransfer.getData("clase"));
});
//circulo.addEventListener("drag",()=>console.log("El objeto esta siendo trasladado"));
//circulo.addEventListener("dragend",()=>console.log("soltado"));

rectangulo.addEventListener("dragenter",()=>console.log("ENTRO EL OBJ"));
rectangulo.addEventListener("dragover",(e)=>{
    e.preventDefault(); //esto es para que detecte el drop pero no detecta el dragleave
    console.log("SE MUEVE");
});
rectangulo.addEventListener("drop",(e)=>{
    console.log(e.dataTransfer.getData("clase"));
});
rectangulo.addEventListener("dragleave",()=>console.log("SALIO EL OBJ"));