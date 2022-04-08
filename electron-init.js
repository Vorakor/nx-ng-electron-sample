const { app, BrowserWindow } = require('electron');
// const path = require('path');
const url = require('url');

let mainWindow;

const createWindow = () => {
  setTimeout(() => {
    mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    mainWindow.loadURL(
      url.format({
        // One approach is to point electron at index.html (prod builds)
        // For this approach it is better to have the electron initialization file in the root of the repo.
        // pathname: path.join(__dirname, '/dist/apps/ele-sample/index.html'),
        // protocol: 'file:',
        // Another approach is to point electron at localhost:4200 (dev builds)
        pathname: 'localhost:4200',
        protocol: 'http:',
        slashes: true,
      })
    );
    // Another option for loading the web-based app in the background
    // mainWindow.loadFile(
    //   path.join(__dirname, '/dist/apps/ele-sample/index.html')
    // );
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }, 10000);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });
