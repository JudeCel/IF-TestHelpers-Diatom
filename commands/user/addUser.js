"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {

	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newUser = _.defaults(_.clone(params || {}), {
	  name_first: "test_name_first",
	  name_last: "test_name_last",
	  gender: "Male",
	  email: uuid+"@test.com"
	});


	return Q.nfcall(ifData.db.insert, "users", newUser).then(function() {
         return _.omit(newUser, "insertId");
	});
};
