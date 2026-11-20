import { getDocumentLocaleSettings } from './common.js';
import IntlMessageFormat from 'intl-messageformat';
import { localeData } from './locale-data/current.js';

const documentLocaleSettings = getDocumentLocaleSettings();

const customFormats = {
	// short
	'd/M/yyyy': ['es', 'yMd'],
	'dd.MM.yyyy': ['de', 'yMd', { day: '2-digit', month: '2-digit', year: 'numeric' }],
	'dd/MM/yyyy': ['en-gb', 'yMd'],
	'dd-MM-yyyy': ['nl', 'yMd', { day: '2-digit', month: '2-digit', year: 'numeric' }],
	'M/d/yyyy': ['en', 'yMd'],
	'MM/dd/yyyy': ['es-PR', 'yMd'],
	'yyyy/M/d': ['zh-Hans', 'yMd'],
	'yyyy/MM/dd': ['en-JP', 'yMd'],
	'yyyy-MM-dd': ['af', 'yMd'],
};

export function formatDateTimeSkeleton(dateTime, options = {}) {
	const { date = true, time = true } = arguments[2] || {};

	const {
		timezone: timeZone =
			options.timeZone
			|| documentLocaleSettings.timezone.identifier
			|| undefined,
		hourCycle
	} = options;
	let {
		format,
		skeleton = '',
		timeZoneName
	} = options;

	let customLocale, customOptions;

	if (!skeleton) {
		if (date) {
			if (!format || format === 'short') {
				const shortOverride = documentLocaleSettings.overrides.date?.formats?.dateFormats?.short;
				if (shortOverride) {
					customLocale = customFormats[shortOverride][0];
					skeleton = customFormats[shortOverride][1];
					customOptions = customFormats[shortOverride][2];
				} else {
					skeleton = localeData.dateFormats.short;
				}
			} else if (format === 'medium') {
				format = 'short';
				skeleton = localeData.dateFormats.medium;
			} else if (format === 'long') {
				format = 'short';
				skeleton = localeData.dateFormats.long;
			} else if (format === 'full') {
				format = 'short';
				timeZoneName = time ? timeZoneName || 'short' : timeZoneName;
				skeleton = localeData.dateFormats.full;
			}
		}
		if (time) {
			if (!format || format === 'short') {
				skeleton += localeData.timeFormats.short;
			} else if (format === 'medium') {
				skeleton += localeData.timeFormats.short;
			} else if (format === 'long') {
				skeleton += localeData.timeFormats.long;
			} else if (format === 'full') {
				skeleton += localeData.timeFormats.full;
			}
		}

		if (!skeleton) {
			console.warn(`"${format}" is not a valid format`);
			return;
		}

		format = null;
	} else {
		if (!options.forceUnsupportedFormat) {
			throw 'Use skeletons only if standard supported formats are inarguably insufficient. You must explicitly opt in with the `forceUnsupportedFormat` option.';
		}

		if (/[HhKkJ]|j{2,}/.test(skeleton)) {
			console.warn('Replacing static hour symbols: H/h/K/k/J/jj -> j');
			skeleton = skeleton.replace(/[HhKkJj]+/g, 'j');
		}
		if (!time) skeleton = skeleton.replace(/[HhJjKkmsaZzVvSsBbAOXx]/g, '');
		if (!date) skeleton = skeleton.replace(/[GyYuUrQqMLwWdDFgEec]/g, '');
	}

	if (!format && !skeleton) {
		throw 'No format or skeleton provided. Did you disable `dates` and `times`?';
	}

	const msg = `{dateTime, date, ${format || `::${skeleton}`}}`;

	const formatters = {
		getDateTimeFormat(locale, opts) {
			return new Intl.DateTimeFormat(customLocale || locale, {
				...opts,
				...{
					[timeZone && 'timeZone']: timeZone,
					[timeZoneName && 'timeZoneName']: timeZoneName,
					[hourCycle && 'hourCycle']: hourCycle
				},
				...customOptions
			});
		}
	};
	const dateFormatter = new IntlMessageFormat(msg, localeData.sourceLocale, null, { formatters });
	const formatted = dateFormatter.format({ dateTime });
	return formatted;
}
