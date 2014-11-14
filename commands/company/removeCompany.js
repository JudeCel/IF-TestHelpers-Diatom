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
		'DELETE FROM client_company_contacts WHERE client_company_id IN (?)',
        'DELETE FROM addresses WHERE id IN(SELECT address_id FROM client_companies WHERE id=?)',
		'DELETE FROM client_companies WHERE id IN (?)'
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
