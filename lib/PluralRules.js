const localeData = {
	mi: {
		aliases: ['mri', 'mao'],
		cardinal: {
			locale: 'mi',
			pluralCategories : [ 'one', 'other' ],
			shim: true
		},
		ordinal: {
			locale: 'mi',
			pluralCategories : [ 'other' ],
			shim: true
		},
		select(n, ord) {
			return !ord && n === 1 ? 'one' : 'other';
		}
	}
};

function getCanonicalLocales(locales) {
	const mappedLocales = [locales].flat().map(locale => {
		for (const canonicalLocale in localeData) {
			if (localeData[canonicalLocale].aliases.includes(locale)) {
				return canonicalLocale;
			}
		}
		return locale;
	});
	return Intl.getCanonicalLocales(mappedLocales);
}

class PluralRules extends Intl.PluralRules {

	static shim = true;
	static supportedLocalesOf(locales) {
		return [locales].flat().map(l => {
			const canonicalLocale = getCanonicalLocales(l)[0];
			if (localeData[canonicalLocale]) {
				return canonicalLocale;
			}
			return super.supportedLocalesOf(l);
		}).flat();
	}
	#localeData;
	#locale;
	#type;

	constructor(locales, options = {}) {
		super(locales, options);
		this.#locale = PluralRules.supportedLocalesOf(getCanonicalLocales(locales))[0];
		this.#type = options.type ?? 'cardinal';
		if (localeData[this.#locale]) {
			this.#localeData = localeData[this.#locale];
		}
	}

	resolvedOptions() {
		return { ...super.resolvedOptions(), ...this.#localeData?.[this.#type] };
	}

	select(n) {
		if (this.#localeData) {
			return localeData[this.#locale].select(n, this.#type === 'ordinal');
		} else {
			return super.select(n);
		}
	}

}

Object.defineProperty(Intl, 'PluralRules', {
	value: PluralRules,
	writable: true,
	enumerable: false,
	configurable: true,
});
