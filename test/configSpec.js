var expect = require('chai').expect,
    conf = require('./config.js');

describe('test/config.js', function() {

  it('should contain Atmos access details', function() {
    expect(conf.url).to.exist;
    expect(conf.uid).to.exist;
    expect(conf.secret).to.exist;
  });

  it('should contain your Atmos access details', function(){
    expect(conf.url).not.to.equal('Enter your EMC Atmos endpoint URL here');
    expect(conf.uid).not.to.equal('Enter your subtenent ID / UID here');
    expect(conf.secret).not.to.equal('Enter your base64 encoded secret here');
  });

});