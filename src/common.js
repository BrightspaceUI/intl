export const supportedLocales = [
	'ar-sa',
	'da-dk',
	'de-de',
	'en-ca',
	'en-gb',
	'en-us',
	'es-mx',
	'fr-fr',
	'fr-ca',
	'ja-jp',
	'ko-kr',
	'nl-nl',
	'pt-br',
	'sv-se',
	'tr-tr',
	'zh-cn',
	'zh-tw'
];

export const defaultLocale = 'en-us';

export function merge(obj1, obj2) {
	if (obj2 === undefined || obj2 === null || typeof(obj2) !== 'object') {
		return;
	}
	for (var i in obj2) {
		// eslint-disable-next-line no-prototype-builtins
		if (obj1.hasOwnProperty(i)) {
			if (typeof(obj2[i]) === 'object' && typeof(obj1[i]) === 'object') {
				merge(obj1[i], obj2[i]);
			} else {
				obj1[i] = obj2[i];
			}
		}
	}
}

export function validateInteger(name, value, defaultValue, min, max) {

	if (value === undefined || value === null) {
		value = defaultValue;
	}
	if (typeof value === 'string') {
		value = parseInt(value);
	}
	if (isNaN(value) || typeof value !== 'number' || (min !== undefined && value < min) || (max !== undefined && value > max)) {
		throw new RangeError(name + ' value is out of range.');
	}

	return value;

}
