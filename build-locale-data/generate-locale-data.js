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
			locale = Intl.getCanonicalLocales(locale.trim().toLowerCase())[0];
			stdout.write(`${originalLocale.padEnd(padLength)}${locale !== originalLocale ? ` ->  ${locale}` : ''}\n`);
		} catch (e) {
			stderr.write(e.message);
			exit(1);
		}
		data[originalLocale] = {
			sourceLocale: locale,
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
			numberingSystemId: cldr.extractDefaultNumberSystemId(locale),
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
