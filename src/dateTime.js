import {getDocumentLocaleSettings, getLanguage} from './documentSettings.js';
import {merge} from './common.js';

const hour24locales = ['da', 'de', 'es', 'fr', 'nl', 'sv', 'tr', 'zh'];

function buildDayPeriodRe(part) {
	var re = '';
	var or = '';
	for (var i = 0; i < part.length; i++) {
		re += or + part.substr(0, i + 1);
		or = '|';
	}
	return new RegExp(re, 'i');
}

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
	if (baseLanguage === 'ko') {
		timeFormat = 'tt h:mm';
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

export function parseTime(input, options) {

	if (input === undefined || input === null || input === '') {
		return null;
	}

	const descriptor = getDateTimeDescriptor();

	const reDigits = new RegExp('(\\d+)', 'g');
	const match = input.match(reDigits);
	if (match === null) {
		return null;
	}

	options = options || {};
	const nowProvider = options.nowProvider || function() { return new Date(); };
	const reAm = buildDayPeriodRe(descriptor.calendar.dayPeriods.am);
	const rePm = buildDayPeriodRe(descriptor.calendar.dayPeriods.pm);
	const today = nowProvider();
	const isMorning = (today.getHours() < 12);
	const digits = match.join('');
	const leadingZero = (digits.substr(0, 1) === '0');

	let hour = 0;
	let minute = 0;
	switch (digits.length) {
		case 1:
			hour = digits.substr(0, 1);
			break;
		case 2:
			hour = digits.substr(0, 2);
			break;
		case 3:
			hour = digits.substr(0, 1);
			minute = digits.substr(1, 2);
			break;
		default:
			hour = parseInt(digits.substr(0, 2));
			minute = parseInt(digits.substr(2, 2));
			break;
	}

	hour = Math.min(Math.max(parseInt(hour, 10), 0), 23);
	minute = Math.min(Math.max(parseInt(minute, 10), 0), 59);

	if (!descriptor.hour24 && hour < 13) {

		const matchPm = input.match(rePm);
		const matchAm = input.match(reAm);
		const noAmPm = (matchAm === null && matchPm === null);

		if (matchPm !== null || (noAmPm && !isMorning && !leadingZero)) {
			hour += 12;
			if (hour === 24) {
				hour = 12;
			}
		} else if (hour === 12) {
			hour = 0;
		}

	}

	const time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute, 0);
	return time;

}
