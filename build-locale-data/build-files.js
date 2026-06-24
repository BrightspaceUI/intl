import { buildIntlFiles } from './build-intl-files.js';
import { generateLocaleData } from './generate-locale-data.js';

const localeData = await generateLocaleData();

await buildIntlFiles(localeData);

// TODO: either build more files for more repos, or remove if built elsewhere
//await Promise.all([]);
