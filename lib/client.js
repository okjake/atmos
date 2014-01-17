var namespace = require('./namespace.js'),
    object = require('./object.js');

// Pass the config through to be stored independently
// in the object and namespace, er, namespaces
var AtmosClient = function( conf ) {
  this.namespace._conf = conf;
  this.object._conf = conf;
}

AtmosClient.prototype.namespace = namespace;
AtmosClient.prototype.object = object;

module.exports = AtmosClient;