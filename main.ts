import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

var fs = require('fs');

let win, overlay, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

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

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    if(overlay !== null) {
      overlay.close();
    }
  });
}

function createOverlay() {
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
      },
  });

  if (serve) {
      overlay.loadURL(url.format({
          pathname: path.join(__dirname, 'src/overlay.html'),
          protocol: 'file:',
          slashes: true
      }));
  } else {
      overlay.loadURL(url.format({
          pathname: path.join(__dirname, 'src/overlay.html'),
          protocol: 'file:',
          slashes: true
      }));
  }

  overlay.setIgnoreMouseEvents(true);

  overlay.on('closed', function () {
      overlay = null;
  });
}

function overlayStartup() {
  createOverlay();
  overlay.close();
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);
  app.on('ready', overlayStartup);
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

  ipcMain.on('getFiles', (event, arg) => {
    const files = fs.readdirSync(__dirname);
    win.webContents.send('getFilesResponse', files);
  });

  ipcMain.on('overlayOn', (event, arg) => {
    if(overlay === null) {
        createOverlay();
        win.webContents.send('overlayOnResponse', true);          
    } else {
        win.webContents.send('overlayOnResponse', false);
    }
  });

  ipcMain.on('overlayOff', (event, arg) => {
    if(overlay !== null) {
        overlay.close();
        win.webContents.send('overlayOffResponse', true);          
    } else {
        win.webContents.send('overlayOffResponse', false);
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
