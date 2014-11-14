"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var newAddress = _.defaults(_.clone(params || {}), {
		address_type:"billing",
        street: "Tester st. 3/14"
	});

	return Q.nfcall(ifData.db.insert, "addresses", newAddress).then(function() {
		return _.omit(newAddress, "insertId");
	});
};