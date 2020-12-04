# intl

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui/intl.svg)](https://www.npmjs.org/package/@brightspace-ui/intl)
[![NPM downloads](https://img.shields.io/npm/dt/@brightspace-ui/intl.svg)](https://www.npmjs.com/package/@brightspace-ui/intl)

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

Timestamps (milliseconds since the epoch) can be formatted in the user's locale and timezone using `formatTimestamp`.

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

To format a **timestamp** as a date and time:

```javascript
const dateString = formatTimestamp(
	1607097863123,
	[options]
);
```

Options are the same as for `formatDateTime`; this method converts the timestamp to a `Date` in the user's
configured time zone, then returns the results of passing this date to `formatDateTime`.

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

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `master`. Read on for more details...

The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)
* Deploy a new package to NPM

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)
