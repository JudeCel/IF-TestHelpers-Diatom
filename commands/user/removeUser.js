"use strict";
var _ = require('lodash');
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	if (!params.userIds)
		throw new Error('params.userIds required.');

	if(!_.isArray(params.userIds))
		params.userIds = [params.userIds];

	var userIds = params.userIds;

	var sql = [
		//'DELETE FROM client_users WHERE user_id IN (?)',
		'DELETE FROM events WHERE user_id IN (?)',
		'DELETE FROM offline_transactions WHERE user_id IN (?)',
		'DELETE FROM participants WHERE user_id IN (?)',
		'DELETE FROM resources WHERE user_id IN (?)',
		'DELETE FROM user_logins WHERE user_id IN (?)',
		'DELETE FROM votes_by WHERE user_id IN (?)',
		'DELETE FROM users WHERE id IN (?)'
	];

	var values = [];
	for (var i = 0; i < sql.length; i++)
		values.push(userIds);

	sql.unshift('SET SESSION FOREIGN_KEY_CHECKS = 0');
	sql.unshift('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');
	sql.push('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');
	sql.push('SET SESSION FOREIGN_KEY_CHECKS = 1');

	return Q.nfcall(ifData.db.query, sql.join(';'), values);
};
