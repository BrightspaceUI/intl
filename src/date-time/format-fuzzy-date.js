import processPattern from '../util/process-pattern.js';

const _msPerDay = 86400000;
const _msPerSecond = 1000;
const _secondsPerMinute = 60;

export default function FuzzyDateFormatter(localeData, locale) {
	this.format = localeData.date.formats.fuzzyFormats;
	this.locale = locale;
}

/*
* Returns the fuzzy date string as determined by difference between now and date
*/
FuzzyDateFormatter.prototype.getDateString = function(dateUTC)  {

	var referenceDate = new Date();
	var feedbackDate = new Date(dateUTC);
	var calendarDateDiff = this._fuzzyDates_getDateDiffInCalendarDays(feedbackDate, referenceDate);
	var sameYear = referenceDate.getYear() === feedbackDate.getYear();

	var feedbackDateString = '';

	if (calendarDateDiff === 0) {
		feedbackDateString = this._getStringSameDay(feedbackDate, referenceDate);
	} else if (calendarDateDiff >= 1 && calendarDateDiff < 3) {
		feedbackDateString = this._getStringSomeDaysAgo(calendarDateDiff, feedbackDate);
	} else if (sameYear) {
		var day = this._formatMonthDay(dateUTC);
		var time = this._formatTime(dateUTC);
		feedbackDateString = processPattern(this.format.dayAtTime, {'{day}': day, '{time}': time});
	} else {
		feedbackDateString = new Intl.DateTimeFormat(this.locale, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(dateUTC));
	}
	return feedbackDateString;
};

/*
* Returns date as proper string for being same day
* e.g., "Just now", "1 minute ago", "2 minutes ago", "10 minutes ago", "1 hour ago", "2 hours ago"
*/
FuzzyDateFormatter.prototype._getStringSameDay = function(dateUTC, referenceDate) {
	var timeDiff = this._getDateDiffInSeconds(dateUTC, referenceDate);

	var oneMinute = 60;
	var oneHour = 60 * oneMinute;

	var feedbackDateString = '';

	if (timeDiff < this._minutesInSeconds(.5)) {
		feedbackDateString = this.format.justNow;
	} else if (timeDiff < this._minutesInSeconds(1.5)) {
		feedbackDateString = this.format.oneMinuteAgo;
	} else if (timeDiff < this._minutesInSeconds(2.5)) {
		feedbackDateString = processPattern(this.format.minutesAgo, {'{numMinutes}': 2});
	} else if (timeDiff < this._minutesInSeconds(45)) {
		var minutesRounded = Math.round(timeDiff % oneHour / oneMinute);
		feedbackDateString = processPattern(this.format.minutesAgo, {'{numMinutes}': minutesRounded});
	} else {
		if (timeDiff < this._hoursInSeconds(1.5)) {
			feedbackDateString = this.format.oneHourAgo;
		} else if (timeDiff < this._hoursInSeconds(2.5)) {
			feedbackDateString = processPattern(this.format.hoursAgo, {'{numHours}': 2});
		} else {
			var hoursRounded = Math.round(timeDiff % (24 * oneHour) / oneHour);
			feedbackDateString = processPattern(this.format.hoursAgo, {'{numHours}': hoursRounded});
		}
	}
	return feedbackDateString;
};

/*
* Returns date as proper string for being x days ago (e.g., Yesterday at 4:00 PM or Mon at 4:00 PM)
*/
FuzzyDateFormatter.prototype._getStringSomeDaysAgo = function(calendarDateDiff, dateUTC) {
	var time = this._formatTime(dateUTC);
	if (calendarDateDiff === 1) {
		return processPattern(this.format.yesterdayAtTime, {'{time}': time});
	} else {
		var day = this._formatWeekday(dateUTC);
		return processPattern(this.format.dayAtTime, {'{day}': day, '{time}': time});
	}
};

/*
* Returns the number of calendar days between the given date and now.
*/
FuzzyDateFormatter.prototype._fuzzyDates_getDateDiffInCalendarDays = function(feedbackDate, referenceDate) {
	return Math.floor((referenceDate - feedbackDate) / _msPerDay);
};

/*
* Returns the number of seconds between the given date and now.
*/
FuzzyDateFormatter.prototype._getDateDiffInSeconds = function(feedbackDate, referenceDate) {
	return Math.floor((referenceDate.getTime() - feedbackDate.getTime()) / _msPerSecond);
};

/*
* Formats weekday (e.g., Mon) in locale
*/
FuzzyDateFormatter.prototype._formatWeekday = function(date) {
	return new Intl.DateTimeFormat(this.locale, { weekday: 'short' }).format(new Date(date));
};

/*
* Formats time (e.g., 2:38 PM) in locale
*/
FuzzyDateFormatter.prototype._formatTime = function(date) {
	return new Intl.DateTimeFormat(this.locale, { hour: 'numeric', minute: 'numeric' }).format(new Date(date));
};

/*
* Formats month and day (e.g., December 5) in locale
*/
FuzzyDateFormatter.prototype._formatMonthDay = function(date) {
	return new Intl.DateTimeFormat(this.locale, { month: 'long', day: 'numeric' }).format(new Date(date));
};

/*
* Returns the number of minutes in seconds
*/
FuzzyDateFormatter.prototype._minutesInSeconds = function(mins) {
	return mins * _secondsPerMinute;
};

/*
* Returns the number of hours in seconds
*/
FuzzyDateFormatter.prototype._hoursInSeconds = function(hours) {
	var minutesPerHour = 60;
	return hours * minutesPerHour * _secondsPerMinute;
};
