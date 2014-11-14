"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newUserLogin = _.defaults(_.clone(params || {}), {
		username: "test-user-name",
		password: "test-password"
	});

	return Q.nfcall(ifData.db.insert, "user_logins", newUserLogin).then(function() {
        if (newUserLogin.user_id)
            Q.nfcall(ifData.db.update, "users", {user_login_id:newUserLogin.id, $where:'id='+newUserLogin.user_id});
		return _.omit(newUserLogin, "insertId");
	});
};
