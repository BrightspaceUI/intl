import {default as localeProvider} from '../locale-provider';

export default class NumberParse {
	constructor(locale, options) {
		options = options || {};
		this.localeData = localeProvider(locale, options.locale);
	}
	parse(value) {

		if(value === undefined || value === null) {
			return 0;
		}

		value = value.replace(
			new RegExp(`\\s|[${this.localeData.number.symbols.group}]`, 'g' ),
			''
		);
		if(value === '') {
			return 0;
		}

		let ret = '';
		let negative = false;
		let hasDecimal = false;
		let breakout = false;

		for(let c of value) {
			switch(c) {
				case this.localeData.number.symbols.decimal:
					ret += !hasDecimal ? '.' : '';
					hasDecimal = true;
					break;
				case this.localeData.number.symbols.negative:
				case '(':
				case ')':
					negative = true;
					break;
				default:
					c = parseInt(c);
					if(!isNaN(c) && c >= 0 && c <= 9) {
						ret += c;
					} else {
						breakout = true;
					}
			}
			if(breakout) {
				break;
			}
		}

		if(ret.length === 0) {
			return NaN;
		}

		ret = parseFloat(ret);

		if(negative) {
			ret = ret * -1;
		}

		return ret;

	}
}
