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
		try {
			l.localName = localName.of(l.overrideCode);
		} catch {
			l.localName = localName.of(l.code);
		}
	});
}

getDocumentLocaleSettings().addChangeListener(updateLocalNames);
updateLocalNames();
