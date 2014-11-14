//alliteration
"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var newCompanyContact = _.defaults(_.clone(params || {}), {
		name_first:"Tester",
        name_last:"McTestman"
	});

	return Q.nfcall(ifData.db.insert, "client_company_contacts", newCompanyContact).then(function() {
		return _.omit(newCompanyContact, "insertId");
	});
};