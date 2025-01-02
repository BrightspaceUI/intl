import './PluralRules.js';
import { defaultLocale as fallbackLang, getDocumentLocaleSettings, supportedLangpacks } from './common.js';
import { getLocalizeOverrideResources } from '../helpers/getLocalizeResources.js';
import IntlMessageFormat from 'intl-messageformat';

export const allowedTags = Object.freeze(['d2l-link', 'd2l-tooltip-help', 'p', 'br', 'b', 'strong', 'i', 'em', 'button']);

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

const getDisallowedTagsRegex = allowedTags => {
	const validTerminators = '([>\\s/]|$)';
	const allowedAfterTriangleBracket = `/?(${allowedTags.join('|')})?${validTerminators}`;
	return new RegExp(`<(?!${allowedAfterTriangleBracket})`);
};

export const disallowedTagsRegex = getDisallowedTagsRegex(allowedTags);
const noAllowedTagsRegex = getDisallowedTagsRegex([]);

/**
 * @template {new (...args: any[]) => {}} S
 * @param {S} superclass
 */
export const getLocalizeClass = (superclass = class {}) => class LocalizeClass extends superclass {

	static documentLocaleSettings = getDocumentLocaleSettings();
	static setLocalizeMarkup(localizeMarkup) {
		this.#localizeMarkup ??= localizeMarkup;
	}

	pristine = true;

	connect() {
		this.#localeChangeCallback = () => this.#localeChangeHandler();
		LocalizeClass.documentLocaleSettings.addChangeListener(this.#localeChangeCallback);
		this.#connected = true;
		this.#localeChangeCallback();
	}
	disconnect() {
		LocalizeClass.documentLocaleSettings.removeChangeListener(this.#localeChangeCallback);
		this.#connected = false;
	}
	localize(name, replacements) {

		const { language, value } = this.localize.resources?.[name] ?? {};
		if (!value) return '';

		let params = {};
		if (replacements?.constructor === Object) {
			// support for key-value replacements as a single arg
			params = replacements;
		} else {
			// legacy support for localize-behavior replacements as many args
			for (let i = 1; i < arguments.length; i += 2) {
				params[arguments[i]] = arguments[i + 1];
			}
		}

		const translatedMessage = new IntlMessageFormat(value, language);
		let formattedMessage = value;
		try {
			validateMarkup(formattedMessage, noAllowedTagsRegex);
			formattedMessage = translatedMessage.format(params);
		} catch (e) {
			if (e.name === 'MarkupError')	{
				e = new Error('localize() does not support rich text. For more information, see: https://github.com/BrightspaceUI/core/blob/main/mixins/localize/'); // eslint-disable-line no-ex-assign
				formattedMessage = '';
			}
			console.error(e);
		}

		return formattedMessage;
	}

	localizeCharacter(char) {
		if (!characterMap.has(char)) {
			throw new Error(`localizeCharacter() does not support character: "${char}"`);
		}
		const value = this.localize(`intl-common:characters:${characterMap.get(char)}`);
		if (value.length === 0) {
			throw new Error('localizeCharacter() cannot be used unless loadCommon in localizeConfig is enabled');
		}
		return value;
	}

	localizeHTML(name, replacements = {}) {

		const { language, value } = this.localize.resources?.[name] ?? {};
		if (!value) return '';

		const translatedMessage = new IntlMessageFormat(value, language);
		let formattedMessage = value;
		try {
			const unvalidated = translatedMessage.format({
				b: chunks => LocalizeClass.#localizeMarkup`<b>${chunks}</b>`,
				br: () => LocalizeClass.#localizeMarkup`<br>`,
				em: chunks => LocalizeClass.#localizeMarkup`<em>${chunks}</em>`,
				i: chunks => LocalizeClass.#localizeMarkup`<i>${chunks}</i>`,
				p: chunks => LocalizeClass.#localizeMarkup`<p>${chunks}</p>`,
				strong: chunks => LocalizeClass.#localizeMarkup`<strong>${chunks}</strong>`,
				...replacements
			});
			validateMarkup(unvalidated);
			formattedMessage = unvalidated;
		} catch (e) {
			if (e.name === 'MarkupError') formattedMessage = '';
			console.error(e);
		}

		return formattedMessage;
	}

	static #localizeMarkup;

	#connected = false;
	#localeChangeCallback;
	#resolveResourcesLoaded;
	#resourcesPromise;

	__resourcesLoadedPromise = new Promise(r => this.#resolveResourcesLoaded = r);
	static _generatePossibleLanguages(config) {

		if (config?.useBrowserLangs) return navigator.languages.map(e => e.toLowerCase()).concat('en');

		const { language, fallbackLanguage } = this.documentLocaleSettings;
		const langs = [ language, fallbackLanguage ]
			.filter(e => e)
			.map(e => [ e.toLowerCase(), e.split('-')[0] ])
			.flat();

		return Array.from(new Set([ ...langs, 'en-us', 'en' ]));
	}
	static _getAllLocalizeResources(config = this.localizeConfig) {
		const resourcesLoadedPromises = [];
		const superCtor = Object.getPrototypeOf(this);
		// get imported terms for each config, head up the chain to get them all
		if ('_getAllLocalizeResources' in superCtor) {
			const superConfig = Object.prototype.hasOwnProperty.call(superCtor, 'localizeConfig') && superCtor.localizeConfig.importFunc ? superCtor.localizeConfig : config;
			resourcesLoadedPromises.push(superCtor._getAllLocalizeResources(superConfig));
		}
		if (Object.prototype.hasOwnProperty.call(this, 'getLocalizeResources') || Object.prototype.hasOwnProperty.call(this, 'resources')) {
			const possibleLanguages = this._generatePossibleLanguages(config);
			const resourcesPromise = this.getLocalizeResources(possibleLanguages, config);
			resourcesLoadedPromises.push(resourcesPromise);
			if (config?.loadCommon) {
				resourcesLoadedPromises.push(this.getLocalizeResources(possibleLanguages, {
					importFunc: async(lang) => {
						if (commonResources.has(lang)) return commonResources.get(lang);
						const resources = (await import(`../lang/${lang}.js`)).default;
						commonResourcesImportCount++;
						commonResources.set(lang, resources);
						return resources;
					}
				}));
			}
		}
		return Promise.all(resourcesLoadedPromises);
	}
	static async _getLocalizeResources(langs, { importFunc, osloCollection, useBrowserLangs }) {

		if (importFunc === undefined) return;

		// in dev, don't request unsupported langpacks
		if (!importFunc.toString().includes('switch') && !useBrowserLangs) {
			langs = langs.filter(lang => supportedLangpacks.includes(lang));
		}

		for (const lang of [...langs, fallbackLang]) {

			const resources = await Promise.resolve(importFunc(lang)).catch(() => {});

			if (resources) {

				if (osloCollection) {
					return await getLocalizeOverrideResources(
						lang,
						resources,
						() => osloCollection
					);
				}

				return {
					language: lang,
					resources
				};
			}
		}
	}
	_hasResources() {
		if (this.constructor.localizeConfig) {
			return this.constructor.localizeConfig !== undefined ||
				this.constructor.localizeConfig.loadCommon === true;
		}
		return this.constructor.getLocalizeResources !== undefined;
	}

	async #localeChangeHandler() {
		if (!this._hasResources()) return;

		const resourcesPromise = this.constructor._getAllLocalizeResources(this.config);
		this.#resourcesPromise = resourcesPromise;
		const localizeResources = (await resourcesPromise)
			.flat(Infinity)
			.filter(e => e);
		// If the locale changed while resources were being fetched, abort
		if (this.#resourcesPromise !== resourcesPromise) return;

		const allResources = {};
		const resolvedLocales = new Set();

		for (const { language, resources } of localizeResources) {
			for (const [name, value] of Object.entries(resources)) {
				allResources[name] = { language, value };
				resolvedLocales.add(language);
			}
		}
		this.localize.resources = allResources;
		this.localize.resolvedLocale = [...resolvedLocales][0];
		if (resolvedLocales.size > 1) {
			console.warn(`Resolved multiple locales in '${this.constructor.name || this.tagName || ''}': ${[...resolvedLocales].join(', ')}`);
		}

		if (this.pristine) {
			this.pristine = false;
			this.#resolveResourcesLoaded();
		}

		this.#onResourcesChange();
	}

	#onResourcesChange() {
		if (this.#connected) {
			this.dispatchEvent?.(new CustomEvent('d2l-localize-resources-change'));
			this.config?.onResourcesChange?.();
			this.onLocalizeResourcesChange?.();
		}
	}

};

export const Localize = class extends getLocalizeClass() {

	static getLocalizeResources() {
		return super._getLocalizeResources(...arguments);
	}

	constructor(config) {
		super();
		super.constructor.setLocalizeMarkup(localizeMarkup);
		this.localize = (...args) => super.localize(...args);
		this.config = config;
		this.connect();
	}

	get ready() {
		return this.__resourcesLoadedPromise;
	}

	connect() {
		super.connect();
		return this.ready;
	}

};

class MarkupError extends Error {
	name = this.constructor.name;
}

export function validateMarkup(content, disallowedTagsRegex) {
	if (content) {
		if (content.forEach) {
			content.forEach(item => validateMarkup(item));
			return;
		}
		if (content._localizeMarkup) return;
		if (Object.hasOwn(content, '_$litType$')) throw new MarkupError('Rich-text replacements must use localizeMarkup templates. For more information, see: https://github.com/BrightspaceUI/core/blob/main/mixins/localize/');

		if (content.constructor === String && disallowedTagsRegex?.test(content)) throw new MarkupError(`Rich-text replacements may use only the following allowed elements: ${allowedTags}. For more information, see: https://github.com/BrightspaceUI/core/blob/main/mixins/localize/`);
	}
}

export function localizeMarkup(strings, ...expressions) {
	strings.forEach(str => validateMarkup(str, disallowedTagsRegex));
	expressions.forEach(exp => validateMarkup(exp, disallowedTagsRegex));
	return strings.reduce((acc, i, idx) => {
		return acc.push(i, expressions[idx] ?? '') && acc;
	}, []).join('');
}
