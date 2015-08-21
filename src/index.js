import {default as formatDateTime} from './date/format';
import {default as formatInputDate} from './date/format-input';
import {default as formatNumber} from './number/format';
import {default as formatTime} from './time/format.js';
import {default as parseDate} from './date/parse';
import {default as parseNumber} from './number/parse';
import {deafult as parseTime} from './time/parse';

export default {
	DateTime: {
		formatDateTime: formatDateTime,
		formatInputDate: formatInputDate,
		formatTime: formatTime,
		parseDate: parseDate,
		parseTime: parseTime
	},
	Number: {
		format: formatNumber,
		parse: parseNumber
	}
};
