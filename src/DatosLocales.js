const fs = require('fs');
const ruta = "./db/InfoSesion.txt";

function leerSesion(){
    try{
        var json=fs.readFileSync(ruta);
    } catch(err){
        crearArchivoVacio();
        var json=fs.readFileSync(ruta);
    }
    return JSON.parse(json);
}

function crearArchivoVacio (){
    fs.writeFileSync(ruta, JSON.stringify({
        "existente": false,
        "usuario":"",
        "contrasena":""
    }));
}

function guardarSesion(usuario, contrasena) {
    fs.writeFileSync(ruta, JSON.stringify({
        "existente": true,
        "usuario":usuario,
        "contrasena":contrasena
    }));
}

module.exports.leerSesion=leerSesion;
module.exports.guardarSesion=guardarSesion;