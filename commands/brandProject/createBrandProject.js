"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newBrandProject = _.defaults(_.clone(params || {}), {
		max_sessions: 10,
		moderator_active: true,
		start_date: '2014-1-1',
		end_date: '2016-1-1'
	});

	return Q.nfcall(ifData.db.insert, "brand_projects", newBrandProject).then(function() {
		return _.omit(newBrandProject, "insertId");
	});
};
