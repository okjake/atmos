var expect = require('chai').expect,
      conf = require('./config.js'),
     Atmos = require('../../index.js'),
    client = new Atmos(conf);

describe('Atmos.service', function(){

    describe('#version()', function() {

      it('should provide the EMC Atmos version', function(done) {
        client.service.version(function(err, version){
          expect(version.length).to.equal(5);
          done(err);
        });
      });
      
    });

});
