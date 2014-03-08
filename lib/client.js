var namespace = require('./namespace.js'),
    //object = require('./object.js'),
    service = require('./service.js');

var AtmosClient = function( conf ) {
  this.namespace._conf = conf;
  //this.object._conf = conf;
  this.service._conf = conf;
}

AtmosClient.prototype.namespace = namespace;
//AtmosClient.prototype.object = object;
AtmosClient.prototype.service = service;

module.exports = AtmosClient;