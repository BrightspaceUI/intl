let chai = require('chai'),
	expect = chai.expect;

chai.should();

import DateTimeFormat from '../../src/date-time/format';

function formatTime(date, options) {
	const dtFormat = new DateTimeFormat('en-US', options);
	const value = dtFormat.formatTime(date);
	return value;
}

describe('DateTimeFormat', () => {

	describe('format-time', () => {

		it('should default "format" to "short"', () => {
			const value = formatTime(new Date(1981, 3, 14, 10, 3));
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
		].forEach((input) => {
			it(`should apply locale format "${input.format} for 1-digit and 2-digit times"`, () => {
				const options = {format: input.format, timezone: 'EST'};
				const value1 = formatTime(new Date(2015, 7, 25, 1, 28), options);
				expect(value1).to.equal(input.expect1);
				const value2 = formatTime(new Date(2015, 7, 25, 13, 52), options);
				expect(value2).to.equal(input.expect2);
			});
		});

		it('should format midnight as hour 12', () => {
			const value = formatTime(new Date(2015, 7, 25, 0, 1));
			expect(value).to.equal('12:01 AM');
		});

		it('should apply custom AM day period', () => {
			const options = {
				locale:{date:{calendar:{dayPeriods:{am: 'ante meridiem'}}}}
			};
			const value = formatTime(new Date(2015, 7, 25, 6, 21), options);
			expect(value).to.equal('6:21 ante meridiem');
		});

		it('should apply custom PM day period', () => {
			const options = {
				locale:{date:{calendar:{dayPeriods:{pm: 'post meridiem'}}}}
			};
			const value = formatTime(new Date(2015, 7, 25, 23, 59), options);
			expect(value).to.equal('11:59 post meridiem');
		});

	});

});
