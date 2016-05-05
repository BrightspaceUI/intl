'use strict';

var validateFormatOptions = require('./validate-format-options'),
	validateFormatValue = require('./validate-format-value');

module.exports = function(value, localeData, options) {

	value = validateFormatValue(value);
	options = validateFormatOptions(options);

	var isNegative = (value < 0);
	value = Math.abs(
		Math.round(
			value * Math.pow(10, options.maximumFractionDigits)
		) / Math.pow(10, options.maximumFractionDigits)
	);

	var valueStr = value + '';
	var ret = '';
	var processedDecimal = (valueStr.indexOf('.') < 0);
	var currentGroupSizeIndex = 0;
	var groupSizes = localeData.groupSize;
	if ( !Array.isArray( groupSizes) ) {
		groupSizes = [groupSizes];
	}
	var groupMemberCount = 0;

	for (var i = valueStr.length; i >= 0; i--) {

		var c = valueStr.charAt(i);

		if (c === '.') {
			ret = localeData.symbols.decimal + ret;
			processedDecimal = true;
			continue;
		}

		var num = parseInt(c);
		if (isNaN(num) || num < 0 || num > 9) {
			continue;
		}

		if (!processedDecimal) {
			ret = c + ret;
			continue;
		}

		if (groupMemberCount > 0 && groupMemberCount === groupSizes[currentGroupSizeIndex] ) {	// we've filled up our group
			ret = c + localeData.symbols.group + ret;
			groupMemberCount = 0;
			if ( currentGroupSizeIndex + 1 < groupSizes.length ) {
				currentGroupSizeIndex++;
			}
		} else {
			ret = c + ret;
		}
		groupMemberCount++;

	}

	var decimalIndex = ret.indexOf('.');
	var numDecimals = (decimalIndex < 0) ? 0 : (ret.length - decimalIndex - 1);

	for (var j = numDecimals; j < options.minimumFractionDigits; j++) {
		if (j === 0) {
			ret += localeData.symbols.decimal;
		}
		ret += '0';
	}

	var pattern = (isNegative) ? localeData.patterns.decimal.negativePattern :
		localeData.patterns.decimal.positivePattern;

	ret = pattern.replace('{number}', ret);
	if (isNegative) {
		ret = ret.replace('-', localeData.symbols.negative);
	}
	return ret;

};
