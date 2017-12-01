'use strict';

module.exports = function(pattern, replacements) {

	var reStr = '';
	Object.keys(replacements).forEach(function(key) {
		reStr += ((reStr === '') ? '' : '|') + key;
	});
	var re = new RegExp(reStr, 'g');

	var doReplacements = function(buf) {
		return buf.replace(re, function(m) {
			return replacements[m];
		});
	};

	var escape = false;
	var buffer = '';
	var value = '';
	for (var i = 0; i < pattern.length; i++) {
		var c = pattern.charAt(i);
		if (c === "'") {
			if (!escape) {
				value += doReplacements(buffer);
				buffer = '';
			}
			escape = !escape;
		} else if (escape) {
			value += c;
		} else {
			buffer += c;
		}
	}
	value += doReplacements(buffer);

	return value;

};
