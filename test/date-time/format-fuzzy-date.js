import DateTimeFormat from '../../src/date-time/format.js';

var expect = chai.expect;

describe('DateTimeFormat', function() {
	var component = new DateTimeFormat('en-US');

	describe('formatFuzzyDate', function() {
		it('should return "just now" if feedback posted recently', function() {
			var date = new Date();
			var feedbackString = component.formatFuzzyDate(date);
			expect(feedbackString).to.equal('Just now');
		});

		it('should return date time if feedback posted in the future', function() {
			var date = new Date();
			date.setSeconds(date.getSeconds() + 60);
			var feedbackString = component.formatFuzzyDate(date);
			var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
			var day = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);

			expect(feedbackString).to.equal(day + ' at ' + time);
		});

		[31, 60, 89].forEach(function(seconds) {
			it('should return "1 minute ago" if feedback posted ' + seconds + ' seconds before now', function() {
				var date = new Date();
				date.setSeconds(date.getSeconds() - seconds);
				var feedbackString = component.formatFuzzyDate(date);
				expect(feedbackString).to.equal('1 minute ago');
			});
		});

		[90, 120, 149].forEach(function(seconds) {
			it('should return "2 minutes ago" if feedback posted ' + seconds + ' seconds before now', function() {
				var date = new Date();
				date.setSeconds(date.getSeconds() - seconds);
				var feedbackString = component.formatFuzzyDate(date);
				expect(feedbackString).to.equal('2 minutes ago');
			});
		});

		[3, 5, 44].forEach(function(minutes) {
			it('should return "x minutes ago" if feedback posted ' + minutes + ' minutes before now', function() {
				var date = new Date();
				date.setMinutes(date.getMinutes() - minutes);
				var feedbackString = component.formatFuzzyDate(date);
				expect(feedbackString).to.equal(`${minutes} minutes ago`);
			});
		});

		[45, 60, 89].forEach(function(minutes) {
			it('should return "1 hour ago" if feedback posted ' + minutes + ' minutes before now', function() {
				var date = new Date();
				date.setMinutes(date.getMinutes() - minutes);
				var feedbackString = component.formatFuzzyDate(date);
				expect(feedbackString).to.equal('1 hour ago');
			});
		});

		[90, 120, 149].forEach(function(minutes) {
			it('should return "2 hours ago" if feedback posted ' + minutes + ' minutes before now', function() {
				var date = new Date();
				date.setMinutes(date.getMinutes() - minutes);
				var feedbackString = component.formatFuzzyDate(date);
				expect(feedbackString).to.equal('2 hours ago');
			});
		});

		[150, 3 * 60, 24 * 60 - 1].forEach(function(minutes) {
			it('should return "x hours ago" if feedback posted ' + Math.round(minutes / 60) + ' hours before now', function() {
				var date = new Date();
				date.setMinutes(date.getMinutes() - minutes);
				var feedbackString = component.formatFuzzyDate(date);
				var numHours = Math.round(minutes / 60);
				expect(feedbackString).to.equal(`${numHours} hours ago`);
			});
		});

		[24, 26, 47].forEach(function(hours) {
			it('should contain "yesterday at" if feedback posted ' + hours + ' hours before now', function() {
				var date = new Date();
				date.setHours(date.getHours() - hours);
				var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
				var feedbackString = component.formatFuzzyDate(date);
				expect(feedbackString).to.equal('Yesterday at ' + time);
			});
		});

		it('should contain "[day short] at [time]" if feedback posted 2 days before now', function() {
			var date = new Date();
			date.setDate(date.getDate() - 2);
			var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
			var day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
			var feedbackString = component.formatFuzzyDate(date);
			expect(feedbackString).to.equal(day + ' at ' + time);
		});

		[3, 32, 363].forEach(function(days) {
			it('should contain "[month] [day] at [time]" if feedback posted ' + days + ' days before now', function() {
				var date = new Date();
				date.setDate(date.getDate() - days);
				var time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date);
				var day = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);
				var feedbackString = component.formatFuzzyDate(date);

				var dateNow = new Date();
				if (date.getYear() === dateNow.getYear()) {
					expect(feedbackString).to.equal(day + ' at ' + time);
				}
			});
		});

		[366].forEach(function(days) {
			it('should contain full date string if feedback posted ' + days + ' days before now in the previous year', function() {
				var date = new Date();
				date.setDate(date.getDate() - days);
				var day = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date);
				var feedbackString = component.formatFuzzyDate(date);

				expect(feedbackString).to.equal(day);
			});
		});
	});
});
