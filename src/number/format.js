import formatDecimal from './format-decimal.js';
import formatPercent from './format-percent.js';
import localeProvider from '../locale-provider.js';

export default function NumberFormat(locale, options) {
	options = options || {};
	this.options = options;
	this.localeData = localeProvider(locale, options.locale);
}
NumberFormat.prototype.format = function(value) {
	switch (this.options.style) {
		case 'percent':
			return formatPercent(value, this.localeData.number, this.options);
		default:
			return formatDecimal(value, this.localeData.number, this.options);
	}
};
