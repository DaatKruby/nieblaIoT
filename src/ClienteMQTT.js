const mqtt = require("mqtt");
const enlace = require("./EnlaceNube");

class ClienteMQTT {
  constructor(usuario, contrasena) {
    this.usuario = usuario;
    this.contrasena = contrasena;

    this.host = "localhost";
    this.puerto = 1883;
    this.canal = "sensor";
    this.client = mqtt.connect({ host: this.host, port: this.puerto });
  }

  start() {
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
      cliente_func.subscribe(canal_func, function (err) {
        if (err) {
          console.log(err);
        }
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
    });
    this.mandarMsj(this.canal, json);
  }

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
