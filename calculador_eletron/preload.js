const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('api', {
    send: (channel,data) => {
        let canaisValidos = ['mostrar-resultado']
        if (canaisValidos.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    }
})