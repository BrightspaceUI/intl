import DateTimeFormat from '../../src/date-time/format.js';

var expect = chai.expect;

describe('DateTimeFormat', function() {
	var formatter = new DateTimeFormat('en-US');

	describe('formatFuzzyDate', function() {
		it('should return "just now" if date is recent', function() {
			var date = new Date();
			var feedbackString = formatter.formatFuzzyDate(date);
			expect(feedbackString).to.equal('Just now');
		});

		it('should return date time if date is in the future', function() {
			var date = new Date();
			date.setSeconds(date.getSeconds() + 60);
			var feedbackString = formatter.formatFuzzyDate(date);
			var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
			var day = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);

			expect(feedbackString).to.equal(day + ' at ' + time);
		});

		[31, 60, 89].forEach(function(seconds) {
			it('should return "1 minute ago" if date is ' + seconds + ' seconds before now', function() {
				var date = new Date();
				date.setSeconds(date.getSeconds() - seconds);
				var feedbackString = formatter.formatFuzzyDate(date);
				expect(feedbackString).to.equal('1 minute ago');
			});
		});

		[90, 120, 149].forEach(function(seconds) {
			it('should return "2 minutes ago" if date is ' + seconds + ' seconds before now', function() {
				var date = new Date();
				date.setSeconds(date.getSeconds() - seconds);
				var feedbackString = formatter.formatFuzzyDate(date);
				expect(feedbackString).to.equal('2 minutes ago');
			});
		});

		[3, 5, 44].forEach(function(minutes) {
			it('should return "x minutes ago" if date is ' + minutes + ' minutes before now', function() {
				var date = new Date();
				date.setMinutes(date.getMinutes() - minutes);
				var feedbackString = formatter.formatFuzzyDate(date);
				expect(feedbackString).to.equal(`${minutes} minutes ago`);
			});
		});

		[45, 60, 89].forEach(function(minutes) {
			it('should return "1 hour ago" if date is ' + minutes + ' minutes before now', function() {
				var date = new Date();
				date.setMinutes(date.getMinutes() - minutes);
				var feedbackString = formatter.formatFuzzyDate(date);
				expect(feedbackString).to.equal('1 hour ago');
			});
		});

		[90, 120, 149].forEach(function(minutes) {
			it('should return "2 hours ago" if date is ' + minutes + ' minutes before now', function() {
				var date = new Date();
				date.setMinutes(date.getMinutes() - minutes);
				var feedbackString = formatter.formatFuzzyDate(date);
				expect(feedbackString).to.equal('2 hours ago');
			});
		});

		[150, 3 * 60, 24 * 60 - 1].forEach(function(minutes) {
			it('should return "x hours ago" if date is ' + Math.round(minutes / 60) + ' hours before now', function() {
				var date = new Date();
				date.setMinutes(date.getMinutes() - minutes);
				var feedbackString = formatter.formatFuzzyDate(date);
				var numHours = Math.round(minutes / 60);
				expect(feedbackString).to.equal(`${numHours} hours ago`);
			});
		});

		[24, 26, 47].forEach(function(hours) {
			it('should contain "yesterday at" if date with time 23:59:59 ' + hours + ' hours before now', function() {
				var date = new Date('March 20, 2019 23:59:59 CDT');
				var now = new Date(date);
				date.setHours(date.getHours() - hours);
				var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
				var feedbackString = formatter.formatFuzzyDate(date, now);
				expect(feedbackString).to.equal('Yesterday at ' + time);
			});
		});

		[24, 26, 47].forEach(function(hours) {
			it('should contain "yesterday at" if date with time 23:59:59 ' + hours + ' hours before begining of month', function() {
				var date = new Date('March 1, 2019 23:59:59 CST');
				var now = new Date(date);
				date.setHours(date.getHours() - hours);
				var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
				var feedbackString = formatter.formatFuzzyDate(date, now);
				expect(feedbackString).to.equal('Yesterday at ' + time);
			});
		});

		[25, 26, 47].forEach(function(hours) {
			it('should contain "[day short] at [time]" if calendar day is more than 1 from today', function() {
				var date = new Date('March 20, 2019 00:00:00 CDT');
				var now = new Date(date);
				date.setHours(date.getHours() - hours);
				var day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
				var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
				var feedbackString = formatter.formatFuzzyDate(date, now);
				expect(feedbackString).to.equal(day + ' at ' + time);
			});
		});

		it('should contain "[day short] at [time]" if date is 2 days before now', function() {
			var date = new Date();
			date.setDate(date.getDate() - 2);
			var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
			var day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
			var feedbackString = formatter.formatFuzzyDate(date);
			expect(feedbackString).to.equal(day + ' at ' + time);
		});

		[3, 32, 363].forEach(function(days) {
			it('should contain "[month] [day] at [time]" if date is ' + days + ' days before now', function() {
				var date = new Date();
				date.setDate(date.getDate() - days);
				var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
				var day = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);
				var feedbackString = formatter.formatFuzzyDate(date);

				var dateNow = new Date();
				if (date.getYear() === dateNow.getYear()) {
					expect(feedbackString).to.equal(day + ' at ' + time);
				}
			});
		});

		[366].forEach(function(days) {
			it('should contain full date string if date is ' + days + ' days before now in the previous year', function() {
				var date = new Date();
				date.setDate(date.getDate() - days);
				var day = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date);
				var feedbackString = formatter.formatFuzzyDate(date);

				expect(feedbackString).to.equal(day);
			});
		});
	});
});
