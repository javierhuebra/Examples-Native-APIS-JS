"use strict";

const IDBRequest = indexedDB.open("database",1); //IDBRequest es una solicitod, le estamos solicitando abrir una db o crear.

IDBRequest.addEventListener("upgradeneeded",()=>{
    const db = IDBRequest.result; //la base de datos va a ser el resultado de la solicitud.
    db.createObjectStore("nombres",{
        autoIncrement: true
    });
})

IDBRequest.addEventListener("success",()=>{
   leerObjetos();
});

IDBRequest.addEventListener("error",()=>{
    console.log("ocurrio un error al abrir la base de datos"); 
 });

document.getElementById("add").addEventListener("click",()=>{
    let nombre = document.getElementById("nombre").value;
    if(nombre.length > 0){
        if(document.querySelector(".posible") != undefined){
            if(confirm("Hay elementos sin guardar: ¿Continuar?")){
                addObjeto({nombre:nombre}); //esto lo pongo asi para ver, se puede poner asi {nombre} y estaria perfecto, de hecho se usa asi.
                leerObjetos();
            }
            
        }else{
            addObjeto({nombre:nombre}); //esto lo pongo asi para ver, se puede poner asi {nombre} y estaria perfecto, de hecho se usa asi.
            leerObjetos();
        }
    }
})

 const addObjeto = objeto =>{
    const db = IDBRequest.result; //todos los metodos de CRUD tienen esto y transaction.
    const IDBtransaction = db.transaction("nombres","readwrite");
    const objectStore = IDBtransaction.objectStore("nombres");
    objectStore.add(objeto);
    IDBtransaction.addEventListener("complete",()=>{
        console.log("objeto agregado correctamente");
    })
 }

 const leerObjetos = () =>{
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombres","readonly");
    const objectStore = IDBtransaction.objectStore("nombres");
    const cursor = objectStore.openCursor(); //para reemplazar el cursor con la funcion hay que crear el curson, no olvidar eso, lo dejo asi para no olvidarme.
    const fragment=document.createDocumentFragment();
    document.querySelector(".nombres").innerHTML = ""; //con esto logro que se agreguen de a uno y que no muestre todo repetido
    cursor.addEventListener("success",()=>{
        if(cursor.result){
            let elemento = nombresHTML(cursor.result.key,cursor.result.value) //creo un elemento y le aplico la funcion el id es lo que esta primero y lo segundo es el valor.
            fragment.appendChild(elemento);
            cursor.result.continue();//esto indica que continue hasta terminar todos los objetos
        } else document.querySelector(".nombres").appendChild(fragment); //cursor siempre se va a ejecutar una vez siendo nulo, es una característica
    })
 }

 const modificarObjeto = (key,objeto) =>{//atento al orden aca, ta raro el asunto, hay que entenderlo mejor
    const db = IDBRequest.result; //todos los metodos de CRUD tienen esto y transaction.
    const IDBtransaction = db.transaction("nombres","readwrite");
    const objectStore = IDBtransaction.objectStore("nombres");
    objectStore.put(objeto,key);//si el objeto no existe, lo agrega y si ya existe lo modifica.
    IDBtransaction.addEventListener("complete",()=>{
        console.log("objeto modificado correctamente");
    })
 }

 const eliminarObjeto = (key) =>{ //aca se hizo mucho mas chico el codigo por reemplazarlo con la funcion creada abajo.
    const IDBData = getIDBData("readwrite");
    IDBData[0].delete(key); //cuando retorna el objectStore
    IDBData[1].addEventListener("complete",()=>{ //cuando retorna el IDBtransaction
        console.log("objeto eliminado correctamente");
    })
 }

 //FUNCION DE OPTIMIZACIÓN
 const getIDBData = (mode)=>{ //creamos una funcion para ahorrarnos lo que se repite
    const db = IDBRequest.result; //todos los metodos de CRUD tienen esto y transaction.
    const IDBtransaction = db.transaction("nombres",mode);//el mode es para poder cambiar el modo de acceso a la base de datos.
    const objectStore = IDBtransaction.objectStore("nombres");
    return [objectStore,IDBtransaction];
 }

 const nombresHTML = (id,name) =>{
    const container = document.createElement("DIV");
    const h2 = document.createElement("H2");
    const options = document.createElement("DIV");
    const saveButton = document.createElement("BUTTON");
    const deleteButton = document.createElement("BUTTON");

    container.classList.add("nombre");
    options.classList.add("options");
    saveButton.classList.add("imposible");
    deleteButton.classList.add("delete");

    saveButton.textContent = "Guardar";
    deleteButton.textContent = "Eliminar";
    
    h2.textContent = name.nombre;//al ponerle name.nombre va a a mostrar el nombre de los objetos guardados en la DB

    h2.setAttribute("contenteditable",true); //para poder editar el contenido
    h2.setAttribute("spellcheck",false); //para sacar la linea roja de autocorrector

    options.appendChild(saveButton);
    options.appendChild(deleteButton);

    container.appendChild(h2);
    container.appendChild(options);

    h2.addEventListener("keyup",()=>{ //detecta cuando se esta modificando el texto de nombre
        saveButton.classList.replace("imposible","posible");
    })

    saveButton.addEventListener("click",()=>{ //para guardar cuando se modifica
        if(saveButton.className == "posible"){
            modificarObjeto(id,{nombre:h2.textContent});
            saveButton.classList.replace("posible","imposible");
        }
    })

    deleteButton.addEventListener("click",()=>{
        eliminarObjeto(id);
        document.querySelector(".nombres").removeChild(container);
    })
    return container;
 }
