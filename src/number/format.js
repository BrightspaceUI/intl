import {default as formatDecimal} from './format-decimal';
import {default as formatPercent} from './format-percent';
import {default as merge} from '../util/merge.js';

export default class NumberFormat {
	constructor(locale, options, localeOverride) {

		options = options || {};
		this.options = options;

		locale = locale || 'en-US';
		let localeData = JSON.parse(JSON.stringify(
			require('../locale-data/en-US.json')
		));
		merge(localeData.number, options.locale);
		this.localeData = localeData;

	}
	format(value) {
		switch(this.options.style) {
			case 'percent':
				return formatPercent(value, this.localeData.number, this.options);
			default:
				return formatDecimal(value, this.localeData.number, this.options);
		}
	}
}
