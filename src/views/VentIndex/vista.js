document.addEventListener('DOMContentLoaded', function () {
    const { ipcRenderer } = require('electron');
    const btnCerrar = document.getElementById("btnCerrar");
    btnCerrar.onclick = function () {
        ipcRenderer.send('proyecto:cerrar');
    }
});