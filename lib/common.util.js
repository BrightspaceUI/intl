export function merge(obj1, obj2, keepOriginal = false) {
	if (obj2 === undefined || obj2 === null || typeof (obj2) !== 'object') {
		return;
	}
	for (const i in obj2) {
		// eslint-disable-next-line no-prototype-builtins
		if (obj1.hasOwnProperty(i)) {
			if (typeof (obj2[i]) === 'object' && typeof (obj1[i]) === 'object') {
				merge(obj1[i], obj2[i]);
			} else {
				if (keepOriginal) obj1[`_original_${i}`] = obj1[i];
				obj1[i] = obj2[i];
			}
		}
	}
	return obj1;
}

export function validateFormatValue(value) {
	if (value === undefined || value === null) {
		return 0;
	}
	if (typeof value === 'string') {
		value = parseFloat(value);
	}
	if (isNaN(value) || typeof value !== 'number') {
		throw new RangeError('value is out of range.');
	}
	return value;
}
