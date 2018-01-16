'use strict';

var start = require('../../test.js');
var mocha = require('mocha');
var nconf = require('nconf');
var chai = require('chai');
var testSuiteNum = '0.';
var testSuiteDesc = 'Setup empty testAccounts objects';

describe(util.format('%s1 - %s', testSuiteNum, testSuiteDesc),
  function () {
    var assert = chai.assert;
    start = new start();

    nconf.argv().env().file({
        file: '../config.json', format: nconf.formats.json
      }
    );
    nconf.load();

    it('Should create an empty testAccounts object',
      function (done) {
        logger.info('Creating an empty testAccounts object');
        nconf.set('testAccounts', {});
        assert.notProperty(nconf.get('testAccounts'), 'shipayeone');
        return done();
      }
    );
  }
);
