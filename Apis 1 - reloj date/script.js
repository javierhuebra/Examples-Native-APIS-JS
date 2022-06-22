"use strict";

const addZeros = n => {
    if (n < 10 ) return "0".concat(n); //cuento cuantos digitos hay
    return n; //cuando hay un return la funcion termina asi que no es necesario que use un else
}

const actualizarHora = ()=>{
    const time = new Date();
    let hora = addZeros(time.getHours());
    let min = addZeros(time.getMinutes());
    let seg = addZeros(time.getSeconds());

    document.querySelector(".hora").textContent = hora;
    document.querySelector(".min").textContent = min;
    document.querySelector(".seg").textContent = seg;
}

actualizarHora();

setInterval(actualizarHora,1000);