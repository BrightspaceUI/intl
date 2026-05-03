export const defaultLocale = 'en';
export const supportedBaseLocales = ['ar', 'ca', 'cy', 'da', 'de', 'en', 'es', 'fr', 'haw', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'th', 'tr', 'vi', 'zh'];
export const supportedLangpacks = ['ar', 'ca', 'cy', 'da', 'de', 'en-gb', 'en', 'es-es', 'es', 'fr-fr', 'fr-on', 'fr', 'haw', 'hi', 'ja', 'ko', 'mi', 'nl', 'pt', 'sv', 'th', 'tr', 'vi', 'zh-cn', 'zh-tw'];
export const supportedLocalesDetails = [
	{ id: 16, code: 'ar-sa', source: 'ar', pack: 'ar', dir: 'rtl', name: 'العربية' },
	{ id: 38, code: 'ca-es', source: 'ca', pack: 'ca', dir: 'ltr', name: 'català' },
	{ id: 31, code: 'cy-gb', source: 'cy', pack: 'cy', dir: 'ltr', name: 'Cymraeg' },
	{ id: 28, code: 'da-dk', source: 'da', pack: 'da', dir: 'ltr', name: 'dansk' },
	{ id: 26, code: 'de-de', source: 'de', pack: 'de', dir: 'ltr', name: 'Deutsch' },
	{ id: 11, code: 'en-gb', source: 'en-GB', pack: 'en-gb', dir: 'ltr', name: 'English (United Kingdom)' },
	{ id: 1, code: 'en-us', source: 'en', pack: 'en', dir: 'ltr', name: 'English' },
	{ id: 30, code: 'es-es', source: 'es', pack: 'es-es', dir: 'ltr', name: 'español' },
	{ id: 18, code: 'es-mx', source: 'es-MX', pack: 'es', dir: 'ltr', name: 'español (México)' },
	{ id: 29, code: 'fr-fr', source: 'fr', pack: 'fr-fr', dir: 'ltr', name: 'français' },
	{ id: 32, code: 'fr-on', source: 'fr-CA', pack: 'fr-on', dir: 'ltr', name: 'français (Canada, Ontario)' },
	{ id: 2, code: 'fr-ca', source: 'fr-CA', pack: 'fr', dir: 'ltr', name: 'français (Canada)' },
	{ id: 35, code: 'haw-us', source: 'haw', pack: 'haw', dir: 'ltr', name: 'ʻŌlelo Hawaiʻi' },
	{ id: 33, code: 'hi-in', source: 'hi', pack: 'hi', dir: 'ltr', name: 'हिन्दी' },
	{ id: 21, code: 'ja-jp', source: 'ja', pack: 'ja', dir: 'ltr', name: '日本語' },
	{ id: 22, code: 'ko-kr', source: 'ko', pack: 'ko', dir: 'ltr', name: '한국어' },
	{ id: 34, code: 'mi-nz', source: 'mi', pack: 'mi', dir: 'ltr', name: 'Māori' },
	{ id: 25, code: 'nl-nl', source: 'nl', pack: 'nl', dir: 'ltr', name: 'Nederlands' },
	{ id: 19, code: 'pt-br', source: 'pt', pack: 'pt', dir: 'ltr', name: 'português' },
	{ id: 24, code: 'sv-se', source: 'sv', pack: 'sv', dir: 'ltr', name: 'svenska' },
	{ id: 37, code: 'th-th', source: 'th', pack: 'th', dir: 'ltr', name: 'ไทย' },
	{ id: 23, code: 'tr-tr', source: 'tr', pack: 'tr', dir: 'ltr', name: 'Türkçe' },
	{ id: 36, code: 'vi-vn', source: 'vi', pack: 'vi', dir: 'ltr', name: 'Tiếng Việt' },
	{ id: 17, code: 'zh-cn', source: 'zh', pack: 'zh-cn', dir: 'ltr', name: '中文' },
	{ id: 20, code: 'zh-tw', source: 'zh-Hant', pack: 'zh-tw', dir: 'ltr', name: '中文 (繁體)' },
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
