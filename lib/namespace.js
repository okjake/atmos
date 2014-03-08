/* Namespace API actions */

var AtmosRequest = require('./request.js'),
          xml2js = require('xml2js'),
              fs = require('fs'),
            path = require('path'),
       namespace = {};

/* 
 * Create a directory
 */
namespace.create = function ( dir, cb ) {
  if (dir.slice(-1) !== '/')
    dir += '/';

  var req = new AtmosRequest('POST', '/rest/namespace/' + dir, this._conf);
  req.send(function(err, response, body) {
    
    if (err) {
      cb(err);
      return;
    }
    
    if (response.statusCode != 201) {
      var e = new Error('Could not create directory');
      e.atmos_http_code = response.statusCode;
      cb(e);
    }

    cb();

  });
}

/*
 * Delete a directory
 */
namespace.delete = function ( dir, cb, recursive ) {

  if (dir.slice(-1) !== '/') 
    dir += '/';

  var req = new AtmosRequest('DELETE', '/rest/namespace/' + dir, this._conf);
  
  req.send(function(err, response, body) {
    
    if (err) cb(err);
    if (response.statusCode != 204) {
      var e = new Error('Could not delete directory');
      e.atmos_http_code = response.statusCode;
      cb(e);    
    }

    cb();
 
  });
}

/*
 * List directory contents
 */
namespace.read = function ( dir, cb ) {
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
        cb(null, objects);
      });
    } 
    else {
      var e = new Error('Could not read directory');
      e.atmos_http_code = response.statusCode;
      cb(e);
    }
  });
}

/*
 * Ping a file or directory to check existence
 */
namespace.exists = function ( remote, cb ) {
  
  var req = new AtmosRequest('HEAD', '/rest/namespace/' + remote, this._conf);
  req.send(function(err, response) {

    if (err) cb(err);

    if (response.statusCode == 200) {
      cb(null, true);
      return;
    }
    
    if (response.statusCode == 404) {
      cb(null, false);
      return;
    }

    var e = new Error('Could not check existence');
    e.atmos_http_code = response.statusCode;
    cb(e);

  });
}

/*
 * Upload a file to a directory
 */
namespace.upload = function ( remote, local, cb ) {
  
  if (remote == undefined || remote == "/" || remote == '')
    cb(new Error("Cannot put objects in the root directory"));

  var normalised = path.normalize(local),
      data = fs.readFileSync(normalised),
      remotepath = this.uploadPath(remote, local), 
      req = new AtmosRequest('POST', '/rest/namespace/' + remotepath, this._conf, data),
      file = data.toString('utf8');

  req.send(function(err, response, file) {
    
    if (err) cb(err);
    if (response.statusCode != 201) {
      var e = new Error('Could not upload file');
      e.atmos_http_code = response.statusCode;
      cb(e);
    }

    cb();
  });

}

/*
 * Create a public url, valid for the specified duration
 */
namespace.public = function ( remote, cb ) {

}

/*
 * Resolve filenames
 */
 namespace.uploadPath = function ( remote, local ) {
  if (remote.slice(-1) !== '/') 
    remote += '/';

  return remote + path.basename(local);
}

module.exports = namespace;