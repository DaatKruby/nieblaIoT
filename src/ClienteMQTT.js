const mqtt = require('mqtt')
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
      cliente_func.subscribe(canal_func, function (err) {
        if (err) {
          console.log(err);
        }
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
    });
    this.mandarMsj(this.canal, json);
  }

  mandarMsj(canal, mensaje){
    this.client.publish(canal, mensaje);
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