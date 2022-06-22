"use strict";

const geolocation = navigator.geolocation;

const posicion = (pos)=>{
    console.log(pos.coords);
}


const err = () => console.log(e);

const options = {
    maximumAge: 0, //para no mostrar los datos de ubi guardados en la cache
    timeout: 3000, //no recuerdo que era
    enableHightAccuracy: true //para mayor precision
}

geolocation.getCurrentPosition(posicion,err,options);

//investigar watchPosition()