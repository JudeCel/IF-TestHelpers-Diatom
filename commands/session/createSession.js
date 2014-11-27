"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var Q = require('q');
var ifData = require('if-data'), db = ifData.db;

module.exports = function (params) {

	return getUntitledSessionNames({accountId: params.accountId})
		.then(calcSessionName)
		.then(function (sessionName) {
			return createSession({
				accountId: params.accountId,
				name: sessionName,
				status_id: mtypes.sessionStatus.pending
			});
		});
};


function getUntitledSessionNames(params) {
	var accountId = params.accountId;
	var sql = "SELECT \
			s.name \
		FROM sessions s \
		WHERE s.accountId = ? \
		AND s.deleted IS NULL \
		AND s.name LIKE '%Untitled Session%' \
		ORDER BY s.name";

	return Q.nfcall(db.query, sql, [accountId])
		.then(function (results) {
			return _.pluck(results, 'name');
		});
}

function calcSessionName(names) {
	var nameRegex = /(Copy )(\d+)( of )/;

	if (_.isEmpty(names)) return 'Untitled Session';

	var getCopyNum = function(name) {
		if (!nameRegex.test(name)) return 0;

		var matches = nameRegex.exec(name);
		if(!matches || !matches[2]) return 0;

		return parseInt(matches[2], 10);
	};

	var highestCopyNum = _(names).map(getCopyNum).max().valueOf();
	highestCopyNum++;
	return 'Copy ' + highestCopyNum + ' of Untitled Session';
}

function createSession(params) {
	return Q.nfcall(db.insert, "sessions", params).then(function () {
		return _.omit(params, 'insertId', 'created', 'modified')
	});
}

