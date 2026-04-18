import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const _require = createRequire(import.meta.url);
const cldrMainPath = resolve(_require.resolve('cldr'), '../../3rdparty/cldr/common/main');
const overridesPath = new URL('./locale-data-overrides', import.meta.url).pathname;

/**
 * Returns an object indicating whether CLDR context transform data specifies
 * that month names should be title-cased, for each combination of:
 *   - grammatical form: "format" (used within a date) vs "standalone" (used alone)
 *   - display context: "standAlone" (plain text isolation) vs "uiListOrMenu" (e.g. <select>)
 *
 * Checks src/locale-data-overrides/<locale>.js before falling back to CLDR XML.
 *
 * @param {string} locale - BCP 47 locale tag (e.g. 'es', 'cs', 'fr-CA')
 * @returns {{ formatStandAlone: boolean, formatUiListOrMenu: boolean, standaloneStandAlone: boolean, standaloneUiListOrMenu: boolean }}
 */
export async function shouldTitleCaseMonths(locale) {
	const result = {
		formatStandAlone: false,
		formatUiListOrMenu: false,
		standaloneStandAlone: false,
		standaloneUiListOrMenu: false,
	};

	const candidates = [
		locale.replace('-', '_'),
		locale.split('-')[0],
	];

	for (const candidate of candidates) {
		try {
			const override = await import(`${overridesPath}/${candidate}.js`);
			if (override.default?.shouldTitleCaseMonths) {
				return { ...result, ...override.default.shouldTitleCaseMonths };
			}
		} catch {
			// no override file, continue to CLDR
		}
	}

	for (const candidate of candidates) {
		const filePath = resolve(cldrMainPath, `${candidate}.xml`);
		let xml;
		try {
			xml = readFileSync(filePath, 'utf-8');
		} catch {
			continue;
		}

		if (!xml.includes('<contextTransforms>')) return result;

		const formatBlock = xml.match(
			/<contextTransformUsage\s+type="month-format-except-narrow">([\s\S]*?)<\/contextTransformUsage>/
		);
		if (formatBlock) {
			result.formatStandAlone = formatBlock[1].includes('type="stand-alone"');
			result.formatUiListOrMenu = formatBlock[1].includes('type="uiListOrMenu"');
		}

		const standaloneBlock = xml.match(
			/<contextTransformUsage\s+type="month-standalone-except-narrow">([\s\S]*?)<\/contextTransformUsage>/
		);
		if (standaloneBlock) {
			result.standaloneStandAlone = standaloneBlock[1].includes('type="stand-alone"');
			result.standaloneUiListOrMenu = standaloneBlock[1].includes('type="uiListOrMenu"');
		}

		return result;
	}

	return result;
}

/**
 * Capitalizes the first letter of a month name if CLDR data indicates it should
 * be title-cased in a UI list or menu context for the given locale.
 *
 * @param {string} monthName - The month name to potentially capitalize
 * @param {string} locale - BCP 47 locale tag (e.g. 'es', 'cs', 'fr-CA')
 * @returns {string}
 */
export async function capitalizeMonthForUI(monthName, locale) {
	const titleCase = await shouldTitleCaseMonths(locale);
	if (!titleCase.standaloneUiListOrMenu) return monthName;
	return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}
