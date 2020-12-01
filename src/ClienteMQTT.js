const mqtt = require('mqtt')
const enlace = require("./EnlaceNube");

class ClienteMQTT {

  constructor(usuario, contrasena) {
    this.usuario = usuario;
    this.contrasena = contrasena;

    this.calidad = new AseguramientoCalidad();

    this.host = "localhost";
    this.puerto = 1883;
    this.canal = "sensor";
    this.client = mqtt.connect({ host: this.host, port: this.puerto });
  }

  start() {
    this.client.on('message', (topic, message) => {
      console.log("MQTT: ", message.toString())
      const hora = Date.now();
      message = JSON.parse(message);

      this.enviarDatosAnomalos(message);

      const json = enlace.convertirJSON(
        message.id, message.dtsTemp, message.dtsHum, message.lvBta, hora
      );
      enlace.enviarDatosSensor(json)
    });

    var cliente_func = this.client;
    var canal_func = this.canal;

    this.client.on('connect', () => {
      cliente_func.subscribe(canal_func, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  enviarDatosAnomalos(message) {
    const sensorAnomalo=this.calidad.agregarNuevoDato(message.id, message.dtsHum, message.dtsTemp);
    if (sensorAnomalo!=null){
      enlace.enviarSensorAnomalo(message.id);
    }
  }

  mandarMsjSinmSensor(id) {
    var dtsTemp = -1;
    var dtsHumedad = Math.floor(Math.random(0,100));
    var lvBateria = 100;
    var json = JSON.stringify({
      "id": id,
      "dtsTemp": dtsTemp,
      "dtsHum": dtsHumedad,
      "lvBta": lvBateria
    });
    this.mandarMsj(this.canal, json);
  }

  mandarMsj(canal, mensaje) {
    this.client.publish(canal, mensaje);
  }

}

class AseguramientoCalidad {
  constructor() {
    this.sensores = [];
  }

  agregarNuevoDato(id, dtsMov, dtsSnd) {
    if (!this.isExisteIdEnArray(id)) {
      this.sensores.push(new ObjSensor(id));
    }

    //buscar sensor en array
    var sensor = null;
    for (var i = 0; i < this.sensores.length; i++) {
      if (this.sensores[i].id === id) {
        sensor = this.sensores[i]; break;
      }
    }
    sensor.agregarDatos(dtsMov, dtsSnd);

    if (sensor.isAnomalia()) {
      if (sensor.alertaMandada){
        return null;
      } else{
        sensor.deshabilitarAlerta();
        return sensor;
      }
    }
  }

  isExisteIdEnArray(id) {
    for (var i=0;i<this.sensores.length;i++){
      if (this.sensores[i].id===id){
        return true;
      }
    }
    return false;
  }
}

class ObjSensor {
  constructor(id) {
    this.id = id;
    this.datos = [];
    this.alertaMandada=false;
  }

  deshabilitarAlerta(){
    this.alertaMandada=true;
  }

  agregarDatos(dtsHum, dtsTemp) {
    var tamMaximoArr = 20;
    if (this.datos.length >= tamMaximoArr) {
      this.datos.unshift();
    }
    this.datos.push({ dtsHum, dtsTemp });
  }

  isAnomalia() {
    var numAnomalias = 0;
    const valNormalesHum = { min: 0, max: 100 };
    const valNormalesTemp = { min: 0, max: 100 };
    const cantNormalAnomalias = 3;

    this.datos.forEach((dato) => {
      var temp = dato.dtsTemp;
      var hum = dato.dtsHum;
      if ((temp < valNormalesTemp.min || temp > valNormalesTemp.max) ||
        (hum < valNormalesHum.min || hum > valNormalesHum.max)) {
        numAnomalias += 1;
      }
    });
    return (numAnomalias > cantNormalAnomalias);
  }


}

module.exports.ClienteMQTT = ClienteMQTT;

/*const mqtt = require('mqtt')
const enlace = require("./EnlaceNube");

var host = "localhost";
var puerto = 1883;
var client = mqtt.connect({ host: host, port: puerto })
var canal = "sensor";

client.on('connect', function () {
  client.subscribe(canal, function (err) {
    if (err) {
      console.log(err);
    }
  })
})

client.on('message', function (topic, message) {
  console.log("MQTT: ", message.toString())
});*/