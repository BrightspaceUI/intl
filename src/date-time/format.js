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
	formatDate(date) {
		return formatDate(date, this.localeData, this.options);
	}
	formatTime(date) {
		return legacyFormatTime(date, this.localeData);
	}
}
