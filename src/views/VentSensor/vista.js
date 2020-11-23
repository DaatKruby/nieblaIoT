document.addEventListener('DOMContentLoaded', function () {
    const { ipcRenderer } = require('electron');
    const btnEnviar = document.getElementById("btnEnviar");
    btnEnviar.onclick = function () {
        var idSensor = document.getElementById("idSensor").value;
        idSensor = parseInt(idSensor, 10);
        ipcRenderer.send('proyecto:envioMQTT', { id: idSensor });
    }
});