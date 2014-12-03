"use strict";
var _ = require('lodash');
var db = require('if-data').db;
var Q = require('q');

module.exports = function (params) {
	if (!params.sessionId)
		throw new Error('params.sessionId required.');

  var sql = "SELECT * FROM sessions WHERE id = ?";
    return Q.nfcall(db.queryOne, sql, [params.sessionId]).then(function (data) {
      return _.omit(data, 'id', 'created', 'updated')
  });
};
