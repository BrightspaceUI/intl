'use strict';

var path = require('path');
var through = require('through2');

module.exports = function(file) {
	if (path.extname(file) !== '.json') {
		return through();
	}

	var data = '';

	return through(transform, flush);

	function transform(chunk, enc, cb) {
		data += chunk;
		cb();
	}

	/* @this */
	function flush(cb) {
		var shrunk = JSON.stringify(JSON.parse(data));
		this.push(shrunk);
		cb();
	}
};
