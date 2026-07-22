import { defaultLocale, resolveSupportedLocale } from './supported.js';
import { getDocumentLocaleSettings } from '../common.js';

const localeDataTarget = {};

// block deletions and existing property redefinitions
export const localeData = new Proxy(localeDataTarget, {
	deleteProperty() { return false; },
	defineProperty() { return false; }
});

const documentLocaleSettings = getDocumentLocaleSettings();

let currentLocale;
let localeDataPromise = Promise.resolve();

Object.defineProperty(localeDataTarget, 'then', { value: (...args) => localeDataPromise.then(...args) });
Object.defineProperty(localeDataTarget, 'catch', { value: (...args) => localeDataPromise.catch(...args) });
Object.defineProperty(localeDataTarget, 'finally', { value: (...args) => localeDataPromise.finally(...args) });

async function setLocaleData() {
	if (currentLocale === documentLocaleSettings.language) return;
	const resolvedLanguage = resolveSupportedLocale(documentLocaleSettings.language || documentLocaleSettings.fallbackLanguage || defaultLocale);
	const newData = deepFreeze((await import(`./locales/${resolvedLanguage}.js`)).default);

	Object.keys(newData).forEach(k => localeDataTarget[k] = newData[k]);

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
Object.preventExtensions(localeDataTarget);
