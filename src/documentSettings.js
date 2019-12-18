import {defaultLocale, supportedLocales} from './common.js';

let hasInit = false;
let htmlElem = null;
const documentLocaleSettings = {
	language: defaultLocale,
	fallbackLanguage: defaultLocale,
	overrides: {},
	timezone: {
		name: '',
		identifier: ''
	}
};

const observer = new MutationObserver((mutations) => {
	for (let i = 0; i < mutations.length; i++) {
		const mutation = mutations[i];
		if (mutation.attributeName === 'lang') {
			documentLocaleSettings.language = normalize(htmlElem.getAttribute('lang'));
		} else if (mutation.attributeName === 'data-lang-default') {
			documentLocaleSettings.fallbackLanguage = normalize(htmlElem.getAttribute('data-lang-default'));
		} else if (mutation.attributeName === 'data-intl-overrides') {
			documentLocaleSettings.overrides = tryParseHtmlElemAttr('data-intl-overrides', {});
		} else if (mutation.attributeName === 'data-timezone') {
			documentLocaleSettings.timezone = tryParseHtmlElemAttr('data-timezone', {name: '', identifier: ''});
		}
	}
});

function init() {

	if (hasInit) return;
	hasInit = true;

	htmlElem = window.document.getElementsByTagName('html')[0];
	documentLocaleSettings.language = normalize(htmlElem.getAttribute('lang'));
	documentLocaleSettings.fallbackLanguage = normalize(htmlElem.getAttribute('data-lang-default'));
	documentLocaleSettings.overrides = tryParseHtmlElemAttr('data-intl-overrides', {});
	documentLocaleSettings.timezone = tryParseHtmlElemAttr('data-timezone', {name: '', identifier: ''});

	observer.observe(htmlElem, { attributes: true });

}

function tryParseHtmlElemAttr(attrName, defaultValue) {
	if (htmlElem.hasAttribute(attrName)) {
		try {
			return JSON.parse(htmlElem.getAttribute(attrName));
		} catch (e) {
			// swallow exception
		}
	}
	return defaultValue;
}

/*export function addListener(cb) {
	init();
	listeners.push(cb);
	cb(documentLanguage, documentLanguageFallback);
}*/

/*export function removeListener(cb) {
	const index = listeners.indexOf(cb);
	if (index < 0) return;
	listeners.splice(index, 1);
	if (listeners.length === 0) {
		observer.disconnect();
		hasInit = false;
	}
}*/

function normalize(langTag) {

	if (langTag === undefined || langTag === null) {
		return defaultLocale;
	}

	langTag = langTag.trim().toLowerCase();

	const subtags = langTag.split('-');
	if (subtags.length < 2) {
		return langTag;
	}

	return `${subtags[0]}-${subtags[subtags.length - 1]}`;

}

function tryResolve(langTag) {

	if (supportedLocales.indexOf(langTag) > -1) {
		return langTag;
	}

	for (let i = 0; i < supportedLocales.length; i++) {
		if (supportedLocales[i].substring(0, 1) === langTag.substring(0, 1)) {
			return supportedLocales[i];
		}
	}

	return null;
}

export function getDocumentLocaleSettings() {
	init();
	return documentLocaleSettings;
}

export function setDocumentLocaleOverrides(overrides) {
	init();
	documentLocaleSettings.overrides = overrides;
}

export function getLanguage() {
	init();
	const langTag = tryResolve(documentLocaleSettings.language) ||
		tryResolve(documentLocaleSettings.fallbackLanguage) || defaultLocale;
	return langTag;
}
