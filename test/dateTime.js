import {
	convertLocalToUTCDateTime,
	convertUTCToLocalDateTime,
	formatDate,
	formatDateFromTimestamp,
	formatDateTime,
	formatDateTimeFromTimestamp,
	formatRelativeDateTime,
	formatTime,
	formatTimeFromTimestamp,
	parseDate,
	parseTime
} from '../lib/dateTime.js';
import { getDocumentLocaleSettings } from '../lib/common.js';

const expect = chai.expect;

describe('dateTime', () => {

	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => documentLocaleSettings.reset());

	describe('converting date/time', () => {

		function getExpectedResult(input, offset) {
			let hours = input.hours;
			let minutes = input.minutes;
			let date = input.date;

			// calculate what expected hours and minutes should be based on offset
			const offsetHours = Math.floor(Math.abs(offset));
			if (offset < 0) {
				hours -= offsetHours;
			} else {
				hours += offsetHours;
			}
			if ((offset % 1) !== 0) {
				minutes = minutes + 60 * (offset % 1);
				if (minutes > 60) {
					minutes -= 60;
					hours += 1;
				}
				hours = Math.floor(hours);
			}

			// adjust date based on number of hours
			if (hours < 0) {
				hours = 24 + hours;
				date--;
			} else if (hours >= 24) {
				hours -= 24;
				date++;
			}

			return {
				month: input.month,
				date: date,
				year: input.year,
				hours: hours,
				minutes: minutes,
				seconds: input.seconds
			};
		}

		describe('convertLocalToUTCDateTime', () => {
			const hours = 8;
			const minutes = 52;
			const date = 10;
			const localDateTime = {
				month: 2,
				date: date,
				year: 2015,
				hours: hours,
				minutes: minutes,
				seconds: 0
			};

			it('should return original date if timezone identifier is blank', () => {
				documentLocaleSettings.timezone.identifier = '';
				const result = convertLocalToUTCDateTime(localDateTime);
				expect(result).to.deep.equal(localDateTime);
			});

			it('should throw if timezone identifier is invalid', () => {
				documentLocaleSettings.timezone.identifier = 'FAKE';
				expect(() => {
					convertLocalToUTCDateTime(localDateTime);
				}).to.throw();
			});

			[
				{ timezone: 'Pacific/Rarotonga', expectedGMTOffset: -10 },
				{ timezone: 'Pacific/Marquesas', expectedGMTOffset: -9.5 },
				{ timezone: 'America/Yakutat', expectedGMTOffset: -9 },
				{ timezone: 'America/Santa_Isabel', expectedGMTOffset: -8 },
				{ timezone: 'America/Toronto', expectedGMTOffset: -5 },
				{ timezone: 'America/Halifax', expectedGMTOffset: -4 },
				{ timezone: 'Atlantic/Reykjavik', expectedGMTOffset: 0 },
				{ timezone: 'Australia/Eucla', expectedGMTOffset: 8.75 },
				{ timezone: 'Australia/Darwin', expectedGMTOffset: 9.5 },
				{ timezone: 'Pacific/Apia', expectedGMTOffset: 14 }
			].forEach((test) => {
				it(`should have expected GMT offset of ${test.expectedGMTOffset} for timezone ${test.timezone}`, () => {
					documentLocaleSettings.timezone.identifier = test.timezone;
					const result = convertLocalToUTCDateTime(localDateTime);
					const expectedResult = getExpectedResult(localDateTime, -1 * test.expectedGMTOffset);
					expect(result).to.deep.equal(expectedResult);
				});
			});

			describe('Daylight Savings', () => {
				[
					{ timezone: 'America/Toronto', expectedGMTOffset: 4, month: 3, date: 8, hours: 3, minutes: 0 },
					{ timezone: 'America/Toronto', expectedGMTOffset: 5, month: 3, date: 8, hours: 1, minutes: 59 },
					{ timezone: 'America/Toronto', expectedGMTOffset: 4, month: 11, date: 1, hours: 1, minutes: 59 },
					{ timezone: 'America/Toronto', expectedGMTOffset: 5, month: 11, date: 1, hours: 3, minutes: 0 },
					{ timezone: 'America/Halifax', expectedGMTOffset: 3, month: 3, date: 8, hours: 3, minutes: 0 },
					{ timezone: 'America/Halifax', expectedGMTOffset: 4, month: 3, date: 8, hours: 1, minutes: 59 },
					{ timezone: 'America/Halifax', expectedGMTOffset: 3, month: 11, date: 1, hours: 0, minutes: 59 }, // Intl.DateTimeFormat is returning AST at 1:59 AM instead of ADT
					{ timezone: 'America/Halifax', expectedGMTOffset: 4, month: 11, date: 1, hours: 3, minutes: 0 },
					{ timezone: 'America/Winnipeg', expectedGMTOffset: 5, month: 3, date: 8, hours: 3, minutes: 0 },
					{ timezone: 'America/Winnipeg', expectedGMTOffset: 6, month: 3, date: 8, hours: 1, minutes: 59 },
					{ timezone: 'America/Winnipeg', expectedGMTOffset: 5, month: 11, date: 1, hours: 1, minutes: 59 },
					{ timezone: 'America/Winnipeg', expectedGMTOffset: 6, month: 11, date: 1, hours: 3, minutes: 0 },
					{ timezone: 'America/Yakutat', expectedGMTOffset: 9, month: 11, date: 1, hours: 15, minutes: 0 }
				].forEach((test) => {
					it(`${test.timezone}: should have expected GMT offset of ${test.expectedGMTOffset} hours on ${test.month}/${test.date} at ${test.hours}:${test.minutes} AM `, () => {
						const dateTime = {
							month: test.month,
							date: test.date,
							year: 2015,
							hours: test.hours,
							minutes: test.minutes,
							seconds: 0
						};
						documentLocaleSettings.timezone.identifier = test.timezone;
						const result = convertLocalToUTCDateTime(dateTime);
						const expectedResult = getExpectedResult(dateTime, test.expectedGMTOffset);
						expect(result).to.deep.equal(expectedResult);
					});
				});
			});

		});

		describe('convertUTCToLocalDateTime', () => {
			const hours = 12;
			const minutes = 28;
			const date = 25;
			const UTCDateTime = {
				month: 8,
				date: date,
				year: 2015,
				hours: hours,
				minutes: minutes,
				seconds: 0
			};

			it('should return original date if timezone identifier is blank', () => {
				documentLocaleSettings.timezone.identifier = '';
				const result = convertUTCToLocalDateTime(UTCDateTime);
				expect(result).to.deep.equal(UTCDateTime);
			});

			it('should throw if timezone identifier is invalid', () => {
				documentLocaleSettings.timezone.identifier = 'FAKE';
				expect(() => {
					convertUTCToLocalDateTime(UTCDateTime);
				}).to.throw();
			});

			it('should have expected GMT offset of -5 for timezone America/Toronto at midnight', () => {
				documentLocaleSettings.timezone.identifier = 'America/Toronto';
				const UTCDateTime2 = {
					month: 2,
					date: 27,
					year: 2015,
					hours: 5,
					minutes: 0,
					seconds: 0
				};
				const result = convertUTCToLocalDateTime(UTCDateTime2);
				const expectedResult = getExpectedResult(UTCDateTime2, -5);
				expect(result).to.deep.equal(expectedResult);
			});

			[
				{ timezone: 'Pacific/Rarotonga', expectedGMTOffset: -10 },
				{ timezone: 'America/Yakutat', expectedGMTOffset: -8 },
				{ timezone: 'America/Santa_Isabel', expectedGMTOffset: -7 },
				{ timezone: 'America/Toronto', expectedGMTOffset: -4 },
				{ timezone: 'Atlantic/Reykjavik', expectedGMTOffset: 0 },
				{ timezone: 'Australia/Eucla', expectedGMTOffset: 8.75 },
				{ timezone: 'Australia/Darwin', expectedGMTOffset: 9.5 },
				{ timezone: 'Pacific/Apia', expectedGMTOffset: 13 }
			].forEach((test) => {
				it(`should have expected GMT offset of ${test.expectedGMTOffset} for timezone ${test.timezone}`, () => {
					documentLocaleSettings.timezone.identifier = test.timezone;
					const result = convertUTCToLocalDateTime(UTCDateTime);
					const expectedResult = getExpectedResult(UTCDateTime, test.expectedGMTOffset);
					expect(result).to.deep.equal(expectedResult);
				});
			});

			describe('Daylight Savings', () => {
				[
					{ timezone: 'America/Toronto', expectedGMTOffset: 4, month: 3, date: 8, hours: 7, minutes: 0 },
					{ timezone: 'America/Toronto', expectedGMTOffset: 5, month: 3, date: 8, hours: 6, minutes: 59 },
					{ timezone: 'America/Toronto', expectedGMTOffset: 4, month: 11, date: 1, hours: 5, minutes: 59 },
					{ timezone: 'America/Toronto', expectedGMTOffset: 5, month: 11, date: 1, hours: 7, minutes: 0 },
					{ timezone: 'America/Winnipeg', expectedGMTOffset: 5, month: 3, date: 8, hours: 8, minutes: 0 },
					{ timezone: 'America/Winnipeg', expectedGMTOffset: 6, month: 3, date: 8, hours: 7, minutes: 59 },
					{ timezone: 'America/Winnipeg', expectedGMTOffset: 5, month: 11, date: 1, hours: 6, minutes: 59 },
					{ timezone: 'America/Winnipeg', expectedGMTOffset: 6, month: 11, date: 1, hours: 8, minutes: 0 },
					{ timezone: 'America/Yakutat', expectedGMTOffset: 9, month: 11, date: 1, hours: 15, minutes: 0 }
				].forEach((test) => {
					it(`${test.timezone}: should have expected GMT offset of ${test.expectedGMTOffset} hours on ${test.month}/${test.date} at ${test.hours}:${test.minutes} AM UTC `, () => {
						const dateTime = {
							month: test.month,
							date: test.date,
							year: 2015,
							hours: test.hours,
							minutes: test.minutes,
							seconds: 0
						};
						documentLocaleSettings.timezone.identifier = test.timezone;
						const result = convertUTCToLocalDateTime(dateTime);
						const expectedResult = getExpectedResult(dateTime, -1 * test.expectedGMTOffset);
						expect(result).to.deep.equal(expectedResult);
					});
				});
			});
		});

		describe('UTC -> Local -> UTC', () => {
			[
				{ timezone: 'Pacific/Rarotonga', expect: { month: 12, date: 31, year: 2015, hours: 9, minutes: 3, seconds: 0 } },
				{ timezone: 'America/Santa_Isabel', expect: { month: 12, date: 31, year: 2015, hours: 11, minutes: 3, seconds: 0 } },
				{ timezone: 'America/Toronto', expect: { month: 12, date: 31, year: 2015, hours: 14, minutes: 3, seconds: 0 } },
				{ timezone: 'America/Halifax', expect: { month: 12, date: 31, year: 2015, hours: 15, minutes: 3, seconds: 0 } },
				{ timezone: 'Atlantic/Reykjavik', expect: { month: 12, date: 31, year: 2015, hours: 19, minutes: 3, seconds: 0 } },
				{ timezone: 'Australia/Eucla', expect: { month: 1, date: 1, year: 2016, hours: 3, minutes: 48, seconds: 0 } },
				{ timezone: 'Australia/Darwin', expect: { month: 1, date: 1, year: 2016, hours: 4, minutes: 33, seconds: 0 } },
				{ timezone: 'Pacific/Apia', expect: { month: 1, date: 1, year: 2016, hours: 9, minutes: 3, seconds: 0 } }
			].forEach((test) => {
				it(`should have expected conversion for timezone ${test.timezone}`, () => {
					const UTCDateTime = {
						month: 12,
						date: 31,
						year: 2015,
						hours: 19,
						minutes: 3,
						seconds: 0
					};
					documentLocaleSettings.timezone.identifier = test.timezone;

					const localDateTimeResult = convertUTCToLocalDateTime(UTCDateTime);
					expect(localDateTimeResult).to.deep.equal(test.expect);

					const UTCDateTimeResult = convertLocalToUTCDateTime(localDateTimeResult);
					expect(UTCDateTimeResult).to.deep.equal(UTCDateTime);
				});
			});
		});
	});

	describe('formatTime', () => {

		const earlyTime = new Date(2015, 7, 25, 1, 28);
		const lateTime = new Date(2015, 7, 25, 13, 52);

		it('should default "format" to "short"', () => {
			const value = formatTime(new Date(1981, 3, 14, 10, 3));
			expect(value).to.equal('10:03 AM');
		});

		[
			{ format: 'H:mm', expect1: '1:28', expect2: '13:52' },
			{ format: 'h:mm tt', expect1: '1:28 AM', expect2: '1:52 PM' },
			{ format: 'HH\' h \'mm', expect1: '01 h 28', expect2: '13 h 52' },
			{ format: 'HH:mm', expect1: '01:28', expect2: '13:52' },
			{ format: 'tt h:mm', expect1: 'AM 1:28', expect2: 'PM 1:52' },
			{ format: 'tt hh:mm', expect1: 'AM 01:28', expect2: 'PM 01:52' },
			{ format: 'short', expect1: '1:28 AM', expect2: '1:52 PM' },
			{ format: 'medium', expect1: '1:28 AM', expect2: '1:52 PM' },
			{ format: 'full', expect1: '1:28 AM EST', expect2: '1:52 PM EST' }
		].forEach((input) => {
			it(`should apply custom format "${input.format}" for 1-digit and 2-digit times`, () => {
				const options = { format: input.format, timezone: 'EST' };
				const value1 = formatTime(earlyTime, options);
				expect(value1).to.equal(input.expect1);
				const value2 = formatTime(lateTime, options);
				expect(value2).to.equal(input.expect2);
			});
		});

		it('should format midnight as hour 12', () => {
			const value = formatTime(new Date(2015, 7, 25, 0, 1));
			expect(value).to.equal('12:01 AM');
		});

		it('should use timezone name from document settings', () => {
			documentLocaleSettings.timezone.name = 'SettingsZone';
			const value = formatTime(earlyTime, { format: 'full' });
			expect(value).to.equal('1:28 AM SettingsZone');
		});

		it('should override timezone name from options', () => {
			documentLocaleSettings.timezone.name = 'SettingsZone';
			const value = formatTime(earlyTime, { format: 'full', timezone: 'OptionsZone' });
			expect(value).to.equal('1:28 AM OptionsZone');
		});

		[
			{ locale: 'ar', expect: ['01:28', '1:28 ص', '01:28 EST', '1:28 ص EST', '13:52', '1:52 م', '13:52 EST', '1:52 م EST'] },
			{ locale: 'ar-SA', expect: ['01:28', '1:28 ص', '01:28 EST', '1:28 ص EST', '13:52', '1:52 م', '13:52 EST', '1:52 م EST'] },
			{ locale: 'cy-GB', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'da', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'da-DK', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'de', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'de-DE', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'en', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'en-CA', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'en-GB', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'en-US', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'es', expect: ['01:28', '1:28 a. m.', '01:28 EST', '1:28 a. m. EST', '13:52', '1:52 p. m.', '13:52 EST', '1:52 p. m. EST'] },
			{ locale: 'es-ES', expect: ['01:28', '1:28 a. m.', '01:28 EST', '1:28 a. m. EST', '13:52', '1:52 p. m.', '13:52 EST', '1:52 p. m. EST'] },
			{ locale: 'es-MX', expect: ['01:28', '1:28 a. m.', '01:28 EST', '1:28 a. m. EST', '13:52', '1:52 p. m.', '13:52 EST', '1:52 p. m. EST'] },
			{ locale: 'fr', expect: ['01 h 28', '1:28 AM', '01 h 28 EST', '1:28 AM EST', '13 h 52', '1:52 PM', '13 h 52 EST', '1:52 PM EST'] },
			{ locale: 'fr-CA', expect: ['01 h 28', '1:28 AM', '01 h 28 EST', '1:28 AM EST', '13 h 52', '1:52 PM', '13 h 52 EST', '1:52 PM EST'] },
			{ locale: 'fr-FR', expect: ['01 h 28', '1:28 AM', '01 h 28 EST', '1:28 AM EST', '13 h 52', '1:52 PM', '13 h 52 EST', '1:52 PM EST'] },
			{ locale: 'fr-ON', expect: ['01 h 28', '1:28 AM', '01 h 28 EST', '1:28 AM EST', '13 h 52', '1:52 PM', '13 h 52 EST', '1:52 PM EST'] },
			{ locale: 'hi', expect: ['01:28', '1:28 पूर्वाह्न', '01:28 EST', '1:28 पूर्वाह्न EST', '13:52', '1:52 अपराह्न', '13:52 EST', '1:52 अपराह्न EST'] },
			{ locale: 'hi-IN', expect: ['01:28', '1:28 पूर्वाह्न', '01:28 EST', '1:28 पूर्वाह्न EST', '13:52', '1:52 अपराह्न', '13:52 EST', '1:52 अपराह्न EST'] },
			{ locale: 'ja', expect: ['1:28', '1:28 午前', '1:28 EST', '1:28 午前 EST', '13:52', '1:52 午後', '13:52 EST', '1:52 午後 EST'] },
			{ locale: 'ja-JP', expect: ['1:28', '1:28 午前', '1:28 EST', '1:28 午前 EST', '13:52', '1:52 午後', '13:52 EST', '1:52 午後 EST'] },
			{ locale: 'ko', expect: ['01:28', '오전 1:28', '01:28 EST', '오전 1:28 EST', '13:52', '오후 1:52', '13:52 EST', '오후 1:52 EST'] },
			{ locale: 'ko-KR', expect: ['01:28', '오전 1:28', '01:28 EST', '오전 1:28 EST', '13:52', '오후 1:52', '13:52 EST', '오후 1:52 EST'] },
			{ locale: 'nl', expect: ['01:28', '1:28 a.m.', '01:28 EST', '1:28 a.m. EST', '13:52', '1:52 p.m.', '13:52 EST', '1:52 p.m. EST'] },
			{ locale: 'nl-NL', expect: ['01:28', '1:28 a.m.', '01:28 EST', '1:28 a.m. EST', '13:52', '1:52 p.m.', '13:52 EST', '1:52 p.m. EST'] },
			{ locale: 'pt', expect: ['01:28', '1:28 AM', '01:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'pt-BR', expect: ['1:28', '1:28 AM', '1:28 EST', '1:28 AM EST', '13:52', '1:52 PM', '13:52 EST', '1:52 PM EST'] },
			{ locale: 'sv', expect: ['01:28', '1:28 fm', '01:28 EST', '1:28 fm EST', '13:52', '1:52 em', '13:52 EST', '1:52 em EST'] },
			{ locale: 'sv-SE', expect: ['01:28', '1:28 fm', '01:28 EST', '1:28 fm EST', '13:52', '1:52 em', '13:52 EST', '1:52 em EST'] },
			{ locale: 'tr', expect: ['01:28', '1:28 ÖÖ', '01:28 EST', '1:28 ÖÖ EST', '13:52', '1:52 ÖS', '13:52 EST', '1:52 ÖS EST'] },
			{ locale: 'tr-TR', expect: ['01:28', '1:28 ÖÖ', '01:28 EST', '1:28 ÖÖ EST', '13:52', '1:52 ÖS', '13:52 EST', '1:52 ÖS EST'] },
			{ locale: 'zh', expect: ['1:28', '上午 1:28', 'EST 1:28', 'EST 上午 1:28', '13:52', '下午 1:52', 'EST 13:52', 'EST 下午 1:52'] },
			{ locale: 'zh-CN', expect: ['1:28', '上午 1:28', 'EST 1:28', 'EST 上午 1:28', '13:52', '下午 1:52', 'EST 13:52', 'EST 下午 1:52'] },
			{ locale: 'zh-TW', expect: ['01:28', '上午 01:28', '01:28 EST', '上午 01:28 EST', '13:52', '下午 01:52', '13:52 EST', '下午 01:52 EST'] }
		].forEach((input) => {
			let index = -1;
			['early', 'late'].forEach((timeOfDay) => {
				['short', 'full'].forEach((format) => {
					[true, false].forEach((hour24) => {
						it(`should format ${input.locale}/${timeOfDay}/${format}/${hour24}`, () => {
							documentLocaleSettings.language = input.locale;
							documentLocaleSettings.overrides = { date: { hour24: hour24 } };
							index++;
							const time = timeOfDay === 'early' ? earlyTime : lateTime;
							const value = formatTime(time, { format: format, timezone: 'EST' });
							expect(value).to.equal(input.expect[index]);
						});
					});
				});
			});
		});

	});

	describe('parseTime', () => {

		const nowMorning = new Date(2015, 7, 26, 2, 5);
		const nowAfternoon = new Date(2015, 7, 26, 13, 15);
		let now;
		const timeOptions = {
			nowProvider: () => now
		};

		function assertTime(time, expectedHour, expectedMinute) {
			expect(time.getHours()).to.equal(expectedHour);
			expect(time.getMinutes()).to.equal(expectedMinute);
		}

		beforeEach(() => {
			now = nowMorning;
		});

		[
			undefined,
			null,
			'',
			'  	',
			'abcd'
		].forEach((input) => {
			it(`should return "null" for input "${input}"`, () => {
				const time = parseTime(input, timeOptions);
				expect(time).to.be.null;
			});
		});

		it('should use today as default "nowProvider"', () => {
			const now = new Date();
			const time = parseTime('3:01 PM');
			expect(time.getFullYear()).to.equal(now.getFullYear());
			expect(time.getMonth()).to.equal(now.getMonth());
			expect(time.getDate()).to.equal(now.getDate());
		});

		describe('morning', () => {

			it('should interpret a single digit as the hour', () => {
				const time = parseTime('5', timeOptions);
				assertTime(time, 5, 0);
			});

			it('should treat leading zeros in 1-digit input as midnight', () => {
				const time = parseTime('0', timeOptions);
				assertTime(time, 0, 0);
			});

			it('should interpret two digits as the hour', () => {
				const time = parseTime('18', timeOptions);
				assertTime(time, 18, 0);
			});

			it('should treat leading zeros in 2-digit input as 0h', () => {
				const time = parseTime('08', timeOptions);
				assertTime(time, 8, 0);
			});

			it('should round hour down to 23', () => {
				const time = parseTime('39', timeOptions);
				assertTime(time, 23, 0);
			});

			it('should interpret three digits as hmm', () => {
				const time = parseTime('231', timeOptions);
				assertTime(time, 2, 31);
			});

			it('should treat leading zeros in 3-digit inputs as 0mm', () => {
				const time = parseTime('023', timeOptions);
				assertTime(time, 0, 23);
			});

			it('should round minute down to 59', () => {
				const time = parseTime('299', timeOptions);
				assertTime(time, 2, 59);
			});

			it('should interpret four digits as hhmm', () => {
				const time = parseTime('1439', timeOptions);
				assertTime(time, 14, 39);
			});

			it('should treat leading zeros in four-digit inputs as 0hmm', () => {
				const time = parseTime('0439', timeOptions);
				assertTime(time, 4, 39);
			});

			it('should ignore digits beyond 4', () => {
				const time = parseTime('11345678', timeOptions);
				assertTime(time, 11, 34);
			});

			it('should treat "12" hour as midnight in the morning', () => {
				const time = parseTime('12', timeOptions);
				assertTime(time, 0, 0);
			});

			[
				{ val: '1:01', hour: 1, minute: 1 },
				{ val: '1:01 PM', hour: 13, minute: 1 },
				{ val: '1:01 pm', hour: 13, minute: 1 },
				{ val: '1:01 P.M.', hour: 13, minute: 1 },
				{ val: '11 h 29', hour: 11, minute: 29 },
				{ val: '22 h 56', hour: 22, minute: 56 },
				{ val: 'pm 9:29', hour: 21, minute: 29 }
			].forEach((input) => {
				it(`should parse time "${input.val}"`, () => {
					const time = parseTime(input.val, timeOptions);
					assertTime(time, input.hour, input.minute);
				});
			});

		});

		describe('afternoon', () => {

			beforeEach(() => {
				now = nowAfternoon;
			});

			it('should treat leading zeros in 1-digit input as midnight', () => {
				const time = parseTime('0', timeOptions);
				assertTime(time, 0, 0);
			});

			it('should treat hour as PM if now is afternoon', () => {
				const time = parseTime('5', timeOptions);
				assertTime(time, 17, 0);
			});

			it('should treat leading zeros in 2-digit input as 0h', () => {
				const time = parseTime('05', timeOptions);
				assertTime(time, 5, 0);
			});

			it('should treat leading zeros in 3-digit input as 0mm', () => {
				const time = parseTime('029', timeOptions);
				assertTime(time, 0, 29);
			});

			it('should treat leading zeros in 4-digit input as 0hmm', () => {
				const time = parseTime('0420', timeOptions);
				assertTime(time, 4, 20);
			});

			it('should not treat hour as PM if using 24-hour clock', () => {
				documentLocaleSettings.overrides = { date:{ hour24: true } };
				const time = parseTime('5', timeOptions);
				assertTime(time, 5, 0);
			});

			it('should treat "12" as noon', () => {
				const time = parseTime('12', timeOptions);
				assertTime(time, 12, 0);
			});

			[
				{ val: '1:01', hour: 13, minute: 1 },
				{ val: '1:01 am', hour: 1, minute: 1 },
				{ val: '1:01 am', hour: 1, minute: 1 },
				{ val: '1:01 A.M.', hour: 1, minute: 1 },
				{ val: '11 h 29', hour: 23, minute: 29 },
				{ val: '11h29', hour: 23, minute: 29 },
				{ val: '22 h 56', hour: 22, minute: 56 },
				{ val: '22h56', hour: 22, minute: 56 },
				{ val: 'am 9:29', hour: 9, minute: 29 }
			].forEach((input) => {
				it(`should parse time "${input.val}"`, () => {
					const time = parseTime(input.val, timeOptions);
					assertTime(time, input.hour, input.minute);
				});
			});
		});

		describe('all locales', () => {
			const expects = [
				{ hour: 1, minute: 28 },
				{ hour: 1, minute: 28 },
				{ hour: 13, minute: 52 },
				{ hour: 13, minute: 52 }
			];
			[
				{ locale: 'ar', inputs: ['1:28 ص', '01:28', '1:52 م', '13:52'] },
				{ locale: 'ar-SA', inputs: ['1:28 ص', '01:28', '1:52 م', '13:52'] },
				{ locale: 'cy-GB', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'da', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'da-DK', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'de', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'de-DE', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'en', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'en-CA', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'en-GB', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'en-US', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'es', inputs: ['01:28 a. m.', '01:28', '01:52 p. m.', '13:52'] },
				{ locale: 'es-ES', inputs: ['01:28 a. m.', '01:28', '01:52 p. m.', '13:52'] },
				{ locale: 'es-MX', inputs: ['01:28 a. m.', '01:28', '01:52 p. m.', '13:52'] },
				{ locale: 'fr', inputs: ['01 h 28 AM', '01 h 28', '01 h 52 PM', '13 h 52'] },
				{ locale: 'fr-CA', inputs: ['01 h 28 AM', '01 h 28', '01 h 52 PM', '13 h 52'] },
				{ locale: 'fr-FR', inputs: ['01 h 28 AM', '01 h 28', '01 h 52 PM', '13 h 52'] },
				{ locale: 'fr-ON', inputs: ['01 h 28 AM', '01 h 28', '01 h 52 PM', '13 h 52'] },
				{ locale: 'hi', inputs: ['1:28 पूर्वाह्न', '01:28', '1:52 अपराह्न', '13:52'] },
				{ locale: 'hi-IN', inputs: ['1:28 पूर्वाह्न', '01:28', '1:52 अपराह्न', '13:52'] },
				{ locale: 'ja', inputs: [/*'1:28 午前'*/'1:28', '1:28', '1:52 午後', '13:52'] },
				{ locale: 'ja-JP', inputs: [/*'1:28 午前'*/'1:28', '1:28', '1:52 午後', '13:52'] },
				{ locale: 'ko', inputs: [/*'오전 1:28'*/'1:28', '01:28', '오후 1:52', '13:52'] },
				{ locale: 'ko-KR', inputs: [/*'오전 1:28'*/'1:28', '01:28', '오후 1:52', '13:52'] },
				{ locale: 'nl', inputs: ['1:28 a.m.', '01:28', '1:52 p.m.', '13:52'] },
				{ locale: 'nl-NL', inputs: ['1:28 a.m.', '01:28', '1:52 p.m.', '13:52'] },
				{ locale: 'pt', inputs: ['1:28 AM', '01:28', '1:52 PM', '13:52'] },
				{ locale: 'pt-BR', inputs: ['1:28 AM', '1:28', '1:52 PM', '13:52'] },
				{ locale: 'sv', inputs: ['1:28 fm', '01:28', '1:52 em', '13:52'] },
				{ locale: 'sv-SE', inputs: ['1:28 fm', '01:28', '1:52 em', '13:52'] },
				{ locale: 'tr', inputs: [/*'1:28 ÖÖ'*/'1:28', '01:28', '1:52 ÖS', '13:52'] },
				{ locale: 'tr-TR', inputs: [/*'1:28 ÖÖ'*/'1:28', '01:28', '1:52 ÖS', '13:52'] },
				{ locale: 'zh', inputs: ['上午 1:28', '1:28', '下午 1:52', '13:52'] },
				{ locale: 'zh-CN', inputs: ['上午 1:28', '1:28', '下午 1:52', '13:52'] },
				{ locale: 'zh-TW', inputs: ['上午 01:28', '01:28', '下午 01:52', '13:52'] }
			].forEach((input) => {
				let index = -1;
				input.inputs.forEach((value) => {
					it(`should parse "${value}" in locale ${input.locale}`, () => {
						index++;
						documentLocaleSettings.language = input.locale;
						documentLocaleSettings.overrides = { date: { hour24: index % 2 === 1 } };
						const time = parseTime(value, timeOptions);
						assertTime(time, expects[index].hour, expects[index].minute);
					});
				});
			});
		});

	});

	describe('formatDate', () => {

		[
			{ format: 'd/M/yyyy', expect: '3/8/2015' },
			{ format: 'dd.MM.yyyy', expect: '03.08.2015' },
			{ format: 'dd/MM/yyyy', expect: '03/08/2015' },
			{ format: 'M/d/yyyy', expect: '8/3/2015' },
			{ format: 'M/d/yyyy', expect: '8/3/2015' },
			{ format: 'yyyy/M/d', expect: '2015/8/3' },
			{ format: 'yyyy/MM/dd', expect: '2015/08/03' },
			{ format: 'yyyy-MM-dd', expect: '2015-08-03' },
			{ format: 'dd MMMM yyyy dddd', expect: '03 August 2015 Monday' },
			{ format: 'dddd d\' de \'MMMM\' de \'yyyy', expect: 'Monday 3 de August de 2015' },
			{ format: 'dddd d MMMM yyyy', expect: 'Monday 3 August 2015' },
			{ format: 'dddd \'den\' d MMMM yyyy', expect: 'Monday den 3 August 2015' },
			{ format: 'dddd, d\' de \'MMMM\' de \'yyyy', expect: 'Monday, 3 de August de 2015' },
			{ format: 'dddd, d MMMM, yyyy', expect: 'Monday, 3 August, 2015' },
			{ format: 'yyyy년 M월 d일 dddd', expect: '2015년 8월 3일 Monday' },
			{ format: 'dddd, dd. MMMM yyyy', expect: 'Monday, 03. August 2015' },
			{ format: 'yyyy年M月d日', expect: '2015年8月3日' },
			{ format: 'd\' de \'MMMM\' de \'yyyy', expect: '3 de August de 2015' },
			{ format: 'd MMMM yyyy', expect: '3 August 2015' },
			{ format: 'dd MMMM yyyy', expect: '03 August 2015' },
			{ format: 'dd MMMM, yyyy', expect: '03 August, 2015' },
			{ format: 'MMM d yyyy', expect: 'Aug 3 2015' },
			{ format: 'MMM d, yyyy', expect: 'Aug 3, 2015' },
			{ format: 'yyyy년 M월 d일', expect: '2015년 8월 3일' },
			{ format: 'yyyy年M月d日', expect: '2015年8月3日' },
			{ format: 'dd. MMMM yyyy', expect: '03. August 2015' },
			{ format: 'd. MMMM', expect: '3. August' },
			{ format: 'full', expect: 'Monday, August 3, 2015' },
			{ format: 'medium', expect: 'Aug 3, 2015' },
			{ format: 'short', expect: '8/3/2015' },
			{ format: 'monthYear', expect: 'August 2015' },
			{ format: 'monthDay', expect: 'August 3' },
			{ format: 'shortMonthDay', expect: 'Aug 3' },
			{ format: 'longDayOfWeek', expect: 'Monday' },
			{ format: 'shortDayOfWeek', expect: 'Mon' },
			{ format: 'longMonth', expect: 'August' },
			{ format: 'shortMonth', expect: 'Aug' },
			{ format: 'dddd', expect: 'Monday' },
			{ format: 'ddd', expect: 'Mon' },
			{ format: 'MMMM', expect: 'August' },
			{ format: 'MMM', expect: 'Aug' }
		].forEach((input) => {
			it(`should apply locale format "${input.format}"`, () => {
				const value = formatDate(new Date(2015, 7, 3), { format: input.format });
				expect(value).to.equal(input.expect);
			});
		});

		[
			{ locale: 'ar', expect: ['الثلاثاء, 4 يونيو, 2019', '04 يونيو, 2019', '04/06/2019', 'يونيو, 2019', '4 يونيو', '4 يونيو', 'الثلاثاء', 'ثلاثاء', 'يونيو', 'يونيو'] },
			{ locale: 'ar-SA', expect: ['الثلاثاء, 4 يونيو, 2019', '04 يونيو, 2019', '04/06/2019', 'يونيو, 2019', '4 يونيو', '4 يونيو', 'الثلاثاء', 'ثلاثاء', 'يونيو', 'يونيو'] },
			{ locale: 'cy-GB', expect: ['Dydd Mawrth, 4 Mehefin 2019', '04 Mehefin 2019', '04/06/2019', 'Mehefin 2019', '4 Mehefin', '4 Meh', 'Dydd Mawrth', 'Maw', 'Mehefin', 'Meh'] },
			{ locale: 'da', expect: ['tirsdag den 4. juni 2019', '4. jun.. 2019', '04.06.2019', 'juni 2019', '4. juni', '4. jun.', 'tirsdag', 'tir.', 'juni', 'jun.'] },
			{ locale: 'da-DK', expect: ['tirsdag den 4. juni 2019', '4. jun.. 2019', '04.06.2019', 'juni 2019', '4. juni', '4. jun.', 'tirsdag', 'tir.', 'juni', 'jun.'] },
			{ locale: 'de', expect: ['Dienstag 4. Juni 2019', '4. Juni 2019', '04.06.2019', 'Juni 2019', '4. Juni', '4. Juni', 'Dienstag', 'Di.', 'Juni', 'Juni'] },
			{ locale: 'de-DE', expect: ['Dienstag 4. Juni 2019', '4. Juni 2019', '04.06.2019', 'Juni 2019', '4. Juni', '4. Juni', 'Dienstag', 'Di.', 'Juni', 'Juni'] },
			{ locale: 'en', expect: ['Tuesday, June 4, 2019', 'Jun 4, 2019', '6/4/2019', 'June 2019', 'June 4', 'Jun 4', 'Tuesday', 'Tue', 'June', 'Jun'] },
			{ locale: 'en-CA', expect: ['Tuesday, June 4, 2019', 'Jun 4, 2019', '6/4/2019', 'June 2019', 'June 4', 'Jun 4', 'Tuesday', 'Tue', 'June', 'Jun'] },
			{ locale: 'en-GB', expect: ['Tuesday, 4 June 2019', '04 June 2019', '04/06/2019', 'June 2019', '4 June', '4 Jun', 'Tuesday', 'Tue', 'June', 'Jun'] },
			{ locale: 'en-US', expect: ['Tuesday, June 4, 2019', 'Jun 4, 2019', '6/4/2019', 'June 2019', 'June 4', 'Jun 4', 'Tuesday', 'Tue', 'June', 'Jun'] },
			{ locale: 'es', expect: ['martes 4 de junio de 2019', '4 de junio de 2019', '04/06/2019', 'junio 2019', '4 de junio', '4 de jun.', 'martes', 'mar.', 'junio', 'jun.'] },
			{ locale: 'es-ES', expect: ['martes 4 de junio de 2019', '4 de junio de 2019', '04/06/2019', 'junio 2019', '4 de junio', '4 de jun.', 'martes', 'mar.', 'junio', 'jun.'] },
			{ locale: 'es-MX', expect: ['martes 4 de junio de 2019', '4 de junio de 2019', '04/06/2019', 'junio 2019', '4 de junio', '4 de jun.', 'martes', 'mar.', 'junio', 'jun.'] },
			{ locale: 'fr', expect: ['mardi 4 juin 2019', '4 juin 2019', '04/06/2019', 'juin 2019', '4 juin', '4 juin', 'mardi', 'mar.', 'juin', 'juin'] },
			{ locale: 'fr-CA', expect: ['mardi 4 juin 2019', 'juin 4 2019', '2019-06-04', 'juin 2019', 'juin 4', 'juin 4', 'mardi', 'mar.', 'juin', 'juin'] },
			{ locale: 'fr-FR', expect: ['mardi 4 juin 2019', '4 juin 2019', '04/06/2019', 'juin 2019', '4 juin', '4 juin', 'mardi', 'mar.', 'juin', 'juin'] },
			{ locale: 'fr-ON', expect: ['mardi le 4 juin 2019', 'juin 4 2019', '2019-06-04', 'juin 2019', '4 juin', '4 juin', 'mardi', 'mar.', 'juin', 'juin'] },
			{ locale: 'hi', expect: ['मंगलवार, 4 जून 2019', '4 जून 2019', '04-06-2019', 'जून 2019', '4 जून', '4 जून', 'मंगलवार', 'मंगल', 'जून', 'जून'] },
			{ locale: 'hi-IN', expect: ['मंगलवार, 4 जून 2019', '4 जून 2019', '04-06-2019', 'जून 2019', '4 जून', '4 जून', 'मंगलवार', 'मंगल', 'जून', 'जून'] },
			{ locale: 'ja', expect: ['2019年6月4日', '2019年6月4日', '2019/06/04', '2019年6月', '6月4日', '6月4日', '火', '火', '6 月', '6 月'] },
			{ locale: 'ja-JP', expect: ['2019年6月4日', '2019年6月4日', '2019/06/04', '2019年6月', '6月4日', '6月4日', '火', '火', '6 月', '6 月'] },
			{ locale: 'ko', expect: ['2019년 6월 4일 화요일', '2019년 6월 4일', '2019-06-04', '2019년 6월', '6월 4일', '6월 4일', '화요일', '화', '6월', '6월'] },
			{ locale: 'ko-KR', expect: ['2019년 6월 4일 화요일', '2019년 6월 4일', '2019-06-04', '2019년 6월', '6월 4일', '6월 4일', '화요일', '화', '6월', '6월'] },
			{ locale: 'nl', expect: ['dinsdag 4 juni 2019', '4 juni 2019', '04-06-2019', 'juni 2019', '4 juni', '4 jun.', 'dinsdag', 'di', 'juni', 'jun.'] },
			{ locale: 'nl-NL', expect: ['dinsdag 4 juni 2019', '4 juni 2019', '04-06-2019', 'juni 2019', '4 juni', '4 jun.', 'dinsdag', 'di', 'juni', 'jun.'] },
			{ locale: 'pt', expect: ['terça-feira, 4 de junho de 2019', '4 de  junho de 2019', '04/06/2019', 'junho de 2019', '04 de junho', '04 de jun', 'terça-feira', 'ter', 'junho', 'jun'] },
			{ locale: 'pt-BR', expect: ['terça-feira, 4 de junho de 2019', '4 de  junho de 2019', '04/06/2019', 'junho de 2019', '04 de junho', '04 de jun', 'terça-feira', 'ter', 'junho', 'jun'] },
			{ locale: 'sv', expect: ['Tisdag den 4 juni 2019', '4 juni 2019', '2019-06-04', 'juni 2019', '04 juni', '04 juni', 'Tisdag', 'Tis', 'juni', 'juni'] },
			{ locale: 'sv-SE', expect: ['Tisdag den 4 juni 2019', '4 juni 2019', '2019-06-04', 'juni 2019', '04 juni', '04 juni', 'Tisdag', 'Tis', 'juni', 'juni'] },
			{ locale: 'tr', expect: ['04 Haziran 2019 Salı', '04 Haziran 2019', '04.06.2019', 'Haziran 2019', '04 Haziran', '04 Haz', 'Salı', 'Sal', 'Haziran', 'Haz'] },
			{ locale: 'tr-TR', expect: ['04 Haziran 2019 Salı', '04 Haziran 2019', '04.06.2019', 'Haziran 2019', '04 Haziran', '04 Haz', 'Salı', 'Sal', 'Haziran', 'Haz'] },
			{ locale: 'zh', expect: ['2019年6月4日', '2019年6月4日', '2019/6/4', '2019年6月', '6月4日', '6月4日', '週二', '週二', '六月', '六月'] },
			{ locale: 'zh-CN', expect: ['2019年6月4日', '2019年6月4日', '2019/6/4', '2019年6月', '6月4日', '6月4日', '週二', '週二', '六月', '六月'] },
			{ locale: 'zh-TW', expect: ['2019年6月4日', '2019年6月4日', '2019/6/4', '2019年6月', '6月4日', '6月4日', '星期二', '週二', '六月', '六月'] }
		].forEach((input) => {
			let index = -1;
			['full', 'medium', 'short', 'monthYear', 'monthDay', 'shortMonthDay', 'longDayOfWeek', 'shortDayOfWeek', 'longMonth', 'shortMonth'].forEach((format) => {
				it(`should format ${input.locale}/${format}`, () => {
					documentLocaleSettings.language = input.locale;
					index++;
					const date = new Date(2019, 5, 4);
					const value = formatDate(date, { format: format });
					expect(value).to.equal(input.expect[index]);
				});
			});
		});

	});

	describe('parseDate', () => {

		it('should use "m/d/yyyy" as a default pattern', () => {
			documentLocaleSettings.overrides = { date:{ formats:{ dateFormats:{ short:'abc' } } } };
			const value = parseDate('12/13/2003');
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
			{ format: 'd/M/yyyy', val: '9/4/1958' },
			{ format: 'dd.MM.yyyy', val: '09.04.1958' },
			{ format: 'dd/MM/yyyy', val: '09/04/1958' },
			{ format: 'M/d/yyyy', val: '4/9/1958' },
			{ format: 'MM/dd/yyyy', val: '04/09/1958' },
			{ format: 'yyyy/M/d', val: '1958/4/09' },
			{ format: 'yyyy/MM/dd', val: '1958/04/09' },
			{ format: 'yyyy-MM-dd', val: '1958-04-09' }
		].forEach((input) => {
			it(`should parse format "${input.format}"`, () => {
				documentLocaleSettings.overrides = { date:{ formats:{ dateFormats:{ short:input.format } } } };
				const value = parseDate(input.val);
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
			documentLocaleSettings.overrides = { date:{ formats:{ dateFormats:{ short:'yyyy|M|d|w' } } } };
			const value = parseDate('2025|5|29');
			expect(value.getFullYear()).to.equal(2025);
			expect(value.getMonth()).to.equal(4);
			expect(value.getDate()).to.equal(29);
		});

		describe('all locales', () => {
			[
				{ locale: 'ar', date: '29/05/2025' },
				{ locale: 'ar-SA', date: '29/05/2025' },
				{ locale: 'cy-GB', date: '29/05/2025' },
				{ locale: 'da', date: '29.05.2025' },
				{ locale: 'da-DK', date: '29.05.2025' },
				{ locale: 'de', date: '29.05.2025' },
				{ locale: 'de-DE', date: '29.05.2025' },
				{ locale: 'en', date: '5/29/2025' },
				{ locale: 'en-CA', date: '5/29/2025' },
				{ locale: 'en-GB', date: '29/05/2025' },
				{ locale: 'en-US', date: '5/29/2025' },
				{ locale: 'es', date: '29/05/2025' },
				{ locale: 'es-ES', date: '29/05/2025' },
				{ locale: 'es-MX', date: '29/05/2025' },
				{ locale: 'fr', date: '29/05/2025' },
				{ locale: 'fr-CA', date: '2025-05-29' },
				{ locale: 'fr-FR', date: '29/05/2025' },
				{ locale: 'fr-ON', date: '2025-05-29' },
				{ locale: 'hi', date: '29-05-2025' },
				{ locale: 'hi-IN', date: '29-05-2025' },
				{ locale: 'ja', date: '2025/05/29' },
				{ locale: 'ja-JP', date: '2025/05/29' },
				{ locale: 'ko', date: '2025-05-29' },
				{ locale: 'ko-KR', date: '2025-05-29' },
				{ locale: 'nl', date: '29-05-2025' },
				{ locale: 'nl-NL', date: '29-05-2025' },
				{ locale: 'pt', date: '29/05/2025' },
				{ locale: 'pt-BR', date: '29/05/2025' },
				{ locale: 'sv', date: '2025-05-29' },
				{ locale: 'sv-SE', date: '2025-05-29' },
				{ locale: 'tr', date: '29.05.2025' },
				{ locale: 'tr-TR', date: '29.05.2025' },
				{ locale: 'zh', date: '2025/5/29' },
				{ locale: 'zh-CN', date: '2025/5/29' },
				{ locale: 'zh-TW', date: '2025/5/29' }
			].forEach((input) => {
				it(`should parse date in locale ${input.locale}`, () => {
					documentLocaleSettings.language = input.locale;
					const date = parseDate(input.date);
					expect(date.getFullYear()).to.equal(2025);
					expect(date.getMonth()).to.equal(4);
					expect(date.getDate()).to.equal(29);
				});
			});
		});

	});

	describe('formatDateTime', () => {

		it('should default "format" to "short"', () => {
			const value = formatDateTime(new Date(1981, 3, 14, 10, 3));
			expect(value).to.equal('4/14/1981 10:03 AM');
		});

		[
			{ format: 'full', expect: 'Monday, August 3, 2015 1:44 PM EST' },
			{ format: 'medium', expect: 'Aug 3, 2015 1:44 PM' },
			{ format: 'short', expect: '8/3/2015 1:44 PM' },
			{ format: 'monthYear', expect: 'August 2015' },
			{ format: 'monthDay', expect: 'August 3' },
			{ format: 'shortMonthDay', expect: 'Aug 3' },
			{ format: 'longDayOfWeek', expect: 'Monday' },
			{ format: 'shortDayOfWeek', expect: 'Mon' },
			{ format: 'longMonth', expect: 'August' },
			{ format: 'shortMonth', expect: 'Aug' }
		].forEach((input) => {
			it(`should apply format "${input.format}"`, () => {
				const value = formatDateTime(
					new Date(2015, 7, 3, 13, 44),
					{ format: input.format, timezone: 'EST' }
				);
				expect(value).to.equal(input.expect);
			});
		});

	});

	describe('formatDateTimeFromTimestamp', () => {
		const options = { format: 'medium' };
		const timestamp = Date.UTC(2015, 7, 25, 12, 28, 0);

		it('should return original date if timezone identifier is blank', () => {
			documentLocaleSettings.timezone.identifier = '';
			const result = formatDateTimeFromTimestamp(timestamp, options);
			expect(result).to.deep.equal(formatDateTime(new Date(timestamp), options));
		});

		it('should throw if timezone identifier is invalid', () => {
			documentLocaleSettings.timezone.identifier = 'FAKE';
			expect(() => {
				formatDateTimeFromTimestamp(timestamp);
			}).to.throw();
		});

		it('should have expected GMT offset of -5 for timezone America/Toronto at midnight', () => {
			documentLocaleSettings.timezone.identifier = 'America/Toronto';
			const timestamp2 = Date.UTC(2015, 1, 27, 5, 0, 0);
			const result = formatDateTimeFromTimestamp(timestamp2);
			expect(result).to.deep.equal(formatDateTime(new Date(2015, 1, 27, 0, 0, 0)));
		});

		[
			{ timezone: 'Pacific/Rarotonga', expectedDate: new Date(2015, 7, 25, 2, 28) },
			{ timezone: 'America/Yakutat', expectedDate: new Date(2015, 7, 25, 4, 28) },
			{ timezone: 'America/Santa_Isabel', expectedDate: new Date(2015, 7, 25, 5, 28) },
			{ timezone: 'America/Toronto', expectedDate: new Date(2015, 7, 25, 8, 28) },
			{ timezone: 'Atlantic/Reykjavik', expectedDate: new Date(2015, 7, 25, 12, 28) },
			{ timezone: 'Australia/Eucla', expectedDate: new Date(2015, 7, 25, 21, 13) },
			{ timezone: 'Australia/Darwin', expectedDate: new Date(2015, 7, 25, 21, 58) },
			{ timezone: 'Pacific/Apia', expectedDate: new Date(2015, 7, 26, 1, 28) }
		].forEach((test) => {
			it(`should produce date ${test.expectedDate} for timezone ${test.timezone}`, () => {
				documentLocaleSettings.timezone.identifier = test.timezone;
				const result = formatDateTimeFromTimestamp(timestamp, options);
				expect(result).to.deep.equal(formatDateTime(test.expectedDate, options));
			});
		});
	});

	describe('formatDateFromTimestamp', () => {
		const options = { format: 'medium' };
		const timestamp = Date.UTC(2015, 7, 25, 12, 28, 0);

		it('should return original date if timezone identifier is blank', () => {
			documentLocaleSettings.timezone.identifier = '';
			const result = formatDateFromTimestamp(timestamp, options);
			expect(result).to.deep.equal(formatDate(new Date(timestamp), options));
		});

		it('should throw if timezone identifier is invalid', () => {
			documentLocaleSettings.timezone.identifier = 'FAKE';
			expect(() => {
				formatDateFromTimestamp(timestamp);
			}).to.throw();
		});

		it('should have expected GMT offset of -5 for timezone America/Toronto at midnight', () => {
			documentLocaleSettings.timezone.identifier = 'America/Toronto';
			const timestamp2 = Date.UTC(2015, 1, 27, 5, 0, 0);
			const result = formatDateFromTimestamp(timestamp2);
			expect(result).to.deep.equal(formatDate(new Date(2015, 1, 27, 0, 0, 0)));
		});

		[
			{ timezone: 'Pacific/Rarotonga', expectedDate: new Date(2015, 7, 25, 2, 28) },
			{ timezone: 'America/Yakutat', expectedDate: new Date(2015, 7, 25, 4, 28) },
			{ timezone: 'America/Santa_Isabel', expectedDate: new Date(2015, 7, 25, 5, 28) },
			{ timezone: 'America/Toronto', expectedDate: new Date(2015, 7, 25, 8, 28) },
			{ timezone: 'Atlantic/Reykjavik', expectedDate: new Date(2015, 7, 25, 12, 28) },
			{ timezone: 'Australia/Eucla', expectedDate: new Date(2015, 7, 25, 21, 13) },
			{ timezone: 'Australia/Darwin', expectedDate: new Date(2015, 7, 25, 21, 58) },
			{ timezone: 'Pacific/Apia', expectedDate: new Date(2015, 7, 26, 1, 28) }
		].forEach((test) => {
			it(`should produce date ${test.expectedDate} for timezone ${test.timezone}`, () => {
				documentLocaleSettings.timezone.identifier = test.timezone;
				const result = formatDateFromTimestamp(timestamp, options);
				expect(result).to.deep.equal(formatDate(test.expectedDate, options));
			});
		});
	});

	describe('formatTimeFromTimestamp', () => {
		const options = { format: 'medium' };
		const timestamp = Date.UTC(2015, 7, 25, 12, 28, 0);

		it('should return original date if timezone identifier is blank', () => {
			documentLocaleSettings.timezone.identifier = '';
			const result = formatTimeFromTimestamp(timestamp, options);
			expect(result).to.deep.equal(formatTime(new Date(timestamp), options));
		});

		it('should throw if timezone identifier is invalid', () => {
			documentLocaleSettings.timezone.identifier = 'FAKE';
			expect(() => {
				formatTimeFromTimestamp(timestamp);
			}).to.throw();
		});

		it('should have expected GMT offset of -5 for timezone America/Toronto at midnight', () => {
			documentLocaleSettings.timezone.identifier = 'America/Toronto';
			const timestamp2 = Date.UTC(2015, 1, 27, 5, 0, 0);
			const result = formatTimeFromTimestamp(timestamp2);
			expect(result).to.deep.equal(formatTime(new Date(2015, 1, 27, 0, 0, 0)));
		});

		[
			{ timezone: 'Pacific/Rarotonga', expectedDate: new Date(2015, 7, 25, 2, 28) },
			{ timezone: 'America/Yakutat', expectedDate: new Date(2015, 7, 25, 4, 28) },
			{ timezone: 'America/Santa_Isabel', expectedDate: new Date(2015, 7, 25, 5, 28) },
			{ timezone: 'America/Toronto', expectedDate: new Date(2015, 7, 25, 8, 28) },
			{ timezone: 'Atlantic/Reykjavik', expectedDate: new Date(2015, 7, 25, 12, 28) },
			{ timezone: 'Australia/Eucla', expectedDate: new Date(2015, 7, 25, 21, 13) },
			{ timezone: 'Australia/Darwin', expectedDate: new Date(2015, 7, 25, 21, 58) },
			{ timezone: 'Pacific/Apia', expectedDate: new Date(2015, 7, 26, 1, 28) }
		].forEach((test) => {
			it(`should produce date ${test.expectedDate} for timezone ${test.timezone}`, () => {
				documentLocaleSettings.timezone.identifier = test.timezone;
				const result = formatTimeFromTimestamp(timestamp, options);
				expect(result).to.deep.equal(formatTime(test.expectedDate, options));
			});
		});
	});

	describe('formatRelativeDateTime', () => {

		let mockNow = '1/1/2023, 4:00:00 AM';
		const _Date = window.Date;

		class Date extends _Date {
			static now() {
				return new Date(mockNow).getTime();
			}
			constructor(input = mockNow) {
				super(input);
			}
		}

		const secondsAgo = secs => new Date(Date.now() - secs * 1000);
		const minutesAgo = mins => secondsAgo(mins * 60);
		const hoursAgo = hours => minutesAgo(hours * 60);
		const daysAgo = days => hoursAgo(days * 24);
		const weeksAgo = weeks => daysAgo(weeks * 7);
		const monthsAgo = months => weeksAgo(months * 4.348);
		const yearsAgo = years => monthsAgo(years * 12);

		before(() => {
			window.Date = Date;
			expect(new window.Date().toLocaleString()).to.equal(mockNow);
		});

		afterEach(() => {
			mockNow = '1/1/2023, 4:00:00 AM';
		});

		after(() => {
			window.Date = _Date;
			expect(new window.Date().toLocaleString()).to.not.equal(mockNow);
		});

		[
			[secondsAgo(-10), 'in 10 seconds'],
			[secondsAgo(1), '1 second ago'],
			[secondsAgo(59.49), '59 seconds ago'],
			[secondsAgo(59.51), '1 minute ago'],
			[minutesAgo(1.49), '1 minute ago'],
			[minutesAgo(1.51), '2 minutes ago'],
			[minutesAgo(59.49), '59 minutes ago'],
			[minutesAgo(59.51), '1 hour ago'],
			[hoursAgo(1.49), '1 hour ago'],
			[hoursAgo(1.51), '2 hours ago'],
			[hoursAgo(5.49), '5 hours ago'],
			[hoursAgo(5.51), 'yesterday'],
			[hoursAgo(23.51), 'yesterday'],
			[new Date('12/31/2022, 12:00:00:000 AM'), 'yesterday'],
			[new Date('12/30/2022, 11:59:59:999 PM'), '1 day ago'],
			[daysAgo(1.49), '1 day ago'],
			[daysAgo(1.51), '2 days ago'],
			[daysAgo(3.51), 'last week'],
			[daysAgo(6.51), 'last week'],
			[new Date('12/25/2022, 12:00:00:000 AM'), 'last week'],
			[new Date('12/24/2022, 11:59:59:999 PM'), '1 week ago'],
			[weeksAgo(1.49), '1 week ago'],
			[weeksAgo(1.51), '2 weeks ago'],
			[weeksAgo(3.49), '3 weeks ago'],
			[weeksAgo(3.51), '1 month ago'],
			[monthsAgo(1.49), '1 month ago'],
			[monthsAgo(1.51), '2 months ago'],
			[monthsAgo(11.49), '11 months ago'],
			[monthsAgo(11.51), '1 year ago'],
			[yearsAgo(1.49), '1 year ago'],
			[yearsAgo(1.51), '2 years ago'],
			[yearsAgo(9.51), '10 years ago']
		].forEach(([date, expectedResult]) => {
			it(`should format ${date} as "${expectedResult}"`, () => {
				const result = formatRelativeDateTime(date);
				expect(result).to.equal(expectedResult);
			});
		});

		it('should respect the document locale', () => {
			documentLocaleSettings.language = 'fr';

			const date = hoursAgo(1);
			const result = formatRelativeDateTime(date);
			expect(result).to.equal('il y a 1 heure');
		});

		it('should respect different starting days of the week', () => {
			documentLocaleSettings.language = 'fr';

			mockNow = '1/6/2023, 4:00:00 AM';

			const date = daysAgo(5);
			const result = formatRelativeDateTime(date);
			expect(result).to.equal('la semaine dernière');
		});

		describe('without Intl.RelativeTimeFormat', () => {

			const _RelativeTimeFormat = Intl.RelativeTimeFormat;

			before(() => {
				delete Intl.RelativeTimeFormat;
			});

			after(() => {
				Intl.RelativeTimeFormat = _RelativeTimeFormat;
				expect(Intl.RelativeTimeFormat).to.exist;
			});

			it('should return the short time on the same date', () => {
				const date = minutesAgo(2);
				const result = formatRelativeDateTime(date);
				expect(result).to.equal('3:58 AM');
			});

			it('should return the short date on a different date', () => {
				documentLocaleSettings.language = 'fr';

				const date = monthsAgo(1);
				const result = formatRelativeDateTime(date);
				expect(result).to.equal('01/12/2022');
			});
		});
	});
});
