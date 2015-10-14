import formatDecimal from '../number/format-decimal';
import validateFormatValue from '../number/validate-format-value';
import processPattern from '../util/process-pattern';

function getFileSizeUnits(localeData) {
	const fileSizeUnits = Object.freeze([
		{unit: localeData.fileSize.units.gigabyte, num: Math.pow(1024, 3)},
		{unit: localeData.fileSize.units.megabyte, num: Math.pow(1024, 2)},
		{unit: localeData.fileSize.units.kilobyte, num: 1024},
		{unit: localeData.fileSize.units.bytes, num: 1}
	]);

	return fileSizeUnits;
}

export default function(numBytes, localeData) {
	numBytes = validateFormatValue(numBytes);

	const fileSizeUnits = getFileSizeUnits(localeData);

	let formatUnit,
		size;

	if(numBytes === 0) {
		formatUnit = localeData.fileSize.units.bytes;
		size = 0;
	} else if(Math.abs(numBytes) === 1){
		formatUnit = localeData.fileSize.units.byte;
		size = numBytes;
	} else {
		for (var unitSize of fileSizeUnits) {
			if (Math.abs(numBytes) >= unitSize.num) {
				formatUnit = unitSize.unit;
				size = formatDecimal(numBytes/unitSize.num, localeData.number, { maximumFractionDigits: 2 });
				break;
			}
		}
	}

	let format = localeData.fileSize.patterns.fileSizePattern;
	const replacements = {
		'{number}': size,
		'{unit}': formatUnit
	};

	const value = processPattern (format, replacements);
	return value;
}
