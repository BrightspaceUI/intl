import formatDecimal from '../number/format-decimal';
import validateFormatValue from '../number/validate-format-value';

export default function(numBytes, localeData, options) {
	numBytes = validateFormatValue(numBytes);

	const fileSizeUnits = Object.freeze([
		{unit: localeData.fileSize.units.gigabyte, num: 1073741824},
		{unit: localeData.fileSize.units.megabyte, num: 1048576},
		{unit: localeData.fileSize.units.kilobyte, num: 1024},
		{unit: localeData.fileSize.units.bytes, num: 1}
	]);

	let formatUnit,
		size,
		decimalPlaces = isNaN(options.decimalPlaces)? 2 : options.decimalPlaces;

	if(numBytes === 0) {
		formatUnit = localeData.fileSize.units.bytes;
		size = 0;
	} else {
		for (var unitSize of fileSizeUnits) {
			if (Math.abs(numBytes) >= unitSize.num) {
				formatUnit = unitSize.unit;
				size = formatDecimal(numBytes/unitSize.num, localeData.number, { maximumFractionDigits: decimalPlaces });
				break;
			}
		}
	}

	let ret = localeData.fileSize.patterns.fileSizePattern;
	ret = ret.replace('{number}', size).replace('{unit}', formatUnit);

	return ret;
}
