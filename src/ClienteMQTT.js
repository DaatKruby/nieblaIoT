const mqtt = require("mqtt");
const enlace = require("./EnlaceNube");
const { AseguramientoCalidad, isDeteccionDeActividad } = require("./Sensor");

class ClienteMQTT {
  constructor(usuario, contrasena) {
    this.usuario = usuario;
    this.contrasena = contrasena;

    this.calidad = new AseguramientoCalidad();

    this.host = "localhost";
    this.puerto = 1883;
    this.canal = "sensor";
    this.client = mqtt.connect({ host: this.host, port: this.puerto });
    this.activado = true;
  }

  start() {
    this.client.on('message', (topic, message) => {
      if (this.activado) {
        console.log("MQTT: ", message.toString())
        message = JSON.parse(message);

        this.enviarDatosAnomalos(message);

        const json = {
          id: message.id,
          dataMov: message.dataMov,
          dataSound: message.dataSound,
          lvlBattery: message.lvlBattery,
          date: new Date(),
          activity: isDeteccionDeActividad(message.dataMov, message.dataSound)
        };
        enlace.enviarDatosSensor(JSON.stringify(json))
      }
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

  setModoActivado(activado) {
    this.activado = activado;
  }

  enviarDatosAnomalos(message) {
    const sensorAnomalo = this.calidad.agregarNuevoDato(message.id, message.dataMov, message.dataSound);
    if (sensorAnomalo != null) {
      enlace.enviarSensorAnomalo(message.id);
    }
  }

  mandarMsjSinmSensor(message) {
    this.mandarMsj(this.canal, JSON.stringify(message));
  }

  mandarMsj(canal, mensaje) {
    this.client.publish(canal, mensaje);
  }
}

module.exports.ClienteMQTT = ClienteMQTT;
