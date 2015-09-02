let chai = require('chai'),
	expect = chai.expect;

chai.should();

import format from '../../src/number/format-percent';
import defaultLocaleData from '../../src/locale-data/en-US.json';

describe('NumberFormat', () => {

	describe('format-percent', () => {

		let localeData;

		beforeEach(() => {
			localeData = JSON.parse(JSON.stringify(defaultLocaleData.number));
		});

		describe('edge values', () => {

			it('should format null as 0%', () => {
				const value = format(null, localeData);
				expect(value).to.equal('0 %');
			});

			it('should format undefined as 0', () => {
				const value = format(undefined, localeData);
				expect(value).to.equal('0 %');
			});

			it('should parse strings', () => {
				const value = format('0.321935', localeData);
				expect(value).to.equal('32.194 %');
			});

			it('should throw for unparsable strings', () => {
				expect(() => {
					format('blah', localeData);
				}).to.throw(RangeError, 'value is out of range');
			});

		});

		describe('patterns', () => {

			[
				{pattern: '{number} %', expected: '76 %'},
				{pattern: '{number}%', expected: '76%'},
				{pattern: '%{number}', expected: '%76'},
				{pattern: '% {number}', expected: '% 76'},
				{pattern: 'unknown', expected: 'unknown'},
				{pattern: 'foo{number}bar|%', expected: 'foo76bar|%'}
			].forEach((input) => {
				it(`should apply positive pattern "${input.pattern}"`, () => {
					localeData.patterns.percent.positivePattern = input.pattern;
					const value = format(0.76, localeData);
					expect(value).to.equal(input.expected);
				});
			});

			[
				{pattern: '-{number} %', expected: '-76 %'},
				{pattern: '-{number}%', expected: '-76%'},
				{pattern: '-%{number}', expected: '-%76'},
				{pattern: '%-{number}', expected: '%-76'},
				{pattern: '%{number}-', expected: '%76-'},
				{pattern: '{number}-%', expected: '76-%'},
				{pattern: '{number}%-', expected: '76%-'},
				{pattern: '-% {number}', expected: '-% 76'},
				{pattern: '{number} %-', expected: '76 %-'},
				{pattern: '% {number}-', expected: '% 76-'},
				{pattern: '% -{number}', expected: '% -76'},
				{pattern: '{number}- %', expected: '76- %'},
				{pattern: 'unknown', expected: 'unknown'},
				{pattern: 'foo-|{number}bar|%', expected: 'foo-|76bar|%'}
			].forEach((input) => {
				it(`should apply negative pattern "${input.pattern}"`, () => {
					localeData.patterns.percent.negativePattern = input.pattern;
					const value = format(-0.76, localeData);
					expect(value).to.equal(input.expected);
				});
			});

		});

		describe('custom symbols', () => {

			it('should use custom symbols for positive numbers', () => {
				localeData.symbols.percent = '&';
				localeData.symbols.group = '|';
				localeData.symbols.decimal = '$';
				const value = format(38.287257, localeData);
				expect(value).to.equal('3|828$726 &');
			});

			it('should use custom symbols for negative numbers', () => {
				localeData.symbols.percent = '&';
				localeData.symbols.negative = '=';
				localeData.symbols.group = '|';
				localeData.symbols.decimal = '$';
				const value = format(-1029.382912, localeData);
				expect(value).to.equal('=102|938$291 &');
			});

		});

		describe('options', () => {

			it('should apply maximumFractionDigits', () => {
				const options = {maximumFractionDigits: 1};
				const value = format(0.123456, localeData, options);
				expect(value).to.equal('12.3 %');
			});

			it('should apply minimumFractionDigits', () => {
				const options = {minimumFractionDigits: 3};
				const value = format(0.981, localeData, options);
				expect(value).to.equal('98.100 %');
			});

		});

	});

});
