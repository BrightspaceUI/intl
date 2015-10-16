'use strict';

var chai = require('chai'),
	expect = chai.expect,
	DateTimeFormat = require('../../src/date-time/format');

chai.should();

function formatTime(date, options) {
	var dtFormat = new DateTimeFormat('en-US', options);
	var value = dtFormat.formatTime(date);
	return value;
}

describe('DateTimeFormat', function() {

	describe('format-time', function() {

		it('should default "format" to "short"', function() {
			var value = formatTime(new Date(1981, 3, 14, 10, 3));
			expect(value).to.equal('10:03 AM');
		});

		[
			{format: 'H:mm', expect1: '1:28', expect2: '13:52'},
			{format: 'h:mm tt', expect1: '1:28 AM', expect2: '1:52 PM'},
			{format: 'HH\' h \'mm', expect1: '01 h 28', expect2: '13 h 52'},
			{format: 'HH:mm', expect1: '01:28', expect2: '13:52'},
			{format: 'tt h:mm', expect1: 'AM 1:28', expect2: 'PM 1:52'},
			{format: 'tt hh:mm', expect1: 'AM 01:28', expect2: 'PM 01:52'},
			{format: 'short', expect1: '1:28 AM', expect2: '1:52 PM'},
			{format: 'full', expect1: '1:28 AM EST', expect2: '1:52 PM EST'}
		].forEach(function(input) {
			it('should apply locale format "' + input.format + 'for 1-digit and 2-digit times"', function() {
				var options = {format: input.format, timezone: 'EST'};
				var value1 = formatTime(new Date(2015, 7, 25, 1, 28), options);
				expect(value1).to.equal(input.expect1);
				var value2 = formatTime(new Date(2015, 7, 25, 13, 52), options);
				expect(value2).to.equal(input.expect2);
			});
		});

		it('should format midnight as hour 12', function() {
			var value = formatTime(new Date(2015, 7, 25, 0, 1));
			expect(value).to.equal('12:01 AM');
		});

		it('should apply custom AM day period', function() {
			var options = {
				locale:{date:{calendar:{dayPeriods:{am: 'ante meridiem'}}}}
			};
			var value = formatTime(new Date(2015, 7, 25, 6, 21), options);
			expect(value).to.equal('6:21 ante meridiem');
		});

		it('should apply custom PM day period', function() {
			var options = {
				locale:{date:{calendar:{dayPeriods:{pm: 'post meridiem'}}}}
			};
			var value = formatTime(new Date(2015, 7, 25, 23, 59), options);
			expect(value).to.equal('11:59 post meridiem');
		});

	});

});
