"use strict";
var _ = require('lodash');
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
    var newParticipantRatingLookup = _.defaults(_.clone(params || {}), {
        title: "participant-rating-lookup-test",
        value: "999"
    });

    return Q.nfcall(ifData.db.insert, "participant_rating_lookup", newParticipantRatingLookup).then(function() {
        return _.omit(newParticipantRatingLookup, "insertId");
    });
};
