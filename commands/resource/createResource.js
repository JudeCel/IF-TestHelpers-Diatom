"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var newResource = _.defaults(_.clone(params || {}), {
		type_id: mtypes.resourceType.participant,
		URL: "test-url"     /* we need to revise it */
	});

	return Q.nfcall(ifData.db.insert, "resources", newResource).then(function() {
		return _.omit(newResource, "insertId");
	});
};