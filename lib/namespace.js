var AtmosRequest = require('./atmosrequest.js'),
    xml2js = require('xml2js'),
    fs = require('fs');

module.exports.create = function ( ns, cb ) {

  if (ns.slice(-1) !== '/')
    ns += '/';

  var req = new AtmosRequest('POST', '/rest/namespace/' + ns, this._conf);
  req.send(function(err, response, body) {
    if (err) cb(err);
    cb(null, response.statusCode);
  });
}

module.exports.delete = function ( ns, cb ) {
  var req = new AtmosRequest('DELETE', '/rest/namespace/' + ns, this._conf);
  req.send(function(err, response, body) {
    if (err) cb(err);
    cb(null, response.statusCode);
  });
}

module.exports.read = function ( ns, cb ) {
  if (ns === undefined)
    ns = ""
  else if (ns.slice(-1) !== '/') 
    ns += '/';

  var req = new AtmosRequest('GET', '/rest/namespace/' + ns, this._conf);
  req.send(function(err, response, body) {
    if (err) cb(err);

    var status = response.statusCode;
    if (status == 200) {
      var parser = new xml2js.Parser();
      parser.parseString(body, function(err, result){
        if (err) throw err;
        var objects = [];
        for (var dir in result.ListDirectoryResponse.DirectoryList[0].DirectoryEntry) {
          objects.push(result.ListDirectoryResponse.DirectoryList[0].DirectoryEntry[dir].Filename[0]);
        }
        cb(null, 200, objects);
      });
    } 
    else {
      cb(null, status)
    }
  });
}

module.exports.put = function ( ns, fp, cb ) {
  /* Not yet implemented
  if (ns === undefined || ns === "/")
    cb("Cannot put objects in the root namespace");
    console.log(ns);
    console.log(fp);
  fs.readFile(fp, function(err, data){
    if (err) cb(err); 

    var req = new AtmosRequest('POST', '/rest/namespace/' + ns, this._conf, data);
    req.send(function(err, response, data) {
      if (err) cb(err);
      cb(null, response.statusCode);
    });

  });*/
}