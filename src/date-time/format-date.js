'use strict';

var prePadByZero = require('../util/pre-pad-by-zero'),
	processPattern = require('../util/process-pattern');

module.exports = function(date, localeData, options) {

	options.format = options.format || 'short';

	var format = localeData.date.formats.dateFormats[options.format];
	if (format === undefined) {
		format = options.format;
	}

	var calendar = localeData.date.calendar;

	var replacements = {
		'dddd': calendar.days.long[date.getDay()],
		'ddd': calendar.days.short[date.getDay()],
		'dd': prePadByZero(date.getDate(), 2),
		'd': date.getDate().toString(),
		'MMMM': calendar.months.long[date.getMonth()],
		'MMM': calendar.months.short[date.getMonth()],
		'MM': prePadByZero((date.getMonth() + 1), 2),
		'M': (date.getMonth() + 1).toString(),
		'yyyy': date.getFullYear().toString()
	};

	var value = processPattern(format, replacements);
	return value;

};
