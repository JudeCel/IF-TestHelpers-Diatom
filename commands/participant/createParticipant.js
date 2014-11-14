"use strict";
var _ = require('lodash');
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var newParticipant = _.defaults(_.clone(params || {}), {
        ethnicity: "for testing purposes",
        occupation: "for testing purposes",
        brand_segment: "for testing purposes",
        created: "2014-01-01",
        updated: "2014-01-01"
	});

	return Q.nfcall(ifData.db.insert, "participants", newParticipant).then(function() {
		return _.omit(newParticipant, "insertId");
	});
};
