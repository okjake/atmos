var namespace = require('./namespace.js'),
    object = require('./object.js');

var AtmosClient = function( conf ) {
  this.namespace._conf = conf;
  this.object._conf = conf;
}

AtmosClient.prototype.namespace = namespace;
AtmosClient.prototype.object = object;

module.exports = AtmosClient;