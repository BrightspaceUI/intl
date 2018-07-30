import formatPositiveInteger from './format-positive-integer.js';
import validateFormatOptions from './validate-format-options.js';
import validateFormatValue from './validate-format-value.js';

export default function formatDecimal(value, localeData, options) {
	value = validateFormatValue(value);
	options = validateFormatOptions(options);

	var isNegative = value < 0;

	var precisionScaling = Math.pow(10, options.maximumFractionDigits);
	// round to desired precision
	value = Math.abs(Math.round(value * precisionScaling) / precisionScaling);

	var integerValue = Math.floor(value);

	var ret = formatPositiveInteger(integerValue, localeData, options);

	var hasDecimal = value !== integerValue;
	var decimalStr = null;

	if (hasDecimal) {
		var decimalValue = Math.round((value - integerValue) * precisionScaling) / precisionScaling;

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
		ret += localeData.symbols.decimal + decimalStr;
	}

	var pattern = isNegative
		? localeData.patterns.decimal.negativePattern
		: localeData.patterns.decimal.positivePattern;

	ret = pattern.replace('{number}', ret);
	if (isNegative) {
		ret = ret.replace('-', localeData.symbols.negative);
	}
	return ret;

}

function formatExponentialDecimal(value) {
	// Get a value should be like "1.25e-8"
	var pieces = value.split('e-'),
		ret = pieces[0].replace('.', ''),
		zeroCount = parseInt(pieces[1]) - 1;

	for (var i = 0; i < zeroCount; i++) {
		ret = '0' + ret;
	}
	return ret;
}
