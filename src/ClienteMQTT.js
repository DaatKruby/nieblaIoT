<<<<<<< HEAD
const mqtt = require("mqtt");
const enlace = require("./EnlaceNube");

class ClienteMQTT {
=======
const mqtt = require('mqtt')
const enlace = require("./EnlaceNube");

class ClienteMQTT {

>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
  constructor(usuario, contrasena) {
    this.usuario = usuario;
    this.contrasena = contrasena;

    this.host = "localhost";
    this.puerto = 1883;
    this.canal = "sensor";
    this.client = mqtt.connect({ host: this.host, port: this.puerto });
  }

  start() {
<<<<<<< HEAD
    this.client.on("message", function (topic, message) {
      console.log("MQTT: ", message.toString());
      message = JSON.parse(message);
      const json = enlace.convertirJSON(
        message.id,
        message.dataMov,
        message.dataSound,
        message.lvlBattery,
        message.date,
        message.activity
      );
      enlace.enviarDatosSensor(json);
    });

    var cliente_func = this.client;
    var canal_func = this.canal;

    this.client.on("connect", function () {
=======
    this.client.on('message', function (topic, message) {
      console.log("MQTT: ", message.toString())
      const hora = Date.now();
      message = JSON.parse(message);
      const json = enlace.convertirJSON(
        message.id, message.dtsTemp, message.dtsHum, message.lvBta, hora
      );
      enlace.enviarDatosSensor(json)
    });

    var cliente_func=this.client;
    var canal_func=this.canal;

    this.client.on('connect', function () {
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
      cliente_func.subscribe(canal_func, function (err) {
        if (err) {
          console.log(err);
        }
<<<<<<< HEAD
      });
    });
  }

  mandarMsjSinmSensor(id) {
    var dataMov = Math.floor(Math.random() * 100);
    var dataSound = Math.floor(Math.random() * 100);
    var lvlBattery = 100;
    let date = new Date();
    let activity = isActividad(dataMov, dataSound);
    var json = JSON.stringify({
      id,
      dataMov,
      dataSound,
      lvlBattery,
      date,
      activity,
=======
      })
    })
  }

  mandarMsjSinmSensor(id){
    var dtsTemp=Math.floor(Math.random()*(100));
    var dtsHumedad=Math.floor(Math.random()*(100));
    var lvBateria=100;
    var json=JSON.stringify({
      "id": id,
      "dtsTemp":dtsTemp,
      "dtsHum": dtsHumedad,
      "lvBta": lvBateria
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
    });
    this.mandarMsj(this.canal, json);
  }

<<<<<<< HEAD
  mandarMsj(canal, mensaje) {
    this.client.publish(canal, mensaje);
  }
}

const isActividad = (mov, sound) => {
  {
    var isActividad;
    isActividad = (mov > 50 && sound > 50);
     return isActividad;
  }
};
=======
  mandarMsj(canal, mensaje){
    this.client.publish(canal, mensaje);
  }

}
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4

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
<<<<<<< HEAD
});*/
=======
});*/
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
