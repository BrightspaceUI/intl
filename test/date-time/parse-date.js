let chai = require('chai'),
	expect = chai.expect;

chai.should();

import DateTimeParse from '../../src/date-time/parse';

function parseDate(input, options) {
	const parser = new DateTimeParse('en-US', options);
	const date = parser.parseDate(input);
	return date;
}

describe('DateTimeParse', () => {

	describe('parse-date', () => {

		it('should use "m/d/yyyy" as a default pattern', () => {
			const options = {locale:{date:{formats:{dateFormats:{short:'abc'}}}}};
			const value = parseDate('12/13/2003', options);
			expect(value.getFullYear()).to.equal(2003);
			expect(value.getMonth()).to.equal(11);
			expect(value.getDate()).to.equal(13);
		});

		[
			undefined,
			null,
			'',
			'  	',
			'4',
			'4/14'
		].forEach((input) => {
			it(`should throw for insufficient input "${input}"`, () => {
				expect(() => {
					parseDate(input);
				}).to.throw(Error, 'Invalid input date: not enough parts');
			});
		});

		[
			'4/14/c',
			'4/b/1981',
			'a/14/1981',
			'a/b/c'
		].forEach((input) => {
			it(`should throw for invalid part number input "${input}"`, () => {
				expect(() => {
					parseDate(input);
				}).to.throw(Error, 'Invalid input date: part number value');
			});
		});

		[
			{format: 'd/M/yyyy', val: '9/4/1958'},
			{format: 'dd.MM.yyyy', val: '09.04.1958'},
			{format: 'dd/MM/yyyy', val: '09/04/1958'},
			{format: 'M/d/yyyy', val: '4/9/1958'},
			{format: 'MM/dd/yyyy', val: '04/09/1958'},
			{format: 'yyyy/M/d', val: '1958/4/09'},
			{format: 'yyyy/MM/dd', val: '1958/04/09'},
			{format: 'yyyy-MM-dd', val: '1958-04-09'}
		].forEach((input) => {
			it(`should parse format "${input.format}"`, () => {
				const options = {locale:{date:{formats:{dateFormats:{short:input.format}}}}};
				const value = parseDate(input.val, options);
				expect(value.getFullYear()).to.equal(1958);
				expect(value.getMonth()).to.equal(3);
				expect(value.getDate()).to.equal(9);
			});
		});

		it('should throw "part range value" for invalid date', () => {
			expect(() => {
				parseDate('2/30/2015');
			}).to.throw(Error, 'Invalid input date: part range value');
		});

		it('should ignore invalid format parts', () => {
			const options = {locale:{date:{formats:{dateFormats:{short:'yyyy|M|d|w'}}}}};
			const value = parseDate('2025|5|29', options);
			expect(value.getFullYear()).to.equal(2025);
			expect(value.getMonth()).to.equal(4);
			expect(value.getDate()).to.equal(29);
		});

	});

});
