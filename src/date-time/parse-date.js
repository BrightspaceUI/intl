import calendarProvider from '../calendar/provider.js';

var reSeparator = new RegExp('\\W');

function getSeparator(localeData) {
	var match = reSeparator.exec(localeData.date.formats.dateFormats.short);
	if (match !== null) {
		return match[0];
	}
	return '/';
}

function getParts(localeData) {

	var result = [];
	var separator = getSeparator(localeData);
	var parts = localeData.date.formats.dateFormats.short.split(separator);

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

export default function parseDate(input, localeData) {

	if (input === undefined || input === null) {
		input = '';
	}
	input = input.toString().trim();

	var calendarSpecificYear = null;
	var calendarSpecificMonth = null;
	var calendarSpecificDay = null;
	var separator = getSeparator(localeData);
	var dateFormatParts = getParts(localeData);

	var dateParts = input.split(separator);
	if (dateParts.length !== dateFormatParts.length) {
		throw new Error('Invalid input date: not enough parts');
	}

	for (var i = 0; i < dateFormatParts.length; i++) {

		var dateFormatPart = dateFormatParts[i];
		var partValue = parseInt(dateParts[i]);
		if (isNaN(partValue)) {
			throw new Error('Invalid input date: part number value');
		}

		switch (dateFormatPart) {
			case 'yyyy':
				calendarSpecificYear = partValue;
				break;
			case 'M':
				calendarSpecificMonth = partValue;
				break;
			case 'd':
				calendarSpecificDay = partValue;
				break;
		}

	}

	var calendar = calendarProvider(localeData);
	var gregorianLocalDate = calendar.tryGetGregorianLocaleDateTime(
		calendarSpecificYear,
		calendarSpecificMonth,
		calendarSpecificDay
	);
	if (gregorianLocalDate === null) {
		throw new Error('Invalid input date: part range value');
	}

	return gregorianLocalDate;

}
