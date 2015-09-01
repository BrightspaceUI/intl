import prePadByZero from '../util/pre-pad-by-zero';
import processPattern from '../util/process-pattern';

export default function(date, localeData, options) {

	options.format = options.format || 'short';

	let format = localeData.date.formats.dateFormats[options.format];
	if(format === undefined) {
		format = options.format;
	}

	const calendar = localeData.date.calendar;

	const replacements = {
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

	const value = processPattern(format, replacements);
	return value;

}
