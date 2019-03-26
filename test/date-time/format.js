import DateTimeFormat from '../../src/date-time/format.js';

var expect = chai.expect;

describe('DateTimeFormat', function() {

	describe('format', function() {

		it('should default "format" to "short"', function() {
			var dtFormat = new DateTimeFormat('en-US');
			var value = dtFormat.format(new Date(1981, 3, 14, 10, 3));
			expect(value).to.equal('4/14/1981 10:03 AM');
		});

		[
			{format: 'full', expect: 'Monday, August 3, 2015 1:44 PM EST'},
			{format: 'medium', expect: 'Aug 3, 2015 1:44 PM'},
			{format: 'short', expect: '8/3/2015 1:44 PM'},
			{format: 'monthYear', expect: 'August 2015'},
			{format: 'monthDay', expect: 'August 3'},
			{format: 'longDayOfWeek', expect: 'Monday'},
			{format: 'shortDayOfWeek', expect: 'Mon'},
			{format: 'longMonth', expect: 'August'},
			{format: 'shortMonth', expect: 'Aug'},
		].forEach(function(input) {
			it('should apply locale format "' + input.format + '"', function() {
				var dtFormat = new DateTimeFormat('en-US', {format: input.format, timezone: 'EST'});
				var value = dtFormat.format(new Date(2015, 7, 3, 13, 44));
				expect(value).to.equal(input.expect);
			});
		});

		[
			{date: () => new Date(), expect: 'Just now'},
			{date: () => new Date('August 3, 2015, 1:44 PM EDT'),  expect: 'August 3, 2015, 1:44 PM'}
		].forEach(function(input) {
			it('should apply fuzzy format', function() {
				var dtFormat = new DateTimeFormat('en-US', {format: 'fuzzy', timezoneidentifier: 'America/Toronto'});
				var value = dtFormat.format(input.date());
				expect(value).to.equal(input.expect);
			});
		});

	});

});
