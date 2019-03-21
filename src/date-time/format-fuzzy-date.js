import processPattern from '../util/process-pattern.js';

const msPerDay = 86400000;

const thirtySeconds = 30000;
const ninetySeconds = 90000;

const oneMinute = 60000;
const twoAndAHalfMinutes = 150000;
const fortyFiveMinutes = 2700000;

const oneHour = 3600000;
const oneHourThirtyMinutes = 5400000;
const twoHoursThirtyMinutes = 9000000;

export default function FuzzyDateFormatter(localeData, locale) {
	this.format = localeData.date.formats.fuzzyFormats;
	this.locale = locale;
}

/*
* Returns the fuzzy date string as determined by difference between now and date
*/
FuzzyDateFormatter.prototype.getDateString = function(inputDate, nowDate)  {

	const referenceDate = nowDate || new Date();
	const calendarDateDiff = (referenceDate - inputDate) / msPerDay;
	const calendarDaysFloored = Math.floor(calendarDateDiff);
	const sameYear = referenceDate.getYear() === inputDate.getYear();
	const yesterday = new Date(referenceDate).setDate(referenceDate.getDate() - 1);
	const yesterdayStart = new Date(yesterday).setHours(0, 0, 0, 0);
	const yesterdayEnd = new Date(yesterday).setHours(23, 59, 59, 999);
	const monthDay = new Intl.DateTimeFormat(this.locale, { month: 'long', day: 'numeric' }).format(new Date(inputDate));
	const weekDay = new Intl.DateTimeFormat(this.locale, { weekday: 'short' }).format(new Date(inputDate));
	const time = new Intl.DateTimeFormat(this.locale, { hour: 'numeric', minute: 'numeric' }).format(new Date(inputDate));
	let fuzzyDateString = '';

	if (referenceDate < inputDate) {
		fuzzyDateString = processPattern(this.format.dayAtTime, {'{day}': monthDay, '{time}': time});
	} else if (calendarDaysFloored === 0) {
		fuzzyDateString = this._getStringSameDay(inputDate, referenceDate);
	} else if (inputDate >= yesterdayStart && inputDate <= yesterdayEnd) {
		fuzzyDateString = processPattern(this.format.yesterdayAtTime, {'{time}': time});
	} else if (calendarDaysFloored < 3) {
		fuzzyDateString = processPattern(this.format.dayAtTime, {'{day}': weekDay, '{time}': time});
	} else if (sameYear) {
		fuzzyDateString = processPattern(this.format.dayAtTime, {'{day}': monthDay, '{time}': time});
	} else {
		fuzzyDateString = new Intl.DateTimeFormat(this.locale, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(inputDate));
	}
	return fuzzyDateString;
};

/*
* Returns date as proper string for being same day
* e.g., "Just now", "1 minute ago", "2 minutes ago", "10 minutes ago", "1 hour ago", "2 hours ago"
*/
FuzzyDateFormatter.prototype._getStringSameDay = function(inputDate, referenceDate) {
	const timeDiff = Math.floor(referenceDate.getTime() - inputDate.getTime());

	let sameDayDateString = '';
	if (timeDiff < thirtySeconds) {
		sameDayDateString = this.format.justNow;
	} else if (timeDiff < ninetySeconds) {
		sameDayDateString = this.format.oneMinuteAgo;
	} else if (timeDiff < twoAndAHalfMinutes) {
		sameDayDateString = processPattern(this.format.minutesAgo, {'{numMinutes}': 2});
	} else if (timeDiff < fortyFiveMinutes) {
		const minutesRounded = Math.round(timeDiff % oneHour / oneMinute);
		sameDayDateString = processPattern(this.format.minutesAgo, {'{numMinutes}': minutesRounded});
	} else {
		if (timeDiff < oneHourThirtyMinutes) {
			sameDayDateString = this.format.oneHourAgo;
		} else if (timeDiff < twoHoursThirtyMinutes) {
			sameDayDateString = processPattern(this.format.hoursAgo, {'{numHours}': 2});
		} else {
			const hoursRounded = Math.round(timeDiff % (24 * oneHour) / oneHour);
			sameDayDateString = processPattern(this.format.hoursAgo, {'{numHours}': hoursRounded});
		}
	}
	return sameDayDateString;
};
