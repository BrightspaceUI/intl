import {
	defaultLocale,
	getDocumentLocaleSettings,
	getLanguage,
	supportedBaseLocales,
	supportedLocales
} from '../lib/common.js';

var expect = chai.expect;

describe('common', () => {

	const htmlElem = window.document.getElementsByTagName('html')[0];

	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => {
		htmlElem.removeAttribute('lang');
		htmlElem.removeAttribute('data-lang-default');
		htmlElem.removeAttribute('data-intl-overrides');
		htmlElem.removeAttribute('data-timezone');
	});

	it('should default to "en"', () => {
		expect(defaultLocale).to.equal('en');
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

	describe('setDocumentLanguage', () => {

		it('should set underlying language', () => {
			documentLocaleSettings.language = 'fr-ca';
			expect(documentLocaleSettings.language).to.equal('fr-ca');
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

});
