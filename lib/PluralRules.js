//import '@formatjs/intl-pluralrules/polyfill.js';

const customLocales = ['mi'];

const originalPluralRules = Intl.PluralRules;

/*
function PluralRules(locale) {
  if (typeof locale === 'string' && customLocales.includes(Intl.getCanonicalLocales(locale))) {

  } else {
    reutrn originalPluralRules(...arguments)
  }
}
*/

const localeData = {
	mi: {
		cardinal: {
			locale: 'mi',
			pluralCategories : [ 'one', 'other' ],
		},
		ordinal: {
			locale: 'mi',
			pluralCategories : [ 'other' ],
		},
		select(n, ord) {
			return !ord && n === 1 ? 'one' : 'other';
		}
	}
};

class PluralRules extends Intl.PluralRules {

	#localeData;
	#locale;
	#type;

	constructor(locales, options = {}) {
		super();
		this.#locale = Intl.getCanonicalLocales(locales)[0];
		this.#type = options.type ?? 'cardinal';
		if (customLocales.includes(this.#locale)) {
			this.#localeData = localeData[this.#locale];
		}
	}

	resolvedOptions() {
		return { ...super.resolvedOptions(), ...this.#localeData[this.#type] };
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

console.log(new Intl.PluralRules('mi', { type: 'ordinal' }).resolvedOptions());
console.log(new Intl.PluralRules('mi', { type: 'cardinal' }).resolvedOptions());
console.log(new Intl.PluralRules('en', { type: 'cardinal' }).resolvedOptions());
