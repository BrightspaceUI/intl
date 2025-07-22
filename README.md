# intl

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui/intl.svg)](https://www.npmjs.org/package/@brightspace-ui/intl)
[![NPM downloads](https://img.shields.io/npm/dt/@brightspace-ui/intl.svg)](https://www.npmjs.com/package/@brightspace-ui/intl)

## Overview

This library consists of APIs to format and parse numbers, dates, times and file sizes for use in D2L Brightspace. It also provides localization for common terms.

> Looking for the older `d2l-intl` library? It's still here [in the `v2.x` branch](https://github.com/BrightspaceUI/intl/tree/v2.x).

Why not just use the standard [ECMAScript Internationalization API (ECMA-402)](http://www.ecma-international.org/ecma-402/1.0/#sec-8) and [related polyfills](https://github.com/andyearnshaw/Intl.js)? Firstly, the standard doesn't include any parsing functionality. Additionally, Brightspace supports fine-grained locale customization at the organization and user levels -- configuration that simply isn't present in the native APIs.

## Installation & Usage

Install from NPM:

```shell
npm install @brightspace-ui/intl
```

Then `import` only the functionality you need:

```javascript
import { formatDate, formatTime } from '@brightspace-ui/intl/lib/dateTime.js';
import { formatNumber, formatPercent } from '@brightspace-ui/intl/lib/number.js';
```

All of the APIs will automatically detect the document's language via the `lang` attribute on the `<html>` element. They'll also look for various `data-` attributes that will be present in Brightspace pages to access override and timezone information.

## Numbers

### Number Formatting

Integer and decimal numbers can be formatted in the user's locale using `formatNumber`. Percentages can be formatted using `formatPercent`. Use the optional `options` parameter for rounding.

```javascript
import { formatNumber, formatPercent } from '@brightspace-ui/intl/lib/number.js';

const number = formatNumber(8902.72, [options]); // -> '8,902.72' in en-US
const percent = formatPercent(0.333, [options]); // -> '33.3 %' in en-US
```

Options:
- **minimumFractionDigits**: Minimum number of fraction digits to use. Possible values range from `0` to `20`; the default is `0`.
- **maximumFractionDigits**: Maximum number of fraction digits to use. Possible values range from `0` to `20`; the default is the larger of `minimumFractionDigits` and `3`.
- **useGrouping**: Whether to use grouping separators, such as thousands separators; the default is `true`.

Formatting as an integer (rounded to 0 decimal places):

```javascript
import { formatNumber } from '@brightspace-ui/intl/lib/number.js';

const value = formatNumber(89.72, {
	maximumFractionDigits: 0
}); // -> '90' in en-US
```

Formatting as a percentage (rounded to 2 decimal places, but always showing at least 2 decimals):

```javascript
import { formatPercent } from '@brightspace-ui/intl/lib/number.js';

const value = formatPercent(0.333, {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
}); // -> '33.30 %' in en-US
```

### Number Parsing

The `parseNumber` method can be used to parse an integer or decimal number written in the user's locale.

```javascript
import { parseNumber } from '@brightspace-ui/intl/lib/number.js';

const value = parseNumber('-8 942,39'); // -> -8942.39 in fr-CA
```

## Dates & Times

### Date & Time Formatting

Dates and times can be formatted in the user's locale using `formatDate`, `formatTime`, `formatDateTime`, and `formatRelativeDateTime`.

Timestamps (milliseconds since the epoch) can be formatted in the user's locale and timezone using `formatDateTimeFromTimestamp`.

Combined dates and times are formatted using `formatDateTime`:

```javascript
import { formatDateTime } from '@brightspace-ui/intl/lib/dateTime.js';

const date = formatDateTime(
	new Date(2015, 8, 23, 14, 5),
	[options]
); // -> '2015-09-23 14:05' in sv-SE
```

Options:
- **format**: pattern to use when rendering the date-time; default is `'short'`.
  - **full**: long weekday, month names and timezone. e.g. `'Wednesday, September 23, 2015 1:25 PM EST'`
  - **medium**: short month names. e.g. `'Sept 23, 2015 1:25 PM'`
  - **short**: abbreviated date format. e.g. `'9/23/2015 1:25 PM'`

To format a **timestamp** as a date and time:

```javascript
const dateString = formatDateTimeFromTimestamp(
	1607097863123,
	[options]
);
```

Options are the same as for `formatDateTime`; this method converts the timestamp to a `Date` in the user's
configured time zone, then returns the results of passing this date to `formatDateTime`.

To format a **timestamp** as a date only:

```javascript
const dateString = formatDateFromTimestamp(
	1607097863123,
	[options]
);
```

Options are the same as for `formatDate`; this method converts the timestamp to a `Date` in the user's
configured time zone, then returns the results of passing this date to `formatDate`.

To format a **timestamp** as a time only:

```javascript
const timeString = formatTimeFromTimestamp(
	1607097863123,
	[options]
);
```

Options are the same as for `formatTime`; this method converts the timestamp to a `Date` in the user's
configured time zone, then returns the results of passing this date to `formatTime`.

To format a **date only** (without the time portion), use `formatDate`:

```javascript
import { formatDate } from '@brightspace-ui/intl/lib/dateTime.js';

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
import { formatTime } from '@brightspace-ui/intl/lib/dateTime.js';

const time = formatTime(
	new Date(2015, 8, 23, 14, 5)
); // -> '오후 14:05' in ko-KR
```

Options:
- **format**: pattern to use when rendering the time; default is `'short'`.
  - **full**: includes timezone. e.g. `'1:25 PM EST'`
  - **medium** or **short**: excludes timezone e.g. `'1:25 PM'`

To format a date/time in relative time, use `formatRelativeDateTime`:

```javascript
import { formatRelativeDateTime } from '@brightspace-ui/intl/lib/dateTime.js';

const relativeDateTime = formatRelativeDateTime(
	new Date(2024, 8, 18)
); // If today is 2024-08-22, -> 'last week' in en-US
```

### Date Parsing

To parse a date written in the user's locale, use `parseDate`:

```javascript
import { parseDate } from '@brightspace-ui/intl/lib/dateTime.js';

const date = parseDate('2015-09-23'); // in fr-CA
date.getFullYear(); // -> 2015
date.getMonth(); // -> 8 (months are 0-11)
date.getDate(); // -> 23
```

### Time Parsing

To parse a time written in the user's locale, use `parseTime`:

```javascript
import { parseTime } from '@brightspace-ui/intl/lib/dateTime.js';

const date = parseTime('14 h 05'); // in fr-CA
date.getHours(); // -> 14
date.getMinutes(); // -> 5
```

### Date/Time Conversion based on user timezone

To convert an object containing a UTC date to an object containing a local date corresponding to the `data-timezone` attribute:
```javascript
import { convertUTCToLocalDateTime } from '@brightspace-ui/intl/lib/dateTime.js';

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
import { convertLocalToUTCDateTime } from '@brightspace-ui/intl/lib/dateTime.js';

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
import { formatFileSize } from '@brightspace-ui/intl/lib/fileSize.js';

const fileSize = formatFileSize(100); // -> '100 bytes' in en-US
```

## List Formatting

Use `getSeparator` to get the appropriate list separator for the current locale. This is a separator that would be used in spoken language; note that the separator includes a space, for locales where it is appropriate.

```javascript
import { getSeparator } from '@brightspace-ui/intl/lib/list.js';

const separator = getSeparator(); // -> ', ' in en-US
const separator = getSeparator({ nonBreaking: true }); // -> ',\xa0' in en-US
```

Options:
- **nonBreaking**: a Boolean flag, whether to use non-breaking spaces instead of standard spaces; default is `false`

## Language Localization

The `Localize` class allows text to be displayed in the user's preferred language.

### Resources

Each resource is comprised of a name and a message, which must be provided as a key-value pair in a JavaScript object:

```javascript
{ myMessage: "This is my message" }
```

#### Name

Names should succinctly and uniquely describe the text being localized. `camelCase` is recommended, although `snake_case` and `kebab-case` are also supported.

For large projects, resources may be grouped using the `:` character. For example: `parentGroup:subGroup:messageName`.

#### Message

Messages must conform to the [ICU Message Syntax](https://formatjs.io/docs/core-concepts/icu-syntax/) format. It supports features such as: [simple arguments](https://formatjs.io/docs/core-concepts/icu-syntax/#simple-argument), the [`select` format](https://formatjs.io/docs/core-concepts/icu-syntax/#select-format) and [pluralization](https://formatjs.io/docs/core-concepts/icu-syntax/#plural-format).

> **Note:** Avoid using the ICU Message Syntax number, date and time formatting functionality. Brightspace allows customization of how these are localized, so use `formatNumber`, `formatDate` and `formatTime` instead.

### Using `Localize`

Import `Localize` and create a new instance. The `importFunc` option is required. It will be passed a language tag which can be used to fetch resources:

```javascript
import { Localize } from '@brightspace-ui/intl/lib/localize.js';

const localizer = new Localize({
	importFunc: async lang => (await import(`../lang/${lang}.js`)).default
});
```

Wait for resources to be available before attempting to use them:
```javascript
await localizer.ready;
```

### `localize()`

The `localize()` method is used to localize a message.

If the message contains arguments, provide replacement values in the second parameter:

```javascript
const helloText = localizer.localize('hello', { firstName: 'Mary' });
```

### `localizeHTML()`

Rich formatting can be included in messages and safely converted to HTML with the `localizeHTML()` method.

#### Basic Formatting

The following formatting elements are supported out-of-the-box:

* `<p>paragraphs</p>`
* `line<br></br>breaks` (note the end tag is required)
* `<b>bold</b>`
* `<strong>strong</strong>`
* `<i>italic</i>`
* `<em>emphasis</em>`

Remember that `<strong>` is for content of greater importance (browsers show this visually using bold), while `<b>` only bolds the text visually without increasing its importance.

Similarly `<em>` *emphasizes* a particular piece of text (browsers show this visually using italics), whereas `<i>` only italicizes the text visually without emphasis.

Example:

```javascript
{
  myMessage: "This is <b>bold</b> but <em>not</em> all that <strong>important</strong>."
}
```

#### Advanced Formatting

More advanced formatting can be achieved by providing replacement methods for custom tags, which are similar to arguments:

```javascript
{
  goHome: "Go <homeLink>home</homeLink>"
}
```

Then, import `localizeMarkup`:
```javascript
import { localizeMarkup } from '@brightspace-ui/intl/lib/localize.js';
```

and provide a tag replacement method:
```javascript
localizer.localizeHTML('goHome', {
	homeLink: chunks => localizeMarkup`<d2l-link href="/home">${chunks}</d2l-link>`
});
```
In addition to the Basic Formatting elements, these additional elements may also be used in replacement methods:

* `<d2l-link>`
* `<d2l-tooltip-help>`

### Common Resources

Some localization resources are common and shared across D2L applications. To use these resources, set the `loadCommon` option:

```javascript
import { Localize } from '@brightspace-ui/intl/lib/localize.js';

const localizer = new Localize({
  loadCommon: true
});
```

#### localizeCommon

The localized value of the following common terms can be accessed using `localizeCommon(name)`:

Navigation
* `navigation:back:title` (Back)
* `navigation:next:title` (Next)
* `navigation:previous:title` (Previous)

#### localizeCharacter

The localized value of the following characters can be accessed using `localizeCharacter(char)`:
* `'` (apostrophe)
* `&` (ampersand)
* `*` (asterisk)
* `\` (backslash)
* `:` (colon)
* `,` (comma)
* `>` (greater-than sign)
* `<` (less-than sign)
* `#` (number sign)
* `%` (percent sign)
* `|` (pipe)
* `?` (question mark)
* `"` (quotation mark)

```javascript
const value = localizer.localizeCharacter('&'); // -> 'ampersand' in en-US
```

### `onResourcesChange`

Provide an `onResourcesChange` callback function to perform tasks when the document language is changed and updated resources are available:

```javascript
const localizer = new Localize({
	onResourcesChange: () => document.title = localizer.localize('pageTitle')
});
```

To stop listening for changes, disconnect the instance:
```javascript
localizer.disconnect()
```

## Developing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Running the test harness

Start a [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) that hosts the test harness:

```shell
npm start
```

This will let you test the intl library in a browser, and will update live with any changes.

### Contributing

Contributions are welcome, please submit a pull request!

### Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches, refer to the [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) documentation.
