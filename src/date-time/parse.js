import {default as legacyParseDate} from './legacy/parse-date';
import {default as legacyParseTime} from './legacy/parse-time';
import {default as localeProvider} from '../locale-data/provider';

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
		return legacyParseTime(input, this.localeData, this.options);
	}
}
