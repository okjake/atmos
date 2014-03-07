var expect = require('chai').expect,
    should = require('chai').should(),
    conf = require('./config.js'),
    Atmos = require('../index.js'),
    client = new Atmos(conf);


describe('Atmos.namespace', function() {
  this.timeout(1000000);

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


});
