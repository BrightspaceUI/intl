/**
 * JavaScript internationalization APIs for formatting and parsing numbers, dates and times
 * https://github.com/Brightspace/intl/blob/master/README.md
 */
declare module 'd2l-intl' {
	export interface FormatOpts {
		/**
		 * All locale data can be overridden by providing a `locale` option. Only the settings you specify will be overridden. For example, to use the `tr-TR` locale, but override the decimal symbol (which for Turkish is a comma):
		 *
		 * ```javascript
		 * var options = {
		 * 	locale: {
		 * 		number: {
		 * 			symbols: {
		 * 				decimal: '.'
		 * 			}
		 * 		}
		 * 	}
		 * };
		 * new d2lIntl.NumberFormat('tr-TR', options).format(3.14); // -> 3.14
		 * ```
		 *
		 * The full set of overridable locale data can be found by inspecting one of the JSON files in the `locale-data` directory.
		 */
		locale?: PartialLocaleData;
	}

	export interface DateFormatOpts extends FormatOpts {
		/**
		 * which pattern to use when rendering the date-time; default is "short".
	   	 *   - **full**: long weekday, month names and timezone. e.g. "Wednesday, September 23, 2015 1:25 PM EST"
	   	 *   - **medium**: long month names. e.g. "September 23, 2015 1:25 PM"
	   	 *   - **short**: abbreviated date format. e.g. "9/23/2015 1:25 PM"
	   	 *   - **monthYear**: month and year only. e.g. "September 2015"
	   	 *   - **monthDay**: month and day only. e.g. "September 23"
	   	 *   - **longDayOfWeek**: long weekday only. e.g. "Wednesday"
	   	 *   - **shortDayOfWeek**: short weekday only. e.g. "Wed"
	   	 *   - **longMonth**: long month only. e.g. "September"
	   	 *   - **shortMonth**: short month only. e.g. "Sep"
		 */
		format?: string;
		timezone?: string;
	}

	export interface NumberFormatOpts extends FormatOpts {
		/**
		 * the number format style to use. Possible values are "decimal" or "percent"; the default is "decimal".
		 */
		style?: 'decimal' | 'percent';
		/**
		 * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default is 0.
		 */
		minimumFractionDigits?: number;
		/**
		 * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default is the larger of `minimumFractionDigits` and 3.
		 */
		maximumFractionDigits?: number;
	}

	/**
	 * Dates and times can be formatted in the user's locale using the `DateTimeFormat` class. It behaves similar to the ECMA-402 [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) class.
	 *
	 * Syntax:
	 *
	 * ```javascript
	 * var formatter = new d2lIntl.DateTimeFormat(locales[, options]);
	 * ```
	 *
	 * All the date and time formatting methods take a [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) as input.
	 *
	 * To format a **date and time**, use the `format` method
	 * To format a **date only** (without the time portion), use the `formatDate` method
	 * To format a **time only** (without the date portion), use the `formatTime` method
	 */
	export class DateTimeFormat {
		constructor(lang?: string, opts?: DateFormatOpts);

		/**
		 * ```javascript
		 * var formatter = new d2lIntl.DateTimeFormat('sv-SE');
		 * var time = formatter.format(
		 * 	new Date(2015, 8, 23, 14, 5)
		 * ); // -> 2015-09-23 14:05
		 * ```
		 */
		format(val: Date): string;

		/**
		 * ```javascript
		 * var formatter = new d2lIntl.DateTimeFormat('es-MX', {
		 * 	format: 'full'
		 * });
		 * console.log(
		 * 	formatter.formatDate(new Date(2015, 8, 23))
		 * ); // -> miércoles 23 de septiembre de 2015
		 * ```
		 */
		formatDate(val: Date): string;

		/**
		 * ```javascript
		 * var formatter = new d2lIntl.DateTimeFormat('ko');
		 * var time = formatter.formatTime(
		 * 	new Date(2015, 8, 23, 14, 5)
		 * ); // -> 오후 14:05
		 * ```
		 */
		formatTime(val: Date): string;
	}

	/**
	 * The `DateTimeParse` object can be used to parse a date or time written in the user's locale.
	 *
	 * Syntax:
	 *
	 * ```javascript
	 * var parser = new d2lIntl.DateTimeParse(locales[, options]);
	 * ```
	 *
	 * Both the `parseDate` and `parseTime` methods take a string input and return a [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).
	 *
	 * To parse a date, use the `parseDate` method
	 * To parse a time, use the `parseTime` method
	 */
	export class DateTimeParse {
		constructor(lang?: string, opts?: FormatOpts);

		/**
	   	 * ```javascript
	   	 * var parser = new d2lIntl.DateTimeParse('fr-CA');
	   	 * var date = parser.parseDate('2015-09-23');
	   	 * console.log(
	   	 * 	date.getFullYear(), // -> 2015
	   	 * 	date.getMonth(), // -> 8 (months are 0-11)
	   	 * 	date.getDate() // -> 23
	   	 * );
	   	 * ```
		 */
		parseDate(val: string): Date;

		/**
	   	 * ```javascript
	   	 * var parser = new d2lIntl.DateTimeParse('fr-CA');
	   	 * var time = parser.parseTime('14 h 05');
	   	 * console.log(
	   	 * 	time.getHours(), // -> 14
	   	 * 	time.getMinutes() // -> 5
	   	 * );
	   	 * ```
		 */
		parseTime(val: string): Date;
	}

	/**
	 * Integer and decimal numbers can be formatted in the user's locale using the `NumberFormat` class. It intentionally mirrors the ECMA-402 [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) class.
	 *
	 * Syntax:
	 *
	 * ```javascript
	 * var formatter = new d2lIntl.NumberFormat(locales[, options]);
	 * ```
	 *
	 * To format a number, call the `format` method
	 */
	export class NumberFormat {
		constructor(lang?: string, opts?: NumberFormatOpts);

		/**
		 * **Example 1**: formatting as an integer (rounded to 0 decimal places)
		 *
		 * ```javascript
		 * var formatter = new d2lIntl.NumberFormat('en', {
		 * 	maximumFractionDigits: 0
		 * });
		 * console.log(formatter.format(89.72)); // -> 90
		 * ```
		 *
		 * **Example 2**: formatting as a percentage (rounded to 2 decimal places, but always showing at least 2 decimals)
		 *
		 * ```javascript
		 * var formatter = new d2lIntl.NumberFormat('en', {
		 * 	style: 'percent',
		 * 	minimumFractionDigits: 2,
		 * 	maximumFractionDigits: 2
		 * });
		 * console.log(formatter.format(0.333)); // -> 33.30%
		 * ```
		 */
		format(value: number): string;
	}

	/**
	 * The `NumberParse` object can be used to parse an integer or decimal number written in the user's locale.
	 *
	 * Syntax:
	 *
	 * ```javascript
	 * var parser = new d2lIntl.NumberParse(locales[, options]);
	 * ```
	 *
	 * To parse a number, call the `parse` method
	 */
	export class NumberParse {
		constructor(lang?: string, opts?: FormatOpts);

		/**
		 * **Example:**
	   	 *
	   	 * ```javascript
	   	 * var parser = new d2lIntl.NumberParse('fr-CA');
	   	 * console.log(parser.parse('-8 942,39')); // -> -8942.39
	   	 * ```
		 */
		parse(val: string): number;
	}

	/**
	 * The `FileSizeFormat` object can be used to format a file size appropriately for the user's locale.
	 *
	 * Syntax:
	 *
	 * ```javascript
	 * var formatFS = new d2lIntl.FileSizeFormat(locale[, options]);
	 * ```
	 *
	 * To format a file size, call the `format` method
	 */
	export class FileSizeFormat {
		constructor(lang?: string, opts?: FormatOpts);

		/**
		 * ```javascript
		 * var formatFS = new d2lIntl.FileSizeFormat('en-US');
		 * var fileSize = formatFS.format(100);
		 * console.log(fileSize) // -> 100 Bytes
		 * ```
		 */
		format(fileSize: number): string;
	}

	type Months = [
		string,
		string,
		string,
		string,
		string,
		string,
		string,
		string,
		string,
		string,
		string,
		string
	];

	type Days = [
		string,
		string,
		string,
		string,
		string,
		string,
		string,
	];

	export interface PartialLocaleData {
		'date'?: {
			'hour24'?: boolean;
			'formats'?: {
				'dateFormats'?: {
					'full'?: string;
					'medium'?: string;
					'short'?: string;
					'monthYear'?: string;
					'monthDay'?: string;
				};
				'timeFormats'?: {
					'full'?: string;
					'medium'?: string;
					'short'?: string;
				};
			};
			'calendar'?: {
				'type'?: string;
				'firstDayOfWeek'?: number;
				'weekendStartDay'?: number;
				'weekendEndDay'?: number;
				'months'?: {
					'short'?: Months;
					'long'?: Months;
				},
				'days'?: {
					'narrow'?: Days;
					'short'?: Days;
					'long'?: Days;
				},
				'dayPeriods'?: {
					'am'?: string;
					'pm'?: string;
				}
			}
		};
		'number'?: {
			'patterns'?: {
				'decimal'?: {
					'positivePattern'?: string;
					'negativePattern'?: string;
				};
				'percent'?: {
					'positivePattern'?: string;
					'negativePattern'?: string;
				};
			};
			'symbols'?: {
				'decimal'?: string;
				'group'?: string;
				'negative'?: string;
				'percent'?: string;
			};
			'groupSize'?: number;
		};
		'fileSize'?: {
			'patterns'?: {
				'fileSizePattern'?: string;
			};
			'units'?: {
				'gigabyte'?: string;
				'megabyte'?: string;
				'kilobyte'?: string;
				'bytes'?: string;
				'byte'?: string;
			};
		};
	}

	export interface LocaleData {
		'date': {
			'hour24': boolean;
			'formats': {
				'dateFormats': {
					'full': string;
					'medium': string;
					'short': string;
					'monthYear': string;
					'monthDay': string;
				};
				'timeFormats': {
					'full': string;
					'medium': string;
					'short': string;
				};
			};
			'calendar': {
				'type': string;
				'firstDayOfWeek': number;
				'weekendStartDay': number;
				'weekendEndDay': number;
				'months': {
					'short': Months;
					'long': Months;
				},
				'days': {
					'narrow': Days;
					'short': Days;
					'long': Days;
				},
				'dayPeriods': {
					'am': string;
					'pm': string;
				}
			}
		};
		'number': {
			'patterns': {
				'decimal': {
					'positivePattern': string;
					'negativePattern': string;
				};
				'percent': {
					'positivePattern': string;
					'negativePattern': string;
				};
			};
			'symbols': {
				'decimal': string;
				'group': string;
				'negative': string;
				'percent': string;
			};
			'groupSize': number;
		};
		'fileSize': {
			'patterns': {
				'fileSizePattern': string;
			};
			'units': {
				'gigabyte': string;
				'megabyte': string;
				'kilobyte': string;
				'bytes': string;
				'byte': string;
			};
		};
	}

	/**
	 * All locale data can be retrieved by providing a 'locale' option. The locale data can be overridden.
	 */
	export function LocaleProvider(locales: string[] | string, override: PartialLocaleData): LocaleData;
}
