var crypto = require('crypto'),
    request = require('request'),
    moment = require('moment');

function AtmosRequest(conf, resource, method) {
  this._method = method,
  this._baseUrl = conf.url,
  this._secret = conf.secret;
  this._resource = resource,
  this._time = moment.utc().format('ddd, D MMM YYYY HH:mm:ss') + ' UTC',
  this._headers = {};

  this.setHeader('x-emc-date', this._time);
  this.setHeader('date', this._time);
  this.setHeader('accept', '*/*');
  this.setHeader('x-emc-uid', conf.uid);
  this.sign();
}

AtmosRequest.prototype.setHeader = function(key, value) {
  if (typeof this._headers['x-emc-signature'] !== 'undefined')
    throw new Error('AtmosRequest: All headers must be set before signing');

  this._headers[key] = value;
}

AtmosRequest.prototype.sign = function() {
  if (typeof this._headers['x-emc-uid'] === 'undefined')
    throw new Error('AtmosRequest: All headers must be set before signing');

  var key = new Buffer(this._secret, 'base64').toString('binary'),
      hash = crypto.createHmac('sha1', key);
      hash.update(this._method);
      hash.update("\n\n\n");
      hash.update(this._time);
      hash.update("\n");
      hash.update(this._resource.toLowerCase());
      hash.update("\n");
      hash.update("x-emc-date:" + this._headers['x-emc-date']);
      hash.update("\n");
      hash.update("x-emc-uid:" + this._headers['x-emc-uid']);

  this._headers['x-emc-signature'] = hash.digest('base64'); 
}

AtmosRequest.prototype.send = function(cb) {
  if (typeof this._headers['x-emc-signature'] === 'undefined')
    throw new Error('AtmosRequest: Requests must be signed prior to sending');

  request({
    url: this._baseUrl + this._resource,
    method: this._method,
    headers: this._headers
  }, cb)
}

module.exports = AtmosRequest;