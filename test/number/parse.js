let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as parse} from '../../src/number/parse';

function getValueHelper(input, locale) {
	const numberParse = new parse('en-US', {locale:locale});
	const value = numberParse.parse(input);
	return value;
}

describe('NumberParse', () => {

	describe('parse', () => {

		describe('edge', () => {

			[
				undefined,
				null,
				'',
				'  		 ',
				' 0 	',
				'0'
			].forEach((input) => {
				it(`should parse "${input}" as 0`, () => {
					const value = getValueHelper(input);
					expect(value).to.equal(0);
				});
			});

			[
				'abc',
				'a3',
				'-D4'
			].forEach((input) => {
				it(`should return NaN for invalid input "${input}"`, () => {
					const value = getValueHelper(input);
					expect(isNaN(value)).to.be.true;
				});
			});

			[
				{val: '1b', expected: 1},
				{val: '1.44e', expected: 1.44},
				{val: ' - 0.2ab09', expected: -0.2},
				{val: '4,593  	329.2b392-', expected: 4593329.2}
			].forEach((input) => {
				it(`should stop on first invalid char "${input.val}"`, () => {
					const value = getValueHelper(input.val);
					expect(value).to.equal(input.expected);
				});
			});

		});

		describe('decimals', () => {

			it('should parse decimal number', () => {
				const value = getValueHelper('1000.20349');
				expect(value).to.equal(1000.20349);
			});

			it('should handle custom decimal symbol', () => {
				const locale = {number: {symbols: {decimal: '@'}}};
				const value = getValueHelper('0@2194', locale);
				expect(value).to.equal(0.2194);
			});

			it('should ignore subsequent decimal places', () => {
				const value = getValueHelper('1000.203.49.');
				expect(value).to.equal(1000.20349);
			});

		});

		describe('groups', () => {

			it('should handle group separators', () => {
				const value = getValueHelper('4,193,018.2028');
				expect(value).to.equal(4193018.2028);
			});

			it('should ignore spaces', () => {
				const value = getValueHelper(' 9  2	9322, 293.29 	382 ');
				expect(value).to.equal(929322293.29382);
			});

			['|', ' '].forEach((sep) => {
				it(`should handle "${sep}" as a group separator`, () => {
					const locale = {number: {symbols: {group: sep}}};
					const value = getValueHelper(`4${sep}193${sep}018.2028`, locale);
					expect(value).to.equal(4193018.2028);
				});
			});

		});

		describe('negative', () => {

			[
				'({number})',
				'- {number}',
				'{number}-',
				'{number} -',
				'-{number}',
				'({number})',
				'- {number}',
				'{number}-',
				'{number} -',
				'-{number}'
			].forEach((pattern) => {
				it(`should handle negative pattern "${pattern}"`, () => {
					const input = pattern.replace('{number}', '3.14');
					const value = getValueHelper(input);
					expect(value).to.equal(-3.14);
				});
			});

			it('should parse with custom negative symbol', () => {
				const locale = {number: {symbols: {negative: '^'}}};
				const value = getValueHelper('^ 42', locale);
				expect(value).to.equal(-42);
			});

		});

	});

});
