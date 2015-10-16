'use strict';

var parseDate = require('./parse-date'),
	parseTime = require('./parse-time'),
	localeProvider = require('../locale-provider');

function NumberParse(locale, options) {
	options = options || {};
	this.localeData = localeProvider(locale, options.locale);
	this.options = options;
}
NumberParse.prototype.parseDate = function(input) {
	return parseDate(input, this.localeData, this.options);
};
NumberParse.prototype.parseTime = function(input) {
	return parseTime(input, this.localeData, this.options);
};

module.exports = NumberParse;
