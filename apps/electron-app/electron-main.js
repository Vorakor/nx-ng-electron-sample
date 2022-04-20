const { app, BrowserWindow } = require('electron');

let mainWindow;

export const createWindow = () => {
  setTimeout(() => {
    mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    mainWindow.loadURL('http://localhost:4200');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }, 10000);
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
