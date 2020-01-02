import DateTimeFormat from '../../src/date-time/format.js';

var expect = chai.expect;

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

		[
			{locale: 'ar', expect: ['1:28 ص', '1:28 ص', '1:28 ص EST', '1:28 ص EST', '1:52 م', '1:52 م', '1:52 م EST', '1:52 م EST']},
			{locale: 'ar-SA', expect: ['1:28 ص', '1:28 ص', '1:28 ص EST', '1:28 ص EST', '1:52 م', '1:52 م', '1:52 م EST', '1:52 م EST']},
			{locale: 'da', expect: [/*'01:28'*/'1:28 AM', /*'01:28'*/'1:28 AM', /*'01:28 EST'*/'1:28 AM EST', /*'01:28 EST'*/'1:28 AM EST', /*'13:52'*/'1:52 PM', /*'13:52'*/'1:52 PM', /*'13:52 EST'*/'1:52 PM EST', /*'13:52 EST'*/'1:52 PM EST']},
			{locale: 'da-DK', expect: [/*'01:28'*/'1:28 AM', /*'01:28'*/'1:28 AM', /*'01:28 EST'*/'1:28 AM EST', /*'01:28 EST'*/'1:28 AM EST', /*'13:52'*/'1:52 PM', /*'13:52'*/'1:52 PM', /*'13:52 EST'*/'1:52 PM EST', /*'13:52 EST'*/'1:52 PM EST']},
			{locale: 'de', expect: [/*'01:28'*/'1:28 AM', /*'01:28'*/'1:28 AM', /*'01:28 EST'*/'1:28 AM EST', /*'01:28 EST'*/'1:28 AM EST', /*'13:52'*/'1:52 PM', /*'13:52'*/'1:52 PM', /*'13:52 EST'*/'1:52 PM EST', /*'13:52 EST'*/'1:52 PM EST']},
			{locale: 'de-DE', expect: [/*'01:28'*/'1:28 AM', /*'01:28'*/'1:28 AM', /*'01:28 EST'*/'1:28 AM EST', /*'01:28 EST'*/'1:28 AM EST', /*'13:52'*/'1:52 PM', /*'13:52'*/'1:52 PM', /*'13:52 EST'*/'1:52 PM EST', /*'13:52 EST'*/'1:52 PM EST']},
			{locale: 'en', expect: ['1:28 AM', '1:28 AM', '1:28 AM EST', '1:28 AM EST', '1:52 PM', '1:52 PM', '1:52 PM EST', '1:52 PM EST']},
			{locale: 'en-CA', expect: ['1:28 AM', '1:28 AM', '1:28 AM EST', '1:28 AM EST', '1:52 PM', '1:52 PM', '1:52 PM EST', '1:52 PM EST']},
			{locale: 'en-GB', expect: ['1:28 AM', '1:28 AM', '1:28 AM EST', '1:28 AM EST', '1:52 PM', '1:52 PM', '1:52 PM EST', '1:52 PM EST']},
			{locale: 'en-US', expect: ['1:28 AM', '1:28 AM', '1:28 AM EST', '1:28 AM EST', '1:52 PM', '1:52 PM', '1:52 PM EST', '1:52 PM EST']},
			{locale: 'es', expect: ['1:28', '1:28', '1:28 EST', '1:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'es-MX', expect: ['01:28', '01:28', '01:28 EST', '01:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'fr', expect: ['01 h 28', '01 h 28', '01 h 28 EST', '01 h 28 EST', '13 h 52', '13 h 52', '13 h 52 EST', '13 h 52 EST']},
			{locale: 'fr-FR', expect: ['01 h 28', '01 h 28', '01 h 28 EST', '01 h 28 EST', '13 h 52', '13 h 52', '13 h 52 EST', '13 h 52 EST']},
			{locale: 'fr-CA', expect: ['01 h 28', '01 h 28', '01 h 28 EST', '01 h 28 EST', '13 h 52', '13 h 52', '13 h 52 EST', '13 h 52 EST']},
			{locale: 'ja', expect: ['1:28', '1:28', '1:28 EST', '1:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'ja-JP', expect: ['1:28', '1:28', '1:28 EST', '1:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'ko', expect: ['오전 1:28', '오전 1:28', '오전 1:28 EST', '오전 1:28 EST', '오후 1:52', '오후 1:52', '오후 1:52 EST', '오후 1:52 EST']},
			{locale: 'ko-KR', expect: ['오전 1:28', '오전 1:28', '오전 1:28 EST', '오전 1:28 EST', '오후 1:52', '오후 1:52', '오후 1:52 EST', '오후 1:52 EST']},
			{locale: 'nl', expect: [/*'01:28'*/'1:28 AM', /*'01:28'*/'1:28 AM', /*'01:28 EST'*/'1:28 AM EST', /*'01:28 EST'*/'1:28 AM EST', /*'13:52'*/'1:52 PM', /*'13:52'*/'1:52 PM', /*'13:52 EST'*/'1:52 PM EST', /*'13:52 EST'*/'1:52 PM EST']},
			{locale: 'nl-NL', expect: [/*'01:28'*/'1:28 AM', /*'01:28'*/'1:28 AM', /*'01:28 EST'*/'1:28 AM EST', /*'01:28 EST'*/'1:28 AM EST', /*'13:52'*/'1:52 PM', /*'13:52'*/'1:52 PM', /*'13:52 EST'*/'1:52 PM EST', /*'13:52 EST'*/'1:52 PM EST']},
			{locale: 'pt', expect: ['01:28', '01:28', '01:28 EST', '01:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'pt-BR', expect: ['1:28', '1:28', '1:28 EST', '1:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'sv', expect: ['01:28', '01:28', '01:28 EST', '01:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'sv-SE', expect: ['01:28', '01:28', '01:28 EST', '01:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'tr', expect: ['01:28', '01:28', '01:28 EST', '01:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'tr-TR', expect: ['01:28', '01:28', '01:28 EST', '01:28 EST', '13:52', '13:52', '13:52 EST', '13:52 EST']},
			{locale: 'zh', expect: ['1:28', '1:28', 'EST 1:28', 'EST 1:28', '13:52', '13:52', 'EST 13:52', 'EST 13:52']},
			{locale: 'zh-CN', expect: ['1:28', '1:28', 'EST 1:28', 'EST 1:28', '13:52', '13:52', 'EST 13:52', 'EST 13:52']},
			{locale: 'zh-TW', expect: ['上午 01:28', '上午 01:28', '上午 01:28 EST', '上午 01:28 EST', '下午 01:52', '下午 01:52', '下午 01:52 EST', '下午 01:52 EST']}
		].forEach((input) => {
			let index = -1;
			['early', 'late'].forEach((timeOfDay) => {
				['short', 'full'].forEach((format) => {
					[true, false].forEach((hour24) => {
						it(`should format ${input.locale}/${timeOfDay}/${format}/${hour24}`, () => {
							index++;
							const time = timeOfDay === 'early' ? new Date(2015, 7, 25, 1, 28) : new Date(2015, 7, 25, 13, 52);
							const dtFormat = new DateTimeFormat(
								input.locale,
								{format: format, timezone: 'EST', locale: {date: {hour24: hour24}}}
							);
							const value = dtFormat.formatTime(time);
							expect(value).to.equal(input.expect[index]);
						});
					});
				});
			});
		});

	});

});
