const host = document.documentElement;

const DEFAULTS = {
	pseudoLocalization: {},
	_fallbackLanguage: null,
	overrides: {},
	timezone: { name: '', identifier: '' },
	oslo: { batch: null, collection: null, version: null }
};

export class DocumentLocaleSettings {

	constructor() {
		this._cache = new Map();
		this._listeners = [];
		this._overrides = DEFAULTS.overrides;

		const observer = new MutationObserver(this._handleObserverChange.bind(this));
		observer.observe(host, { attributes: true });

		this.sync();
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
		this._listeners = [];
		Object.assign(this, JSON.parse(JSON.stringify(DEFAULTS)));
	}

	sync() {
		this.language = host.getAttribute('lang');
		this._languageInitial ??= this._language;
		this.fallbackLanguage = host.getAttribute('data-lang-default');
		this.overrides = this._tryParseHtmlElemAttr('data-intl-overrides', DEFAULTS.overrides);
		this.timezone = this._tryParseHtmlElemAttr('data-timezone', DEFAULTS.timezone);
		this.pseudoLocalization = this._tryParseHtmlElemAttr('data-pseudo-localization', DEFAULTS.pseudoLocalization);
		this.oslo = this._tryParseHtmlElemAttr('data-oslo', DEFAULTS.oslo);
	}

	_handleObserverChange(mutations) {
		let localeAttributeChange = false;
		for (let i = 0; i < mutations.length; i++) {
			const mutation = mutations[i];
			if (mutation.attributeName === 'lang') {
				this.language = host.getAttribute('lang');
			} else if (mutation.attributeName === 'data-lang-default') {
				this.fallbackLanguage = host.getAttribute('data-lang-default');
			} else if (mutation.attributeName === 'data-intl-overrides') {
				this.overrides = this._tryParseHtmlElemAttr('data-intl-overrides', DEFAULTS.overrides);
			} else if (mutation.attributeName === 'data-timezone') {
				this.timezone = this._tryParseHtmlElemAttr('data-timezone', DEFAULTS.timezone);
				localeAttributeChange = true;
			} else if (mutation.attributeName === 'data-pseudo-localization') {
				this.pseudoLocalization = this._tryParseHtmlElemAttr('data-pseudo-localization', DEFAULTS.pseudoLocalization);
				localeAttributeChange = true;
			} else if (mutation.attributeName === 'data-oslo') {
				this.oslo = this._tryParseHtmlElemAttr('data-oslo', DEFAULTS.oslo);
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
		if (host.hasAttribute(attrName)) {
			try {
				return JSON.parse(host.getAttribute(attrName));
			} catch {
				// swallow exception
			}
		}
		return defaultValue;
	}

}
