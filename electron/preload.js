const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('api',{
    send: (channel, data) => {
        let canaisValidos = ['abrir-janela-sobre','fechar-janela-sobre']
        if (canaisValidos.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    }
})

// contextBridge.exposeInMainWorld('npi',{
//     send: (channel, data) => {
//         let canaisValidos = []
//         if (canaisValidos.includes(channel)) {
//             ipcRenderer.send(channel, data)
//         }
//     }
// })