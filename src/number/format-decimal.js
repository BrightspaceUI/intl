'use strict';

var formatPositiveInteger = require('./format-positive-integer'),
	validateFormatOptions = require('./validate-format-options'),
	validateFormatValue = require('./validate-format-value');

module.exports = function(value, localeData, options) {
	value = validateFormatValue(value);
	options = validateFormatOptions(options);

	var isNegative = value < 0;

	var precisionScaling = Math.pow(10, options.maximumFractionDigits);
	// round to desired precision
	value = Math.abs(Math.round(value * precisionScaling) / precisionScaling);

	var integerValue = value | 0;

	var ret = formatPositiveInteger(integerValue, localeData, options);

	var hasDecimal = value !== integerValue;
	var decimalStr = null;

	if (hasDecimal) {
		// get a string of 0.xxx
		decimalStr = '' + (Math.round((value - integerValue) * precisionScaling) / precisionScaling);
		// the first decimal place is index 2
		decimalStr = decimalStr.slice(2);
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

};
