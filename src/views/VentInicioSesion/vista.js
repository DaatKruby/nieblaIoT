document.addEventListener('DOMContentLoaded', function () {
    const { ipcRenderer } = require('electron');
    const form = document.querySelector('form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const nombreUsuario = document.querySelector('#username').value;
        const contrasena = document.querySelector('#password').value;

        const datosSesion = {
            nombreUsuario: nombreUsuario,
            contrasena: contrasena
        }

        ipcRenderer.send('sesion:checar', datosSesion);
    });

    ipcRenderer.on('sesion:respuesta', (e, respuesta) => {
        if (respuesta.aceptado !== true) {
            alert("No se ha podido iniciar sesion");
        }
    });

    ipcRenderer.on('sesion:sesionguardada', (e, respuesta) => {
        const nombreUsuario = document.querySelector('#username');
        const contrasena = document.querySelector('#password');
        nombreUsuario.value = respuesta.usuario;
        contrasena.value = respuesta.contrasena;
    });
});