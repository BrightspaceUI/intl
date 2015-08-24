export default function(name, value, defaultValue, min, max) {

	if(value === undefined || value === null) {
		value = defaultValue;
	}
	if(typeof value === 'string') {
		value = parseInt(value);
	}
	if(isNaN(value) || typeof value !== 'number' || (min !== undefined && value < min) || (max !== undefined && value > max)) {
		throw new RangeError(`${name} value is out of range.`);
	}

	return value;

}
