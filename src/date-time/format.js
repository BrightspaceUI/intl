import {default as merge} from '../util/merge';
import {default as legacyFormatTime} from './legacy/format-time';
import {default as formatDate} from './format-date';

export default class DateTimeFormat {
	constructor(locale, options) {

		options = options || {};
		this.options = options;

		locale = locale || 'en-US';
		let localeData = JSON.parse(JSON.stringify(
			require('../locale-data/en-US.json')
		));
		merge(localeData, options.locale);
		this.localeData = localeData;

	}
	format(date) {
		let format = this.options.format || 'short';
		switch(format) {
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
		const value = formatDate(date, this.localeData, {format: format});
		return value;
	}
	formatDate(date) {
		return formatDate(date, this.localeData, this.options);
	}
	formatTime(date) {
		return legacyFormatTime(date, this.localeData, this.options);
	}
}
