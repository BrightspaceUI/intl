import {validateFormatValue} from './validate-format-value';

export default function(value, localeData, options) {
	value = validateFormatValue(value);
	return value;
}
