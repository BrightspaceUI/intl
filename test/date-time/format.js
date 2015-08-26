let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as DateTimeFormat} from '../../src/date-time/format';

describe('DateTimeFormat', () => {

	describe('format', () => {

		it('should choose "en-US" locale by default', () => {
			const dtFormat = new DateTimeFormat();
			expect(dtFormat.localeData.locale).to.equal('en-US');
		});

		it.skip('shoud load data for specified locale', () => {
			const dtFormat = new DateTimeFormat('fr-CA');
			expect(dtFormat.localeData.locale).to.equal('fr-CA');
		});

		it('should default "format" to "short"', () => {
			const dtFormat = new DateTimeFormat('en-US');
			const value = dtFormat.format(new Date(1981, 3, 14, 10, 3));
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
			{format: 'shortMonth', expect: 'Aug'}
		].forEach((input) => {
			it(`should apply locale format "${input.format}"`, () => {
				const dtFormat = new DateTimeFormat('en-US', {format: input.format, timezone: 'EST'});
				const value = dtFormat.format(new Date(2015, 7, 3, 13, 44));
				expect(value).to.equal(input.expect);
			});
		});

	});

});
