export const defaultLocale = 'en';
export const supportedBaseLocales = ['ar', 'ca', 'cy', 'da', 'de', 'en', 'es', 'fr', 'haw', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'th', 'tr', 'vi', 'zh'];
export const supportedLangpacks = ['ar', 'ca', 'cy', 'da', 'de', 'en-gb', 'en', 'es-es', 'es', 'fr-fr', 'fr-on', 'fr', 'haw', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'th', 'tr', 'vi', 'zh-cn', 'zh-tw'];
export const supportedLocalesDetails = [
	{ id: 16, code: 'ar', source: 'ar-EG', pack: 'ar', dir: 'right-to-left', name: 'العربية (مصر)' },
	{ id: 38, code: 'ca', source: 'ca', pack: 'ca', dir: 'left-to-right', name: 'català ()' },
	{ id: 31, code: 'cy', source: 'cy', pack: 'cy', dir: 'left-to-right', name: 'Cymraeg ()' },
	{ id: 28, code: 'da', source: 'da', pack: 'da', dir: 'left-to-right', name: 'dansk ()' },
	{ id: 26, code: 'de', source: 'de', pack: 'de', dir: 'left-to-right', name: 'Deutsch ()' },
	{ id: 11, code: 'en-gb', source: 'en-GB', pack: 'en-gb', dir: 'left-to-right', name: 'English (United Kingdom)' },
	{ id: 1, code: 'en', source: 'en', pack: 'en', dir: 'left-to-right', name: 'English ()' },
	{ id: 30, code: 'es-es', source: 'es', pack: 'es-es', dir: 'left-to-right', name: 'español ()' },
	{ id: 18, code: 'es', source: 'es-MX', pack: 'es', dir: 'left-to-right', name: 'español (México)' },
	{ id: 29, code: 'fr-fr', source: 'fr', pack: 'fr-fr', dir: 'left-to-right', name: 'français ()' },
	{ id: 32, code: 'fr-on', source: 'fr-CA', pack: 'fr-on', dir: 'left-to-right', name: 'français (Canada)' },
	{ id: 2, code: 'fr', source: 'fr-CA', pack: 'fr', dir: 'left-to-right', name: 'français (Canada)' },
	{ id: 35, code: 'haw', source: 'haw', pack: 'haw', dir: 'left-to-right', name: 'ʻŌlelo Hawaiʻi ()' },
	{ id: 33, code: 'hi', source: 'hi', pack: 'hi', dir: 'left-to-right', name: 'हिन्दी ()' },
	{ id: 21, code: 'ja', source: 'ja', pack: 'ja', dir: 'left-to-right', name: '日本語 ()' },
	{ id: 22, code: 'ko', source: 'ko', pack: 'ko', dir: 'left-to-right', name: '한국어 ()' },
	{ id: 34, code: 'mi', source: 'mi', pack: 'mi', dir: 'left-to-right', name: 'Māori ()' },
	{ id: 25, code: 'nl', source: 'nl', pack: 'nl', dir: 'left-to-right', name: 'Nederlands ()' },
	{ id: 19, code: 'pt', source: 'pt', pack: 'pt', dir: 'left-to-right', name: 'português ()' },
	{ id: 24, code: 'sv', source: 'sv', pack: 'sv', dir: 'left-to-right', name: 'svenska ()' },
	{ id: 37, code: 'th', source: 'th', pack: 'th', dir: 'left-to-right', name: 'ไทย ()' },
	{ id: 23, code: 'tr', source: 'tr', pack: 'tr', dir: 'left-to-right', name: 'Türkçe ()' },
	{ id: 36, code: 'vi', source: 'vi', pack: 'vi', dir: 'left-to-right', name: 'Tiếng Việt ()' },
	{ id: 17, code: 'zh-cn', source: 'zh-Hans', pack: 'zh-cn', dir: 'left-to-right', name: '中文 (简体)' },
	{ id: 20, code: 'zh-tw', source: 'zh-Hant', pack: 'zh-tw', dir: 'left-to-right', name: '中文 (繁體)' },
];
// end generated locale data

export const supportedLocales = supportedLocalesDetails.map(l => l.code);

export function resolveSupportedLocale(localeTags) {
	localeTags = [].concat(localeTags);

	const localeTag = localeTags.find(localeTag => {
		if (supportedLangpacks.includes(localeTag)) {
			return localeTag;
		}

		const lang = localeTag.split('-')[0];
		if (supportedBaseLocales.includes(lang)) {
			return lang;
		}
	});
	return localeTag || defaultLocale;
}
