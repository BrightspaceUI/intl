import calendar from '../../src/calendar/gregorian.js';

var expect = chai.expect;

describe('Calendar', function() {

	describe('gregorian', function() {

		describe('calendar-specific-date', function() {

			it('should return input date as-is', function() {
				var input = new Date(2005, 4, 1);
				var value = calendar.getCalendarSpecificLocalDateTime(input);
				expect(value).to.equal(input);
			});

		});

		describe('is-valid', function() {

			[
				{year: null, month: 5, day: 21},
				{year: 2015, month: null, day: 21},
				{year: 2015, month: 5, day: null},
				{year: 1752, month: 5, day: 21},
				{year: 10000, month: 5, day: 21},
				{year: 2015, month: 0, day: 21},
				{year: 2015, month: 13, day: 21},
				{year: 2015, month: 5, day: 0},
				{year: 2015, month: 0, day: 32},
				{year: 2015, month: 4, day: 31},
				{year: 2015, month: 6, day: 31},
				{year: 2015, month: 9, day: 31},
				{year: 2015, month: 11, day: 31}
			].forEach(function(input) {
				it('should be false if year/month/day are out of bounds: ' + input.year + ', ' + input.month + ', ' + input.day, function() {
					var value = calendar.isValid(input.year, input.month, input.day);
					expect(value).to.be.false;
				});
			});

			[
				{year: 2015, valid: false},
				{year: 2016, valid: true},
				{year: 2100, valid: false},
				{year: 2400, valid: true},
				{year: 1908, valid: true}
			].forEach(function(input) {
				it('should validate leap year ' + input.year + ' -> ' + input.valid, function() {
					var value = calendar.isValid(input.year, 2, 29);
					expect(value).to.equal(input.valid);
				});
			});

			it('should be false if year is NaN', function() {
				var value = calendar.isValid(null, 5, 21);
				expect(value).to.be.false;
			});

			[
				{year: 1753, month: 1, day: 14},
				{year: 2001, month: 3, day: 31},
				{year: 9999, month: 5, day: 31},
				{year: 2015, month: 7, day: 31},
				{year: 2015, month: 8, day: 31},
				{year: 2015, month: 10, day: 31},
				{year: 2015, month: 12, day: 31}
			].forEach(function(input) {
				it('should be valid for ' + input.year + ', ' + input.month + ', ' + input.day, function() {
					var value = calendar.isValid(input.year, input.month, input.day);
					expect(value).to.be.true;
				});
			});

		});

		describe('try-get-gregorian', function() {

			it('should return "null" if date is invalid', function() {
				var value = calendar.tryGetGregorianLocaleDateTime(2015, 2, 30);
				expect(value).to.be.null;
			});

			it('should return Date if valid', function() {
				var value = calendar.tryGetGregorianLocaleDateTime(2015, 8, 27);
				expect(value.getFullYear()).to.equal(2015);
				expect(value.getMonth()).to.equal(7);
				expect(value.getDate()).to.equal(27);
				expect(value.getHours()).to.equal(0);
				expect(value.getMinutes()).to.equal(0);
			});

		});

	});

});
