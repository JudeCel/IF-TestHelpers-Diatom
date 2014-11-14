"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newSession = _.defaults(_.clone(params || {}), {
		name: uuid,
		status_id: mtypes.statusLookup.active,
		start_time: '2014-1-1',
		end_time: '2016-1-1'
	});

	return Q.nfcall(ifData.db.insert, "sessions", newSession).then(function() {
		return _.omit(newSession, "insertId");
	});
};