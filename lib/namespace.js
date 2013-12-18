var AtmosRequest = require('./atmosrequest.js'),
    xml2js = require('xml2js');

module.exports.create = function ( dir, cb ) {
  name = name.trim();

  if (name.slice(-1) !== '/')
    name += '/';

  var req = new AtmosRequest('POST', '/rest/namespace/' + dir, this._conf);
  req.send(function(error, response, body) {
    if (error) throw error;
    console.log('ok');
  });
}

module.exports.delete = function ( dir, cb ) {
  var req = new AtmosRequest('DELETE', '/rest/namespace/' + dir, this._conf);
  req.send(function(error, response, body) {
    if (error) throw error;
    console.log('ok');
  });
}

module.exports.read = function ( dir, cb ) {
  var req = new AtmosRequest('GET', '/rest/namespace/' + dir, this._conf);
  req.send(function(err, response, body) {
    if (err) throw err;
    var parser = new xml2js.Parser();
    parser.parseString(body, function(err, result){
      if (err) throw err;
      var objects = [];
      for (var dir in result.ListDirectoryResponse.DirectoryList[0].DirectoryEntry) {
        objects.push(result.ListDirectoryResponse.DirectoryList[0].DirectoryEntry[dir].Filename[0]);
      }
      cb(objects);
    });
  });
}