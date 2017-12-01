# d2l-intl

[![Bower version][bower-image]][bower-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependencies-image]][dependencies-url]

## Overview

This library consists of four sets of APIs (each described in detail below) to format and parse numbers, dates and times in JavaScript.

Why not just use the standard [ECMAScript Internationalization API (ECMA-402)](http://www.ecma-international.org/ecma-402/1.0/#sec-8) and [related polyfills](https://github.com/andyearnshaw/Intl.js)? Firstly, the standard doesn't include any parsing functionality. Additionally, Brightspace supports fine-grained locale customization at the organization and user levels -- a level of configuration that simply isn't present in the standard. This library does attempt to follow the standard API syntax and naming conventions when possible.

### Installation

Install from [NPM]([npm-url]):

```shell
npm install d2l-intl
```

Or include it in your application as UMD/CommonJs or as a global variable from the Brightspace CDN:

```html
<!-- UMD/CommonJS -->
<script src="https://s.brightspace.com/lib/d2l-intl/{version}/d2l-intl.js"></script>
<!-- global "d2lIntl" variable -->
<script src="https://s.brightspace.com/lib/d2l-intl/{version}/d2l-intl-global.js"></script>
```

**Note about Polymer:** If you're using [Polymer](https://www.polymer-project.org) to write a web component or application, use [d2l-localize-behavior](https://github.com/BrightspaceUI/localize-behavior) instead.

### Specifying Locales

Each of the APIs have a `locales` argument, which must be a string language tag (or array of language tags) matching a locale supported by Brightspace. A list of all supported locales can be found in the `locale-data` directory.

For example, to create a number formatter using the French Canadian (`fr-CA`) locale:

```javascript
var formatter = new d2lIntl.NumberFormat('fr-CA');
```

If the provided locale isn't supported (e.g. `fr-BE`), the base language (`fr`) will be used.

If an array of language tags is provided, the resolved locale will be the first supported locale.

### Overriding Locale Data

All locale data can be overridden by providing a `locale` option. Only the settings you specify will be overridden. For example, to use the `tr-TR` locale, but override the decimal symbol (which for Turkish is a comma):

```javascript
var options = {
	locale: {
		number: {
			symbols: {
				decimal: '.'
			}
		}
	}
};
new d2lIntl.NumberFormat('tr-TR', options).format(3.14); // -> 3.14
```

The full set of overridable locale data can be found by inspecting one of the JSON files in the `locale-data` directory.

### Retrieving Locale Data

All locale data can be retrieved by providing a 'locale' option. The locale data can be overridden.

```javascript
var localeData = d2lIntl.LocaleProvider('fr');
```

## Number Formatting

Integer and decimal numbers can be formatted in the user's locale using the `NumberFormat` class. It intentionally mirrors the ECMA-402 [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) class.

Syntax:

```javascript
var formatter = new d2lIntl.NumberFormat(locales[, options]);
```

Options:

- **locale**: see [overriding locale data](#Overriding Locale Data)
- **style**: the number format style to use. Possible values are "decimal" or "percent"; the default is "decimal".
- **minimumFractionDigits**: The minimum number of fraction digits to use. Possible values are from 0 to 20; the default is 0.
- **maximumFractionDigits**: The maximum number of fraction digits to use. Possible values are from 0 to 20; the default is the larger of `minimumFractionDigits` and 3.

**Example 1**: formatting as an integer (rounded to 0 decimal places)

```javascript
var formatter = new d2lIntl.NumberFormat('en', {
	maximumFractionDigits: 0
});
console.log(formatter.format(89.72)); // -> 90
```

**Example 2**: formatting as a percentage (rounded to 2 decimal places, but always showing at least 2 decimals)

```javascript
var formatter = new d2lIntl.NumberFormat('en', {
	style: 'percent',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
console.log(formatter.format(0.333)); // -> 33.30%
```

## Number Parsing

The `NumberParse` object can be used to parse an integer or decimal number written in the user's locale.

Syntax:

```javascript
var parser = new d2lIntl.NumberParse(locales[, options]);
```

Options:

- **locale**: see [overriding locale data](#Overriding Locale Data)

**Example:**

```javascript
var parser = new d2lIntl.NumberParse('fr-CA');
console.log(parser.parse('-8 942,39')); // -> -8942.39
```

## Date/Time Formatting

Dates and times can be formatted in the user's locale using the `DateTimeFormat` class. It behaves similar to the ECMA-402 [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) class.

Syntax:

```javascript
var formatter = new d2lIntl.DateTimeFormat(locales[, options]);
```

Options:

- **locale**: see [overriding locale data](#Overriding Locale Data)
- **format**: which pattern to use when rendering the date-time; default is "short".
  - **full**: long weekday, month names and timezone. e.g. "Wednesday, September 23, 2015 1:25 PM EST"
  - **medium**: long month names. e.g. "September 23, 2015 1:25 PM"
  - **short**: abbreviated date format. e.g. "9/23/2015 1:25 PM"
  - **monthYear**: month and year only. e.g. "September 2015"
  - **monthDay**: month and day only. e.g. "September 23"
  - **longDayOfWeek**: long weekday only. e.g. "Wednesday"
  - **shortDayOfWeek**: short weekday only. e.g. "Wed"
  - **longMonth**: long month only. e.g. "September"
  - **shortMonth**: short month only. e.g. "Sep"

All the date and time formatting methods take a [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) as input.

To format a **date and time**, use the `format` method:

```javascript
var formatter = new d2lIntl.DateTimeFormat('sv-SE');
var time = formatter.format(
	new Date(2015, 8, 23, 14, 5)
); // -> 2015-09-23 14:05
```

To format a **time only** (without the date portion), use the `formatTime` method:

```javascript
var formatter = new d2lIntl.DateTimeFormat('ko');
var time = formatter.formatTime(
	new Date(2015, 8, 23, 14, 5)
); // -> 오후 14:05
```

To format a **date only** (without the time portion), use the `formatDate` method:

```javascript
var formatter = new d2lIntl.DateTimeFormat('es-MX', {
	format: 'full'
});
console.log(
	formatter.formatDate(new Date(2015, 8, 23))
); // -> miércoles 23 de septiembre de 2015
```

## Date/Time Parsing

The `DateTimeParse` object can be used to parse a date or time written in the user's locale.

Syntax:

```javascript
var parser = new d2lIntl.DateTimeParse(locales[, options]);
```

Options:

- **locale**: see [overriding locale data](#Overriding Locale Data)

Both the `parseDate` and `parseTime` methods take a string input and return a [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

To parse a time, use the `parseTime` method:

```javascript
var parser = new d2lIntl.DateTimeParse('fr-CA');
var time = parser.parseTime('14 h 05');
console.log(
	time.getHours(), // -> 14
	time.getMinutes() // -> 5
);
```

To parse a date, use the `parseDate` method:

```javascript
var parser = new d2lIntl.DateTimeParse('fr-CA');
var date = parser.parseDate('2015-09-23');
console.log(
	date.getFullYear(), // -> 2015
	date.getMonth(), // -> 8 (months are 0-11)
	date.getDate() // -> 23
);
```

## File Size Parsing
The `FileSizeFormat` object can be used to format a file size appropriately for the user's locale.

Syntax:

```javascript
var formatFS = new d2lIntl.FileSizeFormat(locale[, options]);
```

To format a file size, call the `format` method:

```javascript
var fileSize = formatFS.format(fileSize);
```

```javascript
var formatFS = new d2lIntl.FileSizeFormat('en-US');
var fileSize = formatFS.format(100);
console.log(fileSize) // -> 100 Bytes
```

## Contributing
Contributions are welcome, please submit a pull request!
Please run a browserify build before submitting to update the latest /dist/Intl.js

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and
contributions should make use of them.

[bower-url]: http://bower.io/search/?q=d2l-intl
[bower-image]: https://img.shields.io/bower/v/d2l-intl.svg
[npm-url]: https://www.npmjs.org/package/d2l-intl
[npm-image]: https://img.shields.io/npm/v/d2l-intl.svg
[ci-url]: https://travis-ci.org/Brightspace/intl
[ci-image]: https://img.shields.io/travis/Brightspace/intl.svg
[coverage-url]: https://coveralls.io/r/Brightspace/intl?branch=master
[coverage-image]: https://img.shields.io/coveralls/Brightspace/intl.svg
[dependencies-url]: https://david-dm.org/Brightspace/intl
[dependencies-image]: https://img.shields.io/david/Brightspace/intl.svg
