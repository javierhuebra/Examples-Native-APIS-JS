//"use strict";

const zona = document.querySelector(".zona-arrastre");

//PARA ARCHIVOS DE TEXTO

/* zona.addEventListener("dragover",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement,"#444");
});

zona.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement,"#888");
});

zona.addEventListener("drop",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement,"#888");
    cargarArchivo(e.dataTransfer.files[0]);
});


const changeStyle = (obj,color)=>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`; 
}

const cargarArchivo = ar =>{
    const reader = new FileReader();
    reader.readAsText(ar);
    reader.addEventListener("load",(e)=>{
        document.querySelector(".resultado").textContent = e.currentTarget.result;
    })
} */

//PARA CARGAR IMAGENES

/* zona.addEventListener("dragover",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement,"#444");
});

zona.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement,"#888");
});

zona.addEventListener("drop",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement,"#888");
    cargarArchivo(e.dataTransfer.files[0]);
});


const changeStyle = (obj,color)=>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`; 
}

const cargarArchivo = ar =>{
    const reader = new FileReader(); //creamos el lector
    reader.readAsDataURL(ar); //le decimos que lea el archivo como una url
    reader.addEventListener("load",(e)=>{ //cuando carga el archivo
       let url = URL.createObjectURL(ar); //creamos la url temporal para el archivo
       let img = document.createElement("IMG"); //creamos una imagen
       img.src=url; //le decimos que la url temporal va a ser la que creamos
       document.querySelector(".resultado").appendChild(img); //mandamos la imagen adentro del div
    })
}
 */
//PARA CARGAR VIDEOS

zona.addEventListener("dragover",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement,"#444");
});

zona.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement,"#888");
});

zona.addEventListener("drop",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement,"#888");
    cargarArchivo(e.dataTransfer.files[0]);
    zona.style.border = "4px solid #888" 
});


const changeStyle = (obj,color)=>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`; 
}

const cargarArchivo = ar =>{
    const reader = new FileReader(); 
    reader.readAsArrayBuffer(ar); 
    reader.addEventListener("progress",e=>{ //para hacer una barra de carga para controlar cuanto va de subida del archivo
        //console.log("el archivo pesa",ar.size); //para ver cuanto pesa el archivo
        let carga = Math.round((e.loaded/ar.size)*100); //cuanto va cargado dividido el tamaño total, da un porcentaje.
        zona.textContent=`${carga}%`;
        //console.log(`${carga*100}%`);
        document.querySelector(".barra-de-carga").style.width = `${carga}%`;
        document.querySelector(".barra-de-carga").style.padding = `10px 20px`;
    });

    reader.addEventListener("loadend",e=>{
        changeStyle(zona,"green");
        document.querySelector(".barra-de-carga").style.background="green";
    })
    reader.addEventListener("load",(e)=>{ 
       let video = new Blob([new Uint8Array(e.currentTarget.result)],{type:'video/mp4'}); //video contiene un blob valido para crear una url
       let url = URL.createObjectURL(video); 
       let img = document.createElement("VIDEO"); 
       img.src=url; 
       document.querySelector(".resultado").appendChild(img); 
       //img.play();
       
    })
}