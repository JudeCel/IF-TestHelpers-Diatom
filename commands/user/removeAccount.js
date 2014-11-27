"use strict";
var _ = require('lodash');
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	if (!params.accountIds)
		throw new Error('params.accountIds required.');

	if(!_.isArray(params.accountIds))
		params.accountIds = [params.accountIds];

	var accountIds = params.accountIds;

	var sql = [
		'DELETE FROM account WHERE id IN (?)'
	];

	var values = [];
	for (var i = 0; i < sql.length; i++)
		values.push(accountIds);

	sql.unshift('SET SESSION FOREIGN_KEY_CHECKS = 0');
	sql.unshift('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');
	sql.push('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');
	sql.push('SET SESSION FOREIGN_KEY_CHECKS = 1');

	return Q.nfcall(ifData.db.query, sql.join(';'), values);
};
