var directory = require('./lib/directory.js');

function AtmosClient(conf) {
  this._conf = conf;
}

AtmosClient.prototype.directory = directory;

/* TEMP: Demo usage only */
var c = new AtmosClient({
    url: 'endpoint url here',
    uid: 'uid here',
    secret: 'secret here'
  }
);

//c.directory.create('newtest', c._conf);
//c.directory.remove('newtest', c._conf);
c.directory.list('', c._conf, function(contents) {
  for(var object in contents) {
    console.log(contents[object]);
  }
});