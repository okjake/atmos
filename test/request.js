var expect = require('chai').expect,
    AtmosRequest = require('../lib/request.js');

/* Dummy configuration */
var conf = {
  url: "http://example.xom",
  uid: "E673KHJHujhSujeh/Du3jD",
  secret: "SDJSKHAi3e"
}

describe('AtmosRequest', function() {

  it('should require method, resource, and conf to be set on creation', function() {    
    expect(
      function() {
        new AtmosRequest()
      }).to.throw(Error);

    expect(
      function() {
        new AtmosRequest('method')
      }).to.throw(Error); 
    
    expect(
      function() {
        new AtmosRequest('method', 'resource')
      }).to.throw(Error);
  });

  it('should validate presence of configuration object keys', function() {
    
    expect(
      function() {
        new AtmosRequest('method', 'resource', { url: 'url' })
      }
    ).to.throw(Error);

    expect(
      function() {
        new AtmosRequest('method', 'resource', { secret: 'secret'})
      }
    ).to.throw(Error);

    expect(
      function() {
        new AtmosRequest('method', 'resource', { uid: 'uid'})
      }
    ).to.throw(Error);

    expect(
      function() {
        new AtmosRequest('method', 'resource', { url: 'url', uid: 'uid'} )
      }
    ).to.throw(Error);

    expect(
      function() {
        new AtmosRequest('method', 'resource', { uid: 'uid', secret: 'secret'})
      }
    ).to.throw(Error);

    expect(
      function() {
        new AtmosRequest('method', 'resource', { url: 'url', secret: 'secret'})
      }
    ).to.throw(Error);


    expect(
      function() {
        new AtmosRequest('method', 'resource', conf)
      }
    ).to.not.throw(Error);

  });


  describe('#sign()', function(){

    it('shouldn\'t be signed before relevant headers set', function() {

      var req = new AtmosRequest('method', 'resource', conf);
      expect(req.sign).to.throw(Error);

    });

  });
});