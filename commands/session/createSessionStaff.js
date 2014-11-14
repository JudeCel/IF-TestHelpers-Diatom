"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var newSessionStaff = _.defaults(_.clone(params || {}), {
		type_id: 1,
		active: true
	});

	return Q.nfcall(ifData.db.insert, "session_staff", newSessionStaff).then(function() {
		return _.omit(newSessionStaff, "insertId");
	});
};