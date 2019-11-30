import { app, BrowserWindow, Menu, Tray, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

var fs = require('fs');

let isQuitting = false;
let devModeEnabled = false;

const cureAppName = 'Cure';
const cureWebsite = 'https://github.com/nomaddevs/cure'

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
    //icon: cureAppIcon,
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
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
      win = null;
      if(overlay !== null) {
        overlay.close();
      }
    }
  });

  win.on('close', function (event) {
    if(!isQuitting){
        event.preventDefault();
        win.hide();
    }
    return false;
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
      webSecurity: false
    },
  });

  if (serve) {
    //overlay.loadURL(url.format({
    //  pathname: path.join(__dirname, 'src/index.html'),
    //  protocol: 'file:',
    //  slashes: true,
    //  hash: '/overlay'
    //}));
    //overlay.loadURL('http://localhost:4200/#/overlay')
    //overlay.loadURL(ovUrl);
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

  //overlay.webContents.send('load-overlay');
  
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
  alert('building tray');
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

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:  function(){
        win.show();
    } },
    { label: 'Launch website', click: async () => {
          const { shell } = require('electron');
          await shell.openExternal(cureWebsite);
        }
    },
    { label: 'Quit', click:  function(){
        isQuitting = true;
        app.quit();
    } }
  ]);

  tray.setToolTip(cureAppName);
  tray.setContextMenu(contextMenu);
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);
  app.on('ready', overlayStartup);
  //app.on('ready', buildTray);
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

  ipcMain.on('lock-overlay', (event, arg) => {
    console.log('lock-overlay called');
    if(overlay === null) {
      if(devModeEnabled) {
        console.log('null overlay');
      }
      return;
    }
    console.log('sending lock-overlay response back...');
    overlay.webContents.send('lock-overlay');
  });

  ipcMain.on('unlock-overlay', (event, arg) => {
    console.log('unlock-overlay called');
    if(overlay === null) {
      if(devModeEnabled) {
        console.log('null overlay');
      }
      return;
    }
    console.log('sending unlock-overlay response back...');
    overlay.webContents.send('unlock-overlay');
    //overlay.webContents.on('did-finish-load', () => {
    //})
  });

  ipcMain.on('overlayOn', (event, arg) => {
    if(overlay === null) {
      createOverlay();
      overlay.show();
      //win.webContents.send('overlayOnResponse', true);          
    } else {
      overlay.show();
      //win.webContents.send('overlayOnResponse', false);
    }
  });

  ipcMain.on('overlayOff', (event, arg) => {
    if(overlay !== null) {
      overlay.hide();
    } else {
      //win.webContents.send('overlayOffResponse', false);
    }
  });

  ipcMain.on("overlay-test", (event, arg) => {
    console.log('got ' + arg + ' from dashboard. sending to overlay...');
    overlay.webContents.send("overlay-test", arg);
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
  alert(e);
  // Catch Error
  // throw e;
}
//
//
//var Cap = require('cap').Cap;
//var c = new Cap();
//
//var decoders = require('cap').decoders;
//var PROTOCOL = decoders.PROTOCOL;
//
//var device = Cap.findDevice();
//
//console.dir(Cap.deviceList());
//console.dir(device);
//
//var filter = 'tcp and dst port 80';
//var bufSize = 10 * 1024 * 1024;
//var buffer = Buffer.alloc(65535);
//
//var linkType = c.open(device, filter, bufSize, buffer);
//
//c.setMinBytes && c.setMinBytes(0);
//
//c.on('packet', function(nbytes, trunc) {
//  if(devModeEnabled) {
//    console.log('packet: length ' + nbytes + ' bytes, truncated? '
//              + (trunc ? 'yes' : 'no'));
//  }
//
//  // raw packet data === buffer.slice(0, nbytes)
//
//  if (linkType === 'ETHERNET') {
//    if(devModeEnabled) {
//      console.log(buffer.toString('binary'));
//    }
//    var ret = decoders.Ethernet(buffer);
//    if(devModeEnabled) {
//      console.log(ret);
//    }
//    if (ret.info.type === PROTOCOL.ETHERNET.IPV4) {
//      if(devModeEnabled) {
//        console.log('DECODING IPV4 ...');
//      }
//      ret = decoders.IPV4(buffer, ret.offset);
//      if(devModeEnabled) {
//        console.log(ret);
//      }
//      if (ret.info.protocol === PROTOCOL.IP.TCP) {
//        var datalen = ret.info.totallen - ret.hdrlen;
//        if(devModeEnabled) {
//          console.log('DECODING TCP ...');
//        }
//        ret = decoders.TCP(buffer, ret.offset);
//        if(devModeEnabled) {
//          console.log(ret);
//        }
//        datalen -= ret.hdrlen;
//        if(devModeEnabled) {
//          console.log(buffer.toString('binary', ret.offset, ret.offset + datalen));
//        }
//      } else if (ret.info.protocol === PROTOCOL.IP.UDP) {
//        if(devModeEnabled) {
//          console.log('DECODING UDP ...');
//        }
//        ret = decoders.UDP(buffer, ret.offset);
//        if(devModeEnabled) {
//          console.log(ret);
//        }
//        if(devModeEnabled) {
//          console.log(buffer.toString('binary', ret.offset, ret.offset + ret.info.length));
//        }
//      } else {
//        if(devModeEnabled) {
//          console.log('Unsupported IPv4 protocol: ' + PROTOCOL.IP[ret.info.protocol]);
//        }
//      }
//    } else {
//      if(devModeEnabled) {
//        console.log('Unsupported Ethertype: ' + PROTOCOL.ETHERNET[ret.info.type]);
//      }
//    }
//  }
//});
