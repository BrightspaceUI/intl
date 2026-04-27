import { getDocumentLocaleSettings } from '../document-locale-settings.js';

import { resolveSupportedLocale } from './supported.js';

export const localeData = {};

const documentLocaleSettings = getDocumentLocaleSettings();

async function setLocaleData() {
	const resolvedLanguage = resolveSupportedLocale(documentLocaleSettings.language);
	Object.keys(localeData).forEach(k => delete localeData[k]);
	Object.assign(localeData, (await import(`./locales/${resolvedLanguage}.js`)).default);
}

documentLocaleSettings.addChangeListener(setLocaleData);

setLocaleData();
