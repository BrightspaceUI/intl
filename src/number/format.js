import {formatDecimal} from './format-decimal';
import {formatPercent} from './format-percent';
import {validateInteger} from '../util/validate-integer';
import {localeData} from '../locale-data/en-JS.json';

export default class NumberFormat {
	constructor(locale, options, localeOverride) {
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
