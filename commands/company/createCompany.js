"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newCompany = _.defaults(_.clone(params || {}), {
		global_admin: uuid
	});

	return Q.nfcall(ifData.db.insert, "client_companies", newCompany).then(function() {
		return _.omit(newCompany, "insertId");
	});
};