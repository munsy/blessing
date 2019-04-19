// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

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
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

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
var express = require('express');
var find = require('find');
var ncp = require('ncp').ncp;
var fs = require('fs');

var http = require('http');
var cors = require('cors');

var cp = require('cookie-parser');
var bp = require('body-parser');

var web = express();

web.use(bp.json());
web.use(bp.urlencoded({ extended: false }));
web.use(cp());
web.use(cors());
  
var actPathDefault = "C:\\Program Files (x86)\\Advanced Combat Tracker"

web.get('/search', function(request, response) {
  var filesArr = {};

  find.file(/\.html$/, actPathDefault, function(files) {
    filesArr = files;
    response.send(filesArr);
    return;
  })
  .error(function(err) {
    var e = new Error('Not Found');
    e.status = 404;
    response.statusCode = 404;
    response.end();
  });
});

web.get('/install', function(request, response) {
  const file = fs.createWriteStream("act.zip");
  const request = http.get("https://advancedcombattracker.com/includes/page-download.php?id=57", function(response) {
    response.pipe(file);
  });

  ncp(source, destination, function (err) {
    if (err) {
      var e = new Error('Not Found');
      e.status = 404;
      response.statusCode = 404;
      response.end();
    }
    console.log('done!');
  });
  
});

web.use(function(request, response, next) {
  var err = new Error('Not Found');
  err.status = 404;
});

web.set('port', 8080);

var server = http.createServer(web);

server.listen(8080);
