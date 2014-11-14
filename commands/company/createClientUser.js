"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	//var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newClient = _.defaults(_.clone(params || {}), {
		client_company_id: Math.ceil(10000+Math.random()*256),
        user_id:Math.ceil(10256+Math.random()*1024),
        active:1,
        type_id:Math.ceil(Math.random()*4)
	});

	return Q.nfcall(ifData.db.insert, "client_users", newClient).then(function() {
		return _.omit(newClient, "insertId");
	});
};