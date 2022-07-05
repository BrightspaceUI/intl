import { getLanguage } from './common.js';

const nbsp = '\xa0';

/**
 * Returns a region-specific list separator for the current language.
 * @param { Boolean } nonBreaking Whether to replace spaces with non-breaking spaces.
 */
export function getSeparator({ nonBreaking } = {}) {
	const langTag = getLanguage();
	const space = nonBreaking ? nbsp : ' ';

	// In this function, most languages return the separator used by the Intl.ListFormat() API with options:
	//		{ style: 'short', type: 'conjunction' }
	// 		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat
	// Arabic, due to some inconsistencies, returns the separator used by Google Translate.

	if (langTag === 'ar') return `${space}،${space}`;
	if (['ja', 'zh-cn', 'zh-tw'].includes(langTag)) return '、';
	return `,${space}`;
}
