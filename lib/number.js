import {
	getDocumentLocaleSettings,
	getLanguage,
	merge,
	validateFormatValue
} from './common.js';

function formatPositiveInteger(value, descriptor) {
	value = Math.floor(value);

	const valueStr = '' + value;
	let ret = '';

	const groupSizes = [3];
	let currentGroupSizeIndex = -1;
	const maxGroupSizeIndex = groupSizes.length - 1;
	let currentGroupSize = 0;
	let groupEnd = valueStr.length;

	while (groupEnd > 0) {
		if (currentGroupSizeIndex < maxGroupSizeIndex) {
			currentGroupSize = groupSizes[++currentGroupSizeIndex];
		}

		let chunk = null;
		if (currentGroupSize === 0) {
			chunk = valueStr.substring(0, groupEnd);
		} else {
			const groupStart = groupEnd - currentGroupSize;
			chunk = valueStr.substring(groupStart, groupEnd);
		}

		// not first or only chunk
		if (groupEnd !== valueStr.length) {
			ret = descriptor.symbols.group + ret;
		}

		ret = chunk + ret;

		groupEnd -= chunk.length;
	}

	return ret;
}

function formatExponentialDecimal(value) {
	// Get a value should be like "1.25e-8"
	const pieces = value.split('e-');
	let ret = pieces[0].replace('.', '');
	const zeroCount = parseInt(pieces[1]) - 1;

	for (let i = 0; i < zeroCount; i++) {
		ret = '0' + ret;
	}
	return ret;
}

function validateFormatOptions(options) {

	options = options || {};

	if (options.style !== 'decimal' && options.style !== 'percent') {
		options.style = 'decimal';
	}
	options.minimumFractionDigits = validateInteger(
		'minimumFractionDigits',
		options.minimumFractionDigits,
		0,
		0,
		20
	);
	options.maximumFractionDigits = validateInteger(
		'maximumFractionDigits',
		options.maximumFractionDigits,
		Math.max(options.minimumFractionDigits, 3),
		0,
		20
	);

	if (options.minimumFractionDigits > options.maximumFractionDigits) {
		throw new RangeError('maximumFractionDigits value is out of range.');
	}

	return options;

}

function validateInteger(name, value, defaultValue, min, max) {

	if (value === undefined || value === null) {
		value = defaultValue;
	}
	if (typeof value === 'string') {
		value = parseInt(value);
	}
	if (isNaN(value) || typeof value !== 'number' || (min !== undefined && value < min) || (max !== undefined && value > max)) {
		throw new RangeError(name + ' value is out of range.');
	}

	return value;

}

export function getNumberDescriptor() {

	const language = getLanguage();

	const subtags = language.split('-');
	const baseLanguage = subtags[0];

	let negativePattern = '-{number}';
	if (baseLanguage === 'ar') {
		negativePattern = '{number}-';
	}

	let percentPattern = '{number} %';
	let percentNegativePattern = '-{number} %';
	switch (baseLanguage) {
		case 'ja':
		case 'pt':
		case 'zh':
			percentPattern = '{number}%';
			percentNegativePattern = '-{number}%';
			break;
		case 'sv':
		case 'tr':
			percentPattern = '%{number}';
			percentNegativePattern = '-%{number}';
			break;
	}

	let decimalSymbol = '.';
	let groupSymbol = ',';
	switch (baseLanguage) {
		case 'da':
		case 'de':
		case 'es':
		case 'nl':
		case 'pt':
		case 'sv':
		case 'tr':
			decimalSymbol = ',';
			groupSymbol = '.';
			break;
		case 'fr':
			decimalSymbol = ',';
			groupSymbol = ' ';
	}

	switch (language) {
		case 'es-mx':
			decimalSymbol = '.';
			groupSymbol = ',';
			percentPattern = '{number}%';
			percentNegativePattern = '-{number}%';
			break;
	}

	const descriptor = {
		patterns: {
			decimal: {
				positivePattern: '{number}',
				negativePattern: negativePattern
			},
			percent: {
				positivePattern: percentPattern,
				negativePattern: percentNegativePattern
			}
		},
		symbols: {
			decimal: decimalSymbol,
			group: groupSymbol,
			negative: '-',
			percent: '%'
		}
	};

	const settings = getDocumentLocaleSettings();
	if (settings.overrides.number) {
		merge(descriptor, settings.overrides.number);
	}

	return descriptor;

}

function formatDecimal(value, options) {

	const descriptor = getNumberDescriptor();

	value = validateFormatValue(value);
	options = validateFormatOptions(options);

	const isNegative = value < 0;

	const precisionScaling = Math.pow(10, options.maximumFractionDigits);
	// round to desired precision
	value = Math.abs(Math.round(value * precisionScaling) / precisionScaling);

	const integerValue = Math.floor(value);

	let ret = formatPositiveInteger(integerValue, descriptor);

	const hasDecimal = value !== integerValue;
	let decimalStr = null;

	if (hasDecimal) {
		const decimalValue = Math.round((value - integerValue) * precisionScaling) / precisionScaling;

		// get a string of 0.xxx, or exponent of x.xe-x
		decimalStr = '' + decimalValue;

		if (decimalValue.toExponential() === decimalStr) {
			// Get a string with leading zeros
			decimalStr = formatExponentialDecimal(decimalStr);
		} else {
			// the first decimal place is index 2
			decimalStr = decimalStr.slice(2);
		}
	} else if (options.minimumFractionDigits > 0) {
		decimalStr = '';
	}

	if (decimalStr !== null) {
		while (decimalStr.length < options.minimumFractionDigits) {
			decimalStr += '0';
		}
		ret += descriptor.symbols.decimal + decimalStr;
	}

	const pattern = isNegative
		? descriptor.patterns.decimal.negativePattern
		: descriptor.patterns.decimal.positivePattern;

	ret = pattern.replace('{number}', ret);
	if (isNegative) {
		ret = ret.replace('-', descriptor.symbols.negative);
	}
	return ret;

}

export function formatNumber(value, options) {
	if (options && options.style === 'percent') {
		return formatPercent(value, options);
	}
	return formatDecimal(value, options);
}

export function formatPercent(value, options) {

	const descriptor = getNumberDescriptor();
	value = validateFormatValue(value);

	const isNegative = (value < 0);
	value = Math.abs(value) * 100;

	const dec = formatDecimal(value, options);

	let percent = isNegative ? descriptor.patterns.percent.negativePattern :
		descriptor.patterns.percent.positivePattern;
	percent = percent.replace('{number}', dec);
	percent = percent.replace('%', descriptor.symbols.percent);
	if (isNegative) {
		percent = percent.replace('-', descriptor.symbols.negative);
	}

	return percent;

}

export function parseNumber(value) {
	if (value === undefined || value === null) {
		return 0;
	}

	const descriptor = getNumberDescriptor();

	value = value.replace(
		new RegExp('\\s|[' + descriptor.symbols.group + ']', 'g'),
		''
	);
	if (value === '') {
		return 0;
	}

	let ret = '';
	let negative = false;
	let hasDecimal = false;
	let breakout = false;

	for (let i = 0; i < value.length; i++) {
		let c = value.charAt(i);
		switch (c) {
			case descriptor.symbols.decimal:
				ret += !hasDecimal ? '.' : '';
				hasDecimal = true;
				break;
			case descriptor.symbols.negative:
			case '(':
			case ')':
				negative = true;
				break;
			default:
				c = parseInt(c);
				if (!isNaN(c) && c >= 0 && c <= 9) {
					ret += c;
				} else {
					breakout = true;
				}
		}
		if (breakout) {
			break;
		}
	}

	if (ret.length === 0) {
		return NaN;
	}

	ret = parseFloat(ret);

	if (negative) {
		ret = ret * -1;
	}

	return ret;
}
