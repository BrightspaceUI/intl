import {getLanguage} from './documentSettings.js';
import {formatNumber} from './number.js';
import {validateFormatValue} from './common.js';

export function getFileSizeDescriptor() {

	const language = getLanguage();

	const val = {
		'gigabyte': 'GB',
		'megabyte': 'MB',
		'kilobyte': 'KB',
		'bytes': 'bytes',
		'byte': 'byte'
	};

	switch (language) {
		case 'zh-tw':
			val.bytes = val.byte = '位元組';
			return val;
	}

	const subtags = language.split('-');
	const baseLanguage = subtags[0];

	switch (baseLanguage) {
		case 'ar':
			val.gigabyte = 'غيغا بايت';
			val.megabyte = 'ميغا بايت';
			val.kilobyte = 'كيلو بايت';
			val.bytes = val.byte = 'بايت';
			break;
		case 'fr':
			val.gigabyte = 'Go';
			val.megabyte = 'Mo';
			val.kilobyte = 'Ko';
			val.bytes = 'octets';
			val.byte = 'octet';
			break;
		case 'ja':
			val.bytes = val.byte = 'バイト';
			break;
		case 'ko':
			val.bytes = val.byte = '바이트';
			break;
		case 'sv':
			val.bytes = 'byte';
			break;
		case 'tr':
			val.bytes = val.byte = 'bayt';
			break;
		case 'zh':
			val.bytes = val.byte = '字节';
			break;
	}

	return val;

}

export function formatFileSize(value) {

	const descriptor = getFileSizeDescriptor();
	value = validateFormatValue(value);

	const fileSizeUnits = [
		{unit: descriptor.gigabyte, num: Math.pow(1024, 3)},
		{unit: descriptor.megabyte, num: Math.pow(1024, 2)},
		{unit: descriptor.kilobyte, num: 1024},
		{unit: descriptor.bytes, num: 1}
	];
	let formatUnit, size;

	if (value === 0) {
		formatUnit = descriptor.bytes;
		size = 0;
	} else if (Math.abs(value) === 1) {
		formatUnit = descriptor.byte;
		size = value;
	} else {
		for (let i = 0; i < fileSizeUnits.length; i++) {
			const unitSize = fileSizeUnits[i];
			if (Math.abs(value) >= unitSize.num) {
				formatUnit = unitSize.unit;
				size = formatNumber(value / unitSize.num, { maximumFractionDigits: 2 });
				break;
			}
		}
	}

	return `${size} ${formatUnit}`;

}
