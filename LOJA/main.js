const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const url = require('url');
const { spawn } = require('child_process');

// Função para iniciar o servidor Node.js
function startServer() {
    const serverProcess = spawn('node', ['index.js']);

    serverProcess.stdout.on('data', (data) => {
        console.log(`Servidor Node.js: ${data}`);
    });

    serverProcess.stderr.on('data', (data) => {
        console.error(`Erro no servidor Node.js: ${data}`);
    });

    serverProcess.on('close', (code) => {
        console.log(`Servidor Node.js encerrado com código ${code}`);
    });

    return serverProcess;
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.maximize()
  win.loadURL('http://localhost:3000') //link do servidor do node
}

app.whenReady().then(() => {
    //inicializando o servidor node
    const serverProcess = startServer();
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  // Encerra o servidor Node.js quando o Electron for fechado
  app.on('before-quit', () => {
    serverProcess.kill();
});
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})