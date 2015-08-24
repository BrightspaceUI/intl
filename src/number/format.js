import {default as formatDecimal} from './format-decimal';
import {default as formatPercent} from './format-percent';
import {default as localeData} from '../locale-data/en-JS.json';

export default class NumberFormat {
	constructor(locale, options, localeOverride) {
		options = options || {};
		this.options = options;
	}
	format(value) {
		switch(this.options.style) {
			case 'percent':
				return formatPercent(value, localeData.number, this.options);
			default:
				return formatDecimal(value, localeData.number, this.options);
		}
	}
}
