var AtmosRequest = require('./atmosRequest.js'),
    xml2js = require('xml2js');


module.exports.create = function(dir, conf) {
  
  name = name.trim();
  if (name.slice(-1) !== '/')
    name += '/';

  var req = new AtmosRequest(conf, '/rest/namespace/' + dir, 'POST');
  req.send(function(error, response, body) {
    if (error) throw error;
    console.log('ok');
  });
}

module.exports.remove = function(dir, conf) {
  var req = new AtmosRequest(conf, '/rest/namespace/' + dir, 'DELETE');
  req.send(function(error, response, body) {
    if (error) throw error;
    console.log('ok');
  });
}

module.exports.put = function(dir, file) {
  console.log('directory put called')
}

module.exports.list = function(dir, conf, cb) {
  var req = new AtmosRequest(conf, '/rest/namespace/' + dir, 'GET');
  req.send(function(error, response, body) {
    if (error) throw error;
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