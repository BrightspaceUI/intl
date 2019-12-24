export const defaultLocale = 'en-us';
const documentLocaleSettings = {
	language: defaultLocale,
	fallbackLanguage: defaultLocale,
	overrides: {},
	timezone: {
		name: '',
		identifier: ''
	}
};
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
let hasInit = false;
let htmlElem = null;

const observer = new MutationObserver((mutations) => {
	for (let i = 0; i < mutations.length; i++) {
		const mutation = mutations[i];
		if (mutation.attributeName === 'lang') {
			setDocumentLanguage(htmlElem.getAttribute('lang'));
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
	setDocumentLanguage(htmlElem.getAttribute('lang'));
	documentLocaleSettings.fallbackLanguage = normalize(htmlElem.getAttribute('data-lang-default'));
	documentLocaleSettings.overrides = tryParseHtmlElemAttr('data-intl-overrides', {});
	documentLocaleSettings.timezone = tryParseHtmlElemAttr('data-timezone', {name: '', identifier: ''});

	observer.observe(htmlElem, { attributes: true });

}

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

export function getDocumentLocaleSettings() {
	init();
	return documentLocaleSettings;
}

export function getLanguage() {
	init();
	const langTag = tryResolve(documentLocaleSettings.language) ||
		tryResolve(documentLocaleSettings.fallbackLanguage) || defaultLocale;
	return langTag;
}

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

export function setDocumentLocaleOverrides(overrides) {
	init();
	documentLocaleSettings.overrides = overrides;
}

export function setDocumentLocaleTimezone(timezone) {
	init();
	documentLocaleSettings.timezone = timezone;
}

export function setDocumentLanguage(language) {
	init();
	documentLocaleSettings.language = normalize(language);
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
