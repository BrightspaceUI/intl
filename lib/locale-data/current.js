import { getDocumentLocaleSettings } from '../common.js';

import { resolveSupportedLocale } from './supported.js';

export const localeData = {};

const documentLocaleSettings = getDocumentLocaleSettings();

let currentLocale;

async function setLocaleData() {
	if (currentLocale === documentLocaleSettings.language) return;
	const resolvedLanguage = resolveSupportedLocale(documentLocaleSettings.language);
	Object.keys(localeData).forEach(k => delete localeData[k]);
	Object.assign(localeData, deepFreeze((await import(`./locales/${resolvedLanguage}.js`)).default));
	currentLocale = documentLocaleSettings.language;
	document.dispatchEvent(new CustomEvent('document-locale-data-change', { detail: { language: resolvedLanguage } }));
}

export function registerLocaleDataListener() {
	documentLocaleSettings.addChangeListener(setLocaleData);
}

function deepFreeze(obj) {
	for (const key of Reflect.ownKeys(obj)) {
		const value = obj[key];
		if ((value && typeof value === 'object') || (typeof value === 'function' && !value.prototype)) {
			deepFreeze(value);
		}
	}
	return Object.freeze(obj);
}

registerLocaleDataListener();
await setLocaleData();
