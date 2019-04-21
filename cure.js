const find = require('find');
const ncp = require('ncp').ncp;
const fs = require('fs');
const http = require('http');
const cors = require('cors');
const cp = require('cookie-parser');
const bp = require('body-parser');
const express = require('express');
const web = express();

class Cure {
  constructor(httpPort) {
    this.Engine = {};
    this.Engine.Http = {};
    this.Engine.Http.server = {};
    this.Engine.Http.port = 0;
    this.Engine.Http.port = httpPort;

    this.Data = {};
    this.Data.curePathDefault = "C:\\Program Files (x86)\\Cure";
    this.Data.cureTemp = this.Data.curePathDefault + "\\.temp";
    this.Data.actPathDefault = "C:\\Program Files (x86)\\Advanced Combat Tracker";
    this.Data.actDownloadURL = "https://advancedcombattracker.com/includes/page-download.php?id=57"

    web.use(bp.json());
    web.use(bp.urlencoded({ extended: false }));
    web.use(cp());
    web.use(cors());
    
    web.get('/search', function(request, response) {
      let filesArr = {};
      find.file(/\.html$/, this.Data.actPathDefault, function(files) {
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
    
    web.get('/install/act', function(request, response) {
      if (!fs.existsSync(this.Data.cureTemp)) {
        fs.mkdirSync(this.Data.cureTemp);
      }
  
      if (!fs.existsSync(this.Data.actPathDefault)) {
        fs.mkdirSync(this.Data.actPathDefault);
      }
  
      const file = fs.createWriteStream(this.Data.cureTemp + "\\act.zip");
      const request = http.get(this.Data.actDownloadURL, function(response) {
        response.pipe(file);
      });
      ncp(source, destination, function (err) {
        if (err) {
          let e = new Error('Not Found');
          e.status = 404;
          response.statusCode = 404;
          response.end();
        }
      });
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
