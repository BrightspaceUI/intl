// legacy function from the monolith, will be replaced once test coverage in place

export default function(value, localeData) {

	var ret = '';
	var negative = false;
	var hasDecimal = false;

	if( value === undefined || value === null ) {
		return 0;
	}
	value = value.trim();
	if( value === '' ) {
		return 0;
	}

	// strip all whitespace
	value = value.replace(/\s/g, '');

	// strip group separator
	value = value.replace( new RegExp( '[' + localeData.symbols.group + ']', 'g' ), '' );

	// loop through each character
	for(var i = 0; i < value.length; i++) {

		// extract the character
		var c = value.charAt(i);

		// decimal
		if(c == localeData.symbols.decimal) {
			if(!hasDecimal) {
				ret += '.';
			}
			hasDecimal = true;
		// negative
		} else if(c == localeData.symbols.negative || c == '(' || c == ')') {
			negative = true;
		// digit
		} else {
			c = parseInt(c);
			if(!isNaN(c) && c >= 0 && c <= 9) {
				ret += c;
			} else {
				if(ret.length === 0) {
					return NaN;
				}
				break;
			}
		}

	}

	ret = parseFloat(ret);

	if(negative) {
		ret = ret * -1;
	}

	return ret;

}
