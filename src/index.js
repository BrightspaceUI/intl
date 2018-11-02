import dateTimeFormat from './date-time/format.js';
import dateTimeParse from './date-time/parse.js';
import numberFormat from './number/format.js';
import numberParse from './number/parse.js';
import fileSizeFormat from './file-size/format.js';
import localeProvider from './locale-provider.js';

export default {
	DateTimeFormat: dateTimeFormat,
	DateTimeParse: dateTimeParse,
	NumberFormat: numberFormat,
	NumberParse: numberParse,
	FileSizeFormat: fileSizeFormat,
	LocaleProvider: localeProvider
};
