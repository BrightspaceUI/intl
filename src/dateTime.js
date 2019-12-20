import {getDocumentLocaleSettings, getLanguage} from './documentSettings.js';
import {merge} from './common.js';

const hour24locales = ['da', 'de', 'es', 'fr', 'nl', 'sv', 'tr', 'zh'];

function getTimeFormat(hour24, language, baseLanguage) {
	let timeFormat = hour24 ? 'HH:mm' : 'h:mm tt';
	if (baseLanguage === 'ja' || baseLanguage === 'pt' || baseLanguage === 'zh') {
		timeFormat = 'H:mm';
	}
	if (language === 'zh-tw') {
		timeFormat = 'tt hh:mm';
	}
	if (baseLanguage === 'fr') {
		timeFormat = 'HH\' h \'mm';
	}
	return timeFormat;
}

function prePadByZero(input, maxNum) {
	input = input.toString();
	const zero = '0';
	while (zero.length > 0 && input.length < maxNum) {
		input = zero + input;
	}
	return input;
}

function processPattern(pattern, replacements) {

	let reStr = '';
	Object.keys(replacements).forEach(function(key) {
		reStr += ((reStr === '') ? '' : '|') + key;
	});
	const re = new RegExp(reStr, 'g');

	const doReplacements = function(buf) {
		return buf.replace(re, function(m) {
			return replacements[m];
		});
	};

	let escape = false;
	let buffer = '';
	let value = '';
	for (let i = 0; i < pattern.length; i++) {
		const c = pattern.charAt(i);
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

}

export function getDateTimeDescriptor() {

	const settings = getDocumentLocaleSettings();
	const language = getLanguage();

	const subtags = language.split('-');
	const baseLanguage = subtags[0];

	let hour24 = (hour24locales.indexOf(baseLanguage) > -1);
	if (language === 'zh-tw') {
		hour24 = false;
	}

	const timeFormat = getTimeFormat(hour24, language, baseLanguage);

	let fullTimeFormat = `${timeFormat} ZZZ`;
	if (language === 'zh-cn') {
		fullTimeFormat = `ZZZ ${timeFormat}`;
	}

	let dayPeriodAM = 'AM';
	let dayPeriodPM = 'PM';

	switch (baseLanguage) {
		case 'ar':
			dayPeriodAM = 'ص';
			dayPeriodPM = 'م';
			break;
		case 'es':
			dayPeriodAM = 'a. m.';
			dayPeriodPM = 'p. m.';
			break;
		case 'ja':
			dayPeriodAM = '午前';
			dayPeriodPM = '午後';
			break;
		case 'ko':
			dayPeriodAM = '오전';
			dayPeriodPM = '오후';
			break;
		case 'nl':
			dayPeriodAM = 'a.m.';
			dayPeriodPM = 'p.m.';
			break;
		case 'sv':
			dayPeriodAM = 'fm';
			dayPeriodPM = 'em';
			break;
		case 'tr':
			dayPeriodAM = 'ÖÖ';
			dayPeriodPM = 'ÖS';
			break;
		case 'zh':
			dayPeriodAM = '上午';
			dayPeriodPM = '下午';
			break;
	}

	const descriptor = {
		hour24: hour24,
		formats: {
			/*dateFormats: {
				'full': 'dddd, MMMM d, yyyy',
				'medium': 'MMM d, yyyy',
				'short': 'M/d/yyyy',
				'monthYear': 'MMMM yyyy',
				'monthDay': 'MMMM d'
			},*/
			timeFormats: {
				'full': fullTimeFormat,
				'medium': timeFormat,
				'short': timeFormat
			}
		},
		calendar: {
			/*firstDayOfWeek: 0,
			weekendStartDay: 6,
			weekendEndDay: 0,
			months: {
				short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			},
			days: {
				narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
				short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
			},*/
			dayPeriods: {am: dayPeriodAM, pm: dayPeriodPM}
		}
	};

	if (settings.overrides && settings.overrides.date) {
		merge(descriptor, settings.overrides.date);
	}

	// TODO: fix 12/24 hour clock bug with missing info in format string

	return descriptor;

}

export function formatTime(date, options) {

	const descriptor = getDateTimeDescriptor();
	const settings = getDocumentLocaleSettings();

	options = options || {};

	const timezone = options.timezone || settings.timezone.name;
	const format = descriptor.formats.timeFormats[options.format]
		|| options.format || descriptor.formats.timeFormats['short'];

	const hour = date.getHours();
	let hour12 = hour % 12;
	if (hour12 === 0) {
		hour12 = 12;
	}

	const replacements = {
		'HH': prePadByZero(date.getHours(), 2),
		'H': date.getHours().toString(),
		'hh': prePadByZero(hour12, 2),
		'h': hour12,
		'mm': prePadByZero(date.getMinutes(), 2),
		'tt': (hour > 11) ? descriptor.calendar.dayPeriods.pm : descriptor.calendar.dayPeriods.am,
		'ZZZ': timezone
	};

	const value = processPattern(format, replacements);
	return value;

}
