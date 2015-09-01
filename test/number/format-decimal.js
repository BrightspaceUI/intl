let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as format} from '../../src/number/format-decimal';
import {default as defaultLocaleData} from '../../src/locale-data/en-US.json';

describe('NumberFormat', () => {

	describe('format-decimal', () => {

		let localeData;

		beforeEach(() => {
			localeData = JSON.parse(JSON.stringify(defaultLocaleData.number));
		});

		describe('edge values', () => {

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

		describe('integers & decimals', () => {

			[
				{val: 42, expect: '42'},
				{val: -42, expect: '-42'},
				{val: 0, expect: '0'},
				{val: 0, min: 2, expect: '0.00'},
				{val: -0, expect: '0'},
				{val: 3.1, expect: '3.1'},
				{val: 1.2345, expect: '1.235'},
				{val: 1.2, max: 0, expect: '1'},
				{val: 1.5, max: 0, expect: '2'},
				{val: 1.234567, max: 5, expect: '1.23457'},
				{val: 1.234567, max: 10, expect: '1.234567'},
				{val: 1.234567, min: 3, expect: '1.235'},
				{val: 1.234567, min: 2, expect: '1.235'},
				{val: 1.234567, min: 8, expect: '1.23456700'},
				{val: 0.1234567, expect: '0.123'},
				{val: 4, min: 2, expect: '4.00'}
			].forEach((input) => {
				it(`should format ${input.val}, max:${input.max}, min:${input.min}`, () => {
					const options = {
						maximumFractionDigits: input.max,
						minimumFractionDigits: input.min,
					};
					const value = format(input.val, localeData, options);
					expect(value).to.equal(input.expect);
				});
			});

			it('should use custom negative symbol', () => {
				localeData.symbols.negative = '|@|';
				const value = format(-42, localeData);
				expect(value).to.equal('|@|42');
			});

			it('should use custom decimal symbol', () => {
				localeData.symbols.decimal = '|@|';
				const value = format(3.14, localeData);
				expect(value).to.equal('3|@|14');
			});

			it('should use custom positive pattern', () => {
				localeData.patterns.decimal.positivePattern = 'foo{number}bar';
				const value = format(3.14, localeData);
				expect(value).to.equal('foo3.14bar');
			});

		});

		describe('negative patterns', () => {

			[
				{pattern: '({number})', expected: '(4)'},
				{pattern: '- {number}', expected: '- 4'},
				{pattern: '{number}-', expected: '4-'},
				{pattern: '{number} -', expected: '4 -'},
				{pattern: '-{number}', expected: '-4'},
				{pattern: '({number})', expected: '(4.0)', min: 1},
				{pattern: '- {number}', expected: '- 4.0', min: 1},
				{pattern: '{number}-', expected: '4.0-', min: 1},
				{pattern: '{number} -', expected: '4.0 -', min: 1},
				{pattern: '-{number}', expected: '-4.0', min: 1}
			].forEach((input) => {
				it(`should apply negative pattern "${input.pattern}"`, () => {
					localeData.patterns.decimal.negativePattern = input.pattern;
					const options = {minimumFractionDigits: input.min};
					const value = format(-4, localeData, options);
					expect(value).to.equal(input.expected);
				});
			});

			it('should use custom negative pattern', () => {
				localeData.patterns.decimal.negativePattern = 'foo{number}bar-';
				const value = format(-3.14, localeData);
				expect(value).to.equal('foo3.14bar-');
			});

		});

		describe('groups', () => {

			[
				{val: 1000, expected: '1,000'},
				{val: 1234567, expected: '1,234,567'},
				{val: 1234567.8915, expected: '1,234,567.892'},
				{val: 1000.123, max: 1, expected: '1,000.1'},
				{val: 1234567.98, max: 1, expected: '1,234,568'},
				{val: 1234567.8915, max: 1, expected: '1,234,567.9'},
				{val: -1234567.8915, max: 1, expected: '-1,234,567.9'}
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

			it('should use custom group size', () => {
				localeData.groupSize = 5;
				const value = format(1000000, localeData);
				expect(value).to.equal('10,00000');
			});

		});

	});

});
