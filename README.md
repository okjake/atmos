atmos
=====

Node client for EMC Atmos cloud storage platform

### Usage


### Running the tests
To be comprehensive, the tests will connect to your server, upload some files, and clean up afterwards, not just test local code.

Because of this they'll also be dependent on your network connectivity and Atmos server status ([Error: ETIMEDOUT]) errors are a sign that issues are arising here.

Everything is conducted under the 'node-atmos-test' directory, so make sure this doesn't exist before you run them. 

The first step to run the tests is to make a configuration file containing your Atmos access details.

__Copy test/config.js.dist to test/config.js and fill out your url, uid, and secret.__

If anything goes wrong you can just remove this directory manually. Tests won't affect anything outside of this directory.

The tests are written with [Mocha](http://visionmedia.github.io/mocha) and [Chai](http://chaijs.com/). To run them cd to node-modules/atmos and run:

    mocha

Some of the non-default reporters are also useful because the tests can take some time over the network:

    mocha -R spec