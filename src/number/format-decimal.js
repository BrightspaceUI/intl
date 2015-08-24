import {default as validateFormatOptions} from './validate-format-options';
import {default as validateFormatValue} from './validate-format-value';
import {default as legacyFormatSimple} from './legacy/format-simple';
import {default as legacyFormat} from './legacy/format';

function isInt(n){
	return typeof n === 'number' &&
		parseFloat(n) == parseInt(n, 10) && !isNaN(n);
}

function numDecimalPlaces(number) {
	var a = Math.abs(number);
	var c = a, count = 1;
	while(!isInt(c) && isFinite(c)){
		c = a * Math.pow(10,count++);
	}
	return count-1;
}

export default function(value, localeData, options) {

	value = validateFormatValue(value);
	options = validateFormatOptions(options);

	const actualDecimalPlaces = numDecimalPlaces(value);
	let numOfDecimalPoints = actualDecimalPlaces;
	let trailingZeroes = false;
	if(options.minimumFractionDigits > actualDecimalPlaces) {
		numOfDecimalPoints = options.minimumFractionDigits;
		trailingZeroes = true;
	} else if(options.maximumFractionDigits < actualDecimalPlaces) {
		numOfDecimalPoints = options.maximumFractionDigits;
	}

	if(numOfDecimalPoints === actualDecimalPlaces) {
		return legacyFormatSimple(value, localeData);
	}

	return legacyFormat(value, localeData, numOfDecimalPoints, trailingZeroes);

}
