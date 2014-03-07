/* Object API actions */

module.exports.create = function ( filepath, cb ) {
  var data = fs.readFileSync(filepath),
      req = new AtmosRequest('POST', '/rest/objects', this._conf, data);

  req.send(function(err, response, file) {
    if (err) cb(err);
    cb(null, response.statusCode);
  });
}

module.exports.read = function ( id, cb ) {
  var req = new AtmosRequest('GET', '/rest/objects/' + id, this._conf);
  req.send(function(err, response, body) {
    if (status == 200) {  
      cb(null, 200, body);
    } 
    else {
      cb(null, status)
    }
  }
}

module.exports.update = function ( id, cb ) {
  var req = new AtmosRequest('PUT', '/rest/objects/' + id, this._conf);
  req.send(function(err, response, body) {
    if (status == 200) {  
      cb(null, 200, body);
    } 
    else {
      cb(null, status)
    }
  }
}

module.exports.delete = function ( id, cb ) {
  var req = new AtmosRequest('DELETE', '/rest/objects/' + id, this._conf);
  req.send(function(err, response, body) {
    if (err) cb(err);
    cb(null, response.statusCode);
  });
}