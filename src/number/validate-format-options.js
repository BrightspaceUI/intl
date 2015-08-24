import {default as validateInteger} from '../util/validate-integer';

export default function(options) {

	options = options || {};

	if(options.style !== 'decimal' && options.style !== 'percent') {
		options.style = 'decimal';
	}
	options.minimumFractionDigits = validateInteger(
		'minimumFractionDigits',
		options.minimumFractionDigits,
		0,
		0,
		20
	);
	options.maximumFractionDigits = validateInteger(
		'maximumFractionDigits',
		options.maximumFractionDigits,
		Math.max(options.minimumFractionDigits, 3),
		0,
		20
	);

	if(options.minimumFractionDigits > options.maximumFractionDigits) {
		throw new RangeError('maximumFractionDigits value is out of range.');
	}

	return options;

}
