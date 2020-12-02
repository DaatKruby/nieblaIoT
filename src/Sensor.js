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
            if (sensor.alertaMandada) {
                return null;
            } else {
                sensor.deshabilitarAlerta();
                return sensor;
            }
        }
    }

    isExisteIdEnArray(id) {
        for (var i = 0; i < this.sensores.length; i++) {
            if (this.sensores[i].id === id) {
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
        this.alertaMandada = false;
    }

    deshabilitarAlerta() {
        this.alertaMandada = true;
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

function isDeteccionDeActividad(dtsMov, dtsSnd) {
    return (dtsMov > 50 && dtsSnd > 50);
}

module.exports.AseguramientoCalidad = AseguramientoCalidad;
module.exports.ObjSensor = ObjSensor;
module.exports.isDeteccionDeActividad = isDeteccionDeActividad;