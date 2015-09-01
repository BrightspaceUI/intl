import calendarProvider from '../calendar/provider';

const reSeparator = new RegExp('\\W');

function getSeparator(localeData) {
	const match = reSeparator.exec(localeData.date.formats.dateFormats.short);
	if(match !== null) {
		return match[0];
	}
	return '/';
}

function getParts(localeData) {

	let result = [];
	const separator = getSeparator(localeData);
	const parts = localeData.date.formats.dateFormats.short.split(separator);

	for(let i=0; i<parts.length; i++) {
		const part = parts[i].trim();
		switch(part) {
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

	if(result.length !== 3) {
		return ['M', 'd', 'yyyy'];
	}

	return result;

}

export default function(input, localeData, options) {

	if(input === undefined || input === null) {
		input = '';
	}
	input = input.toString().trim();

	let calendarSpecificYear = null;
	let calendarSpecificMonth = null;
	let calendarSpecificDay = null;
	const separator = getSeparator(localeData);
	const dateFormatParts = getParts(localeData);

	const dateParts = input.split(separator);
	if(dateParts.length !== dateFormatParts.length) {
		throw new Error('Invalid input date: not enough parts');
	}

	for(let i=0; i<dateFormatParts.length; i++) {

		const dateFormatPart = dateFormatParts[i];
		const partValue = parseInt(dateParts[i]);
		if(isNaN(partValue)) {
			throw new Error('Invalid input date: part number value');
		}

		switch(dateFormatPart) {
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

	const calendar = calendarProvider(localeData);
	const gregorianLocalDate = calendar.tryGetGregorianLocaleDateTime(
		calendarSpecificYear,
		calendarSpecificMonth,
		calendarSpecificDay
	);
	if(gregorianLocalDate === null ) {
		throw new Error('Invalid input date: part range value');
	}

	return gregorianLocalDate;

}
