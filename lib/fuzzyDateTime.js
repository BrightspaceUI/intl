import { getLanguage } from './common.js';
import { formatDateTime, formatDate } from './dateTime.js';

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const thirtySeconds = 30 * second;
const halfHour = 30 * minute;
const hourAndHalf = 90 * minute;
const fortyFiveMinutes = 45 * minute;
const threeAndAHalfDays = 84 * hour;
const sixHours = 6 * hour;

const defaultRtf = Intl && Intl.RelativeTimeFormat &&
	new Intl.RelativeTimeFormat(getLanguage(), {
		localeMatcher: 'best fit',
		numeric: 'auto',
		style: 'long'
	});

const midnightTime = dateTime =>
	new Date(
		dateTime.getFullYear(),
		dateTime.getMonth(),
		dateTime.getDate()
	).getTime();

const noonTime = dateTime =>
	new Date(
		dateTime.getFullYear(),
		dateTime.getMonth(),
		dateTime.getDate(),
		12
	).getTime();

// Adapted from:
// https://search.d2l.dev/xref/lms/lp/framework/web/D2L.LP.Web/UI/JavaScript/Globalization/Formatting/DateTime/DateTimeFormatter.js?r=438b5dc3#125
//
// but modified to work with:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat
//
const formatFuzzy = formatFunction => (inputDate, {
	absoluteFormat = 'short',
	origin = new Date(),
	onUpdate = null,
	rtf = defaultRtf
} = {}) => {
	const midnight = midnightTime(origin);
	const noon = noonTime(origin);
	const now = origin.getTime();

	const sameDay = midnightTime(inputDate) === midnight;
	const timespan = inputDate.getTime() - origin.getTime();
	const timespanFromNoon = inputDate.getTime() - noon;
	const timespanAbs = Math.abs(timespan);
	const isPast = timespan < 0;

	let text;
	let timeout;
	if (rtf && timespanAbs < thirtySeconds) {
		text = rtf.format(Math.round(timespan / second), 'second');
		timeout = isPast ?
			thirtySeconds - timespanAbs :
			thirtySeconds + timespanAbs;
	} else if (rtf && timespanAbs < fortyFiveMinutes) {
		text = rtf.format(Math.round(timespan / minute), 'minute');
		timeout = minute;
	} else if (rtf && (timespanAbs < sixHours || sameDay)) {
		const minutes = (timespanAbs % hour);
		text = rtf.format(Math.round(timespan / hour), 'hour');
		timeout = (isPast ? hourAndHalf - minutes : halfHour + minutes) % hour ;
	} else if (rtf && Math.abs(timespanFromNoon) < threeAndAHalfDays) {
		text = rtf.format(Math.round(timespanFromNoon / day), 'day');
		timeout = noon - now + (now < noon ? 0 : day);
	} else {
		text = formatFunction(inputDate, { format: absoluteFormat });
		timeout = -1;
	}

	if (timeout > 0) {
		timeout = Math.max(timeout, 1000);
	}

	if (onUpdate) {
		const updateResult = onUpdate(text, { nextUpdateInMilliseconds: timeout });
		const shouldCancel = updateResult === false;
		if (!shouldCancel && timeout > 0) {
			setTimeout(() => {
				formatFuzzy(formatFunction)(inputDate, {
					absoluteFormat,
					onUpdate,
					rtf
				});
			}, timeout);
		}
	}

	return text;
};

export const millisecondsPer = { second, minute, hour, day };
export const formatFuzzyDate = formatFuzzy(formatDate);
export const formatFuzzyDateTime = formatFuzzy(formatDateTime);
