export const defaultLocale = 'en';
export const supportedBaseLocales = ['ar', 'cy', 'da', 'de', 'en', 'es', 'fr', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'tr', 'zh'];
export const supportedLangpacks = ['ar', 'cy', 'da', 'de', 'en', 'en-gb', 'es', 'es-es', 'fr', 'fr-fr', 'fr-on', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'tr', 'zh-cn', 'zh-tw'];
export const supportedLocalesDetails = [
	{ code: 'ar-sa', name: 'العربية' },
	{ code: 'cy-gb', name: 'Cymraeg (Y Deyrnas Unedig)' },
	{ code: 'da-dk', name: 'Dansk (danmark)' },
	{ code: 'de-de', name: 'Deutsch (Deutschland)' },
	{ code: 'en-ca', name: 'English (Canada)' },
	{ code: 'en-gb', name: 'English (United Kingdom)' },
	{ code: 'en-us', name: 'English (United States)' },
	{ code: 'es-es', name: 'Español (España)' },
	{ code: 'es-mx', name: 'Español (Latinoamérica)' },
	{ code: 'fr-ca', name: 'Français (Canada)' },
	{ code: 'fr-fr', name: 'Français (France)' },
	{ code: 'fr-on', name: 'Français (Ontario)' },
	{ code: 'hi-in', name: 'हिन्दी Hindi (India)' },
	{ code: 'ja-jp', name: '日本語 (日本)' },
	{ code: 'ko-kr', name: '한국어 (대한민국)' },
	{ code: 'mi-nz', name: 'Māori (Aotearoa)' },
	{ code: 'nl-nl', name: 'Nederlands (Nederland)' },
	{ code: 'pt-br', name: 'Português (Brasil)' },
	{ code: 'sv-se', name: 'Svenska (Sverige)' },
	{ code: 'tr-tr', name: 'Türkçe (Türkiye)' },
	{ code: 'zh-cn', name: '中文(中华人民共和国)' },
	{ code: 'zh-tw', name: '中文(台灣)' }
];
export const supportedLocales = supportedLocalesDetails.map((l) => l.code);

export const frauConfig = {
	defaultLangTag: defaultLocale,
	primary: supportedBaseLocales,
	regions: supportedLocales.map(l => l.replace(/\w\w$/, r => r.toUpperCase())),
	aliases: {
		'en-AU': 'en-GB'
	}
};

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

class DocumentLocaleSettings {

	constructor() {
		this._cache = new Map();
		this._htmlElem = window.document.getElementsByTagName('html')[0];
		this._listeners = [];
		this._overrides = {};
		this._observer = new MutationObserver(this._handleObserverChange.bind(this));
		this._observer.observe(this._htmlElem, { attributes: true });
		this.sync();
		this._languageInitial = this._language;
	}

	get fallbackLanguage() { return this._fallbackLanguage; }
	set fallbackLanguage(val) {
		const normalized = this._normalize(val);
		if (normalized === this._fallbackLanguage) return;
		this._cache.clear();
		this._fallbackLanguage = normalized;
		this._listeners.forEach((cb) => cb());
	}

	get language() { return this._language; }
	set language(val) {
		const normalized = this._normalize(val);
		if (normalized === this._language) return;
		this._cache.clear();
		this._language = normalized;
		this._listeners.forEach((cb) => cb());
	}

	get overrides() { return this._overrides; }
	set overrides(val) {
		if (val.date) {
			if (val.date.calendar) {
				delete val.date.calendar.dayPeriods;
			}
			if (val.date.formats) {
				delete val.date.formats.timeFormats;
			}
		}
		this._cache.clear();
		this._overrides = val;
		this._listeners.forEach((cb) => cb());
	}

	addChangeListener(cb) {
		this._listeners.push(cb);
	}

	getCacheItem(key, provider) {
		if (!this._cache.has(key)) {
			this._cache.set(key, provider());
		}
		return this._cache.get(key);
	}

	removeChangeListener(cb) {
		const index = this._listeners.indexOf(cb);
		if (index < 0) return;
		this._listeners.splice(index, 1);
	}

	reset() {
		this._cache.clear();
		this._language = this._languageInitial;
		this._fallbackLanguage = null;
		this.overrides = {};
		this.timezone = { name: '', identifier: '' };
		this._listeners = [];
		this.oslo = { batch: null, collection: null, version: null };
	}

	sync() {
		this.language = this._htmlElem.getAttribute('lang');
		this.fallbackLanguage = this._htmlElem.getAttribute('data-lang-default');
		this.overrides = this._tryParseHtmlElemAttr('data-intl-overrides', {});
		this.timezone = this._tryParseHtmlElemAttr('data-timezone', { name: '', identifier: '' });
		this.oslo = this._tryParseHtmlElemAttr('data-oslo', { batch: null, collection: null, version: null });
	}

	_handleObserverChange(mutations) {
		let localeAttributeChange = false;
		for (let i = 0; i < mutations.length; i++) {
			const mutation = mutations[i];
			if (mutation.attributeName === 'lang') {
				this.language = this._htmlElem.getAttribute('lang');
			} else if (mutation.attributeName === 'data-lang-default') {
				this.fallbackLanguage = this._htmlElem.getAttribute('data-lang-default');
			} else if (mutation.attributeName === 'data-intl-overrides') {
				this.overrides = this._tryParseHtmlElemAttr('data-intl-overrides', {});
			} else if (mutation.attributeName === 'data-timezone') {
				this.timezone = this._tryParseHtmlElemAttr('data-timezone', { name: '', identifier: '' });
				localeAttributeChange = true;
			} else if (mutation.attributeName === 'data-oslo') {
				this.oslo = this._tryParseHtmlElemAttr('data-oslo', { batch: null, collection: null, version: null });
				localeAttributeChange = true;
			}
		}
		if (localeAttributeChange) this._listeners.forEach((cb) => cb());
	}

	_normalize(langTag) {

		if (langTag === undefined || langTag === null) return null;

		langTag = langTag.trim().toLowerCase();

		const subtags = langTag.split('-');
		if (subtags.length < 2) {
			return langTag;
		}

		return `${subtags[0]}-${subtags[subtags.length - 1]}`;

	}

	_tryParseHtmlElemAttr(attrName, defaultValue) {
		if (this._htmlElem.hasAttribute(attrName)) {
			try {
				return JSON.parse(this._htmlElem.getAttribute(attrName));
			} catch (e) {
				// swallow exception
			}
		}
		return defaultValue;
	}

}

let documentLocaleSettings = null;
export function getDocumentLocaleSettings() {
	if (documentLocaleSettings === null) {
		documentLocaleSettings = new DocumentLocaleSettings();
	}
	return documentLocaleSettings;
}
