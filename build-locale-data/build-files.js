import { buildIntlFiles } from './build-intl-files.js';
import { buildLMSFiles } from './build-LMS-files.js';
import { env } from 'node:process';
import { generateLocaleData } from './generate-locale-data.js';

const localeData = await generateLocaleData();

await buildIntlFiles(localeData);

await Promise.all([
	buildLMSFiles(localeData),
]);
