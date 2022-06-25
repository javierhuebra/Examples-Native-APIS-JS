"use strict";

const IDBRequest = indexedDB.open("database",1); //IDBRequest es una solicitod, le estamos solicitando abrir una db o crear.

IDBRequest.addEventListener("upgradeneeded",()=>{
    const db = IDBRequest.result; //la base de datos va a ser el resultado de la solicitud.
    db.createObjectStore("nombres",{
        autoIncrement: true
    });
})

IDBRequest.addEventListener("success",()=>{
   console.log("todo salio correctamente"); 
});

IDBRequest.addEventListener("error",()=>{
    console.log("ocurrio un error al abrir la base de datos"); 
 });

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
    cursor.addEventListener("success",()=>{
        if(cursor.result){
            console.log(cursor.result.value);//se accede al objeto y lo muestra por consola
            cursor.result.continue();//esto indica que continue hasta terminar todos los objetos
        } else console.log("todos los datos fueron leidos"); //cursor siempre se va a ejecutar una vez siendo nulo, es una característica
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