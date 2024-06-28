const {app, BrowserWindow, ipcMain, nativeTheme, Menu, shell} = require('electron')
//const {browserwindow} = require('electron')
//const {ipcMain} = require('electron')
//const {nativeTheme} = require('electron')
//const {Menu} = require('electron')
//const {shell} = require('electron')

let mainWindow = null;
app.on('ready', () =>{
    // console.log("teste")
    nativeTheme.themeSource = 'dark'
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        //autoHideMenuBar: true,
        resizable: false,
        icon: './app/assets/icon/1186343.png',
        webPreferences:{
            preload:`${__dirname}/preload.js`
        }
    });
    //adicionando o menu template ao app
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    //abrir tela maximizada
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
})

app.on("window-all-closed", () => {
    app.quit();
});

let sobrewindow = null;
ipcMain.on('abrir-janela-sobre', () => {
    if (sobrewindow == null) {
        sobrewindow = new BrowserWindow({
        width: 500,
        height: 400,
        frame: false,
        webPreferences:{
            preload:`${__dirname}/preload.js`
        }
        })
        // evita que a váriavel seja destruída
        sobrewindow.on('closed', () => {
            sobrewindow = null
        })
    }
    //sobrewindow.loadURL(`file://${__dirname}/app/sobre.html`);
    sobrewindow.loadFile('app/sobre.html');
})

ipcMain.on('fechar-janela-sobre', () => {
       // Fecha a janela
        sobrewindow.close();
});

const janelasobre = ()=> {
    const sobre = new BrowserWindow({
        width: 500,
        height: 400,
        resizable: false
    });
    sobre.loadFile('app/sobre.html')
}

//criando template menu
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