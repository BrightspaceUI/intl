import formatTime from './format-time.js';
import formatDate from './format-date.js';
import formatFuzzyDate from './format-fuzzy-date.js';
import localeProvider from '../locale-provider.js';

export default function DateTimeFormat(locale, options) {
	options = options || {};
	this.options = options;
	this.localeData = localeProvider(locale, options.locale);
}
DateTimeFormat.prototype.format = function(date) {
	var format = this.options.format || 'short';
	switch (format) {
		case 'full':
		case 'medium':
		case 'short':
			return this.formatDate(date) + ' ' + this.formatTime(date);
		case 'monthYear':
		case 'monthDay':
			break;
		case 'longDayOfWeek':
			format = 'dddd';
			break;
		case 'shortDayOfWeek':
			format = 'ddd';
			break;
		case 'longMonth':
			format = 'MMMM';
			break;
		case 'shortMonth':
			format = 'MMM';
			break;
	}
	var value = formatDate(date, this.localeData, {format: format});
	return value;
};
DateTimeFormat.prototype.formatDate = function(date) {
	return formatDate(date, this.localeData, this.options);
};
DateTimeFormat.prototype.formatTime = function(date) {
	return formatTime(date, this.localeData, this.options);
};
DateTimeFormat.prototype.formatFuzzyDate = function(date) {
	return new formatFuzzyDate(this.localeData, this.options.locale).getDateString(date);
};
