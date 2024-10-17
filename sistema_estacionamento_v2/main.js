const {app, BrowserWindow, Menu, shell} = require('electron')

let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 900,
        icon: 'app/assets/css/icone.ico'
        /*autoHideMenuBar: true,
        frame: false,
        webPreferences:{
            preload:`${__dirname}/preload.js`
        }*/
    });
    mainWindow.maximize();
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    mainWindow.loadFile('app/login.html')
});

app.on("window-all-closed", () => {
    app.quit();
});

const template = [
    {label:'arquivo',
        submenu:[
            {label: 'sair', click: ()=> app.quit(), accelerator: 'Alt+f4'}, //definindo um evento click para fechar o app, definindo alt+f4 como atalho
            {label: 'documentação', click: ()=> shell.openExternal('https://github.com/wdhenmyz/uc-7/blob/main/sistema_estacionamento/app/Documenta%C3%A7%C3%A3o%20do%20C%C3%B3digo.pdf')},
            {label: 'planilha', click: ()=> shell.openExternal('https://docs.google.com/spreadsheets/d/1j4Lyas6Wj7msertPz0UpUE__BeMcsX_IDrMytMHemyU/edit?pli=1&gid=0#gid=0')}
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