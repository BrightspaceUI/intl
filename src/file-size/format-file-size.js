import formatDecimal from '../number/format-decimal.js';
import validateFormatValue from '../number/validate-format-value.js';
import processPattern from '../util/process-pattern.js';

function getFileSizeUnits(localeData) {
	var fileSizeUnits = Object.freeze([
		{unit: localeData.fileSize.units.gigabyte, num: Math.pow(1024, 3)},
		{unit: localeData.fileSize.units.megabyte, num: Math.pow(1024, 2)},
		{unit: localeData.fileSize.units.kilobyte, num: 1024},
		{unit: localeData.fileSize.units.bytes, num: 1}
	]);
	return fileSizeUnits;
}

export default function formatFizeSize(numBytes, localeData) {
	numBytes = validateFormatValue(numBytes);

	var fileSizeUnits = getFileSizeUnits(localeData);
	var formatUnit, size;

	if (numBytes === 0) {
		formatUnit = localeData.fileSize.units.bytes;
		size = 0;
	} else if (Math.abs(numBytes) === 1) {
		formatUnit = localeData.fileSize.units.byte;
		size = numBytes;
	} else {
		for (var i = 0; i < fileSizeUnits.length; i++) {
			var unitSize = fileSizeUnits[i];
			if (Math.abs(numBytes) >= unitSize.num) {
				formatUnit = unitSize.unit;
				size = formatDecimal(numBytes / unitSize.num, localeData.number, { maximumFractionDigits: 2 });
				break;
			}
		}
	}

	var format = localeData.fileSize.patterns.fileSizePattern;
	var replacements = {
		'{number}': size,
		'{unit}': formatUnit
	};

	var value = processPattern (format, replacements);
	return value;

}
