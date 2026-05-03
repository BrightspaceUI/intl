import * as utils from './utils.js';
import { cwd, exit, stderr, stdout } from 'node:process';
import cldr from 'cldr';
import config from '../mfv.config.json' with { type: 'json' };
import { readdir } from 'node:fs/promises';

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
	const locales = config.path && (await readdir(`${cwd()}/${config.path}`).catch(() => {}))?.map(f => f.split('.')[0]);
	const padLength = Math.max(...locales.map(l => l.length)) + 1;

	locales.forEach(locale => {
		const originalLocale = locale;
		try {
			locale = config.localesMap[locale] || locale;
			locale = Intl.getCanonicalLocales([locale])[0];
			stdout.write(`${originalLocale.padEnd(padLength)}${locale !== originalLocale ? ` ->  ${locale}` : ''}\n`);
		} catch (e) {
			stderr.write(e.message);
			exit(1);
		}

		const [ coreLocaleTag, unicodeExtensions ] = locale.split('-u-');
		const {
			//ca: calendar,
			co: collation,
			hc: hourCycle,
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

		locale = [languageTag, scriptTag, territoryTag].filter(Boolean).join('-');

		const languageDisplayName = cldr.extractLanguageDisplayNames(locale)[languageTag];
		const territoryDisplayName = cldr.extractTerritoryDisplayNames(locale)[territoryTag];
		const subdivisionDisplayName = subdivision && cldr.extractSubdivisionDisplayNames(locale)[subdivision];
		const scriptDisplayName = cldr.extractScriptDisplayNames(locale)[scriptTag];

		const localeQualifiers = [territoryDisplayName, subdivisionDisplayName, scriptDisplayName].reduce((acc, q) => {
			return acc
				? (q ? cldr.extractLocaleDisplayPattern(locale).localeSeparator
					.replace('{0}', acc)
					.replace('{1}', q) : acc)
				: q;
		}, '');

		data[originalLocale] = {
			languageDisplayName,
			territoryDisplayName,
			scriptDisplayName,
			localeDisplayName: localeQualifiers ? cldr.extractLocaleDisplayPattern(locale).localePattern
				.replace('{0}', languageDisplayName)
				.replace('{1}', localeQualifiers)
				: languageDisplayName,
			sourceLocale: locale,
			localeCode: originalLocale,
			layout: cldr.extractLayout(locale),
			pluralClass: {
				cardinal: cldr.extractPluralClasses(locale, 'cardinal'),
				ordinal: cldr.extractPluralClasses(locale, 'ordinal')
			},
			localeDisplayPattern: cldr.extractLocaleDisplayPattern(locale),
			dateFormats: cldr.extractDateFormats(locale, 'gregorian'),
			dateFormatItems: cldr.extractDateFormatItems(locale, 'gregorian'),
			months: {
				...cldr.extractMonthNames(locale, 'gregorian'),
				transforms: {
					titleCase: utils.shouldTitleCaseMonths(locale)
				}
			},
			numberingSystemId: numberingSystemId || cldr.extractDefaultNumberSystemId(locale),
			numberingSystem: cldr.extractNumberingSystem(cldr.extractDefaultNumberSystemId(locale)),
			numberSymbols: {
				latn: cldr.extractNumberSymbols(locale, 'latn'),
				default: cldr.extractNumberSymbols(locale, cldr.extractDefaultNumberSystemId(locale))
			},
			delimiters: getDelimiters(locale),
			listPatterns: cldr.extractListPatterns(locale)
		};
	});

	return data;
}
