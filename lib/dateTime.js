import {getDocumentLocaleSettings, getLanguage, merge} from './common.js';

const hour24locales = ['da', 'de', 'es', 'fr', 'nl', 'pt', 'sv', 'tr', 'zh'];
const mondayFirstDayLocales = ['da', 'de', 'fr', 'nl', 'sv', 'tr'];
const numericMonths = ['M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11', 'M12'];

function buildDayPeriodRe(part) {
	let re = '';
	let or = '';
	for (let i = 0; i < part.length; i++) {
		re += or + part.substr(0, i + 1);
		or = '|';
	}
	return new RegExp(re, 'i');
}

function getParts() {

	const descriptor = getDateTimeDescriptor();

	const result = [];
	const separator = getSeparator();
	const parts = descriptor.formats.dateFormats.short.split(separator);

	for (var i = 0; i < parts.length; i++) {
		var part = parts[i].trim();
		switch (part) {
			case 'dd':
			case 'd':
				result.push('d');
				break;
			case 'MM':
			case 'M':
				result.push('M');
				break;
			case 'yyyy':
				result.push('yyyy');
				break;
		}
	}

	if (result.length !== 3) {
		return ['M', 'd', 'yyyy'];
	}

	return result;

}

const reSeparator = new RegExp('\\W');

function getSeparator() {
	const descriptor = getDateTimeDescriptor();
	const match = reSeparator.exec(descriptor.formats.dateFormats.short);
	if (match !== null) {
		return match[0];
	}
	return '/';
}

function getTimeFormat(hour24, language, baseLanguage) {
	let timeFormat = hour24 ? 'HH:mm' : 'h:mm tt';
	if ((baseLanguage === 'es' && language !== 'es-mx') || baseLanguage === 'ja' || language === 'pt-br' || baseLanguage === 'zh') {
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

function isDateValid(year, month, day) {

	if (isNaN(year) || year < 1753 || year > 9999) {
		return false;
	}
	if (isNaN(month) || month < 1 || month > 12) {
		return false;
	}
	if (isNaN(day) || day < 1 || day > 31) {
		return false;
	}

	let allowedDays = 31;
	if (month === 2) {
		if ((year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) {
			allowedDays = 29;
		} else {
			allowedDays = 28;
		}
	} else if (month === 4 || month === 6 || month === 9 || month === 11) {
		allowedDays = 30;
	}

	if (day > allowedDays) {
		return false;
	}

	return true;

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

	const language = getLanguage();

	const subtags = language.split('-');
	const baseLanguage = subtags[0];

	let hour24 = (hour24locales.indexOf(baseLanguage) > -1);
	if (language === 'zh-tw') {
		hour24 = false;
	}

	const timeFormat = getTimeFormat(hour24, language, baseLanguage);

	let dateFormats = ['dddd, MMMM d, yyyy', 'MMM d, yyyy', 'M/d/yyyy', 'MMMM yyyy', 'MMMM d'];
	let fullTimeFormat = `${timeFormat} ZZZ`;
	let dayPeriods = ['AM', 'PM'];
	let months = [
		['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	];
	let days = [
		['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		['S', 'M', 'T', 'W', 'T', 'F', 'S']
	];
	let firstDayOfWeek = (mondayFirstDayLocales.indexOf(baseLanguage) > -1) ? 1 : 0;
	let weekendStartDay = 6;
	let weekendEndDay = 0;

	switch (baseLanguage) {
		case 'ar':
			dateFormats = ['dddd, d MMMM, yyyy', 'dd MMMM, yyyy', 'dd/MM/yyyy', 'MMMM, yyyy', 'd MMMM'];
			dayPeriods = ['ص', 'م'];
			months[0] = months[1] = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
			days = [
				['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
				['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
				['أ', 'إ', 'ث', 'أر', 'خ', 'ج', 'س']
			];
			firstDayOfWeek = 6;
			weekendStartDay = 4;
			weekendEndDay = 5;
			break;
		case 'da':
			dateFormats = ['dddd \'den\' d. MMMM yyyy', 'd. MMM. yyyy', 'dd/MM/yyyy', 'MMMM yyyy', 'd. MMMM'];
			months = [numericMonths, numericMonths];
			days = [
				['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
				['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
				['S', 'M', 'T', 'O', 'T', 'F', 'L']
			];
			break;
		case 'de':
			dateFormats = ['dddd d. MMMM yyyy', 'd. MMMM yyyy', 'dd-MM-yyyy', 'MMMM yyyy', 'd. MMMM'];
			months = [numericMonths, numericMonths];
			days = [
				['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
				['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
				['S', 'M', 'D', 'M', 'D', 'F', 'S']
			];
			break;
		case 'en':
			break;
		case 'es':
			dateFormats = ['dddd d\' de \'MMMM\' de \'yyyy', 'd\' de \'MMMM\' de \'yyyy', 'd/M/yyyy', 'MMMM yyyy', 'd\' de \'MMMM'];
			dayPeriods = ['a. m.', 'p. m.'];
			months = [
				['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
				['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.']
			];
			days = [
				['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
				['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
				['D', 'L', 'M', 'M', 'J', 'V', 'S']
			];
			break;
		case 'fr':
			dateFormats = ['dddd d MMMM yyyy', 'd MMM yyyy', 'dd/MM/yyyy', 'MMMM yyyy', 'd MMMM'];
			months = [
				['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
				['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
			];
			days = [
				['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
				['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
				['D', 'L', 'M', 'M', 'J', 'V', 'S']
			];
			break;
		case 'ja':
			dateFormats = ['yyyy年M月d日', 'yyyy年M月d日', 'yyyy/MM/dd', 'yyyy年M月', 'M月d日'];
			dayPeriods = ['午前', '午後'];
			months[0] = months[1] = ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'];
			days[0] = days[1] = days[2] = ['日', '月', '火', '水', '木', '金', '土'];
			break;
		case 'ko':
			dateFormats = ['yyyy년 M월 d일 dddd', 'yyyy년 M월 d일', 'yyyy-MM-dd', 'yyyy년 M월', 'M월 d일'];
			dayPeriods = ['오전', '오후'];
			months[0] = months[1] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
			days[0] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
			days[1] = days[2] = ['일', '월', '화', '수', '목', '금', '토'];
			break;
		case 'nl':
			dateFormats = ['dddd d MMMM yyyy', 'd MMMM yyyy', 'dd-MM-yyyy', 'MMMM yyyy', 'd MMMM'];
			dayPeriods = ['a.m.', 'p.m.'];
			months = [numericMonths, numericMonths];
			days = [
				['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
				['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
				['Z', 'M', 'D', 'W', 'D', 'V', 'Z']
			];
			break;
		case 'pt':
			dateFormats = ['dddd, d\' de \'MMMM\' de \'yyyy', 'd\' de  \'MMMM\' de \'yyyy', 'd/M/yyyy', 'MMMM\' de \'yyyy', 'dd\' de \'MMMM'];
			months = [
				['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
				['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
			];
			days = [
				['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
				['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
				['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
			];
			break;
		case 'sv':
			dateFormats = ['dddd \'den\' d MMMM yyyy', 'd MMMM yyyy', 'yyyy-MM-dd', 'MMMM yyyy', 'dd MMMM'];
			dayPeriods = ['fm', 'em'];
			months = [
				['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
				['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
			];
			days = [
				['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
				['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
				['S', 'M', 'T', 'O', 'T', 'F', 'L']
			];
			break;
		case 'tr':
			dateFormats = ['dd MMMM yyyy dddd', 'dd MMMM yyyy', 'dd.MM.yyyy', 'MMMM yyyy', 'dd MMMM'];
			dayPeriods = ['ÖÖ', 'ÖS'];
			months = [
				['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
				['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Ek', 'Kas', 'Ara']
			];
			days = [
				['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
				['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
				['P', 'P', 'S', 'Ç', 'P', 'C', 'C']
			];
			break;
		case 'zh':
			dateFormats = ['yyyy年M月d日', 'yyyy年M月d日', 'yyyy/M/d', 'yyyy年M月', 'M月d日'];
			dayPeriods = ['上午', '下午'];
			months[0] = months[1] = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
			days[0] = days[1] = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
			days[2] = ['日', '一', '二', '三', '四', '五', '六'];
			fullTimeFormat = `ZZZ ${timeFormat}`;
			break;
	}

	switch (language) {
		case 'en-gb':
			dateFormats = ['dddd, d MMMM yyyy', 'dd MMMM yyyy', 'dd/MM/yyyy', 'MMMM yyyy', 'd MMMM'];
			break;
		case 'es-mx':
			dateFormats[2] = 'dd/MM/yyyy';
			break;
		case 'fr-ca':
			dateFormats[1] = 'MMM d yyyy';
			dateFormats[2] = 'yyyy-MM-dd';
			dateFormats[4] = 'MMMM d';
			firstDayOfWeek = 0;
			break;
		case 'zh-tw':
			fullTimeFormat = `${timeFormat} ZZZ`;
			break;
	}

	const descriptor = {
		hour24: hour24,
		formats: {
			dateFormats: {
				'full': dateFormats[0],
				'medium': dateFormats[1],
				'short': dateFormats[2],
				'monthYear': dateFormats[3],
				'monthDay': dateFormats[4],
				'longDayOfWeek': 'dddd',
				'shortDayOfWeek': 'ddd',
				'longMonth': 'MMMM',
				'shortMonth': 'MMM'
			},
			timeFormats: {
				'full': fullTimeFormat,
				'medium': timeFormat,
				'short': timeFormat
			}
		},
		calendar: {
			firstDayOfWeek: firstDayOfWeek,
			weekendStartDay: weekendStartDay,
			weekendEndDay: weekendEndDay,
			months: {
				short: months[1],
				long: months[0]
			},
			days: {
				narrow: days[2],
				short: days[1],
				long: days[0]
			},
			dayPeriods: {am: dayPeriods[0], pm: dayPeriods[1]}
		}
	};

	const settings = getDocumentLocaleSettings();
	if (settings.overrides.date) {
		merge(descriptor, settings.overrides.date);
	}

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

export function formatDate(date, options) {

	const descriptor = getDateTimeDescriptor();

	options = options || {};
	options.format = options.format || 'short';

	let format = descriptor.formats.dateFormats[options.format];
	if (format === undefined) {
		format = options.format;
	}

	const replacements = {
		'dddd': descriptor.calendar.days.long[date.getDay()],
		'ddd': descriptor.calendar.days.short[date.getDay()],
		'dd': prePadByZero(date.getDate(), 2),
		'd': date.getDate().toString(),
		'MMMM': descriptor.calendar.months.long[date.getMonth()],
		'MMM': descriptor.calendar.months.short[date.getMonth()],
		'MM': prePadByZero((date.getMonth() + 1), 2),
		'M': (date.getMonth() + 1).toString(),
		'yyyy': date.getFullYear().toString()
	};

	const value = processPattern(format, replacements);
	return value;

}

export function parseDate(input) {

	if (input === undefined || input === null) {
		input = '';
	}
	input = input.toString().trim();

	let year = null;
	let month = null;
	let day = null;
	const separator = getSeparator();
	const dateFormatParts = getParts();

	const dateParts = input.split(separator);
	if (dateParts.length !== dateFormatParts.length) {
		throw new Error('Invalid input date: not enough parts');
	}

	for (let i = 0; i < dateFormatParts.length; i++) {

		const dateFormatPart = dateFormatParts[i];
		const partValue = parseInt(dateParts[i]);
		if (isNaN(partValue)) {
			throw new Error('Invalid input date: part number value');
		}

		switch (dateFormatPart) {
			case 'yyyy':
				year = partValue;
				break;
			case 'M':
				month = partValue;
				break;
			case 'd':
				day = partValue;
				break;
		}

	}

	if (!isDateValid(year, month, day)) {
		throw new Error('Invalid input date: part range value');
	}

	const date = new Date(year, month - 1, day, 0, 0, 0);
	return date;

}

export function formatDateTime(date, options) {

	options = options || {};
	const format = options.format || 'short';

	switch (format) {
		case 'full':
		case 'medium':
		case 'short':
			return `${formatDate(date, options)} ${formatTime(date, options)}`;
	}

	return formatDate(date, options);

}
