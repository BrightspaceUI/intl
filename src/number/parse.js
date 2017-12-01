'use strict';

var localeProvider = require('../locale-provider');

function NumberParse(locale, options) {
	options = options || {};
	this.localeData = localeProvider(locale, options.locale);
}
NumberParse.prototype.parse = function(value) {
	if (value === undefined || value === null) {
		return 0;
	}

	value = value.replace(
		new RegExp('\\s|[' + this.localeData.number.symbols.group + ']', 'g'),
		''
	);
	if (value === '') {
		return 0;
	}

	var ret = '';
	var negative = false;
	var hasDecimal = false;
	var breakout = false;

	for (var i = 0; i < value.length; i++) {
		var c = value.charAt(i);
		switch (c) {
			case this.localeData.number.symbols.decimal:
				ret += !hasDecimal ? '.' : '';
				hasDecimal = true;
				break;
			case this.localeData.number.symbols.negative:
			case '(':
			case ')':
				negative = true;
				break;
			default:
				c = parseInt(c);
				if (!isNaN(c) && c >= 0 && c <= 9) {
					ret += c;
				} else {
					breakout = true;
				}
		}
		if (breakout) {
			break;
		}
	}

	if (ret.length === 0) {
		return NaN;
	}

	ret = parseFloat(ret);

	if (negative) {
		ret = ret * -1;
	}

	return ret;
};

module.exports = NumberParse;
