import { getDocumentLocaleSettings } from '../common.js';

import { resolveSupportedLocale } from './supported.js';

export const localeData = {};

const documentLocaleSettings = getDocumentLocaleSettings();

let currentLocale;
let localeDataPromise = Promise.resolve();

Object.defineProperty(localeData, 'then', { value: (...args) => localeDataPromise.then(...args) });
Object.defineProperty(localeData, 'catch', { value: (...args) => localeDataPromise.catch(...args) });
Object.defineProperty(localeData, 'finally', { value: (...args) => localeDataPromise.finally(...args) });

async function setLocaleData() {
	if (currentLocale === documentLocaleSettings.language) return;
	const resolvedLanguage = resolveSupportedLocale(documentLocaleSettings.language);
	const newData = deepFreeze((await import(`./locales/${resolvedLanguage}.js`)).default);

	Object.keys(localeData).forEach(k => {
		if (!(k in newData)) delete localeData[k];
	});

	// (re)define each key to keep the top-level (mostly) frozen
	Object.keys(newData).forEach(k => {
		Object.defineProperty(localeData, k, {
			value: newData[k],
			writable: false,
			enumerable: true,
			configurable: true
		});
	});

	currentLocale = documentLocaleSettings.language;
	document.dispatchEvent(new CustomEvent('document-locale-data-change', { detail: { language: resolvedLanguage } }));
}

function updateLocaleData() {
	localeDataPromise = setLocaleData();
	return localeDataPromise;
}

export function registerLocaleDataListener() {
	documentLocaleSettings.addChangeListener(updateLocaleData);
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
await updateLocaleData();
Object.preventExtensions(localeData);
