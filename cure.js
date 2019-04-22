const find = require('find');
const ncp = require('ncp').ncp;
const fs = require('fs');
const http = require('http');
const cors = require('cors');
const cp = require('cookie-parser');
const bp = require('body-parser');
const express = require('express');
const web = express();
const yauzl = require("yauzl");

class CureData {
  constructor() {
    this.Path = {};
    this.Path.CureDefault = "";
    this.Path.CureDefault = "C:\\Program Files (x86)\\Cure";
    this.Path.CureTemp = "";
    this.Path.ActDefault = ""
    this.Path.ActDefault = "C:\\Program Files (x86)\\Advanced Combat Tracker";
    this.Path.Act = "";
    this.Path.ActDownloadURL = "https://advancedcombattracker.com/includes/page-download.php?id=57"
    
    this.Path.CureTemp = this.Path.CureDefault + "\\.temp";
    this.Path.Act = this.Path.ActDefault;

    this.Install = {};
    this.Install.ErrData = {}
    this.Install.Error = false;
    this.Install.Act = false;
    this.Install.Addon = false;
    this.Install.Installing = false;
  
    this.Install.Progress = {};
    this.Install.Progress.CurrentFile = "";
    this.Install.Progress.TotalFiles = 0;
    this.Install.Progress.Current = 0;
    this.Install.Progress.Total = 0;
  }
}

class Cure {
  constructor(httpPort) {
    this.Engine = {};

    this.Engine.Http = {};
    this.Engine.Http.server = {};
    this.Engine.Http.port = 0;
    this.Engine.Http.port = httpPort;

    var Data = new CureData();

    function mkdirp(dir, cb) {
      if (dir === ".") return cb();
      fs.stat(dir, function(err) {
        if (err == null) return cb(); // already exists

        var parent = path.dirname(dir);
        mkdirp(parent, function() {
          process.stdout.write(dir.replace(/\/$/, "") + "/\n");
          fs.mkdir(dir, cb);
        });
      });
    }

    function handleZipFile(Data, err, zipfile) {
      if (err){
        Data.Install.Installing = false;
        Data.Install.Error = true;
        Data.Install.ErrData = err;
        return
      }

      // track when we've closed all our file handles
      var handleCount = 0;

      function incrementHandleCount() {
        Data.Install.Progress.TotalFiles++;
        handleCount++;
      }
      
      function decrementHandleCount() {
        handleCount--;
        if (handleCount === 0) {
          return;
        }
      }

      incrementHandleCount();
      
      zipfile.on("close", function() {
        decrementHandleCount();
      });

      zipfile.readEntry();
      
      zipfile.on("entry", function(entry) {
        Data.Install.Progress.CurrentFile = entry.fileName;
        if (/\/$/.test(entry.fileName)) {
          // directory file names end with '/'
          mkdirp(entry.fileName, function() {
            if (err){
              Data.Install.Installing = false;
              Data.Install.Error = true;
              Data.Install.ErrData = err;
              return
            }
            zipfile.readEntry();
          });
        } else {
          // ensure parent directory exists
          mkdirp(path.dirname(entry.fileName), function() {
            zipfile.openReadStream(entry, function(err, readStream) {
              if (err){
                Data.Install.Installing = false;
                Data.Install.Error = true;
                Data.Install.ErrData = err;
                return
              }
              // report progress through large files
              var byteCount = 0;
              var totalBytes = entry.uncompressedSize;
              var lastReportedString = byteCount + "/" + totalBytes + "  0%";

              process.stdout.write(entry.fileName + "..." + lastReportedString);

              function reportString(msg) {
                var clearString = "";

                for (var i = 0; i < lastReportedString.length; i++) {
                  clearString += "\b";
                  if (i >= msg.length) {
                    clearString += " \b";
                  }
                }

                process.stdout.write(clearString + msg);

                lastReportedString = msg;
              }

              // report progress at 60Hz
              var progressInterval = setInterval(function() {
                reportString(byteCount + "/" + totalBytes + "  " + ((byteCount / totalBytes * 100) | 0) + "%");
              }, 1000 / 60);

              var filter = new Transform();

              filter._transform = function(chunk, encoding, cb) {
                byteCount += chunk.length;
                cb(null, chunk);
              };

              filter._flush = function(cb) {
                clearInterval(progressInterval);
                reportString("");
                // delete the "..."
                process.stdout.write("\b \b\b \b\b \b\n");
                cb();
                zipfile.readEntry();
              };

              // pump file contents
              var writeStream = fs.createWriteStream(entry.fileName);

              incrementHandleCount();

              writeStream.on("close", decrementHandleCount);

              readStream.pipe(filter).pipe(writeStream);
            });
          });
        }
      });
    }

    web.use(bp.json());
    web.use(bp.urlencoded({ extended: false }));
    web.use(cp());
    web.use(cors());
    
    web.get('/search', function(request, response) {
      let filesArr = {};
      find.file(/\.html$/, Data.Path.Act, function(files) {
        filesArr = files;
        response.send(filesArr);
        return;
      })
      .error(function(err) {
        let e = new Error('Not Found');
        e.status = 404;
        response.statusCode = 404;
        response.end();
      });
    });
    
    web.get('/install/act/start', function(request, response) {
      Data.Install.Installing = true;
      
      if (!fs.existsSync(Data.Path.CureTemp)) {
        fs.mkdirSync(Data.Path.CureTemp);
      }
  
      if (!fs.existsSync(Data.Path.ActDefault)) {
        fs.mkdirSync(Data.Path.ActDefault);
      }
  
      const file = fs.createWriteStream(Data.Path.CureTemp + "\\act.zip");
      const request = http.get(Data.Path.ActDownloadURL, function(response) {
        response.pipe(file);
      });

      var err = {};

      handleZipFile(err, file);

      var f = "";
      // ncp(source, destination, function(err) {});
      ncp(Data.Path.CureTemp + f, Data.Path.ActPath, function (err) {
        if (err) {
          let e = new Error('Not Found');
          e.status = 404;
          response.statusCode = 404;
          response.end();
        }
      });

      Data.Install.Installing = false;

      response.send(Data.Install);
    });

    web.get('/install/act/progress', function(request, response) {
      response.send(Data.Install);
    });
    
    web.use(function(request, response, next) {
      let err = new Error('Not Found');
      err.status = 404;
    });
    
    web.set('port', this.Engine.Http.port);
    
    this.Engine.Http.server = http.createServer(web);
  }

  Listen() {
    this.Engine.Http.server.listen(this.Engine.Http.port);
  }
}

module.exports = Cure;
