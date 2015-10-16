import prePadByZero from '../util/pre-pad-by-zero';
import processPattern from '../util/process-pattern';

export default function(date, localeData, options) {

	options.format = options.format || 'short';
	options.timezone = options.timezone || '';

	let format = localeData.date.formats.timeFormats[options.format];
	if (format === undefined) {
		format = options.format;
	}

	const hour = date.getHours();
	let hour12 = hour % 12;
	if ( hour12 === 0 ) {
		hour12 = 12;
	}

	const calendar = localeData.date.calendar;

	const replacements = {
		'HH': prePadByZero( date.getHours(), 2 ),
		'H': date.getHours().toString(),
		'hh': prePadByZero( hour12, 2 ),
		'h': hour12,
		'mm': prePadByZero( date.getMinutes(), 2 ),
		'tt': ( hour > 11 ) ? calendar.dayPeriods.pm : calendar.dayPeriods.am,
		'ZZZ': options.timezone
	};

	const value = processPattern(format, replacements);
	return value;

}
