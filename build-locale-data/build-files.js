import { buildIntlFiles } from './build-intl-files.js';
import { buildLMSFiles } from './build-LMS-files.js';
import { env } from 'node:process';
import { generateLocaleData } from './generate-locale-data.js';

const localeData = await generateLocaleData();

// When NEW_LOCALE is set, buildIntlFiles must finish first so that
// buildLMSFiles can re-read the freshly updated supported.js.
if (env.NEW_LOCALE) {
	await buildIntlFiles(localeData);
	await buildLMSFiles(localeData);
} else {
	await Promise.all([
		buildIntlFiles(localeData),
		buildLMSFiles(localeData),
	]);
}
