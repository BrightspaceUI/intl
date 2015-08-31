let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as provider} from '../src/locale-provider';

describe('locale-provider', () => {

	[
		undefined,
		null,
		'',
		[],
		[null],
		[undefined],
		['']
	].forEach((locales) => {
		it(`should default "${locales}" to "en" locale`, () => {
			const localeData = provider(locales);
			expect(localeData.locale).to.equal('en');
		});
	});

	it('should load specified locale', () => {
		const localeData = provider('fr-CA');
		expect(localeData.locale).to.equal('fr-CA');
	});

	it('should treat locale as case-insensitive', () => {
		const localeData = provider('Fr-Ca');
		expect(localeData.locale).to.equal('fr-CA');
	});

	it('should load first match when multiple locales are specified', () => {
		const localeData = provider(['en-GB', 'en-CA']);
		expect(localeData.locale).to.equal('en-GB');
	});

	it('should load base language if locale is missing', () => {
		const localeData = provider(['fr-FR']);
		expect(localeData.locale).to.equal('fr');
	});

	it('should fallback when multiple locales are specified', () => {
		const localeData = provider(['ab', 'en-CA']);
		expect(localeData.locale).to.equal('en-CA');
	});

	it('should prefer fallback over base language', () => {
		const localeData = provider(['fr-FR', 'fr-CA']);
		expect(localeData.locale).to.equal('fr-CA');
	});

	it('should override groupSize', () => {
		const options = {number:{groupSize: 9}};
		const localeData = provider('en-CA', options);
		expect(localeData.number.groupSize).to.equal(9);
	});

	it('should override negative symbol', () => {
		const options = {number: {symbols: {negative: '*'}}};
		const localeData = provider('en-CA', options);
		expect(localeData.number.symbols.negative).to.equal('*');
	});

	it('should override positive percent pattern', () => {
		const options = {number: {patterns: {percent: {positivePattern: '&'}}}};
		const localeData = provider('en-CA', options);
		expect(localeData.number.patterns.percent.positivePattern).to.equal('&');
	});

});
