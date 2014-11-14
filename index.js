var _ = require('lodash');
var requireAll = require('require-all');

module.exports = _.extend({},
	requireAll(__dirname + '/commands'),
	{macros: requireAll(__dirname + '/macros')},
	{utils: _.extend({},
		require('./utils/tapUtils.js')
	)}
);
