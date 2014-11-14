"use strict";
var _ = require('lodash');
var Q = require('q');
var ifCommon = require('if-common');

//var createAccount = require('../commands/account/createAccount.js');
//var createDomain = require('../commands/account/createDomain.js');

module.exports = function (params) {
//	params = _.defaults(params || {}, {
//		account: {},
//		domain: {},
//		style: {},
//		administrator: {}
//	});
	var ret = {};

	/*return createAccount(params.account)
		.then(function(account) {
			ret.account = account;
			params.domain.accountId = ret.account.id;
			params.style.accountId = ret.account.id;
			params.administrator.accountId = ret.account.id;
			return;
		})
		.then(function (features) {
			ret.features = features;
			return;
		})
		.then(function() {
			//return createDomain(params.domain)
		})
		.then(function (domain) {
			ret.domain = domain;
			return;
		})
		.then(function (style) {
			ret.style = style;
			return;
		})
		.then(function (administrator) {
			ret.administrator = administrator;
			return;
		})
		.then(function() {
			return ret;
		});*/
};