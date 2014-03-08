var expect = require('chai').expect,
    conf = require('./config.js'),
    Atmos = require('../../index.js'),
    client = new Atmos(conf);

describe('Atmos.namespace', function() {
  
  this.timeout(10000);
  
  describe('#create()', function() {

    it('should connect and create a directory in the root folder', function(done){
      client.namespace.create('node-atmos-test', function(err) {
        done(err);
      });
    });
    
    it('should connect and create a subdirectory with a trailing slash', function(done){
      client.namespace.create('node-atmos-test/sub-directory-1/', function(err) {
        done(err);
      });
    });

    it('should connect and create a subdirectory with a preceding slash', function(done){
      client.namespace.create('/node-atmos-test/sub-directory-2', function(err) {
        done(err);
      });
    });

    it('should connect and create a subdirectory with both preceding and trailing slashes', function(done){
      client.namespace.create('/node-atmos-test/sub-directory-3/', function(err) {
        done(err);
      });
    });

  });

  describe('#exists()', function() {

    it('should be true if a directory exists', function(done) {
      client.namespace.exists('node-atmos-test/sub-directory-1/', function(err, exists) {
        expect(exists).to.be.true;
        done(err);
      });
    });

    it('should be false if a directory does not exist', function(done) {
      client.namespace.exists('node-atmos-test/faffle/', function(err, exists) {
        expect(exists).to.be.false;
        done(err);
      });
    });

  });

  describe('#read()', function() {
  
    it('should list directory contents', function(done) {
      client.namespace.read('node-atmos-test', function(err, list) {
        expect(list[0]).to.equal('sub-directory-1');
        expect(list[1]).to.equal('sub-directory-2');
        expect(list[2]).to.equal('sub-directory-3');
        done(err);
      });
  
    });
  });

  describe('#upload()', function() {

    it('should upload to an existing directory', function(done) {
      client.namespace.upload('node-atmos-test/sub-directory-1', 'test/network/files/dummy.txt', function(err) {
        done(err);
      })
    });

    it('should upload to a non-existent directory', function(done) {
      client.namespace.upload('node-atmos-test/sub-directory-4', 'test/network/files/dummy.txt', function(err) {
        done(err);
      })
    });

    it('should normalise local paths correctly', function(done) {
      client.namespace.upload('node-atmos-test/sub-directory-2', 'test/network/../network/files/.///dummy.txt', function(err) {
        done(err);
      })
    });    

  });

  describe('#delete()', function() {
    
    it('should delete an empty directory without trailing slash', function(done) {
      client.namespace.delete('node-atmos-test/sub-directory-3', function(err) {
        done(err);
      });
    });

    it('should delete a file', function(done) {
      client.namespace.delete('node-atmos-test/sub-directory-4/dummy.txt', function(err) {
        done(err);
      });
    });

    it('should delete an empty directory with trailing slash', function(done) {
      client.namespace.delete('node-atmos-test/sub-directory-4/', function(err) {
        done(err);
      });
    });

    it('should not delete a non-empty directory if the recursive flag is not set', function(done) {
      client.namespace.delete('node-atmos-test/sub-directory-1', function(err){
        // Note: reversed, we expect an error
        if (err) done();
        else done(err);
      });
    });

    /*it('should delete recursively if the flag is set', function(done) {
      client.namespace.delete('node-atmos-test', function(err) {
        done(err);
      }, true);
    });*/

  });

});