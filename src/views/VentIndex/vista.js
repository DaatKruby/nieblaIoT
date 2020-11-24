document.addEventListener('DOMContentLoaded', function () {
    const { ipcRenderer } = require('electron');
    const btnCerrar = document.getElementById("btnCerrar");
    const btnPrender = document.getElementById("btnPrender");
    const imgIcon = document.getElementById("imgIcon");

    var sys_prendido=true;

    btnCerrar.onclick = function () {
        ipcRenderer.send('proyecto:cerrar');
    }

    btnPrender.onclick=function(){
        interruptorSistema(!sys_prendido);
    }

    function interruptorSistema (prendido){
        if (prendido){
            imgIcon.src='../../img/img-btn-on.svg';
            ipcRenderer.send('proyecto:interruptor', { valor : true });
            btnPrender.innerHTML = 'APAGAR';
            sys_prendido=true;
        } else {
            imgIcon.src='../../img/img-btn-off.svg';
            ipcRenderer.send('proyecto:interruptor', { valor: false });
            btnPrender.innerHTML = 'PRENDER';
            sys_prendido=false;
        }
    }

    interruptorSistema(true);
});