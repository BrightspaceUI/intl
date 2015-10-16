'use strict';

var chai = require('chai'),
	expect = chai.expect,
	format = require('../../src/number/format-percent'),
	defaultLocaleData = require('../../src/locale-data/en-US.json');

chai.should();

describe('NumberFormat', function() {

	describe('format-percent', function() {

		var localeData;

		beforeEach(function() {
			localeData = JSON.parse(JSON.stringify(defaultLocaleData.number));
		});

		describe('edge values', function() {

			it('should format null as 0%', function() {
				var value = format(null, localeData);
				expect(value).to.equal('0 %');
			});

			it('should format undefined as 0', function() {
				var value = format(undefined, localeData);
				expect(value).to.equal('0 %');
			});

			it('should parse strings', function() {
				var value = format('0.321935', localeData);
				expect(value).to.equal('32.194 %');
			});

			it('should throw for unparsable strings', function() {
				expect(function() {
					format('blah', localeData);
				}).to.throw(RangeError, 'value is out of range');
			});

		});

		describe('patterns', function() {

			[
				{pattern: '{number} %', expected: '76 %'},
				{pattern: '{number}%', expected: '76%'},
				{pattern: '%{number}', expected: '%76'},
				{pattern: '% {number}', expected: '% 76'},
				{pattern: 'unknown', expected: 'unknown'},
				{pattern: 'foo{number}bar|%', expected: 'foo76bar|%'}
			].forEach(function(input) {
				it('should apply positive pattern "' + input.pattern + '"', function() {
					localeData.patterns.percent.positivePattern = input.pattern;
					var value = format(0.76, localeData);
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
			].forEach(function(input) {
				it('should apply negative pattern "' + input.pattern + '"', function() {
					localeData.patterns.percent.negativePattern = input.pattern;
					var value = format(-0.76, localeData);
					expect(value).to.equal(input.expected);
				});
			});

		});

		describe('custom symbols', function() {

			it('should use custom symbols for positive numbers', function() {
				localeData.symbols.percent = '&';
				localeData.symbols.group = '|';
				localeData.symbols.decimal = '$';
				var value = format(38.287257, localeData);
				expect(value).to.equal('3|828$726 &');
			});

			it('should use custom symbols for negative numbers', function() {
				localeData.symbols.percent = '&';
				localeData.symbols.negative = '=';
				localeData.symbols.group = '|';
				localeData.symbols.decimal = '$';
				var value = format(-1029.382912, localeData);
				expect(value).to.equal('=102|938$291 &');
			});

		});

		describe('options', function() {

			it('should apply maximumFractionDigits', function() {
				var options = {maximumFractionDigits: 1};
				var value = format(0.123456, localeData, options);
				expect(value).to.equal('12.3 %');
			});

			it('should apply minimumFractionDigits', function() {
				var options = {minimumFractionDigits: 3};
				var value = format(0.981, localeData, options);
				expect(value).to.equal('98.100 %');
			});

		});

	});

});
