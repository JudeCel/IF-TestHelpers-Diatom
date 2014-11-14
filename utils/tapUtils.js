var util = require('util');

module.exports.tapExpectFulfillment = function (t, promise) {
	return promise.then(function (res) {
		t.end();
	}, function (err) {
		t.fail('failed with error: ' + util.inspect(err));
		t.end();
	});
};
module.exports.tapExpectRejection = function (t, promise) {
	promise.then(function (res) {
		t.fail('promise should not have been fulfilled, received: ' + util.inspect(res));
		t.end();
	}, function (err) {
		t.end();
	});
};
