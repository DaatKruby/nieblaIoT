const { app, BrowserWindow, Menu, ipcMain, session } = require('electron');
const url = require("url");
const path = require("path");
const enlace = require("./EnlaceNube");
const guardado = require("./DatosLocales");
const { ClienteMQTT } = require("./ClienteMQTT");

let pantallaPrincipal;
let pantallaSinm;
let mqtt=null;
app.on("ready", () => {
    pantallaPrincipal = new BrowserWindow({
        show: false,
        title: "Sistema de Seguridad",
        webPreferences: {
            nodeIntegration: true
        }
    });

    pantallaPrincipal.loadURL(url.format({
        pathname: path.join(__dirname, "views/InicioSesion.html"),
        protocol: "file",
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    pantallaPrincipal.setMenu(mainMenu);

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
        res = JSON.parse(res);

        if (error) {
            pantallaPrincipal.webContents.send("sesion:respuesta", { aceptado: false });
        } else {
            if (res.aceptado === true) {
                guardado.guardarSesion(usuario, contrasena);
                pantallaPrincipal.loadURL(path.join(__dirname, "views/index.html"));
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
    mqtt.mandarMsjSinmSensor(datos.id);
});

function comenzarLecturaSensores(usuario, contrasena) {
    mqtt = new ClienteMQTT(usuario, contrasena);
    mqtt.start();
}

function crearPantallaSinmSensor() {
    pantallaSinm = new BrowserWindow({
        show: true,
        title: "Sinmulacion Sensor",
        width: 400,
        height: 370,
        webPreferences: {
            nodeIntegration: true
        }
    });

    pantallaSinm.loadURL(url.format({
        pathname: path.join(__dirname, "views/sinmuSensor.html"),
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