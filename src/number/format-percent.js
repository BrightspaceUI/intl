'use strict';

var validateFormatValue = require('./validate-format-value'),
	formatDecimal = require('./format-decimal');

module.exports = function(value, localeData, options) {

	value = validateFormatValue(value);

	var isNegative = (value < 0);
	value = Math.abs(value) * 100;

	var dec = formatDecimal(value, localeData, options);

	var percent = isNegative ? localeData.patterns.percent.negativePattern :
		localeData.patterns.percent.positivePattern;
	percent = percent.replace('{number}', dec);
	percent = percent.replace('%', localeData.symbols.percent);
	if (isNegative) {
		percent = percent.replace('-', localeData.symbols.negative);
	}

	return percent;

};
