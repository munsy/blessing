const find = require('find');
const ncp = require('ncp').ncp;
const fs = require('fs');
const https = require('https');
const yauzl = require("yauzl");

class CureData {
  constructor() {
    this.Path = {};
    this.Path.CureDefault = process.env.APPDATA + "\\cure";
    this.Path.CureTemp = "";
    this.Path.CureTemp = this.Path.CureDefault + "\\.temp";
    this.Path.ActDefault = "C:\\Advanced Combat Tracker";
    this.Path.Act = "";
    this.Path.Act = this.Path.ActDefault;
    this.Path.ActZip = this.Path.CureTemp + "\\act.zip"
    this.Path.ActDownloadURL = "https://advancedcombattracker.com/includes/page-download.php?id=57"

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
  constructor() {
    this.Data = new CureData();
  }

  InstallAct() {
    this.Data.Install.Installing = true;
    response.send(this.Data.Install);

    if (!fs.existsSync(this.Data.Path.CureTemp)) {
      fs.mkdirSync(this.Data.Path.CureTemp);
    }

    const file = fs.createWriteStream(this.Data.Path.ActZip);
    const req = https.get(this.Data.Path.ActDownloadURL, function(resp) {
      resp.pipe(file);
    });

    if (!fs.existsSync(this.Data.Path.ActDefault)) {
      fs.mkdirSync(this.Data.Path.ActDefault);
    }

    var err = {};
    handleZipFile(this.Data, err, file);

    fs.readdir(this.Data.Path.CureTemp, function (err, files) {
        if (err) {
          let e = new Error('Not Found');
          e.status = 404;
          response.statusCode = 404;
          response.end();
        } 
        for(var i = 0; i < files.length; i++) {
          console.log(files[i]);
          console.log(this.Data.Path.CureTemp + "\\" + files[i]);
          // Do whatever you want to do with the file
          if(files[i] === "act.zip") {
            continue;
          }
          ncp(this.Data.Path.CureTemp + "\\" + files[i], this.Data.Path.ActPath, function (err) {
            if (err) {
              let e = new Error('Not Found');
              e.status = 404;
              response.statusCode = 404;
              response.end();
            }
          }); 
        }
      });

      this.Data.Install.Installing = false;
    }

  Unzip() {
    function mkdirp(dir, cb) {
      if (dir === ".") { 
        return cb(); 
      }

      fs.stat(dir, function(err) {
        if (err == null) {
          return cb();
        }

        var parent = path.dirname(dir);
        mkdirp(parent, function() {
          process.stdout.write(dir.replace(/\/$/, "") + "/\n");
          fs.mkdir(dir, cb);
        });
      });
    }

    function handleZipFile(Data, err, zipfile) {
      if (err) {
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
  }
}

module.exports = Cure;
