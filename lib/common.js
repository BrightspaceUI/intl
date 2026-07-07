import { defaultLocale, supportedBaseLocales, supportedLangpacks, supportedLocales, supportedLocalesDetails } from './locale-data/supported.js';
import { DocumentLocaleSettings } from './document-locale-settings.js';

export { defaultLocale, supportedBaseLocales, supportedLangpacks, supportedLocalesDetails, supportedLocales };

function tryResolve(langTag) {

	if (langTag === undefined || langTag === null) return null;

	if (supportedLocales.indexOf(langTag) > -1) {
		return langTag;
	}

	const subtags = langTag.split('-');
	if (subtags.length < 2) {
		if (supportedBaseLocales.indexOf(langTag) > -1) {
			return langTag;
		}
		return null;
	}

	if (supportedBaseLocales.indexOf(subtags[0]) > -1) {
		return subtags[0];
	}

	return null;

}

export function getLanguage() {
	const settings = getDocumentLocaleSettings();
	const langTag = tryResolve(settings.language) ||
		tryResolve(settings.fallbackLanguage) || defaultLocale;
	return langTag;
}

export function merge(obj1, obj2, keepOriginal = false) {
	if (obj2 === undefined || obj2 === null || typeof(obj2) !== 'object') {
		return;
	}
	for (const i in obj2) {
		// eslint-disable-next-line no-prototype-builtins
		if (obj1.hasOwnProperty(i)) {
			if (typeof(obj2[i]) === 'object' && typeof(obj1[i]) === 'object') {
				merge(obj1[i], obj2[i]);
			} else {
				if (keepOriginal) obj1[`_original_${i}`] = obj1[i];
				obj1[i] = obj2[i];
			}
		}
	}
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

let documentLocaleSettings = null;
export function getDocumentLocaleSettings() {
	if (documentLocaleSettings === null) {
		documentLocaleSettings = new DocumentLocaleSettings();
	}
	return documentLocaleSettings;
}

const localeRegEx = /[^a-zA-Z0-9-]/g;

function updateLocalNames() {
	const possibleLocales = [documentLocaleSettings.language, navigator.language, defaultLocale].filter(l => l && !localeRegEx.test(l));
	let localName;
	try {
		localName = new Intl.DisplayNames(possibleLocales, { type: 'language' });
	} catch {
		return;
	}
	supportedLocalesDetails.forEach(l => {
		l.localName = localName.of(l.overrideCode || l.code);
	});
}

getDocumentLocaleSettings().addChangeListener(updateLocalNames);
updateLocalNames();
