"use strict";
var _ = require('lodash');
var ifCommon = require('if-common'), mtypes = ifCommon.mtypes;
var ifData = require('if-data'), db = ifData.db;
var Q = require('q');

module.exports = function (params) {
	//var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newAccount = _.defaults(_.clone(params || {}), {
		Status: mtypes.accountStatus.active,
		StatusModified: db.utcNow(),
		BillingIntervalType: mtypes.billingIntervalType.annual
	});

	return Q.nfcall(db.insert, "account", newAccount).then(function() {
		return _.omit(newAccount, "insertId");
	})
}

