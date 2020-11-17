# intl

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui/intl.svg)](https://www.npmjs.org/package/@brightspace-ui/intl)
[![NPM downloads](https://img.shields.io/npm/dt/@brightspace-ui/intl.svg)](https://www.npmjs.com/package/@brightspace-ui/intl)
![Build status](https://github.com/BrightspaceUI/intl/workflows/CI/badge.svg)

## Overview

This library consists of APIs to format and parse numbers, dates, times and file sizes for use in D2L Brightspace.

> Looking for the older `d2l-intl` library? It's still here [in the `v2.x` branch](https://github.com/BrightspaceUI/intl/tree/v2.x).

Why not just use the standard [ECMAScript Internationalization API (ECMA-402)](http://www.ecma-international.org/ecma-402/1.0/#sec-8) and [related polyfills](https://github.com/andyearnshaw/Intl.js)? Firstly, the standard doesn't include any parsing functionality. Additionally, Brightspace supports fine-grained locale customization at the organization and user levels -- configuration that simply isn't present in the native APIs.

## Installation & Usage

Install from NPM:

```shell
npm install @brightspace-ui/intl
```

Then `import` only the functionality you need:

```javascript
import {formatDate, formatTime} from '@brightspace-ui/intl/lib/dateTime.js';
import {formatNumber, formatPercent} from '@brightspace-ui/intl/lib/number.js';
```

All of the APIs will automatically detect the document's language via the `lang` attribute on the `<html>` element. They'll also look for various `data-` attributes that will be present in Brightspace pages to access override and timezone information.

## Number Formatting

Integer and decimal numbers can be formatted in the user's locale using `formatNumber`. Percentages can be formatted using `formatPercent`. Use the optional `options` parameter for rounding.

```javascript
import {formatNumber, formatPercent} from '@brightspace-ui/intl/lib/number.js';

const number = formatNumber(8902.72, [options]); // -> '8,902.72' in en-US
const percent = formatPercent(0.333, [options]); // -> '33.3 %' in en-US
```

Options:
- **minimumFractionDigits**: Minimum number of fraction digits to use. Possible values range from `0` to `20`; the default is `0`.
- **maximumFractionDigits**: Maximum number of fraction digits to use. Possible values range from `0` to `20`; the default is the larger of `minimumFractionDigits` and `3`.

Formatting as an integer (rounded to 0 decimal places):

```javascript
import {formatNumber} from '@brightspace-ui/intl/lib/number.js';

const value = formatNumber(89.72, {
	maximumFractionDigits: 0
}); // -> '90' in en-US
```

Formatting as a percentage (rounded to 2 decimal places, but always showing at least 2 decimals):

```javascript
import {formatPercent} from '@brightspace-ui/intl/lib/number.js';

const value = formatPercent(0.333, {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
}); // -> '33.30 %' in en-US
```

## Number Parsing

The `parseNumber` method can be used to parse an integer or decimal number written in the user's locale.

```javascript
import {parseNumber} from '@brightspace-ui/intl/lib/number.js';

const value = parseNumber('-8 942,39'); // -> -8942.39 in fr-CA
```

## Date/Time Formatting

Dates and times can be formatted in the user's locale using `formatDate`, `formatTime` and `formatDateTime`.

Combined dates and times are formatted using `formatDateTime`:

```javascript
import {formatDateTime} from '@brightspace-ui/intl/lib/dateTime.js';

const date = formatDateTime(
	new Date(2015, 8, 23, 14, 5),
	[options]
); // -> '2015-09-23 14:05' in sv-SE
```

Options:
- **format**: pattern to use when rendering the date-time; default is `'short'`.
  - **full**: long weekday, month names and timezone. e.g. `'Wednesday, September 23, 2015 1:25 PM EST'`
  - **medium**: long month names. e.g. `'September 23, 2015 1:25 PM'`
  - **short**: abbreviated date format. e.g. `'9/23/2015 1:25 PM'`

To format a **date only** (without the time portion), use `formatDate`:

```javascript
import {formatDate} from '@brightspace-ui/intl/lib/dateTime.js';

const value = formatDate(
	new Date(2015, 8, 23),
	{format: 'full'}
); // -> 'miércoles 23 de septiembre de 2015' in es-MX
```

Options:
- **format**: pattern to use when rendering the date; default is `'short'`.
  - **full**: long weekday and month names. e.g. `'Wednesday, September 23, 2015'`
  - **medium**: long month names. e.g. `'September 23, 2015'`
  - **short**: abbreviated date format. e.g. `'9/23/2015'`
  - **monthYear**: month and year only. e.g. `'September 2015'`
  - **monthDay**: month and day only. e.g. `'September 23'`
  - **shortMonthDay**: short month and day only. e.g. `'Sep 23'`
  - **longDayOfWeek**: long weekday only. e.g. `'Wednesday'`
  - **shortDayOfWeek**: short weekday only. e.g. `'Wed'`
  - **longMonth**: long month only. e.g. `'September'`
  - **shortMonth**: short month only. e.g. `'Sep'`

To format a **time only** (without the date portion), use `formatTime`:

```javascript
import {formatTime} from '@brightspace-ui/intl/lib/dateTime.js';

const time = formatTime(
	new Date(2015, 8, 23, 14, 5)
); // -> '오후 14:05' in ko-KR
```

Options:
- **format**: pattern to use when rendering the time; default is `'short'`.
  - **full**: includes timezone. e.g. `'1:25 PM EST'`
  - **medium** or **short**: excludes timezone e.g. `'1:25 PM'`

## Date Parsing

To parse a date written in the user's locale, use `parseDate`:

```javascript
import {parseDate} from '@brightspace-ui/intl/lib/dateTime.js';

const date = parseDate('2015-09-23'); // in fr-CA
date.getFullYear(); // -> 2015
date.getMonth(); // -> 8 (months are 0-11)
date.getDate(); // -> 23
```

## Time Parsing

To parse a time written in the user's locale, use `parseTime`:

```javascript
import {parseTime} from '@brightspace-ui/intl/lib/dateTime.js';

const date = parseTime('14 h 05'); // in fr-CA
date.getHours(); // -> 14
date.getMinutes(); // -> 5
```

## Date/Time Conversion based on user timezone

**These are a work in progress and are not ready for usage yet**

To convert an object containing a UTC date to an object containing a local date corresponding to the `data-timezone` attribute:
```javascript
import {convertUTCToLocalDateTime} from '@brightspace-ui/intl/lib/dateTime.js';

const UTCDateTime =  {
	month: 12,
	date: 1,
	year: 2015,
	hours: 8,
	minutes: 0,
	seconds: 0
};
const localDateTime = convertUTCToLocalDateTime(
	UTCDateTime
); // -> { month: 12, date: 1, year: 2015, hours: 3, minutes: 0, seconds: 0 } in America/Toronto
```

To convert an object containing a local date corresponding to the `data-timezone` attribute to an object containing a UTC date:
```javascript
import {convertLocalToUTCDateTime} from '@brightspace-ui/intl/lib/dateTime.js';

const localDateTime =  {
	month: 12,
	date: 1,
	year: 2015,
	hours: 8,
	minutes: 0,
	seconds: 0
};
const UTCDateTime = convertLocalToUTCDateTime(
	localDateTime
); // -> { month: 12, date: 1, year: 2015, hours: 13, minutes: 0, seconds: 0 } in America/Toronto
```

## File Size Formatting

Use `formatFileSize` to format a file size appropriately for the user's locale.

```javascript
import {formatFileSize} from '@brightspace-ui/intl/lib/fileSize.js';

const fileSize = formatFileSize(100); // -> '100 bytes' in en-US
```

## Contributing

Contributions are welcome, please submit a pull request!

## Versioning, Releasing & Deploying

All version changes should obey [semantic versioning](https://semver.org/) rules.

Releases use the [semantic-release](https://semantic-release.gitbook.io/) tooling and the [angular preset](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for commit message syntax. Upon release, the version in `package.json` is updated, a tag and GitHub release is created and a new package will be deployed to NPM.

Commits prefixed with `feat` will trigger a minor release, while `fix` or `perf` will trigger a patch release. A commit containing `BREAKING CHANGE` will cause a major release to occur.

Other useful prefixes that will not trigger a release: `build`, `ci`, `docs`, `refactor`, `style` and `test`. More details in the [Angular Contribution Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type).
