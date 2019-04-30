// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./dist/cure/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Turn off the menu.
  mainWindow.setMenu(null)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
<<<<<<< HEAD
const Cure = require('./js/cure/engine/cure');
const cure = new Cure();

ipcMain.on('find-act', (event, data) => {
  event.sender.send('find-act-reply', cure.IsInstalled(cure.Paths.Act()));
});

ipcMain.on('find-fxiv-parsing-plugin', (event, data) => {
  event.sender.send('find-act-reply', cure.IsInstalled(cure.Paths.Act()));
});

ipcMain.on('install-act', (event, data) => {
  if(data === 'start') {
    cure.Installer.Installing = true;

    cure.Installer.CurrentMessage = "Downloading ACT";
    event.sender.send('install-start-reply', cure.Installer);
    cure.DownloadAct(event);

    cure.Installer.CurrentMessage = "Installing ACT";
    event.sender.send('install-status-reply', cure.Installer);
    cure.InstallAct(event);

    cure.Installer.CurrentMessage = "Install Complete";
    cure.Installer.Installing = false;
    event.sender.send('install-status-reply', cure.Installer);
  } else if(data === 'cancel') {
    cure.Installer.Installing = false;
    event.sender.send('install-cancel-reply', cure.Installer);
  } else if(data === 'status') {
    event.sender.send('install-status-reply', cure.Installer);
  } else {
    event.sender.send('install-error-reply', cure.Error);
  }
});
=======
//
// const Cure = require('./js/cure/engine/cure');
// const cure = new Cure();
// 
// ipcMain.on('find-act', (event, data) => {
//   event.sender.send('find-act-reply', cure.IsInstalled(cure.Paths.Act()));
// });
// 
// ipcMain.on('find-fxiv-parsing-plugin', (event, data) => {
//   event.sender.send('find-act-reply', cure.IsInstalled(cure.Paths.Act()));
// });
// 
// ipcMain.on('install-act', (event, data) => {
//   if(data === 'start') {
//     cure.Installer.Installing = true;
// 
//     cure.Installer.CurrentMessage = "Downloading ACT";
//     event.sender.send('install-start-reply', cure.Installer);
//     cure.DownloadAct(event);
// 
//     cure.Installer.CurrentMessage = "Installing ACT";
//     event.sender.send('install-status-reply', cure.Installer);
//     cure.InstallAct(event);
// 
//     cure.Installer.CurrentMessage = "Install Complete";
//     cure.Installer.Installing = false;
//     event.sender.send('install-status-reply', cure.Installer);
//   } else if(data === 'cancel') {
//     cure.Installer.Installing = false;
//     event.sender.send('install-cancel-reply', cure.Installer);
//   } else if(data === 'status') {
//     event.sender.send('install-status-reply', cure.Installer);
//   } else {
//     event.sender.send('install-error-reply', cure.Error);
//   }
// });
>>>>>>> master
