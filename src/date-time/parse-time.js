function buildRe(part) {
	var re = '';
	var or = '';
	for (var i = 0; i < part.length; i++) {
		re += or + part.substr(0, i + 1);
		or = '|';
	}
	return new RegExp(re, 'i');
}

var reDigits = new RegExp('(\\d+)', 'g');

export default function parseTime(input, localeData, options) {

	if (input === undefined || input === null || input === '') {
		return null;
	}

	var match = input.match(reDigits);
	if (match === null) {
		return null;
	}

	var nowProvider = options.nowProvider || function() { return new Date(); };
	var reAm = buildRe(localeData.date.calendar.dayPeriods.am);
	var rePm = buildRe(localeData.date.calendar.dayPeriods.pm);
	var today = nowProvider();
	var isMorning = (today.getHours() < 12);
	var digits = match.join('');
	var leadingZero = (digits.substr(0, 1) === '0');

	var hour = 0;
	var minute = 0;
	switch (digits.length) {
		case 1:
			hour = digits.substr(0, 1);
			break;
		case 2:
			hour = digits.substr(0, 2);
			break;
		case 3:
			hour = digits.substr(0, 1);
			minute = digits.substr(1, 2);
			break;
		default:
			hour = parseInt(digits.substr(0, 2));
			minute = parseInt(digits.substr(2, 2));
			break;
	}

	hour = Math.min(Math.max(parseInt(hour, 10), 0), 23);
	minute = Math.min(Math.max(parseInt(minute, 10), 0), 59);

	if (!localeData.date.hour24 && hour < 13) {

		var matchPm = input.match(rePm);
		var matchAm = input.match(reAm);
		var noAmPm = (matchAm === null && matchPm === null);

		if (matchPm !== null || (noAmPm && !isMorning && !leadingZero)) {
			hour += 12;
			if (hour === 24) {
				hour = 12;
			}
		} else if (hour === 12) {
			hour = 0;
		}

	}

	var time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute, 0);
	return time;

}
