import {default as legacyParseDate} from './legacy/parse-date';
import {default as parseTime} from './parse-time';
import {default as localeProvider} from '../locale-provider';

export default class NumberParse {
	constructor(locale, options) {
		options = options || {};
		this.localeData = localeProvider(locale, options.locale);
		this.options = options;
	}
	parseDate(input) {
		return legacyParseDate(input, this.localeData, this.options);
	}
	parseTime(input) {
		return parseTime(input, this.localeData, this.options);
	}
}
