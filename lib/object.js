/* Object API actions */

module.exports.create = function ( filepath, cb ) {
  var data = fs.readFileSync(filepath),
      req = new AtmosRequest('POST', '/rest/objects', this._conf, data);

  req.send(function(err, response, file) {
    if (err) {
      cb(err);
      return;
    }

    cb();
  });
}

module.exports.read = function ( id, cb ) {
  var req = new AtmosRequest('GET', '/rest/objects/' + id, this._conf);
  
  req.send(function(err, response, body) {
    if (err) {
      cb(err);
      return;
    }

    if (status == 200) {  
      cb(null, body);
    } 
    else {
      var e = new Error('Could not read object');
      e.atmos_http_code = response.statusCode;
      cb(e);
    }
  }
}

module.exports.update = function ( id, cb ) {
  
}

module.exports.delete = function ( id, cb ) {
  
}