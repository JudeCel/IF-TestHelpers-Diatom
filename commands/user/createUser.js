"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newUser = _.defaults(_.clone(params || {}), {
		ifs_admin: true,
		avatar_info: "test-user",
		invites: 1,
		invites_accepted: 1,
		invites_not_now: 1,
		invites_not_interested: 1,
		invites_no_reply: 1,
		green_room_visit: true
	});

	return Q.nfcall(ifData.db.insert, "users", newUser).then(function() {
        if (newUser.user_login_id)
            Q.nfcall(ifData.db.update, "user_logins", {user_id:newUser.id, $where:'id='+newUser.user_login_id});
        return _.omit(newUser, "insertId");
	});
};
