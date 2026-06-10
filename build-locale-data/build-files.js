import { buildIntlFiles } from './build-intl-files.js';
import { buildLMSFiles } from './build-LMS-files.js';
import { generateLocaleData } from './generate-locale-data.js';

const localeData = await generateLocaleData();

await buildIntlFiles(localeData);

await Promise.all([
	//buildIntlFiles(localeData),
	buildLMSFiles(localeData),
]);
