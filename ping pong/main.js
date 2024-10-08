const {app, BrowserWindow, Menu, shell} = require('electron')

let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1110,
        height: 600,
        icon: 'app/ping_pong.ico'
        /*autoHideMenuBar: true,
        frame: false,
        webPreferences:{
            preload:`${__dirname}/preload.js`
        }*/
    });
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    mainWindow.loadFile('app/index.html')
});

app.on("window-all-closed", () => {
    app.quit();
});

const template = [
    {label:'arquivo',
        submenu:[
            {label: 'sair', click: ()=> app.quit(), accelerator: 'Alt+f4'}, //definindo um evento click para fechar o app, definindo alt+f4 como atalho
            {label: 'documentação', click: ()=> shell.openExternal('https://github.com/wdhenmyz/uc-7/blob/main/ping%20pong/Documenta%C3%A7%C3%A3o%20do%20ping%20pong.pdf')}
        ]
    },
    {label:'opções',
        submenu: [
            {label: 'recarregar', role: 'reload'}, //função para recarregar a página
            {label: 'ferramentas do desenvolvedor', role: 'toggleDevTools'}, //abre ferramentas avançadas
            {type: 'separator'}, //separa linhas
            {label: '+', role: 'zoomin'}, //aplicar zoom
            {label: '-', role: 'zoomout'}, //reduzir zoom
            {label: 'zoom padrão', role: 'resetZoom'} //restaurar zoom ao inicial
        ]
    },
]