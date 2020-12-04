document.addEventListener('DOMContentLoaded', function () {
    //GENERACION DATOS ALEATORIOS
    const deteccionMov = 50;
    const diffEntreSensores = 50;
    const variacion = 3;
    const posibilidadPositivo = 5;

    function generarDatoAleatorio() {
        var resp = null;
        var posibilidad = null;
        posibilidad = (numeroRandom(0, 100) <= posibilidadPositivo);
        resp = (posibilidad) ? getDatoPositivo() : getDatoNegativo();
        return resp;
    }

    function getDatoPositivo() {
        var mov = numeroRandom(deteccionMov, 100);
        var snd = mov + diffEntreSensores;

        snd += numeroRandom(-variacion, variacion);

        return {mov,snd};
    }

    function getDatoNegativo() {
        var mov = numeroRandom(0, deteccionMov - 1);
        var snd = mov + diffEntreSensores;

        snd += numeroRandom(-variacion, variacion);

        return {mov,snd};
    }

    function numeroRandom (min, max){
        return Math.floor(Math.random()*(max-min)+min);
    }

    //FUNCIONALIDAD
    const { ipcRenderer } = require('electron');
    const btnEnviar = document.getElementById("btnEnviar");
    const btnEnviarRnd = document.getElementById("btnEnviarRnd");

    const txtMovSensor = document.getElementById("movSensor");
    const txtIdSensor = document.getElementById("idSensor");
    const txtSndSensor = document.getElementById("sndSensor");
    const txtBateriaSensor = document.getElementById("bateriaSensor");

    btnEnviar.onclick = function () {

        var idSensor = parseInt(txtIdSensor.value);
        var movSensor = parseInt(txtMovSensor.value);
        var sndSensor = parseInt(txtSndSensor.value);
        var bateriaSensor = parseInt(txtBateriaSensor.value);

        mandarInfoPorMQTT(idSensor, movSensor, sndSensor, bateriaSensor);
    }

    btnEnviarRnd.onclick = function () {
        const datoAleatorio=generarDatoAleatorio();
        var idSensor = parseInt(txtIdSensor.value);
        var movSensor = datoAleatorio.mov;
        var sndSensor = datoAleatorio.snd;
        var bateriaSensor = 100;

        mandarInfoPorMQTT(idSensor, movSensor, sndSensor, bateriaSensor);
    }

    function mandarInfoPorMQTT(id, dataMov, dataSound, lvlBattery) {
        ipcRenderer.send('proyecto:envioMQTT', {
            id, dataMov, dataSound, lvlBattery
        });
    }
});