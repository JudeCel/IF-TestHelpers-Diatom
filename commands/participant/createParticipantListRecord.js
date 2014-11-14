"use strict";
var _ = require('lodash');
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
    var newParticipantListRecord = _.defaults(_.clone(params || {}), {
        comments: "participant-list-record-test"
    });

    return Q.nfcall(ifData.db.insert, "participant_lists", newParticipantListRecord).then(function() {
        return _.omit(newParticipantListRecord, "insertId");
    });
};
