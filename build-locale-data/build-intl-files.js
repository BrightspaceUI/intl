import { dirname, posix } from 'node:path';
import { env, exit, stderr } from 'node:process';
import {
	supportedBaseLocales as existingBaseLocales,
	supportedLangpacks as existingLangpacks,
	supportedLocalesDetails as existingLocalesDetails
} from '../lib/locale-data/supported.js';
import { readFile, writeFile } from 'node:fs/promises';

const { NEW_LOCALE } = env;
const PATH_LOCALE_DATA = posix.join(dirname(import.meta.url), '../lib/locale-data/locales/{locale}.js').replace(/file:(\/c:)?/i, '');
const PATH_SUPPORTED = posix.join(dirname(import.meta.url), '../lib/locale-data/supported.js').replace(/file:(\/c:)?/i, '');
const COMMENT_DELIMITER = '// end generated locale data';

export async function buildIntlFiles(data) {
	let supportedContents = await readFile(PATH_SUPPORTED, 'utf-8');
	const supportedBaseLocales = new Set(existingBaseLocales);
	const supportedLangpacks = new Set(existingLangpacks);
	const supportedLocaleDetails = [];

	if (NEW_LOCALE) {
		const existingLocale = existingLocalesDetails.find(l =>
			l.code.toLowerCase() === NEW_LOCALE.toLowerCase()
			|| l.source.toLowerCase() === NEW_LOCALE.toLowerCase()
			&& l.overrideCode !== NEW_LOCALE)
		if (existingLocale) {
			stderr.write(`\nError: Locale ${NEW_LOCALE} already exists${existingLocale.pack !== NEW_LOCALE ? ` as ${existingLocale.pack}` : ''}. Choose a different locale code.`);
			exit(1);
		}
		//const id = existingLocalesDetails.reduce((max, l) => Math.max(max, l.id), 0) + 1;
		const newLocaleBase = NEW_LOCALE.split('-')[0];
		const newLocaleData = data[NEW_LOCALE] || !existingBaseLocales.includes(newLocaleBase) && data[newLocaleBase];
		if (!newLocaleData) {
			stderr.err(`\nError: Locale data for ${NEW_LOCALE} not found. Choose a different locale code.`);
		}
		//supportedLocaleDetails.push({ id, code: NEW_LOCALE, source: data[NEW_LOCALE].sourceLocale, pack: '${NEW_LOCALE}', dir: 'ltr', name: 'TODO: locale display name' });
		supportedBaseLocales.add(NEW_LOCALE.split('-')[0]);
		if (supportedLangpacks.has(newLocaleBase)) {
			//supportedLangpacks.add(NEW_LOCALE);
		} else {
			supportedLangpacks.add(newLocaleBase);
		}
	}

	const newId = existingLocalesDetails.reduce((max, l) => Math.max(max, l.id), 0) + 1;

	Object.keys(data).forEach(async locale => {
		const { id = newId, code = NEW_LOCALE } = existingLocalesDetails.find(l => l.pack === locale) || {};
		supportedLocaleDetails.push(`\n\t{ id: ${id}, code: '${code}', source: '${data[locale].sourceLocale}', pack: '${locale}', dir: '${data[locale].layout.orientation.characterOrder === 'right-to-left' ? 'rtl' : 'ltr'}', name: '${data[locale].localeDisplayName}' },`);
		supportedBaseLocales.add(locale.split('-')[0]);
		supportedLangpacks.add(locale);

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

	supportedContents =
`export const defaultLocale = 'en';
${supportedBaseLocalesString}
${supportedLangpacksString}
${supportedLocaleDetailsString}
${COMMENT_DELIMITER}${supportedContents.split(COMMENT_DELIMITER)[1]}`;

	await writeFile(PATH_SUPPORTED, supportedContents);
};
