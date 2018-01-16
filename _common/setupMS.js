'use strict';
var self = setupMS;
module.exports = self;

global.util = require('util');
global._ = require('underscore');
global.async = require('async');

function setupMS(params) {
  global.msName = params.msName;
  process.title = params.msName;
  global.config = {};

  if (_.has(params, 'inputQueue'))
    global.config.inputQueue = params.inputQueue;

  //global.config.runMode = process.env.RUN_MODE;
  global.config.runMode='dev';

  global.config.logLevel = 'info';
  if (config.runMode === 'dev')
    global.config.logLevel = 'debug';
  else if (config.runMode === 'beta')
    global.config.logLevel = 'verbose';
  else if (config.runMode === 'production')
    global.config.logLevel = 'warn';

  require('./logging/logger.js');
  require('./handleErrors/ActErr.js');

  /* Env Set */
//  global.config.apiUrl = process.env.SHIPPABLE_API_URL;
//  global.config.apiToken = process.env.SHIPPABLE_API_TOKEN;

  global.config.apiUrl = 'https://alphaapi.shippable.com';
  global.config.apiToken = 'b799011c-f9ed-4a4a-9231-041132d45d5e';
}
