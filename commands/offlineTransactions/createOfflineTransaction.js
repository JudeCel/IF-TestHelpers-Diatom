"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();

	var newOfflineTransaction = _.defaults(_.clone(params || {}), {
		reply_user_id: 123
	});

	return Q.nfcall(ifData.db.insert, "offline_transactions", newOfflineTransaction).then(function() {
		return _.omit(newOfflineTransaction, "insertId");
	});
};
