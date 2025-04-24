import { DocumentLocaleSettings } from './document-locale-settings.js';

export const defaultLocale = 'en';
export const supportedBaseLocales = ['ar', 'cy', 'da', 'de', 'en', 'es', 'fr', 'haw', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'tr', 'zh'];
export const supportedLangpacks = ['ar', 'cy', 'da', 'de', 'en', 'en-gb', 'es', 'es-es', 'fr', 'fr-fr', 'fr-on', 'haw', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'tr', 'zh-cn', 'zh-tw'];

export const supportedLocalesDetails = [
	{ code: 'ar-sa', dir: 'rtl', name: 'العربية (المملكة العربية السعودية)' },
	{ code: 'cy-gb', dir: 'ltr', name: 'Cymraeg (Y Deyrnas Unedig)' },
	{ code: 'da-dk', dir: 'ltr', name: 'Dansk (danmark)' },
	{ code: 'de-de', dir: 'ltr', name: 'Deutsch (Deutschland)' },
	{ code: 'en-ca', dir: 'ltr', name: 'English (Canada)' },
	{ code: 'en-gb', dir: 'ltr', name: 'English (United Kingdom)' },
	{ code: 'en-us', dir: 'ltr', name: 'English (United States)' },
	{ code: 'es-es', dir: 'ltr', name: 'Español (España)' },
	{ code: 'es-mx', overrideCode: 'es-419', dir: 'ltr', name: 'Español (Latinoamérica)' },
	{ code: 'fr-ca', dir: 'ltr', name: 'Français (Canada)' },
	{ code: 'fr-fr', dir: 'ltr', name: 'Français (France)' },
	{ code: 'fr-on', overrideCode: 'fr-CA-Ontario', dir: 'ltr', name: 'Français (Ontario)' },
	{ code: 'haw-us', dir: 'ltr', name: 'ʻŌlelo Hawaiʻi (ʻAmelika Hui Pū ʻIa)' },
	{ code: 'hi-in', dir: 'ltr', name: 'हिंदी (भारत)' },
	{ code: 'ja-jp', dir: 'ltr', name: '日本語 (日本)' },
	{ code: 'ko-kr', dir: 'ltr', name: '한국어 (대한민국)' },
	{ code: 'mi-nz', dir: 'ltr', name: 'Māori (Aotearoa)' },
	{ code: 'nl-nl', dir: 'ltr', name: 'Nederlands (Nederland)' },
	{ code: 'pt-br', dir: 'ltr', name: 'Português (Brasil)' },
	{ code: 'sv-se', dir: 'ltr', name: 'Svenska (Sverige)' },
	{ code: 'tr-tr', dir: 'ltr', name: 'Türkçe (Türkiye)' },
	{ code: 'zh-cn', overrideCode: 'zh-Hans', dir: 'ltr', name: '中文(简体)' },
	{ code: 'zh-tw', overrideCode: 'zh-Hant', dir: 'ltr', name: '中文(繁体)' }
];
export const supportedLocales = supportedLocalesDetails.map((l) => l.code);

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

export function merge(obj1, obj2) {
	if (obj2 === undefined || obj2 === null || typeof(obj2) !== 'object') {
		return;
	}
	for (const i in obj2) {
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
