'use strict';

var formatDecimal = require('./format-decimal'),
	formatPercent = require('./format-percent'),
	localeProvider = require('../locale-provider');

function NumberFormat(locale, options) {
	options = options || {};
	this.options = options;
	this.localeData = localeProvider(locale, options.locale);
}
NumberFormat.prototype.format = function(value) {
	switch (this.options.style) {
		case 'percent':
			return formatPercent(value, this.localeData.number, this.options);
		default:
			return formatDecimal(value, this.localeData.number, this.options);
	}
};

module.exports = NumberFormat;
