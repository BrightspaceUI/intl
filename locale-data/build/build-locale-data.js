import * as utils from './utils.js';
import { cwd, exit, stderr, stdout } from 'node:process';
import { dirname, posix } from 'node:path';
import { readdir, writeFile } from 'node:fs/promises';
import cldr from 'cldr';
import config from '../../mfv.config.json' with { type: 'json' };

const SAVE_PATH = posix.join(dirname(import.meta.url), '../locales/{locale}.js').replace(/file:(\/c:)?/i, '');

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

await (async() => {

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

	locales.forEach(async locale => {
		const contents = `export default ${JSON.stringify(data[locale], null, '\t')};\n`;

		await writeFile(
			SAVE_PATH.replace('{locale}', locale),
			// unquote keys, leaving octals and other invalid identifiers alone
			contents.replace(new RegExp('"([\\p{L}[\\p{Nd}--[0]]_][\\p{L}\\p{Nd}_]+?|[\\p{L}\\p{Nd}_])":', 'giv'), '$1:')
		);
	});
})();
