import { app, BrowserWindow, Menu, Tray, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

var fs = require('fs');

let isQuitting = false;
let devModeEnabled = false;
let overlayHidden = true;

const cureAppName = 'Cure';
const cureWebsite = 'https://github.com/nomaddevs/cure'

const log = require('electron-log');

let win, tray, overlay, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function maximize() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  win.width = size.width;
  win.height = size.height;
}

function defaultScreenSize() {
  win.setSize(850, 450);
}

function createWindow() {
  log.info('Creating the main window');
  let cureAppIcon = devModeEnabled ? url.format({
      pathname: path.join(__dirname, 'src/assets/images/cure-mini.png'),
      protocol: 'file:',
      slashes: true
    }) : url.format({
      pathname: path.join(__dirname, 'dist/assets/images/cure-mini.png'),
      protocol: 'file:',
      slashes: true
    });
  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 850,
    height: 450,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setMenu(null);
  
  defaultScreenSize();

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', (event) => {
    if(!isQuitting) {
      event.preventDefault();
      win.hide();
    } else {
      win = null;
      if(overlay !== null) {
        overlay.close();
      }
    }
  });

  // Intercepts the window close event before it 
  // executes and minimizes the program instead.
  win.on('close', function (event) {
    if(!isQuitting){
        event.preventDefault();
        win.hide();
    }
    return false;
  });
}

function createOverlay() {
  log.info('Creating the overlay');
  var electronScreen = screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;

  overlay = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    overlay.loadURL('http://localhost:4200/#/overlay');
  } else {
    overlay.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: '/overlay'
    }));
  }

  overlay.setSkipTaskbar(true);
  overlay.setIgnoreMouseEvents(true);
  
  overlay.on('hide', function() {
    if(!overlayHidden) {
      overlayHidden = true;
      overlay.hide();
    }
  });

  overlay.on('show', function() {
    if(overlayHidden) {
      overlayHidden = false;
      overlay.show();
    }
  });

  overlay.on('closed', function () {
    overlay = null;
  });
}

function overlayStartup() {
  if(overlay == null || overlay === null) {
    createOverlay();
    overlay.hide();
  }
}

function buildTray() {
  const nativeImage = require('electron').nativeImage;
  let cureAppIcon = serve ? url.format({
    pathname: path.join(__dirname, 'src/assets/images/cure-mini.png'),
    protocol: 'file:',
    slashes: true
  }) : url.format({
    pathname: path.join(__dirname, 'dist/assets/images/cure-mini.png'),
    protocol: 'file:',
    slashes: true
  });

  let trayIcon = nativeImage.createFromPath(cureAppIcon);
  trayIcon = trayIcon.resize({ width: 16, height: 16 });

  tray = new Tray(trayIcon);

  const enableOverlayContextMenu = Menu.buildFromTemplate([
    { label: 'Launch website', click: async () => {
          const { shell } = require('electron');
          await shell.openExternal(cureWebsite);
        }
    },
    { label: 'Open Cure', click: function() {
        win.show();
    } },
    { label: 'Enable Overlay', click: function(){
        overlay.show();
        tray.setContextMenu(disableOverlayContextMenu);
        overlayHidden = false;
    } },
    { label: 'Quit', click:  function() {
        isQuitting = true;
        app.quit();
    } }
  ]);

  const disableOverlayContextMenu = Menu.buildFromTemplate([
    { label: 'Launch website', click: async () => {
          const { shell } = require('electron');
          await shell.openExternal(cureWebsite);
        }
    },
    { label: 'Open Cure', click: function() {
        win.show();
    } },
    { label: 'Disable Overlay', click: function() {
        overlay.hide();
        tray.setContextMenu(enableOverlayContextMenu);
        overlayHidden = true;
    } },
    { label: 'Quit', click:  function() {
        isQuitting = true;
        app.quit();
    } }
  ]);

  tray.setToolTip(cureAppName);
  if(overlayHidden) {
    tray.setContextMenu(enableOverlayContextMenu);
  } else {
    tray.setContextMenu(disableOverlayContextMenu);
  }
}

try {
  app.on('ready', createWindow);
  app.on('ready', overlayStartup);
  app.on('ready', buildTray);
  //app.on('ready', createOverlay);
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

  ipcMain.on('launchBrowser', async () => {
    const { shell } = require('electron')
    await shell.openExternal(cureWebsite)
  });

  ipcMain.on('minimizeMain', () => {
    win.hide();
  });

  ipcMain.on('quitProgram', () => {
    win.hide();
  });

  ipcMain.on('devMode', () => {
    if(!devModeEnabled) {
      win.webContents.openDevTools();
      if(overlay === null) {
        if(devModeEnabled) {
          console.log('null overlay');
        }
        return;
      }
      overlay.webContents.openDevTools();
      overlay.setIgnoreMouseEvents(false);
    } else {
      win.webContents.closeDevTools();
      if(overlay === null) {
        if(devModeEnabled) {
          console.log('null overlay');
        }
        return;
      }
      overlay.webContents.closeDevTools();
      overlay.setIgnoreMouseEvents(true);
    }
    devModeEnabled = !devModeEnabled;
  });

  ipcMain.on("overlay", (event, arg) => {
    switch(arg.case) {
      case "on":
        if(overlay === null) { createOverlay(); }
        overlay.show();
        break;
      case "off":
        if(overlay !== null) { overlay.hide(); }
        break;
      case "lock":
        overlay.webContents.send("overlay", {"case": "lock", "arg": ""});
        break;
      case "unlock":
        overlay.webContents.send("overlay", {"case": "unlock", "arg": ""});
        break;
      case "test":
        overlay.webContents.send("overlay", {"case": "update", "arg": arg.arg});
        break;
      case "development":
        overlay.webContents.send("overlay", {"case": "development", "arg": arg.arg});
        break;
      default:
        overlay.webContents.send("overlay", "default");
        return;
    }
  });

  ipcMain.on('get-ffxiv-dir', (event, arg) => {
    const files = fs.readdirSync(__dirname);
    const electron = require('electron');
    const dialog = electron.dialog;

    const dir = dialog.showOpenDialog(win, {
      defaultPath: arg,
      properties: ['openDirectory']
    });
    win.webContents.send('get-ffxiv-dir-response', dir);
  });
} catch (e) {
  console.log(e);
  log.error(e);
}
