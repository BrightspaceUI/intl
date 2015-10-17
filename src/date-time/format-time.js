'use strict';

var prePadByZero = require('../util/pre-pad-by-zero'),
	processPattern = require('../util/process-pattern');

module.exports = function(date, localeData, options) {

	options.format = options.format || 'short';
	options.timezone = options.timezone || '';

	var format = localeData.date.formats.timeFormats[options.format];
	if (format === undefined) {
		format = options.format;
	}

	var hour = date.getHours();
	var hour12 = hour % 12;
	if ( hour12 === 0 ) {
		hour12 = 12;
	}

	var calendar = localeData.date.calendar;

	var replacements = {
		'HH': prePadByZero( date.getHours(), 2 ),
		'H': date.getHours().toString(),
		'hh': prePadByZero( hour12, 2 ),
		'h': hour12,
		'mm': prePadByZero( date.getMinutes(), 2 ),
		'tt': ( hour > 11 ) ? calendar.dayPeriods.pm : calendar.dayPeriods.am,
		'ZZZ': options.timezone
	};

	var value = processPattern(format, replacements);
	return value;

};
