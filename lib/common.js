import { DocumentLocaleSettings } from './document-locale-settings.js';

export const defaultLocale = 'en';
export const supportedBaseLocales = ['ar', 'cy', 'da', 'de', 'en', 'es', 'fr', 'haw', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'th', 'tr', 'vi', 'zh'];
export const supportedLangpacks = ['ar', 'cy', 'da', 'de', 'en', 'en-gb', 'es', 'es-es', 'fr', 'fr-fr', 'fr-on', 'haw', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'th', 'tr', 'vi', 'zh-cn', 'zh-tw'];

export const supportedLocalesDetails = [
	{ id: 16, code: 'ar-sa', pack: 'ar', dir: 'rtl', name: 'العربية (المملكة العربية السعودية)' },
	{ id: 31, code: 'cy-gb', pack: 'cy', dir: 'ltr', name: 'Cymraeg (Y Deyrnas Unedig)' },
	{ id: 28, code: 'da-dk', pack: 'da', dir: 'ltr', name: 'Dansk (danmark)' },
	{ id: 26, code: 'de-de', pack: 'de', dir: 'ltr', name: 'Deutsch (Deutschland)' },
	{ id: 13, code: 'en-ca', dir: 'ltr', name: 'English (Canada)' },
	{ id: 11, code: 'en-gb', pack: 'en-gb', dir: 'ltr', name: 'English (United Kingdom)' },
	{ id: 1, code: 'en-us', pack: 'en', dir: 'ltr', name: 'English (United States)' },
	{ id: 30, code: 'es-es', pack: 'es-es', dir: 'ltr', name: 'Español (España)' },
	{ id: 18, code: 'es-mx', pack: 'es', overrideCode: 'es-419', dir: 'ltr', name: 'Español (Latinoamérica)' },
	{ id: 2, code: 'fr-ca', pack: 'fr', dir: 'ltr', name: 'Français (Canada)' },
	{ id: 29, code: 'fr-fr', pack: 'fr-fr', dir: 'ltr', name: 'Français (France)' },
	{ id: 32, code: 'fr-on', pack: 'fr-on', overrideCode: 'fr-CA-Ontario', dir: 'ltr', name: 'Français (Ontario)' },
	{ id: 35, code: 'haw-us', pack: 'haw', dir: 'ltr', name: 'ʻŌlelo Hawaiʻi (ʻAmelika Hui Pū ʻIa)' },
	{ id: 33, code: 'hi-in', pack: 'hi', dir: 'ltr', name: 'हिंदी (भारत)' },
	{ id: 21, code: 'ja-jp', pack: 'ja', dir: 'ltr', name: '日本語 (日本)' },
	{ id: 22, code: 'ko-kr', pack: 'ko', dir: 'ltr', name: '한국어 (대한민국)' },
	{ id: 34, code: 'mi-nz', pack: 'mi', dir: 'ltr', name: 'Māori (Aotearoa)' },
	{ id: 25, code: 'nl-nl', pack: 'nl', dir: 'ltr', name: 'Nederlands (Nederland)' },
	{ id: 19, code: 'pt-br', pack: 'pt', dir: 'ltr', name: 'Português (Brasil)' },
	{ id: 24, code: 'sv-se', pack: 'sv', dir: 'ltr', name: 'Svenska (Sverige)' },
	{ id: 37, code: 'th-th', pack: 'th', dir: 'ltr', name: 'ไทย (ไทย)' },
	{ id: 23, code: 'tr-tr', pack: 'tr', dir: 'ltr', name: 'Türkçe (Türkiye)' },
	{ id: 36, code: 'vi-vn', pack: 'vi', dir: 'ltr', name: 'Tiếng Việt (Việt Nam)' },
	{ id: 17, code: 'zh-cn', pack: 'zh-cn', overrideCode: 'zh-Hans', dir: 'ltr', name: '中文(简体)' },
	{ id: 20, code: 'zh-tw', pack: 'zh-tw', overrideCode: 'zh-Hant', dir: 'ltr', name: '中文(繁体)' }
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
