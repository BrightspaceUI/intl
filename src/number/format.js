import {default as formatDecimal} from './format-decimal';
import {default as formatPercent} from './format-percent';
import {default as localeProvider} from '../locale-provider';

export default class NumberFormat {
	constructor(locale, options) {
		options = options || {};
		this.options = options;
		this.localeData = localeProvider(locale, options.locale);
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
