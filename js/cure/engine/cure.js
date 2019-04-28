const paths = require('./paths');
const installer = require('./installer');
const err = require('./error');
const find = require('find');
const fs = require('fs');
const https = require('https');
const ncp = require('ncp').ncp;
const yauzl = require('yauzl');

class Cure {
  constructor() {
    this.Paths = new paths();
    this.Installer = new installer();
    this.Error = new err();
  }

  IsInstalled(path) {
    return fs.existsSync(path);
  }

  InstallAct() {
    if (!fs.existsSync(this.Paths.CureTemp)) {
      fs.mkdirSync(this.Paths.CureTemp);
    }

    const file = fs.createWriteStream(this.Paths.ActZip);
    const req = https.get(this.Paths.ActDownloadURL, function(resp) {
      resp.pipe(file);
    });

    if (!fs.existsSync(this.Paths.ActDefault)) {
      fs.mkdirSync(this.Paths.ActDefault);
    }

    var err = {};
    Unzip(this.Data, err, file);

    fs.readdir(this.Paths.CureTemp, function (err, files) {
      // FIX
      if (err) {
        let e = new Error('Not Found');
        e.status = 404;
        response.statusCode = 404;
        response.end();
      } 
      for(var i = 0; i < files.length; i++) {
        console.log(files[i]);
        console.log(this.Paths.CureTemp + "\\" + files[i]);
        
        if(files[i] === "act.zip") {
          continue;
        }
        ncp(this.Paths.CureTemp + "\\" + files[i], this.Paths.ActPath, function (err) {
          // FIX
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

  MkDirP(dir, cb) {
    if("." === dir) return cb();

    fs.stat(dir, function(err) {
      if (null == err) return cb();

      var parent = path.dirname(dir);
      
      MkDirP(parent, () => {
        process.stdout.write(dir.replace(/\/$/, "") + "/\n");
        fs.mkdir(dir, cb);
      });
    });
  }

  Unzip(zipfile) {
    function handleZipFile(Data, err, zipfile) {
      if (err) {
        this.Data.Install.Installing = false;
        this.Data.Install.Error = true;
        this.Data.Install.ErrData = err;
        return;
      }

      // track when we've closed all our file handles
      var handleCount = 0;

      function incrementHandleCount() {
        //this.Data.Install.Progress.TotalFiles++;
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
        this.Data.Install.Progress.CurrentFile = entry.fileName;
        if (/\/$/.test(entry.fileName)) {
          // directory file names end with '/'
          mkdirp(entry.fileName, function() {
            if (err){
              this.Data.Install.Installing = false;
              this.Data.Install.Error = true;
              this.Data.Install.ErrData = err;
              return;
            }
            zipfile.readEntry();
          });
        } else {
          // ensure parent directory exists
          mkdirp(path.dirname(entry.fileName), function() {
            zipfile.openReadStream(entry, function(err, readStream) {
              if (err) {
                this.Data.Install.Installing = false;
                this.Data.Install.Error = true;
                this.Data.Install.ErrData = err;
                return;
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
