const {app, BrowserWindow, Menu, shell} = require('electron')

let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 470,
        height: 620,
        //autoHideMenuBar: true,
        //frame: false,
        icon: './app/assets/icon/pngtree-vector-bar-chart-icon-png-image_313722.ico',
        webPreferences:{
            preload:`${__dirname}/preload.js`
        }
    });
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    mainWindow.loadFile('app/calcular_media.html')
});

app.on("window-all-closed", () => {
    app.quit();
});

const janelasobre = ()=> {
    const sobre = new BrowserWindow({
        width: 300,
        height: 340,
        resizable: false,
        autoHideMenuBar: true,
        icon: './app/assets/icon/pngtree-vector-bar-chart-icon-png-image_313722.ico'
    });
    sobre.loadFile('app/sobre.html')
}


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
    {label: 'ajuda', 
        submenu: [
            {label: 'documentação', click: ()=> shell.openExternal('https://www.electronjs.org/docs/latest/api/shell')}, //chama um evento para abrir um link externo
            {type: 'separator'},
            {label: 'sobre', click: ()=> janelasobre()}
        ]      
    }
]