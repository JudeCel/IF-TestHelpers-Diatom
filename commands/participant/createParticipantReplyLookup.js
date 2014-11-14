"use strict";
var _ = require('lodash');
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
    var newParticipantReplyLookup = _.defaults(_.clone(params || {}), {
        reply_name: "participant-reply-lookup-test"
    });

    return Q.nfcall(ifData.db.insert, "participant_reply_lookup", newParticipantReplyLookup).then(function() {
        return _.omit(newParticipantReplyLookup, "insertId");
    });
};
