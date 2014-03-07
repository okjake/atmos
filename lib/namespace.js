/* Namespace API actions */

var AtmosRequest = require('./request.js'),
    xml2js = require('xml2js'),
    fs = require('fs');

/* 
 * Create a directory
 */
module.exports.create = function ( dir, cb ) {
  if (dir.slice(-1) !== '/')
    dir += '/';

  var req = new AtmosRequest('POST', '/rest/namespace/' + dir, this._conf);
  req.send(function(err, response, body) {
    if (err) cb(err);
    cb(null, response.statusCode);
  });
}

/*
 * Delete a directory
 */
module.exports.delete = function ( dir, cb ) {
  var req = new AtmosRequest('DELETE', '/rest/namespace/' + dir, this._conf);
  req.send(function(err, response, body) {
    if (err) cb(err);
    cb(null, response.statusCode);
  });
}

/*
 * List directory contents
 */
module.exports.read = function ( dir, cb ) {
  if (dir === undefined)
    dir = ""
  else if (dir.slice(-1) !== '/') 
    dir += '/';

  var req = new AtmosRequest('GET', '/rest/namespace/' + dir, this._conf);
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

/*
 * Ping a file or directory to check existence
 */
module.exports.exists = function ( remote, cb ) {
  
  var req = new AtmosRequest('HEAD', '/rest/namespace/' + remote, this._conf);
  req.send(function(err, response, body) {
    if (err) cb(err);

    var success = response.statusCode == 200 ? true : false;
    cb(null, success);

  });
}

/*
 * Upload a file to a directory
 */
module.exports.put = function ( dir, filepath, cb ) {
  if (dir === undefined || dir === "/")
    cb("cannot put objects in the root directory");

  var data = fs.readFileSync(filepath),
      req = new AtmosRequest('POST', '/rest/namespace/' + dir, this._conf, data),
      file = data.toString('utf8');

  req.send(function(err, response, file) {
    if (err) cb(err);
    cb(null, response.statusCode);
  });

}

/*
 * Create a public url, valid for the specified duration
 */
module.exports.public = function ( remote, cb ) {

}
