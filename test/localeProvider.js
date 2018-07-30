import provider from '../src/locale-provider.js';

var expect = chai.expect;

describe('locale-provider', function() {

	[
		undefined,
		null,
		'',
		[],
		[null],
		[undefined],
		['']
	].forEach(function(locales) {
		it('should default "' + locales + '" to "en" locale', function() {
			var localeData = provider(locales);
			expect(localeData.locale).to.equal('en');
		});
	});

	it('should load specified locale', function() {
		var localeData = provider('fr-CA');
		expect(localeData.locale).to.equal('fr-CA');
	});

	it('should treat locale as case-insensitive', function() {
		var localeData = provider('Fr-Ca');
		expect(localeData.locale).to.equal('fr-CA');
	});

	it('should load first match when multiple locales are specified', function() {
		var localeData = provider(['en-GB', 'en-CA']);
		expect(localeData.locale).to.equal('en-GB');
	});

	it('should load base language if locale is missing', function() {
		var localeData = provider(['fr-FR']);
		expect(localeData.locale).to.equal('fr');
	});

	it('should fallback when multiple locales are specified', function() {
		var localeData = provider(['ab', 'en-CA']);
		expect(localeData.locale).to.equal('en-CA');
	});

	it('should prefer fallback over base language', function() {
		var localeData = provider(['fr-FR', 'fr-CA']);
		expect(localeData.locale).to.equal('fr-CA');
	});

	it('should override groupSize', function() {
		var options = {number:{groupSize: 9}};
		var localeData = provider('en-CA', options);
		expect(localeData.number.groupSize).to.equal(9);
	});

	it('should override negative symbol', function() {
		var options = {number: {symbols: {negative: '*'}}};
		var localeData = provider('en-CA', options);
		expect(localeData.number.symbols.negative).to.equal('*');
	});

	it('should override positive percent pattern', function() {
		var options = {number: {patterns: {percent: {positivePattern: '&'}}}};
		var localeData = provider('en-CA', options);
		expect(localeData.number.patterns.percent.positivePattern).to.equal('&');
	});

});
