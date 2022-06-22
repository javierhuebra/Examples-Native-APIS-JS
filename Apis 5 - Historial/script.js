"use strict";

//window.history//no hace falta poner window porque accede solo
console.log(history.length);//tamaño del historial
//console.log(history.back());//va atras
//console.log(history.forward());//va adelante
//console.log(history.go());//recarga la pagina

//history.pushState({nombre:"javi"},"","?jaja") agrega en window.location.href
//se crean entradas en el historial con pushState!
//pushState() es un evento

//history.state va a mostrar el nombre de lo que le pushee. 

//Se agrega con addEventListener("popstate",(e)=> console.log(e.state));

//history.replaceState({nombre:"javi"},"","?jaja") cambia la url nomas, no agrega al historial.
