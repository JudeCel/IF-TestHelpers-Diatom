"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var newVote = _.defaults(_.clone(params || {}), {
		count: 1
	});

	return Q.nfcall(ifData.db.insert, "votes", newVote).then(function() {
		return _.omit(newVote, "insertId");
	});
};
