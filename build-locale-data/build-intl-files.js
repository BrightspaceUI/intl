import { dirname, posix } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { supportedLocalesDetails as existingLocaleDetails } from '../lib/locale-data/supported.js';
import { log } from 'node:console';

const PATH_LOCALE_DATA = posix.join(dirname(import.meta.url), '../lib/locale-data/locales/{locale}.js').replace(/file:(\/c:)?/i, '');
const PATH_SUPPORTED = posix.join(dirname(import.meta.url), '../lib/locale-data/supported.js').replace(/file:(\/c:)?/i, '');
const COMMENT_DELIMITER = '// end generated locale data';

export async function buildIntlFiles(data) {
	let supportedContents = await readFile(PATH_SUPPORTED, 'utf-8');
	const supportedBaseLocales = new Set();
	const supportedLangpacks = [];
	const supportedLocaleDetails = [];
	Object.keys(data).forEach(async locale => {
		const { id, code } = existingLocaleDetails.find(l => l.pack === locale) || {};
		supportedLocaleDetails.push(`\n\t{ id: ${id}, code: '${locale}', source: '${data[locale].sourceLocale}', pack: '${locale}', dir: '${data[locale].layout.orientation.characterOrder}', name: '${data[locale].localeDisplayName}' },`);
		supportedBaseLocales.add(locale.split('-')[0]);
		supportedLangpacks.push(locale);

		const contents = `export default ${JSON.stringify(data[locale], null, '\t')};\n`;

		await writeFile(
			PATH_LOCALE_DATA.replace('{locale}', locale),
			// unquote keys, leaving octals and other invalid identifiers alone
			contents.replace(new RegExp('"([\\p{L}[\\p{Nd}--[0]]_][\\p{L}\\p{Nd}_]+?|[\\p{L}\\p{Nd}_])":', 'giv'), '$1:')
		);
	});

	const supportedBaseLocalesString = `export const supportedBaseLocales = ['${[...supportedBaseLocales].join("', '")}'];`;
	const supportedLangpacksString = `export const supportedLangpacks = ['${supportedLangpacks.join("', '")}'];`;
	const supportedLocaleDetailsString = `export const supportedLocalesDetails = [${supportedLocaleDetails.join('')}\n];`;

	supportedContents =
`export const defaultLocale = 'en';
${supportedBaseLocalesString}
${supportedLangpacksString}
${supportedLocaleDetailsString}
${COMMENT_DELIMITER}${supportedContents.split(COMMENT_DELIMITER)[1]}`;

	await writeFile(PATH_SUPPORTED, supportedContents);
};
