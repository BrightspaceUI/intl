import {
	defaultLocale,
	getDocumentLocaleSettings,
	getLanguage,
	supportedBaseLocales,
	supportedLocales
} from '../lib/common.js';
import { expect } from '@brightspace-ui/testing';

describe('common', () => {

	const htmlElem = window.document.getElementsByTagName('html')[0];

	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => {
		htmlElem.removeAttribute('lang');
		htmlElem.removeAttribute('data-lang-default');
		htmlElem.removeAttribute('data-intl-overrides');
		htmlElem.removeAttribute('data-timezone');
		htmlElem.removeAttribute('data-oslo');
		documentLocaleSettings.reset();
	});

	it('should default to "en"', () => {
		expect(defaultLocale).to.equal('en');
	});

	it('should deep copy the default locale settings', () => {
		documentLocaleSettings.timezone.name = 'Foo';
		documentLocaleSettings.timezone.identifier = 'bar';
		documentLocaleSettings.reset();
		expect(documentLocaleSettings.timezone.name).to.equal('');
		expect(documentLocaleSettings.timezone.identifier).to.equal('');
	});

	describe('getLanguage', () => {
		it('should use "fallback" if no "lang" is present', async() => {
			htmlElem.setAttribute('data-lang-default', 'fr');
			documentLocaleSettings.sync();
			const value = getLanguage();
			expect(value).to.equal('fr');
		});
		it('should use "lang" if no "fallback" is present', async() => {
			htmlElem.setAttribute('lang', 'ar');
			documentLocaleSettings.sync();
			const value = getLanguage();
			expect(value).to.equal('ar');
		});
		it('should use "fallback" if "lang" is invalid', async() => {
			htmlElem.setAttribute('lang', 'zz');
			htmlElem.setAttribute('data-lang-default', 'pt');
			documentLocaleSettings.sync();
			const value = getLanguage();
			expect(value).to.equal('pt');
		});
		it('should use "lang" when "fallback" is invalid', async() => {
			htmlElem.setAttribute('lang', 'de');
			htmlElem.setAttribute('data-lang-default', 'zz');
			documentLocaleSettings.sync();
			const value = getLanguage();
			expect(value).to.equal('de');
		});
		it('should use "lang" over "fallback" when both are valid', async() => {
			htmlElem.setAttribute('lang', 'de');
			htmlElem.setAttribute('data-lang-default', 'es');
			documentLocaleSettings.sync();
			const value = getLanguage();
			expect(value).to.equal('de');
		});
		it('should use default if "lang" and "fallback" are invalid', async() => {
			htmlElem.setAttribute('lang', 'zz');
			htmlElem.setAttribute('data-lang-default', 'yy');
			documentLocaleSettings.sync();
			const value = getLanguage();
			expect(value).to.equal(defaultLocale);
		});
		it('should use default if "lang" and "fallback" are missing', async() => {
			const value = getLanguage();
			expect(value).to.equal(defaultLocale);
		});
		it('should use regional if specified', async() => {
			htmlElem.setAttribute('lang', 'en-CA');
			documentLocaleSettings.sync();
			const value = getLanguage();
			expect(value).to.equal('en-ca');
		});
		it('should use base language if regional is missing', async() => {
			htmlElem.setAttribute('lang', 'en-AU');
			documentLocaleSettings.sync();
			const value = getLanguage();
			expect(value).to.equal('en');
		});
		it('should match language in a case-insensitive way', async() => {
			htmlElem.setAttribute('lang', 'zH-Cn');
			documentLocaleSettings.sync();
			const value = getLanguage();
			expect(value).to.equal('zh-cn');
		});
		supportedLocales.forEach((locale) => {
			it(`should resolve supported locale "${locale}"`, () => {
				htmlElem.setAttribute('lang', locale);
				documentLocaleSettings.sync();
				const value = getLanguage();
				expect(value).to.equal(locale);
			});
		});
		supportedBaseLocales.forEach((baseLocale) => {
			it(`should resolve supported base locale "${baseLocale}"`, () => {
				htmlElem.setAttribute('lang', baseLocale);
				documentLocaleSettings.sync();
				const value = getLanguage();
				expect(value).to.equal(baseLocale);
			});
		});
	});

	describe('oslo', () => {
		it('should default to null config', () => {
			documentLocaleSettings.sync();
			const value = documentLocaleSettings.oslo;
			expect(value).to.deep.equal({ collection: null, batch: null, version: null });
		});
		it('should parse json config', () => {
			htmlElem.setAttribute('data-oslo', '{"collection":"/path/to/1","batch":"/path/to/2","version":"abc123"}');
			documentLocaleSettings.sync();
			const value = documentLocaleSettings.oslo;
			expect(value).to.deep.equal({ collection: '/path/to/1', batch: '/path/to/2', version: 'abc123' });
		});
	});

	describe('document mutations', () => {
		it('should update language if "lang" gets set', (done) => {
			const cb = () => {
				expect(getLanguage()).to.equal('fr');
				documentLocaleSettings.removeChangeListener(cb);
				done();
			};
			documentLocaleSettings.addChangeListener(cb);
			htmlElem.setAttribute('lang', 'fr');
		});
		it('should update language if "lang" is not set and "fallback" gets set', (done) => {
			const cb = () => {
				expect(getLanguage()).to.equal('de');
				documentLocaleSettings.removeChangeListener(cb);
				done();
			};
			htmlElem.removeAttribute('lang');
			documentLocaleSettings._languageInitial = null;
			documentLocaleSettings.reset();
			documentLocaleSettings.addChangeListener(cb);
			htmlElem.setAttribute('data-lang-default', 'de');
		});
		it('should not update language if "lang" is set and "fallback" gets set', (done) => {
			let count = 0;
			const cb = () => {
				count++;
				if (count === 1) {
					expect(getLanguage()).to.equal('fr');
					htmlElem.setAttribute('data-lang-default', 'de');
				} else if (count === 2) {
					expect(getLanguage()).to.equal('fr');
					documentLocaleSettings.removeChangeListener(cb);
					done();
				}
			};
			documentLocaleSettings.addChangeListener(cb);
			htmlElem.setAttribute('lang', 'fr');
		});
		it('should use default if "lang" is removed', (done) => {
			let count = 0;
			const cb = () => {
				count++;
				if (count === 1) {
					expect(getLanguage()).to.equal('es');
					htmlElem.removeAttribute('lang');
				} else if (count === 2) {
					expect(getLanguage()).to.equal(defaultLocale);
					documentLocaleSettings.removeChangeListener(cb);
					done();
				}
			};
			documentLocaleSettings.addChangeListener(cb);
			htmlElem.setAttribute('lang', 'es');
		});
		it('should use default if "lang" is not set and "fallback" is removed', (done) => {
			let count = 0;
			const cb = () => {
				count++;
				if (count === 1) {
					expect(getLanguage()).to.equal('es');
					htmlElem.removeAttribute('data-lang-default');
				} else if (count === 2) {
					expect(getLanguage()).to.equal(defaultLocale);
					documentLocaleSettings.removeChangeListener(cb);
					done();
				}
			};
			htmlElem.removeAttribute('lang');
			documentLocaleSettings._languageInitial = null;
			documentLocaleSettings.reset();
			documentLocaleSettings.addChangeListener(cb);
			htmlElem.setAttribute('data-lang-default', 'es');
		});
		it('should update timezone if "timezone" gets changed', (done) => {
			const cb = () => {
				expect(documentLocaleSettings.timezone).to.deep.equal({ name: 'Canada - Vancouver', identifier: 'America/Vancouver' });
				documentLocaleSettings.removeChangeListener(cb);
				done();
			};
			documentLocaleSettings.addChangeListener(cb);
			htmlElem.setAttribute('data-timezone', '{"name":"Canada - Vancouver", "identifier":"America/Vancouver"}');
		});
		it('should update oslo if "oslo" gets changed', (done) => {
			const cb = () => {
				expect(documentLocaleSettings.oslo).to.deep.equal({ batch: '/path/to/2', collection: '/path/to/1', version: 'abc123' });
				documentLocaleSettings.removeChangeListener(cb);
				done();
			};
			documentLocaleSettings.addChangeListener(cb);
			htmlElem.setAttribute('data-oslo', '{"collection":"/path/to/1","batch":"/path/to/2","version":"abc123"}');
		});
		it('should update overrides if "intl-overrides" gets changed', (done) => {
			const cb = () => {
				expect(documentLocaleSettings.overrides).to.deep.equal({ 'date': { 'hour24': true } });
				documentLocaleSettings.removeChangeListener(cb);
				done();
			};
			documentLocaleSettings.addChangeListener(cb);
			htmlElem.setAttribute('data-intl-overrides', '{"date": {"hour24": true}}');
		});
	});

	describe('setDocumentLanguage', () => {

		it('should set underlying language', () => {
			documentLocaleSettings.language = 'fr-ca';
			expect(documentLocaleSettings.language).to.equal('fr-ca');
		});

		it('should trigger change listeners', (done) => {
			const cb = () => {
				expect(documentLocaleSettings.language).to.equal('fr-ca');
				documentLocaleSettings.removeChangeListener(cb);
				done();
			};
			documentLocaleSettings.addChangeListener(cb);
			documentLocaleSettings.language = 'fr-ca';
		});

		it('should not trigger change listeners if normalized value does not change', (done) => {
			documentLocaleSettings.language = 'en';
			const cb = () => {
				expect(documentLocaleSettings.language).to.equal('fr-fr');
				documentLocaleSettings.removeChangeListener(cb);
				done();
			};
			documentLocaleSettings.addChangeListener(cb);
			documentLocaleSettings.language = 'EN ';
			documentLocaleSettings.language = 'fr-fr';
		});

		[undefined, null].forEach((locale) => {
			it(`should normalize "${locale}" to null`, () => {
				documentLocaleSettings.language = locale;
				expect(documentLocaleSettings.language).to.be.null;
			});
		});

		[
			'en-US',
			'EN-us',
			'  en-Us ',
			'en-ab-cd-ef-US'
		].forEach((locale) => {
			it(`should normalize "${locale}" to "en-us"`, () => {
				documentLocaleSettings.language = locale;
				expect(documentLocaleSettings.language).to.equal('en-us');
			});
		});

	});

	describe('overrides', () => {

		it('should remove overridden day periods', () => {
			documentLocaleSettings.overrides = {
				date: {
					calendar: {
						dayPeriods: 'foo'
					}
				}
			};
			expect(documentLocaleSettings.overrides.date.calendar.dayPeriods).to.be.undefined;
		});

		it('should remove overridden time formats', () => {
			documentLocaleSettings.overrides = {
				date: {
					formats: {
						timeFormats: 'foo'
					}
				}
			};
			expect(documentLocaleSettings.overrides.date.formats.timeFormats).to.be.undefined;
		});

	});

	describe('cache', () => {

		let called;
		const provider = () => {
			called++;
			return 'foo';
		};

		beforeEach(() => called = 0);

		it('should call provider to get value', () => {
			const value = documentLocaleSettings.getCacheItem('key', provider);
			expect(value).to.equal('foo');
			expect(called).to.equal(1);
		});

		it('should only call provider once', () => {
			const val1 = documentLocaleSettings.getCacheItem('key', provider);
			const val2 = documentLocaleSettings.getCacheItem('key', provider);
			expect(val1).to.equal('foo');
			expect(val2).to.equal('foo');
			expect(called).to.equal(1);
		});

		['language', 'fallbackLanguage', 'overrides'].forEach(prop => {
			it(`should invalidate cache when ${prop} is set`, () => {
				documentLocaleSettings.getCacheItem('key', provider);
				documentLocaleSettings[prop] = 'zz';
				documentLocaleSettings.getCacheItem('key', provider);
				expect(called).to.equal(2);
			});
		});

		it('should invalidate cache when reset is called', () => {
			documentLocaleSettings.getCacheItem('key', provider);
			documentLocaleSettings.reset();
			documentLocaleSettings.getCacheItem('key', provider);
			expect(called).to.equal(2);
		});

	});

});
