import { Localize } from './localize.js';

const characterMap = new Map([
	['\'', 'apostrophe'],
	['&', 'ampersand'],
	['*', 'asterisk'],
	['\\', 'backslash'],
	[':', 'colon'],
	[',', 'comma'],
	['>', 'greaterThan'],
	['<', 'lessThan'],
	['#', 'numberSign'],
	['%', 'percentSign'],
	['|', 'pipe'],
	['?', 'questionMark'],
	['"', 'quotationMark']
]);

const commonResources = new Map();
export let commonResourcesImportCount = 0;

export class LocalizeCommon extends Localize {

	constructor() {
		super({
			importFunc: async lang => {
				if (commonResources.has(lang)) return commonResources.get(lang);
				const resources = (await import(`../lang/${lang}.js`)).default;
				commonResourcesImportCount++;
				commonResources.set(lang, resources);
				return resources;
			}
		});
	}

	localizeCharacter(char) {
		if (!characterMap.has(char)) {
			throw new Error(`localizeCharacter() does not support character: "${char}"`);
		}
		const value = this.localize(`intl-common:characters:${characterMap.get(char)}`);
		return value;
	}

}
