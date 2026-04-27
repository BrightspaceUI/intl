import { buildIntlFiles } from './build-intl-files.js';
import { generateLocaleData } from './generate-locale-data.js';

const localeData = await generateLocaleData();

await Promise.all([
	buildIntlFiles(localeData)
]);
