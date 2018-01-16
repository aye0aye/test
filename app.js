'use strict';
var checkHealth = require('./checkHealth.js');
var setupMS = require('./_common/setupMS.js');
//var shippableAdapter = require('./_common/shippable/Adapter.js');
var microWorker = require('./microWorker.js');
var ms = require('./_common/micro/MicroService.js');


var msParams = {
  checkHealth: checkHealth,
  microWorker: microWorker
};

var params = {
  msName: 'bat'
};

var who = util.format('msName:%s', params.msName);

var consoleErrors = [];
setupMS(params);

logger.info(util.format('Starting %s', who));

if (!config.apiUrl)
  consoleErrors.push(util.format('%s is missing env var: API_URL', who));

if (!config.apiToken)
  consoleErrors.push(util.format('%s is missing env var: API_TOKEN', who));

if (consoleErrors.length > 0) {
  _.each(consoleErrors,
    function (err) {
      logger.error(who, err);
    }
  );
  return process.exit(1);
}

logger.info(util.format('system config checks for %s succeeded', who));

ms = new ms(msParams);
