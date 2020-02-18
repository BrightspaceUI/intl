import {
	formatFuzzyDate,
	formatFuzzyDateTime,
	millisecondsPer
} from '../lib/fuzzyDateTime.js';

const { second, minute, hour, day } = millisecondsPer;

var expect = chai.expect;

const noon = new Date(2000, 1, 1, 12, 0, 0, 0);
const ninePM = new Date(2000, 1, 1, 21, 0, 0, 0);
const threeAM = new Date(2000, 1, 1, 3, 0, 0, 0);
const offset = (ms, origin = noon) => new Date(origin.getTime() + ms);
const label = makeTime => `${makeTime}`.slice(6);

const future = {
	seconds: n => offset(n * second),
	minutes: n => offset(n * minute),
	hours: (n, origin = noon) => offset(n * hour, origin),
	days: n => offset(n * day),
};

const past = {
	seconds: (n, origin = noon) => offset(-n * second, origin),
	minutes: (n, origin = noon) => offset(-n * minute, origin),
	hours: (n, origin = noon) => offset(-n * hour, origin),
	days: (n, origin = noon) => offset(-n * day, origin),
};

const shortDateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
const shortDateTimeRegex = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2} [AP]M$/;
const fullDateRegex = /^\w+, \w+ \d{1,2}, \d{4}$/;
const fullDateTimeRegex = /^\w+, \w+ \d{1,2}, \d{4} \d{1,2}:\d{2} [AP]M\s*$/;

const enAlwaysShort = new Intl.RelativeTimeFormat('en', {
	localeMatcher: 'best fit',
	numeric: 'always',
	style: 'short'
});

const frAutoLong = new Intl.RelativeTimeFormat('fr', {
	localeMatcher: 'best fit',
	numeric: 'auto',
	style: 'long'
});

const relativeExamples = [
	[() => past.seconds(1), '1 second ago', () => 29 * second],
	[() => past.seconds(29), '29 seconds ago', () => 1 * second],
	[() => future.seconds(1), 'in 1 second', () => 31 * second],
	[() => future.seconds(28), 'in 28 seconds', () => 58 * second],
	[() => past.seconds(30), 'this minute', () => 1 * minute],
	[() => future.seconds(30), 'in 1 minute', () => 1 * minute],
	[() => past.minutes(44), '44 minutes ago', () => 1 * minute],
	[() => future.minutes(44), 'in 44 minutes', () => 1 * minute],
	[() => past.minutes(45), '1 hour ago', () => 45 * minute],
	[() => past.minutes(90.001), '2 hours ago', () => 1 * hour],
	[() => past.minutes(100), '2 hours ago', () => 50 * minute],
	[() => future.minutes(45), 'in 1 hour', () => 15 * minute],
	[() => past.hours(5), '5 hours ago', () => 30 * minute],
	[() => past.hours(5, threeAM), '5 hours ago', () => 30 * minute, { origin: threeAM }],
	[() => future.hours(5), 'in 5 hours', () => 30 * minute],
	[() => future.hours(5, ninePM), 'in 5 hours', () => 30 * minute, { origin: ninePM }],
	[() => past.hours(6), '6 hours ago', () => 30 * minute],
	[() => past.hours(6, threeAM), 'yesterday', () => 9 * hour, { origin: threeAM }],
	[() => past.hours(27, threeAM), 'yesterday', () => 9 * hour, { origin: threeAM }],
	[() => past.hours(27.001, threeAM), '2 days ago', () => 9 * hour, { origin: threeAM }],
	[() => future.hours(6), 'in 6 hours', () => 30 * minute],
	[() => future.hours(6, ninePM), 'tomorrow', () => 15 * hour, { origin: ninePM }],
	[() => future.hours(26.999, ninePM), 'tomorrow', () => 15 * hour, { origin: ninePM }],
	[() => future.hours(27, ninePM), 'in 2 days', () => 15 * hour, { origin: ninePM }],
	[() => past.days(3.4999), '3 days ago', () => 24 * hour],
	[() => future.days(3.4999), 'in 3 days', () => 24 * hour],
	[() => past.days(1), 'yesterday', () => 24 * hour],
	[() => past.days(1), '1 day ago', () => 24 * hour, { rtf: enAlwaysShort }],
	[() => past.days(1), 'hier', () => 24 * hour, { rtf: frAutoLong }],
	[() => past.minutes(23), '23 min. ago', () => 1 * minute, { rtf: enAlwaysShort }],
];

describe('fuzzyDateTime', () => {

	describe('formatFuzzyDate', () => {
		it('omits the time when formatting an absolute date', () => {
			expect(formatFuzzyDate(past.days(5), { origin: noon })).to.match(shortDateRegex);
			expect(formatFuzzyDate(future.days(5), { origin: noon })).to.match(shortDateRegex);
		});

		it('omits the time when formatting a long absolute date', () => {
			expect(formatFuzzyDate(past.days(5), { origin: noon, absoluteFormat: 'full' })).to.match(fullDateRegex);
			expect(formatFuzzyDate(future.days(5), { origin: noon, absoluteFormat: 'full' })).to.match(fullDateRegex);
		});
	});

	describe('formatFuzzyDateTime', () => {
		it('includes the time when formatting an absolute date', () => {
			expect(formatFuzzyDateTime(past.days(5), { origin: noon })).to.match(shortDateTimeRegex);
			expect(formatFuzzyDateTime(future.days(5), { origin: noon })).to.match(shortDateTimeRegex);
		});

		it('includes the time when formatting a long absolute date', () => {
			expect(formatFuzzyDateTime(past.days(5), { origin: noon, absoluteFormat: 'full' })).to.match(fullDateTimeRegex);
			expect(formatFuzzyDateTime(future.days(5), { origin: noon, absoluteFormat: 'full' })).to.match(fullDateTimeRegex);
		});

	});

	describe('formatFuzzy', () => {
		describe('the readme examples', () => {

			const origin = new Date(2015, 8, 23, 14, 5, 30);

			const ruAlwaysShort = new Intl.RelativeTimeFormat('ru', {
				localeMatcher: 'best fit',
				numeric: 'always',
				style: 'short'
			});

			it('example 1', () => {
				expect(formatFuzzyDateTime(
					new Date(2015, 8, 23, 14, 5, 18),
					{ origin }
				)).to.equal('12 seconds ago');
			});

			it('example 2', () => {
				expect(formatFuzzyDateTime(
					new Date(2015, 8, 24, 14, 5, 30),
					{ origin, rtf: ruAlwaysShort }
				)).to.equal('через 1 дн.');
			});

			it('example 3', async() => {
				const invocations = [];
				const actualDeltas = [];
				const onUpdate = (text, opt) => {
					invocations.push(text);
					actualDeltas.push(opt.nextUpdateInMilliseconds);
					return false;
				};
				const d = new Date(2015, 8, 23, 14, 5, 25);
				const deltas = [
					0,
					25 * second,
					1 * minute,
					1 * minute,
				];

				let totalDelta = 0;
				for (const delta of deltas) {
					totalDelta += delta;
					formatFuzzyDate(d, {
						origin: new Date(origin.getTime() + totalDelta),
						onUpdate
					});
				}
				formatFuzzyDate(d, {
					origin: new Date(origin.getTime() + 4 * day),
					onUpdate,
				});

				deltas.push(1 * minute);
				deltas.push(-1);
				expect(actualDeltas).to.deep.equal(deltas.slice(1));
				expect(invocations).to.deep.equal([
					'5 seconds ago',
					'this minute',
					'1 minute ago',
					'2 minutes ago',
					'9/23/2015',
				]);
			});
		});

		it('uses absolute formatting for recent times when rtf is not available', () => {
			expect(formatFuzzyDate(past.seconds(5), { origin: noon })).to.not.match(shortDateRegex);
			expect(formatFuzzyDate(past.seconds(5), { origin: noon, rtf: false })).to.match(shortDateRegex);
		});

		relativeExamples.forEach(([makeTime, expected,, { rtf, origin = noon } = {}]) => {
			it(`formats ${label(makeTime)} as ${expected}`, () => {
				expect(formatFuzzyDateTime(makeTime(), { origin, rtf })).to.equal(expected);
			});
		});

		it('formats > 3 days as absolute', () => {
			expect(formatFuzzyDateTime(past.days(3.5))).to.match(shortDateTimeRegex);
			expect(formatFuzzyDateTime(future.days(3.5))).to.match(shortDateTimeRegex);
		});

		for (const [makeTime,, expected, { origin = noon } = {}] of relativeExamples) {
			it(`updates ${label(makeTime)} in ${label(expected)}`, (done) => {
				formatFuzzyDateTime(makeTime(), {
					origin,
					onUpdate: (text, opt) => {
						expect(opt.nextUpdateInMilliseconds)
							.to.be.closeTo(expected(), 100);
						done();
						return false;
					}
				});
			});
		}
	});
});
