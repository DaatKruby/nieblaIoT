const http = require('http');

<<<<<<< HEAD
const hostname='localhost';
const port=4000;
const pathEnvioDatos="/api/sensorinfo/infoSensor";
const pathInicioSesion="/api/sensorinfo/iniciarSesion";
=======
const hostname='192.168.0.21';
const port=4000;
const pathEnvioDatos="/infoSensor";
const pathInicioSesion="/iniciarSesion";
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4

const confEnviarDts = {
    hostname: hostname,
    port: port,
    path: pathEnvioDatos,
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

function enviarDatosSensor(json) {
    const req = http.request(confEnviarDts);
    req.on('error', error => {
        console.error(error);
    })

<<<<<<< HEAD
    req.on("response", (response) => {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            console.log(body);
        });
    });

=======
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
    req.write(json);
    req.end();
}

<<<<<<< HEAD
function convertirJSON(id, dataMov, dataSound, lvlBattery, date, activity) {
    var json = {
        id,
        dataMov,
        dataSound,
        lvlBattery,
        date,
        activity,
=======
function convertirJSON(id, dtsTemp, dtsHum, lvBta, hora) {
    var json = {
        "id": id,
        "dtsTemp": dtsTemp,
        "dtsHum": dtsHum,
        "lvBta": lvBta,
        "hora": hora
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
    };
    return JSON.stringify(json);
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
module.exports.convertirJSON = convertirJSON;
module.exports.iniciarSesion = iniciarSesion;