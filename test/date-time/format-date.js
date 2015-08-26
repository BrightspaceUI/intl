let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as DateTimeFormat} from '../../src/date-time/format';

function formatDate(date, options) {
	const dtFormat = new DateTimeFormat('en-US', options);
	const value = dtFormat.formatDate(date);
	return value;
}

describe('DateTimeFormat', () => {

	describe('format-date', () => {

		it('should choose "en-US" locale by default', () => {
			const dtFormat = new DateTimeFormat();
			expect(dtFormat.localeData.locale).to.equal('en-US');
		});

		it.skip('shoud load data for specified locale', () => {
			const dtFormat = new DateTimeFormat('fr-CA');
			expect(dtFormat.localeData.locale).to.equal('fr-CA');
		});

		it('should default "format" to "short"', () => {
			const value = formatDate(new Date(1981, 3, 14));
			expect(value).to.equal('4/14/1981');
		});

		[
			{format: 'd/M/yyyy', expect: '3/8/2015'},
			{format: 'dd.MM.yyyy', expect: '03.08.2015'},
			{format: 'dd/MM/yyyy', expect: '03/08/2015'},
			{format: 'M/d/yyyy', expect: '8/3/2015'},
			{format: 'M/d/yyyy', expect: '8/3/2015'},
			{format: 'yyyy/M/d', expect: '2015/8/3'},
			{format: 'yyyy/MM/dd', expect: '2015/08/03'},
			{format: 'yyyy-MM-dd', expect: '2015-08-03'},
			{format: 'dd MMMM yyyy dddd', expect: '03 August 2015 Monday'},
			{format: 'dddd d\' de \'MMMM\' de \'yyyy', expect: 'Monday 3 de August de 2015'},
			{format: 'dddd d MMMM yyyy', expect: 'Monday 3 August 2015'},
			{format: 'dddd \'den\' d MMMM yyyy', expect: 'Monday den 3 August 2015'},
			{format: 'dddd, d\' de \'MMMM\' de \'yyyy', expect: 'Monday, 3 de August de 2015'},
			{format: 'dddd, d MMMM, yyyy', expect: 'Monday, 3 August, 2015'},
			{format: 'yyyy년 M월 d일 dddd', expect: '2015년 8월 3일 Monday'},
			{format: 'yyyy年M月d日', expect: '2015年8月3日'},
			{format: 'd\' de \'MMMM\' de \'yyyy', expect: '3 de August de 2015'},
			{format: 'd MMMM yyyy', expect: '3 August 2015'},
			{format: 'dd MMMM yyyy', expect: '03 August 2015'},
			{format: 'dd MMMM, yyyy', expect: '03 August, 2015'},
			{format: 'MMM d yyyy', expect: 'Aug 3 2015'},
			{format: 'MMM d, yyyy', expect: 'Aug 3, 2015'},
			{format: 'yyyy년 M월 d일', expect: '2015년 8월 3일'},
			{format: 'yyyy年M月d日', expect: '2015年8月3日'},
			{format: 'full', expect: 'Monday, August 3, 2015'},
			{format: 'medium', expect: 'Aug 3, 2015'},
			{format: 'short', expect: '8/3/2015'},
			{format: 'yearMonth', expect: 'August 2015'},
			{format: 'monthDay', expect: 'August 3'}
		].forEach((input) => {
			it(`should apply locale format "${input.format}"`, () => {
				const options = {format: input.format};
				const value = formatDate(new Date(2015, 7, 3), options);
				expect(value).to.equal(input.expect);
			});
		});

	});

});
