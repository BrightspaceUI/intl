'use strict';

var chai = require('chai'),
	expect = chai.expect,
	format = require('../../src/number/format-decimal'),
	defaultLocaleData = require('../../src/locale-data/en-US.json');

chai.should();

describe('NumberFormat', function() {

	describe('format-decimal', function() {

		var localeData;

		beforeEach(function() {
			localeData = JSON.parse(JSON.stringify(defaultLocaleData.number));
		});

		describe('edge values', function() {

			it('should format null as 0', function() {
				var value = format(null, localeData);
				expect(value).to.equal('0');
			});

			it('should format undefined as 0', function() {
				var value = format(undefined, localeData);
				expect(value).to.equal('0');
			});

			it('should parse strings', function() {
				var value = format('32.1935', localeData);
				expect(value).to.equal('32.194');
			});

			it('should throw for unparsable strings', function() {
				expect(function() {
					format('blah', localeData);
				}).to.throw(RangeError, 'value is out of range');
			});

		});

		describe('integers & decimals', function() {

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
			].forEach(function(input) {
				it('should format ' + input.val + ', max:' + input.max + ', min:' + input.min, function() {
					var options = {
						maximumFractionDigits: input.max,
						minimumFractionDigits: input.min
					};
					var value = format(input.val, localeData, options);
					expect(value).to.equal(input.expect);
				});
			});

			it('should use custom negative symbol', function() {
				localeData.symbols.negative = '|@|';
				var value = format(-42, localeData);
				expect(value).to.equal('|@|42');
			});

			it('should use custom decimal symbol', function() {
				localeData.symbols.decimal = '|@|';
				var value = format(3.14, localeData);
				expect(value).to.equal('3|@|14');
			});

			it('should use custom positive pattern', function() {
				localeData.patterns.decimal.positivePattern = 'foo{number}bar';
				var value = format(3.14, localeData);
				expect(value).to.equal('foo3.14bar');
			});

		});

		describe('negative patterns', function() {

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
			].forEach(function(input) {
				it('should apply negative pattern "' + input.pattern + '"', function() {
					localeData.patterns.decimal.negativePattern = input.pattern;
					var options = {minimumFractionDigits: input.min};
					var value = format(-4, localeData, options);
					expect(value).to.equal(input.expected);
				});
			});

			it('should use custom negative pattern', function() {
				localeData.patterns.decimal.negativePattern = 'foo{number}bar-';
				var value = format(-3.14, localeData);
				expect(value).to.equal('foo3.14bar-');
			});

		});

		describe('groups', function() {

			[
				{val: 1000, expected: '1,000'},
				{val: 1234567, expected: '1,234,567'},
				{val: 1234567.8915, expected: '1,234,567.892'},
				{val: 1000.123, max: 1, expected: '1,000.1'},
				{val: 1234567.98, max: 1, expected: '1,234,568'},
				{val: 1234567.8915, max: 1, expected: '1,234,567.9'},
				{val: -1234567.8915, max: 1, expected: '-1,234,567.9'}
			].forEach(function(input) {
				it('should use group separator ' + input.val, function() {
					var options = {maximumFractionDigits: input.max};
					var value = format(input.val, localeData, options);
					expect(value).to.equal(input.expected);
				});
			});

			it('should use custom group symbol', function() {
				localeData.symbols.group = '|@|';
				var value = format(1000000, localeData);
				expect(value).to.equal('1|@|000|@|000');
			});

			it('should use custom group size', function() {
				localeData.groupSize = 5;
				var value = format(1000000, localeData);
				expect(value).to.equal('10,00000');
			});

			it('should handle group size of 0', function() {
				localeData.groupSize = 0;
				var options = {maximumFractionDigits: 2};
				var value = format(1000000.01, localeData, options);
				expect(value).to.equal('1000000.01');
			});

			[
				{ val: 1000000000.01, groupSize:[3, 2, 1, 0], expected: '1000,0,00,000.01' },
				{ val: 123456789.123, groupSize:[4, 2], expected: '1,23,45,6789.12' }
			].forEach( function(input) {
				it('should handle variable group sizes', function() {
					localeData.groupSize = input.groupSize;
					var options = {maximumFractionDigits: 2};
					var value = format(input.val, localeData, options);
					expect(value).to.equal(input.expected);
				});
			});
		});

	});

});
