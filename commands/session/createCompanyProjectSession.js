"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');
var company = require('../company/createCompany.js');
var brandProject = require('../brandProject/createBrandProject.js');
var session = require('../session/createSession.js');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var companyId = 0;
	var brandProjectId = 0;

	return createCompany()
		.then(function (info) {
			companyId = info.id;
			return createBrandProject({
				client_company_id: info.id,
				name: "test-brand-project"
			});
		})
		.then(function (info) {
			brandProjectId = info.id;
			return createSession({
				brand_project_id: info.id
			});
		})
		.then(function (info) {
			return {
				companyId: companyId,
				brandProjectId: brandProjectId,
				sessionId: info.id
			};
		})

	function createCompany() {
		return company();
	}

	function createBrandProject(params) {
		return brandProject(params);
	}

	function createSession(params) {
		return session(params);
	}
};