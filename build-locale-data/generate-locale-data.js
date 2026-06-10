import * as utils from './utils.js';
import { env, exit, stderr, stdout } from 'node:process';
import cldr from 'cldr';
import config from '../mfv.config.json' with { type: 'json' };
import { supportedLocalesDetails } from '../lib/locale-data/supported.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const { NEW_LOCALE } = env;

function getDelimiters(locale) {
	let delimiters;
	const lang = locale.split('-')[0];
	try {
		delimiters = cldr.extractDelimiters(locale);
	} catch {
		delimiters = cldr.extractDelimiters(lang);
	}

	switch (lang) {
		case 'haw':
			delimiters.apostrophe = "'";
			break;
		default:
			delimiters.apostrophe = '’';
			break;
	}

	return delimiters;
}

export async function generateLocaleData() {

	const data = {};
	const weekData = cldr.extractWeekData();
	const locales = supportedLocalesDetails.map(l => l.pack || l.code);
	const padOriginalLength = Math.max(...locales.map(l => l.length)) + 1;
	const padMappedLength = Math.max(...Object.values(config.localesMap).map(l => l.length)) + 1;

	if (NEW_LOCALE) {
		const sourceLocale = utils.getLikelySubtagSource(Intl.getCanonicalLocales([NEW_LOCALE])[0]) ?? NEW_LOCALE;
		if (sourceLocale !== NEW_LOCALE) {
			const { pack, code } = supportedLocalesDetails.find(l => l.source === sourceLocale) || {};
			if (pack || code) {
				stdout.write(`Error: Locale "${NEW_LOCALE}" is the likely subtag of "${sourceLocale}" but "${sourceLocale}" is already the source for "${pack || code}".\n\n`);
				exit(1);
			} else {
				stdout.write(`Warning: Locale "${NEW_LOCALE}" is the likely subtag of "${sourceLocale}". Using "${sourceLocale}" instead.\n\n`);
			}
		}
		locales.push(sourceLocale);
	}

	locales.forEach(locale => {
		const originalLocale = locale;
		let mappedLocale;
		try {
			mappedLocale = config.localesMap[originalLocale] || originalLocale;
			locale = Intl.getCanonicalLocales([mappedLocale])[0];
		} catch (e) {
			stderr.write(e.message);
			exit(1);
		}

		const [ coreLocaleTag, unicodeExtensions ] = locale.split('-u-');
		const {
			//ca: calendar,
			//co: collation,
			//hc: hourCycle,
			nu: numberingSystemId,
			sd: subdivision
		} = Object.fromEntries(
			unicodeExtensions?.match(/(?:[a-z]{2}-([a-z0-9]+))/g)
				.map(e => e.split('-')) || []
		);

		let gc, languageTag, territoryTag, scriptTag;
		try {
			({ language: languageTag, region: territoryTag, script: scriptTag } = new Intl.Locale(coreLocaleTag));
		} catch {
			[gc, languageTag, scriptTag, territoryTag] =
				//                    [ language ]    [    script   ]      [territory]
				coreLocaleTag.match(/^([a-z]{2,3})(?:-([A-Z][a-z]{3}))?(?:-([A-Z]{2}))?/);
		}

		stdout.write(`${originalLocale.padEnd(padOriginalLength)}${mappedLocale !== originalLocale ? ` ->  ${mappedLocale.padEnd(padMappedLength)}` : ''}${coreLocaleTag !== mappedLocale ? ` ->  ${coreLocaleTag}` : ''}\n`);

		const languageDisplayName = cldr.extractLanguageDisplayNames(coreLocaleTag)[languageTag];
		const territoryDisplayName = cldr.extractTerritoryDisplayNames(coreLocaleTag)[territoryTag];
		const subdivisionDisplayName = subdivision && cldr.extractSubdivisionDisplayNames(coreLocaleTag)[subdivision];
		const scriptDisplayName = cldr.extractScriptDisplayNames(coreLocaleTag)[scriptTag];

		const localeQualifiers = [territoryDisplayName, subdivisionDisplayName, scriptDisplayName].reduce((acc, q) => {
			return acc
				? (q ? cldr.extractLocaleDisplayPattern(coreLocaleTag).localeSeparator
					.replace('{0}', acc)
					.replace('{1}', q) : acc)
				: q;
		}, '');

		const sourceLocale = utils.getLikelySubtagSource(coreLocaleTag);
		const likelySubtag = utils.getLikelySubtagsMaps().expand(coreLocaleTag);

		const firstDay = (() => {
			const { territoryTag } = utils.parseLocaleTag(likelySubtag);
			for (const tag of [territoryTag, '001']) {
				for (const { territories, day } of weekData.firstDay) {
					if (territories.includes(tag)) {
						return daysOfWeek.indexOf(day);
					}
				}
			}
			return 1; // default to Monday
		})();

		const weekendStart = (() => {
			const { territoryTag } = utils.parseLocaleTag(likelySubtag);
			for (const tag of [territoryTag, '001']) {
				for (const { territories, day } of weekData.weekendStart) {
					if (territories.includes(tag)) {
						return daysOfWeek.indexOf(day);
					}
				}
			}
			return 1; // default to Monday
		})();

		const weekendEnd = (() => {
			const { territoryTag } = utils.parseLocaleTag(likelySubtag);
			for (const tag of [territoryTag, '001']) {
				for (const { territories, day } of weekData.weekendEnd) {
					if (territories.includes(tag)) {
						return daysOfWeek.indexOf(day);
					}
				}
			}
			return 1; // default to Monday
		})();

		data[originalLocale] = {
			languageDisplayName,
			territoryDisplayName,
			scriptDisplayName,
			localeDisplayName: localeQualifiers ? cldr.extractLocaleDisplayPattern(coreLocaleTag).localePattern
				.replace('{0}', languageDisplayName)
				.replace('{1}', localeQualifiers)
				: languageDisplayName,
			sourceLocale,
			localeCode: originalLocale,
			likelySubtag,
			layout: cldr.extractLayout(coreLocaleTag),
			pluralClass: {
				cardinal: cldr.extractPluralClasses(coreLocaleTag, 'cardinal'),
				ordinal: cldr.extractPluralClasses(coreLocaleTag, 'ordinal')
			},
			localeDisplayPattern: cldr.extractLocaleDisplayPattern(coreLocaleTag),
			dateFormats: cldr.extractDateFormats(coreLocaleTag, 'gregorian'),
			dateFormatItems: cldr.extractDateFormatItems(coreLocaleTag, 'gregorian'),
			timeFormats: cldr.extractTimeFormats(coreLocaleTag, 'gregorian'),
			dayPeriods: cldr.extractDayPeriods(coreLocaleTag, 'gregorian'),
			dayNames: cldr.extractDayNames(coreLocaleTag, 'gregorian'),
			weekData: {
				firstDay,
				weekendStart,
				weekendEnd
			},
			months: {
				...cldr.extractMonthNames(coreLocaleTag, 'gregorian'),
				transforms: {
					titleCase: utils.shouldTitleCaseMonths(coreLocaleTag)
				}
			},
			numberingSystemId: numberingSystemId || cldr.extractDefaultNumberSystemId(coreLocaleTag),
			numberingSystem: cldr.extractNumberingSystem(cldr.extractDefaultNumberSystemId(coreLocaleTag)),
			numberSymbols: {
				latn: cldr.extractNumberSymbols(coreLocaleTag, 'latn'),
				default: cldr.extractNumberSymbols(coreLocaleTag, cldr.extractDefaultNumberSystemId(coreLocaleTag))
			},
			delimiters: getDelimiters(coreLocaleTag),
			listPatterns: cldr.extractListPatterns(coreLocaleTag)
		};
	});

	return data;
}
