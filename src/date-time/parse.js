import parseDate from './parse-date.js';
import parseTime from './parse-time.js';
import localeProvider from '../locale-provider.js';

export default function NumberParse(locale, options) {
	options = options || {};
	this.localeData = localeProvider(locale, options.locale);
	this.options = options;
}
NumberParse.prototype.parseDate = function(input) {
	return parseDate(input, this.localeData, this.options);
};
NumberParse.prototype.parseTime = function(input) {
	return parseTime(input, this.localeData, this.options);
};
