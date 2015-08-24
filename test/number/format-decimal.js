let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as format} from '../../src/number/format-decimal';

describe('NumberFormat', () => {

	describe('format-decimal', () => {

		let localeData;

		beforeEach(() => {
			localeData = {
				patterns: {
					decimal: {
						positivePattern: "{number}",
						negativePattern: "-{number}"
					},
					percent: {
						positivePattern: "{number} %",
						negativePattern: "-{number} %"
					}
				},
				symbols: {
					decimal: ".",
					group: ",",
					negative: "-",
					percent: "%"
				},
				groupSize: 3
			};
		});

		describe('invalid values', () => {

			it('should format null as 0', () => {
				const value = format(null, localeData);
				expect(value).to.equal('0');
			});

			it('should format undefined as 0', () => {
				const value = format(undefined, localeData);
				expect(value).to.equal('0');
			});

			it('should parse strings', () => {
				const value = format('32.1935', localeData);
				expect(value).to.equal('32.194');
			});

			it('should throw for unparsable strings', () => {
				expect(() => {
					format('blah', localeData);
				}).to.throw(RangeError, 'value is out of range');
			});

		});

		describe('integers', () => {

			it('should format positive integer', () => {
				const value = format(42, localeData);
				expect(value).to.equal('42');
			});

			it('should format negative integer', () => {
				const value = format(-42, localeData);
				expect(value).to.equal('-42');
			});

			it('should format 0', () => {
				const value = format(0, localeData);
				expect(value).to.equal('0');
			});

			it('should use negative symbol for negative integers', () => {
				localeData.symbols.negative = '|@|';
				const value = format(-42, localeData);
				expect(value).to.equal('|@|42');
			});

		});

		describe('decimals', () => {

			[
				{val: 3.1, expect: '3.1'},
				{expect: '1.235'},
				{max: 0, expect: '1'},
				{max: 5, expect: '1.23457'},
				{max: 10, expect: '1.234567'},
				{min: 3, expect: '1.235'},
				{min: 2, expect: '1.235'},
				{min: 8, expect: '1.23456700'},
				{val: 0.1234567, expect: '0.123'},
				{val: 4, min: 2, expect: '4.00'}
			].forEach((input) => {
				const val = input.val || 1.234567;
				it(`should format ${val}, max:${input.max}, min:${input.min}`, () => {
					const options = {
						maximumFractionDigits: input.max,
						minimumFractionDigits: input.min
					};
					const value = format(val, localeData, options);
					expect(value).to.equal(input.expect);
				});
			});

			it('should use custom decimal symbol', () => {
				localeData.symbols.decimal = '|@|';
				const value = format(3.14, localeData);
				expect(value).to.equal('3|@|14');
			});

		});

		describe('negative patterns', () => {

			[
				{pattern: '({number})', expected: '(4)'},
				{pattern: '- {number}', expected: '- 4'},
				{pattern: '{number}-', expected: '4-'},
				{pattern: '{number} -', expected: '4 -'},
				{pattern: '-{number}', expected: '-4'},
				{pattern: 'unknown', expected: '-4'},
				{pattern: '({number})', expected: '(4.0)', min: 1},
				{pattern: '- {number}', expected: '- 4.0', min: 1},
				{pattern: '{number}-', expected: '4.0-', min: 1},
				{pattern: '{number} -', expected: '4.0 -', min: 1},
				{pattern: '-{number}', expected: '-4.0', min: 1},
				{pattern: 'unknown', expected: '-4.0', min: 1}
			].forEach((input) => {
				it(`should apply negative pattern "${input.pattern}"`, () => {
					localeData.patterns.decimal.negativePattern = input.pattern;
					const options = {minimumFractionDigits: input.min};
					const value = format(-4, localeData, options);
					expect(value).to.equal(input.expected);
				});
			});

		});

		describe('groups', () => {

			[
				{val: 1000, expected: '1,000'},
				{val: 1234567, expected: '1,234,567'},
				{val: 1234567.8915, expected: '1,234,567.892'},
				{val: 1000.123, max: 1, expected: '1,000.1'},
				{val: 1234567.98, max: 1, expected: '1,234,568'},
				{val: 1234567.8915, max: 1, expected: '1,234,567.9'}
			].forEach((input) => {
				it(`should use group separator ${input.val}`, () => {
					const options = {maximumFractionDigits: input.max};
					const value = format(input.val, localeData, options);
					expect(value).to.equal(input.expected);
				});
			});

			it('should use custom group symbol', () => {
				localeData.symbols.group = '|@|';
				const value = format(1000000, localeData);
				expect(value).to.equal('1|@|000|@|000');
			});

		});

	});

});
