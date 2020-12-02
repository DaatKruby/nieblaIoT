document.addEventListener('DOMContentLoaded', function () {
    const { ipcRenderer } = require('electron');
    const btnEnviar = document.getElementById("btnEnviar");
<<<<<<< HEAD
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
        var idSensor = parseInt(txtIdSensor.value);
        var movSensor = Math.floor(Math.random() * (100 - 0 + 1) ) + 0;
        var sndSensor = Math.floor(Math.random() * (100 - 0 + 1) ) + 0;
        var bateriaSensor = 100;

        mandarInfoPorMQTT(idSensor, movSensor, sndSensor, bateriaSensor);
    }

    function mandarInfoPorMQTT(id, dtsMov, dtsSnd, lvBateria) {
        ipcRenderer.send('proyecto:envioMQTT', {
            id, dtsMov, dtsSnd, lvBateria
        });
=======
    btnEnviar.onclick = function () {
        var idSensor = document.getElementById("idSensor").value;
        idSensor = parseInt(idSensor, 10);
        ipcRenderer.send('proyecto:envioMQTT', { id: idSensor });
>>>>>>> 8e7a4016ff329ebae1ca90c068498c17c8535073
    }
});