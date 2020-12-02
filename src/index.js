const { app, BrowserWindow, Menu, ipcMain, session } = require('electron');
const url = require("url");
const path = require("path");
const enlace = require("./EnlaceNube");
const guardado = require("./DatosLocales");
const { ClienteMQTT } = require("./ClienteMQTT");

let pantallaPrincipal;
let pantallaSinm;
let mqtt=null;
<<<<<<< HEAD
let sys_prendido=true;
app.on("ready", () => {
    pantallaPrincipal = new BrowserWindow({
        show: false,
        resizable: false,
=======
app.on("ready", () => {
    pantallaPrincipal = new BrowserWindow({
        show: false,
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
        title: "Sistema de Seguridad",
        webPreferences: {
            nodeIntegration: true
        }
    });
<<<<<<< HEAD
    pantallaPrincipal.loadURL(url.format({
        pathname: path.join(__dirname, "views/VentInicioSesion/InicioSesion.html"),
=======

    pantallaPrincipal.loadURL(url.format({
        pathname: path.join(__dirname, "views/InicioSesion.html"),
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
        protocol: "file",
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    pantallaPrincipal.setMenu(mainMenu);
<<<<<<< HEAD
=======

>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
    pantallaPrincipal.center();
    pantallaPrincipal.on('closed', () => {
        app.quit();
    });
    pantallaPrincipal.once('ready-to-show', () => {
        var datosSesion = guardado.leerSesion();
        if (datosSesion.existente === true) {
            //Si ya inicio sesion con anterioridad que se ponga el usuario y contra
            pantallaPrincipal.webContents.send("sesion:sesionguardada", {
                usuario: datosSesion.usuario,
                contrasena: datosSesion.contrasena
            });
        }
        pantallaPrincipal.show()
    })
});

//IPC Eventos que llegan desde ventanas
ipcMain.on('sesion:checar', (e, datosSesion) => {
    const usuario = datosSesion.nombreUsuario;
    const contrasena = datosSesion.contrasena;

    enlace.iniciarSesion(usuario, contrasena, (error, res) => {
<<<<<<< HEAD
        console.log(res);
        res = JSON.parse(res);
        
=======
        res = JSON.parse(res);

>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
        if (error) {
            pantallaPrincipal.webContents.send("sesion:respuesta", { aceptado: false });
        } else {
            if (res.aceptado === true) {
                guardado.guardarSesion(usuario, contrasena);
<<<<<<< HEAD
                pantallaPrincipal.loadURL(path.join(__dirname, "views/VentIndex/index.html"));
=======
                pantallaPrincipal.loadURL(path.join(__dirname, "views/index.html"));
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
                const indexMenu = Menu.buildFromTemplate(templateIndexMenu);
                pantallaPrincipal.setMenu(indexMenu);
                comenzarLecturaSensores(usuario, contrasena);
            } else {
                pantallaPrincipal.webContents.send("sesion:respuesta", { aceptado: false });
            }
        }
    });
});

ipcMain.on('proyecto:cerrar', () => {
    app.quit();
});

ipcMain.on('proyecto:envioMQTT', (e, datos) => {
<<<<<<< HEAD
    if (sys_prendido){
        mqtt.mandarMsjSinmSensor(datos.id);
    }
});

ipcMain.on('proyecto:interruptor', (e, datos) => {
    sys_prendido=datos.valor;
=======
    mqtt.mandarMsjSinmSensor(datos.id);
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
});

function comenzarLecturaSensores(usuario, contrasena) {
    mqtt = new ClienteMQTT(usuario, contrasena);
    mqtt.start();
}

function crearPantallaSinmSensor() {
    pantallaSinm = new BrowserWindow({
        show: true,
<<<<<<< HEAD
        resizable: false,
        title: "Sinmulacion Sensor",
        width: 350,
=======
        title: "Sinmulacion Sensor",
        width: 400,
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
        height: 370,
        webPreferences: {
            nodeIntegration: true
        }
    });

    pantallaSinm.loadURL(url.format({
<<<<<<< HEAD
        pathname: path.join(__dirname, "views/VentSensor/sinmuSensor.html"),
=======
        pathname: path.join(__dirname, "views/sinmuSensor.html"),
>>>>>>> 2bd64f4ae4ceeebbed0f6fe5d9c5d3c6a18607d4
        protocol: "file",
        slashes: true
    }));

    pantallaSinm.setMenu(null);
    pantallaSinm.center();
}

//BARRA DE MENU
const templateMenu = [{
    label: 'DevTools',
    submenu: [{
        label: 'Show/Hide Dev Tools',
        accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
        click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
        },
    },
    {
        role: 'reload'
    }]
}];

const templateIndexMenu = [
    {
        label: 'DevTools',
        submenu: [{
            label: 'Show/Hide Dev Tools',
            accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            },
        },
        {
            role: 'reload'
        }]
    },
    {
        label: 'Sinmulacion Sensor',
        accelerator: process.platform == 'darwin' ? 'Comand+S' : 'Ctrl+S',
        click() {
            crearPantallaSinmSensor();
        }
    }];