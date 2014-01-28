var AtmosRequest = require('./request.js'),
    xml2js = require('xml2js');

module.exports.version = function ( cb ) {
  var req = new AtmosRequest('GET', '/rest/service', this._conf);
  req.send(function(err, response, body) {
    if (err) cb(err);
    var status = response.statusCode;
    if (status == 200) {
      var parser = new xml2js.Parser();

      parser.parseString(body, function(err, result){
        if (err) throw err;
        cb(null, 200, result.Service.Version[0].Atmos[0]);
      });
    } 
    else {
      cb(null, status)
    }
  });
}