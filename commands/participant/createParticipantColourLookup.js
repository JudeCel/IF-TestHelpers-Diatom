"use strict";
var _ = require('lodash');
var ifData = require('if-data');
var Q = require('q');

module.exports = function (params) {
    var newParticipantColorLookup = _.defaults(_.clone(params || {}), {
        colour: "13727061"
    });

    return Q.nfcall(ifData.db.insert, "participant_colour_lookup", newParticipantColorLookup).then(function() {
        return _.omit(newParticipantColorLookup, "insertId");
    });
};
