import { getDocumentLocaleSettings } from './common.js';
import IntlMessageFormat from 'intl-messageformat';
import { localeData } from './locale-data/current.js';

const documentLocaleSettings = getDocumentLocaleSettings();

export function formatDateTimeSkeleton(dateTime, options = {}) {
	const { date = true, time = true, locale } = arguments[2] || {};

	const {
		timezone: timeZone =
			options.timeZone
			|| documentLocaleSettings.timezone.identifier
			|| undefined,
		timeZoneName,
		hourCycle
	} = options;
	let {
		format,
		skeleton = '',
	} = options;

	if (!skeleton) {
		if (date) {
			if (!format || format === 'short') {
				skeleton = localeData.dateFormats.short;
			}
			else if (format === 'medium') {
				skeleton = localeData.dateFormats.medium;
			}
			else if (format === 'full') {
				skeleton = localeData.dateFormats.full;
			}
		}
		if (time) {
			skeleton += localeData.timeFormats.short;
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

		if (/[HhKkJYuUrM]|j{2,}/.test(skeleton)) {
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
			return new Intl.DateTimeFormat(locale, {
				...opts,
				...{ timeZone, timeZoneName, hourCycle }
			});
		}
	};
	const dateFormatter = new IntlMessageFormat(msg, locale || documentLocaleSettings.language, null, { formatters });
	const formatted = dateFormatter.format({ dateTime });
	return formatted;
}
