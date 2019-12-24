# intl

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui/intl.svg)](https://www.npmjs.org/package/@brightspace-ui/intl)
[![NPM downloads](https://img.shields.io/npm/dt/@brightspace-ui/intl.svg)](https://www.npmjs.com/package/@brightspace-ui/intl)
[![Greenkeeper badge](https://badges.greenkeeper.io/BrightspaceUI/intl.svg)](https://greenkeeper.io/)
[![Build status](https://travis-ci.com/BrightspaceUI/intl.svg?branch=master)](https://travis-ci.com/BrightspaceUI/intl)

## Overview

This library consists of four sets of APIs to format and parse numbers, dates, times and file sizes in JavaScript for use in Brightspace applications.

Why not just use the standard [ECMAScript Internationalization API (ECMA-402)](http://www.ecma-international.org/ecma-402/1.0/#sec-8) and [related polyfills](https://github.com/andyearnshaw/Intl.js)? Firstly, the standard doesn't include any parsing functionality. Additionally, Brightspace supports fine-grained locale customization at the organization and user levels -- a level of configuration that simply isn't present in the native APIs.

> Looking for the older `d2l-intl` library? It's still here [in the `v2.x` branch](https://github.com/BrightspaceUI/intl/tree/v2.x).

## Installation & Usage

Install from [NPM]([npm-url]):

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
	ew Date(2015, 8, 23),
	{format: 'full}
); // -> 'miércoles 23 de septiembre de 2015' in es-MX
```

Options:
- **format**: pattern to use when rendering the date; default is `'short'`.
  - **full**: long weekday and month names. e.g. `'Wednesday, September 23, 2015'`
  - **medium**: long month names. e.g. `'September 23, 2015'`
  - **short**: abbreviated date format. e.g. `'9/23/2015'`
  - **monthYear**: month and year only. e.g. `'September 2015'`
  - **monthDay**: month and day only. e.g. `'September 23'`
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

## File Size Formatting

Use `formatFileSize` to format a file size appropriately for the user's locale.

```javascript
import {formatFileSize} from '@brightspace-ui/intl/lib/fileSize.js';

const fileSize = formatFileSize(100); // -> '100 bytes' in en-US
```

## Contributing

Contributions are welcome, please submit a pull request!

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and
contributions should make use of them.
