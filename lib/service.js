var AtmosRequest = require('./request.js'),
    xml2js = require('xml2js');

/* 
 * Retrieve Atmos version
 */
module.exports.version = function ( cb ) {
  
  var req = new AtmosRequest('GET', '/rest/service', this._conf);
  
  req.send(function(err, response, body) {
    if (err) {
      cb(err);
      return;
    }

    var status = response.statusCode;
    if (status == 200) {
      var parser = new xml2js.Parser();

      parser.parseString(body, function(err, result){
        if (err) {
          cb(err);
          return;
        }

        cb(null, result.Service.Version[0].Atmos[0]);
      });
    } 
    else {
      var e = new Error('Version request failed');
      e.atmos_http_code = response.statusCode;
      cb(e);
    }

  });

}