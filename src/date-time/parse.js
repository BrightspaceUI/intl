import {default as legacyParseTime} from './legacy/parse-time';
import {default as merge} from '../util/merge.js';

export default class NumberParse {
	constructor(locale, options) {

		options = options || {};
		locale = locale || 'en-US';
		let localeData = JSON.parse(JSON.stringify(
			require('../locale-data/en-US.json')
		));
		merge(localeData, options.locale);
		this.localeData = localeData;
		this.options = options;

	}
	parseTime(input) {
		return legacyParseTime(input, this.localeData, this.options);
	}
}
