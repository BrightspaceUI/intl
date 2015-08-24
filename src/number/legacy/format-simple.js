// legacy function from the monolith, will be replaced once test coverage in place

import {default as adaptDecimalNegativePattern} from './adapt-decimal-negative-pattern';

export default function(value, localeData) {

	value = value + '';
	var ret = '';
	var negative = false;
	var processedDecimal = true;

	if (value.indexOf('.', 0) >= 0) {
		processedDecimal = false;
	}

	// Array of ints
	var groupSizes = [localeData.groupSize];
	var currentGroupSize = 0;
	var digitsInCurrentGroup = 0;

	for (var i = value.length - 1; i >= 0; i--) {

		// extract the character
		var c = value.charAt(i);

		if (c == '.') {
			if (!processedDecimal) {
				ret = localeData.symbols.decimal + ret;
			}
			processedDecimal = true;
		} else if (c == '-') {
			negative = true;
		} else {
			// digit
			c = parseInt(c);
			if (!isNaN(c) && c >= 0 && c <= 9) {
				// we have to use a string because JS
				// has overflow issues
				if (!processedDecimal) {
					// These are Decimal digits
					ret = c + ret;
				} else {
					// Format using the group sizes
					if (groupSizes[currentGroupSize] === 0) {
						ret = c + ret;
					} else if (groupSizes[currentGroupSize] == digitsInCurrentGroup) {
						ret = localeData.symbols.group + ret;
						ret = c + ret;
						currentGroupSize++;
						if (currentGroupSize >= groupSizes.length) {
							currentGroupSize = groupSizes.length - 1;
						}
						digitsInCurrentGroup = 1;
					} else {
						ret = c + ret;
						digitsInCurrentGroup++;
					}
				}
			} else {
				throw 'Invalid Integer 3';
			}
		}
	}
	if (negative) {
		var numberNegativePattern = adaptDecimalNegativePattern(
			localeData.patterns.decimal.negativePattern
		);
		switch (numberNegativePattern) {
			case 0:
				ret = "(" + ret + ")";
				break;
			case 1:
				ret = localeData.symbols.negative + ret;
				break;
			case 2:
				ret = localeData.symbols.negative + " " + ret;
				break;
			case 3:
				ret += localeData.symbols.negative;
				break;
			case 4:
				ret += " " + localeData.symbols.negative;
				break;
		}
	}
	return ret;
}
