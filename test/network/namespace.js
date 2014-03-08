var expect = require('chai').expect,
    should = require('chai').should(),
    conf = require('./config.js'),
    Atmos = require('../../index.js'),
    client = new Atmos(conf);


describe('Atmos.namespace', function() {
  this.timeout(10000);
  
  describe('#create()', function() {

    it('should connect and create a directory in the root folder', function(done){
      client.namespace.create( 'node-atmos-test', function(err, response) {
        expect(err).to.be.a('null');
        response.should.equal(201);
        done();
      });
    });
    
    it('should connect and create a directory with a trailing slash', function(done){
      client.namespace.create( 'node-atmos-test/sub-directory-1/', function(err, response) {
        expect(err).to.be.a('null');
        response.should.equal(201);
        done();
      });
    });

    it('should connect and create a directory with a preceding slash', function(done){
      client.namespace.create( '/node-atmos-test/sub-directory-2', function(err, response) {
        expect(err).to.be.a('null');
        response.should.equal(201);
        done();
      });
    });

    it('should connect and create a directory with both preceding and trailing slashes', function(done){
      client.namespace.create( '/node-atmos-test/sub-directory-3/', function(err, response) {
        expect(err).to.be.a('null');
        response.should.equal(201);
        done();
      });
    });

    it('should refuse to create an existing directory', function(done){
      client.namespace.create( 'node-atmos-test/sub-directory-3/', function(err, response) {
        expect(err).to.be.a('null');
        response.should.equal(400);
        done();
      });
    });

  });

  describe('#exists()', function() {

    it('should be true if a directory exists', function(done) {
      client.namespace.exists( 'node-atmos-test/sub-directory-3/', function(err, exists) {
        expect(err).to.be.a('null');
        exists.should.equal(true);
        done();
      });
    });

    it('should be false if a directory does not exist', function(done) {
      client.namespace.exists( 'node-atmos-test/faffle/', function(err, exists) {
        expect(err).to.be.a('null');
        exists.should.equal(false);
        done();
      });
    });

  });

  describe('#read()', function() {
    it('should list directory contents', function(done) {
      client.namespace.read( 'node-atmos-test', function(err, list) {
        expect(list[0]).to.equal('sub-directory-1');
        expect(list[1]).to.equal('sub-directory-2');
        expect(list[2]).to.equal('sub-directory-3');
        done();
      });
    });
  });

  describe('#upload()', function() {

    it('should upload to an existing directory', function(done) {
      client.namespace.upload('node-atmos-test/sub-directory-1', 'test/network/files/dummy.txt', function(err, status) {
        expect(err).to.be.a('null');
        expect(status).to.equal(201);
        done();
      })
    });

    it('should upload to a non-existent directory', function(done) {
      client.namespace.upload('node-atmos-test/sub-directory-4', 'test/network/files/dummy.txt', function(err, status) {
        expect(err).to.be.a('null');
        expect(status).to.equal(201);
        done();
      })
    });

    it('should normalise local paths correctly', function(done) {
      client.namespace.upload('node-atmos-test/sub-directory-2', 'test/network/../network/files/.///dummy.txt', function(err, status) {
        expect(err).to.be.a('null');
        expect(status).to.equal(201);
        done();
      })
    });    

    // it should accept an open file as argument

  });

  describe('#delete()', function() {
    it('should delete an empty directory', function(done) {
      client.namespace.delete('node-atmos-test/sub-directory-3', function(err, status){
        expect(err).to.be.a('null');
        expect(status).to.equal(204);
        done();
      });
    });
  });

});