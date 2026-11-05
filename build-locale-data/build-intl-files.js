import { argv, exit, stderr } from 'node:process';
import { dirname, posix } from 'node:path';
import {
	supportedBaseLocales as existingBaseLocales,
	supportedLangpacks as existingLangpacks,
	supportedLocalesDetails as existingLocalesDetails
} from '../lib/locale-data/supported.js';
import { readFile, writeFile } from 'node:fs/promises';
import config from '../mfv.config.json' with { type: 'json' };

const NEW_LOCALE = argv[argv.findIndex(a => a === '--new-locale') + 1]?.trim();
const PATH_LOCALE_DATA = posix.join(dirname(import.meta.url), '../lib/locale-data/locales/{locale}.js').replace(/file:(\/c:)?/i, '');
const PATH_SUPPORTED = posix.join(dirname(import.meta.url), '../lib/locale-data/supported.js').replace(/file:(\/c:)?/i, '');
const COMMENT_DELIMITER = '// end generated locale data';

const originalLocales = Object.fromEntries(Object.entries(config.localesMap).map(([original, mapped]) => [mapped, original]));

export async function buildIntlFiles(data) {
	let supportedContents = await readFile(PATH_SUPPORTED, 'utf-8');
	const supportedBaseLocales = new Set(existingBaseLocales);
	const supportedLangpacks = new Set(existingLangpacks);
	const supportedLocaleDetails = [];

	if (NEW_LOCALE) {
		const existingLocale = existingLocalesDetails.find(l =>
			l.code.toLowerCase() === NEW_LOCALE.toLowerCase()
			|| l.source?.toLowerCase() === NEW_LOCALE.toLowerCase()
			&& l.overrideCode !== NEW_LOCALE);
		if (existingLocale) {
			stderr.write(`\nError: Locale "${NEW_LOCALE}" already exists${existingLocale.pack && existingLocale.pack !== NEW_LOCALE ? ` as "${existingLocale.pack}"` : ''}. Choose a different locale code.`);
			exit(1);
		}

		const newLocaleBase = NEW_LOCALE.split('-')[0];
		const newLocaleData = data[NEW_LOCALE] || !existingBaseLocales.includes(newLocaleBase) && data[newLocaleBase];
		if (!newLocaleData) {
			stderr.write(`\nError: Locale data for "${NEW_LOCALE}" not found. Choose a different locale code.`);
			exit(1);
		}
	}

	const newId = existingLocalesDetails.reduce((max, l) => Math.max(max, l.id), 0) + 1;

	Object.keys(data).forEach(async locale => {
		// `locale` is the (possibly mapped) data key, used for the locale file name.
		// `localeCode` is the original pack/code from supported.js
		const localeCode = originalLocales[locale] ?? locale;
		const {
			id = newId,
			code = locale,
			overrideCode,
			name,
			pack
		} = existingLocalesDetails.find(l => (l.pack || l.code) === localeCode) || {};
		const dir = data[locale]?.layout.orientation.characterOrder === 'right-to-left' ? 'rtl' : 'ltr';
		const packStr = (name && pack) || (code === data[locale]?.sourceLocale) ? `pack: '${localeCode}', ` : '';
		const overrideCodeStr = overrideCode ? `overrideCode: '${overrideCode}', ` : '';
		const localeDisplayName = NEW_LOCALE ? name || data[locale]?.localeDisplayName : data[locale]?.localeDisplayName;
		supportedLocaleDetails.push(`\n\t{ id: ${id}, code: '${code}', source: '${data[locale].sourceLocale}', ${packStr}${overrideCodeStr}dir: '${dir}', name: '${localeDisplayName}' },`);
		if (localeCode.length === 2) {
			supportedBaseLocales.add(localeCode);
		}
		if (packStr) supportedLangpacks.add(localeCode);

		const contents = `export default ${JSON.stringify(data[locale], null, '\t')};\n`;

		await writeFile(
			PATH_LOCALE_DATA.replace('{locale}', locale),
			// unquote keys, leaving octals and other invalid identifiers alone
			contents.replace(new RegExp('"([\\p{L}[\\p{Nd}--[0]]_][\\p{L}\\p{Nd}_]+?|[\\p{L}\\p{Nd}_])":', 'giv'), '$1:')
		);
	});

	const supportedBaseLocalesString = `export const supportedBaseLocales = ['${[...supportedBaseLocales].join("', '")}'];`;
	const supportedLangpacksString = `export const supportedLangpacks = ['${[...supportedLangpacks].join("', '")}'];`;
	const supportedLocaleDetailsString = `export const supportedLocalesDetails = [${supportedLocaleDetails.join('')}\n];`;

	supportedContents = `export const defaultLocale = 'en';
${supportedBaseLocalesString}
${supportedLangpacksString}
${supportedLocaleDetailsString}
${COMMENT_DELIMITER}${supportedContents.split(COMMENT_DELIMITER)[1]}`;

	await writeFile(PATH_SUPPORTED, supportedContents);
};
