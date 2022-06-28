"use strict";

const mq = matchMedia("(max-width:500px)");//es como el media query, cuando pase el width maximo me va a tirar un valor booleano diciendo false, si no lo pasa, true. 
console.log(mq.matches);

const titulo = document.querySelector(".cambiador");
if(mq.matches){
    titulo.innerHTML="NO supera los 500 pixeles de width"
    titulo.classList.replace("red","green");
}else{
    titulo.innerHTML="Supera los 500 pixeles de width"
    titulo.classList.replace("green","red");
}
mq.addEventListener("change",()=>{
    if(mq.matches){
        titulo.innerHTML="NO supera los 500 pixeles de width"
        titulo.classList.replace("red","green");
    }else{
        titulo.innerHTML="Supera los 500 pixeles de width"
        titulo.classList.replace("green","red");
    }
});
