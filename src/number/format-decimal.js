import validateFormatOptions from './validate-format-options';
import validateFormatValue from './validate-format-value';

export default function(value, localeData, options) {

	value = validateFormatValue(value);
	options = validateFormatOptions(options);

	const isNegative = (value<0);
	value = Math.abs(
		Math.round(
			value * Math.pow(10, options.maximumFractionDigits)
		) / Math.pow(10, options.maximumFractionDigits)
	);

	const valueStr = value + '';
	let ret = '';
	let processedDecimal = (valueStr.indexOf('.') < 0);
	let digitNum = 0;

	for(let i=valueStr.length; i>=0; i--) {

		const c = valueStr.charAt(i);

		if(c === '.') {
			ret = localeData.symbols.decimal + ret;
			processedDecimal = true;
			continue;
		}

		const num = parseInt(c);
		if(isNaN(num) || num<0 || num>9) {
			continue;
		}

		if(!processedDecimal) {
			ret = c + ret;
			continue;
		}

		digitNum++;

		if(digitNum>1 && digitNum % localeData.groupSize === 1) {
			ret = c + localeData.symbols.group + ret;
		} else {
			ret = c + ret;
		}

	}

	const decimalIndex = ret.indexOf('.');
	const numDecimals = (decimalIndex < 0) ? 0 : (ret.length - decimalIndex - 1);

	for(let i=numDecimals; i<options.minimumFractionDigits; i++) {
		if(i === 0) {
			ret += localeData.symbols.decimal;
		}
		ret += '0';
	}

	const pattern = (isNegative) ? localeData.patterns.decimal.negativePattern :
		localeData.patterns.decimal.positivePattern;

	ret = pattern.replace('{number}', ret);
	if(isNegative) {
		ret = ret.replace('-', localeData.symbols.negative);
	}
	return ret;

}
