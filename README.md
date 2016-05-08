# atmos

NOTE: INCOMPLETE & UNMAINTAINED  

Node client for EMC Atmos cloud storage platform  

## Usage

Coming soon

---

## Tests

Tests are written with [Mocha](http://visionmedia.github.io/mocha) and [Chai](http://chaijs.com/).

### Local

To run the local tests cd to node-modules/atmos and run:

    mocha

### Network

There is a more comprehensive test suite included that will check operation of the Atmos client against your server.

The tests will connect to your server, upload some files, and clean up afterwards. They don't run by default.

Everything is conducted under the 'node-atmos-test' directory, so make sure this doesn't exist before you run them. 

If anything goes wrong you can just remove this directory manually. Tests won't affect anything outside of this directory.

The first step to run the tests is to make a configuration file containing your Atmos access details.

__Copy test/network/atmos.json.dist to test/network/atmos.json and fill out your url, uid, and secret.__

Then you can run:

    mocha --bail test/network

Some of the non-default reporters are very useful because the tests can take some time over the network:

    mocha -R spec --bail test/network

#### [Error: ETIMEDOUT]

Network tests are dependent on your network connectivity and Atmos server status ([Error: ETIMEDOUT]) errors are a sign that issues are arising here.

Check that any load balancers in your configuration aren't causing these timeouts - you can try resolving an IP for an Atmos server and running them directly against that (change the atmos.json URL)

---

## License

MIT
