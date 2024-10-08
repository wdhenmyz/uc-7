const {app, BrowserWindow, Menu} = require('electron')

let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 520,
        height: 620,
        icon: './app/variedade.ico'
        /*autoHideMenuBar: true,
        frame: false,
        webPreferences:{
            preload:`${__dirname}/preload.js`
        }*/
    });
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    mainWindow.loadFile('app/variedades.html')
});

app.on("window-all-closed", () => {
    app.quit();
});

const template = [
    {label:'arquivo',
        submenu:[
            {label: 'sair', click: ()=> app.quit(), accelerator: 'Alt+f4'} //definindo um evento click para fechar o app, definindo alt+f4 como atalho
        ]
    },
    {label:'exibir',
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