const find = require('find');
const ncp = require('ncp').ncp;
const fs = require('fs');
const http = require('http');
const cors = require('cors');
const cp = require('cookie-parser');
const bp = require('body-parser');
const express = require('express');
const web = express();

let actPathDefault = "C:\\Program Files (x86)\\Advanced Combat Tracker"

web.use(bp.json());
web.use(bp.urlencoded({ extended: false }));
web.use(cp());
web.use(cors());  

web.get('/search', function(request, response) {
  let filesArr = {};

  find.file(/\.html$/, actPathDefault, function(files) {
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

web.get('/install', function(request, response) {
  const file = fs.createWriteStream("act.zip");
  const request = http.get("https://advancedcombattracker.com/includes/page-download.php?id=57", function(response) {
    response.pipe(file);
  });

  ncp(source, destination, function (err) {
    if (err) {
      let e = new Error('Not Found');
      e.status = 404;
      response.statusCode = 404;
      response.end();
    }
    console.log('done!');
  });
  
});

web.use(function(request, response, next) {
  let err = new Error('Not Found');
  err.status = 404;
});

web.set('port', 8080);

const server = http.createServer(web);

server.listen(8080);
