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
