import validateFormatValue from './validate-format-value';
import formatDecimal from './format-decimal';

export default function(value, localeData, options) {

	value = validateFormatValue(value);

	const isNegative = (value < 0);
	value = Math.abs(value) * 100;

	const dec = formatDecimal(value, localeData, options);

	let percent = isNegative ? localeData.patterns.percent.negativePattern :
		localeData.patterns.percent.positivePattern;
	percent = percent.replace('{number}', dec);
	percent = percent.replace('%', localeData.symbols.percent);
	if (isNegative) {
		percent = percent.replace('-', localeData.symbols.negative);
	}

	return percent;

}
