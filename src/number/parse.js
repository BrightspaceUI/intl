import {default as legacyParse} from './legacy/parse';
import {default as localeProvider} from '../locale-provider';

export default class NumberParse {
	constructor(locale, options) {
		options = options || {};
		this.localeData = localeProvider(locale, options.locale);
	}
	parse(value) {
		return legacyParse(value, this.localeData.number);
	}
}
