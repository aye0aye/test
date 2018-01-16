'use strict';
var self = microWorker;
module.exports = self;

var request = require('request');
var adapter = require('./_common/shippable/Adapter.js');

function microWorker() {
  var bag = {
    shippableAdapter: new adapter(config.apiToken),
    who: util.format('bat|%s ', self.name)
  };
  logger.info(bag.who, 'Inside');

  async.series([
      _getAccounts.bind(null, bag)
    ],
    function (err) {
      if (err) {
        logger.warn(bag.who, 'Failed');
      }
      else {
        logger.verbose(bag.accounts);
        logger.info(bag.who, 'Completed');
      }
    }
  );
}

function _getAccounts(bag, next) {
  var who = bag.who + '|' + _getAccounts.name;
  logger.verbose(who, 'Inside');

  bag.shippableAdapter.getAccounts('',
    function (err, accounts) {
      if (err) {
        logger.warn(who, util.format('Failed to get accounts'), err);
        return next(true);
      }

      if (_.isEmpty(accounts)) {
        logger.warn(who, util.format('No accounts found'));
        return next(true);
      }

      bag.accounts = accounts;
      return next();
    }
  );
}
