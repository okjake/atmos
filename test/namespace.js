var expect = require('chai').expect,
    Atmos = require('../index.js'),
    client = new Atmos({
      url: "http://example.com",
      uid: "DSAHDjkkushdjk73hjksd/DSAhjk",
      secret: "ASDiuhjD78sd9hks"
    });

describe('Atmos.namespace', function() {

  describe('#upload()', function() {
    it('should throw an error attempting to upload to the root directory', function(done) {
      
      expect(function() {
        client.namespace.put('', 'test/network/files/dummy.txt', function(err, response) {
          if (err) throw err;
        })
      }).to.throw(Error);

      expect(function() {
        client.namespace.put('/', 'test/network/files/dummy.txt', function(err, response) {
          if (err) throw err;
        })
      }).to.throw(Error);

      expect(function() {
        client.namespace.put(null, 'test/network/files/dummy.txt', function(err, response) {
          if (err) throw err;
        })
      }).to.throw(Error);

      done();
    });
  });

  describe('#uploadPath()', function() {
    it('should format remote paths correctly', function() {

      expect(
        client.namespace.uploadPath('node-atmos-test', 'test/network/files/dummy.txt')
      ).to.equal('node-atmos-test/dummy.txt');
      
      expect(
        client.namespace.uploadPath('node-atmos-test/sub-folder-1/', 'test/network/files/dummy.txt')
      ).to.equal('node-atmos-test/sub-folder-1/dummy.txt');
      
      expect(
        client.namespace.uploadPath('node-atmos-test/sub-folder-2', 'test/network/files/dummy.txt')
      ).to.equal('node-atmos-test/sub-folder-2/dummy.txt');

    });
  });

});