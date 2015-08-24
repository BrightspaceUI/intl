let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as format} from '../../src/number/format';

describe('NumberFormat', () => {

	describe('format', () => {

		describe('localeData', () => {

			it('should default to "en-US" locale', () => {
				const numberFormat = new format();
				expect(numberFormat.localeData.locale).to.equal('en-US');
			});

			it.skip('should load specified locale', () => {
				const numberFormat = new format('fr-CA');
				expect(numberFormat.localeData.locale).to.equal('fr-CA');
			});

			it('should override localeData groupSize', () => {
				const options = {locale: {groupSize: 9}};
				const numberFormat = new format('en-CA', options);
				expect(numberFormat.localeData.number.groupSize).to.equal(9);
			});

			it('should override localeData negative symbol', () => {
				const options = {locale: {symbols: {negative: '*'}}};
				const numberFormat = new format('en-CA', options);
				expect(numberFormat.localeData.number.symbols.negative).to.equal('*');
			});

			it('should override localeData positive percent pattern', () => {
				const options = {locale: {patterns: {percent: {positivePattern: '&'}}}};
				const numberFormat = new format('en-CA', options);
				expect(numberFormat.localeData.number.patterns.percent.positivePattern).to.equal('&');
			});

		});

		describe('style', () => {

			it('should default to decimal format', () => {
				const numberFormat = new format('en-US');
				const value = numberFormat.format(23);
				expect(value).to.equal('23');
			});

			it('should use decimal format', () => {
				const numberFormat = new format('en-US', {style:'decimal'});
				const value = numberFormat.format(1075.3219);
				expect(value).to.equal('1,075.322');
			});

			it('should use percent format', () => {
				const numberFormat = new format('en-US', {style:'percent'});
				const value = numberFormat.format(-0.753219);
				expect(value).to.equal('-75.322 %');
			});

		});

	});

});
