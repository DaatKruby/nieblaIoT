const http = require('http');

const hostname='192.168.0.21';
const port=4000;
const pathEnvioDatos="/infoSensor";
const pathInicioSesion="/iniciarSesion";
const pathSensorAnomalo="/sensorAnomalo";

const confEnviarDts = {
    hostname: hostname,
    port: port,
    path: pathEnvioDatos,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const confSensorAnomalo = {
    hostname: hostname,
    port: port,
    path: pathSensorAnomalo,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const confInicioSesion = {
    hostname: hostname,
    port: port,
    path: pathInicioSesion,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

function enviarSensorAnomalo (id){
    console.log(id);
    const req = http.request(confSensorAnomalo);
    req.on('error', error => {
        console.error(error);
    })

    req.write(JSON.stringify({id}));
    req.end();
}

function enviarDatosSensor(json) {
    const req = http.request(confEnviarDts);
    req.on('error', error => {
        console.error(error);
    })

    req.write(json);
    req.end();
}

function iniciarSesion(usuario, contrasena, callback) {
    const req = http.request(confInicioSesion);
    req.on('error', error => {
        let errorObj=new Error("Error de peticion a nube");
        console.log(error);
        callback(errorObj, null);
    })

    req.on("response", (response) => {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            callback(null, body);
        });
    });

    req.write(JSON.stringify({
        "usuario": usuario,
        "contrasena": contrasena
    }));
    req.end();
}

module.exports.enviarDatosSensor = enviarDatosSensor;
module.exports.iniciarSesion = iniciarSesion;
module.exports.enviarSensorAnomalo = enviarSensorAnomalo;