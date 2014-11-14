"use strict";
var _ = require('lodash');
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	if (!params.sessionIds)
		throw new Error('params.sessionIds required.');

	if(!_.isArray(params.sessionIds))
		params.sessionIds = [params.sessionIds];

	var sessionIds = params.sessionIds;

	var sql = [
		'DELETE FROM session_staff WHERE session_id IN (?)',
		'DELETE FROM brand_project_preferences WHERE session_id IN (?)',
		'DELETE FROM session_emails WHERE session_id IN (?)',
		'DELETE FROM participant_lists WHERE session_id IN (?)',
		'DELETE FROM offline_transactions WHERE session_id IN (?)',
		'DELETE FROM sessions WHERE id IN (?)'
	];

	var values = [];
	for (var i = 0; i < sql.length; i++)
		values.push(sessionIds);

	sql.unshift('SET SESSION FOREIGN_KEY_CHECKS = 0');
	sql.unshift('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');
	sql.push('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');
	sql.push('SET SESSION FOREIGN_KEY_CHECKS = 1');

	return Q.nfcall(ifData.db.query, sql.join(';'), values);
};
