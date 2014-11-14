"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newSessionPreferences = _.defaults(_.clone(params || {}), {
		// TBD
	});

	return Q.nfcall(ifData.db.insert, "brand_project_preferences", newSessionPreferences).then(function() {
		return _.omit(newSessionPreferences, "insertId");
	});
};