function isValid(calendarSpecificYear, calendarSpecificMonth, calendarSpecificDay) {

	var year = calendarSpecificYear;
	var month = calendarSpecificMonth;
	var day = calendarSpecificDay;

	if (isNaN(year) || year < 1753 || year > 9999) {
		return false;
	}
	if (isNaN(month) || month < 1 || month > 12) {
		return false;
	}
	if (isNaN(day) || day < 1 || day > 31) {
		return false;
	}

	var allowedDays = 31;
	if (month === 2) {
		if ((year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) {
			allowedDays = 29;
		} else {
			allowedDays = 28;
		}
	} else if (month === 4 || month === 6 || month === 9 || month === 11) {
		allowedDays = 30;
	}

	if (day > allowedDays) {
		return false;
	}

	return true;

}

export default {
	getCalendarSpecificLocalDateTime: function(date) {
		return date;
	},
	isValid: isValid,
	tryGetGregorianLocaleDateTime: function(
			calendarSpecificYear,
			calendarSpecificMonth,
			calendarSpecificDay
		) {

		if (!isValid(calendarSpecificYear, calendarSpecificMonth, calendarSpecificDay)) {
			return null;
		}

		return new Date(calendarSpecificYear, calendarSpecificMonth - 1, calendarSpecificDay, 0, 0, 0);

	}
};
