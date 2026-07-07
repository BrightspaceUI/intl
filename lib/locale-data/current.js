import { getDocumentLocaleSettings } from '../common.js';

import { resolveSupportedLocale } from './supported.js';

export const localeData = {};

const documentLocaleSettings = getDocumentLocaleSettings();

let currentLocale;

async function setLocaleData() {
	if (currentLocale === documentLocaleSettings.language) return;
	const resolvedLanguage = resolveSupportedLocale(documentLocaleSettings.language);
	Object.keys(localeData).forEach(k => delete localeData[k]);
	//documentLocaleSettings._cache.delete('dateTimeDescriptor');
	Object.assign(localeData, (await import(`./locales/${resolvedLanguage}.js`)).default);
	currentLocale = documentLocaleSettings.language;
	document.dispatchEvent(new CustomEvent('document-locale-data-change', { detail: { language: resolvedLanguage } }));
}

export function registerLocaleDataListener() {
	documentLocaleSettings.addChangeListener(setLocaleData);
}

registerLocaleDataListener();
await setLocaleData();
