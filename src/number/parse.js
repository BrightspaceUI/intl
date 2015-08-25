import {default as legacyParse} from './legacy/parse';
import {default as merge} from '../util/merge.js';

export default class NumberParse {
	constructor(locale, options) {

		options = options || {};
		locale = locale || 'en-US';
		let localeData = JSON.parse(JSON.stringify(
			require('../locale-data/en-US.json')
		));
		merge(localeData.number, options.locale);
		this.localeData = localeData;

	}
	parse(value) {
		return legacyParse(value, this.localeData.number);
	}
}
