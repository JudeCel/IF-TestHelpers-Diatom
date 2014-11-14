"use strict";
var _ = require('lodash');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
	var uuid = ifCommon.utils.uuidHelper.generateUUID();
	var newTopic = _.defaults(_.clone(params || {}), {
		name: uuid,
		type: "chat",
		topic_status_id: mtypes.topicStatus.active
	});

	return Q.nfcall(ifData.db.insert, "topics", newTopic).then(function() {
		return _.omit(newTopic, "insertId");
	});
};