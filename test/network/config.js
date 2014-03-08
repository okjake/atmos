var expect = require('chai').expect,
      path = require('path'),
        fs = require('fs'),
  filepath = path.resolve(__dirname, './atmos.json'),
      conf = {};
      
/*
 * Check that atmos.json exists
 * These tests can't be run without connecting to a real server
 */
if (fs.existsSync(filepath, 'utf8')) {
  var file = fs.readFileSync(filepath, 'utf8');
  conf = JSON.parse(file);
  module.exports = conf;
}
else 
  throw new Error('No atmos.json file found'); 

/*
 * Tests for the atmos.json file itself
 */
describe('test/network/atmos.json', function() {

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