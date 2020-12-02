const http = require('http');

const hostname='localhost';
const port=4000;
const pathEnvioDatos="/api/sensorinfo/infoSensor";
const pathInicioSesion="/api/sensorinfo/iniciarSesion";

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

    req.on("response", (response) => {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            console.log(body);
        });
    });

    req.write(json);
    req.end();
}

function convertirJSON(id, dataMov, dataSound, lvlBattery, date, activity) {
    var json = {
        id,
        dataMov,
        dataSound,
        lvlBattery,
        date,
        activity,
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