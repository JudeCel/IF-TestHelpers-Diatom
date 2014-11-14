"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newEvent = _.defaults(_.clone(params || {}), {
		tag: 0,
		timestamp: 111111
	});

	return Q.nfcall(ifData.db.insert, "events", newEvent).then(function() {
		return _.omit(newEvent, "insertId");
	});
};