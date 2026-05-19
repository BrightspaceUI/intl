import { readdirSync, readFileSync } from 'fs';
import { createRequire } from 'module';
import { resolve } from 'path';

const _require = createRequire(import.meta.url);
const cldrMainPath = resolve(_require.resolve('cldr'), '../../3rdparty/cldr/common/main');
const cldrSupplementalPath = resolve(_require.resolve('cldr'), '../../3rdparty/cldr/common/supplemental');
const overridesPath = new URL('./locale-data-overrides', import.meta.url).pathname;

/** @type {string[] | null} */
let _availableLocales = null;

/**
 * Returns the list of available CLDR locales, derived from the filenames in
 * the cldr/common/main directory, normalised to BCP 47 (hyphens, no .xml).
 * Sorted shortest-first so bare language tags (e.g. 'fr') are matched before
 * regional variants (e.g. 'fr-CA') during the available-locale scan.
 *
 * @returns {string[]}
 */
function getAvailableLocales() {
	if (_availableLocales) return _availableLocales;
	_availableLocales = readdirSync(cldrMainPath)
		.filter(f => f.endsWith('.xml'))
		.map(f => f.slice(0, -4).replaceAll('_', '-'))
		.sort((a, b) => a.length - b.length);
	return _availableLocales;
}

/** @type {{ fromTo: Map<string, string>, toFrom: Map<string, string> } | null} */
let _likelySubtags = null;

/**
 * Lazily loads and parses the CLDR likelySubtags XML, building:
 *   - fromTo: shorter tag → fully-expanded tag (e.g. 'fr' → 'fr-Latn-FR')
 *   - toFrom: fully-expanded tag → shorter tag (e.g. 'fr-Latn-FR' → 'fr')
 *   - expand: maximises any tag, synthesising missing subtags from the
 *             language's base expansion when the tag isn't in fromTo directly
 *
 * For toFrom, first-entry wins: CLDR lists more-specific "from" tags before
 * catch-all entries like "und", so the first mapping for a given "to" is best.
 *
 * @returns {{ fromTo: Map<string, string>, toFrom: Map<string, string>, expand: (tag: string) => string | null }}
 */
export function getLikelySubtagsMaps() {
	if (_likelySubtags) return _likelySubtags;

	const xml = readFileSync(resolve(cldrSupplementalPath, 'likelySubtags.xml'), 'utf-8');

	const fromTo = new Map();
	const toFrom = new Map();
	for (const match of xml.matchAll(/<likelySubtag\s+from="([^"]+)"\s+to="([^"]+)"/g)) {
		const from = match[1].replaceAll('_', '-');
		const to = match[2].replaceAll('_', '-');
		fromTo.set(from, to);
		if (!toFrom.has(to)) toFrom.set(to, from);
	}

	/**
	 * Maximises a locale tag. If it's directly in fromTo, returns that.
	 * Otherwise synthesises the maximised form by taking the language's base
	 * expansion and substituting in the tag's own script/region subtags.
	 * Returns null if the language has no known expansion.
	 *
	 * Script substitution is safe: the only available locales (main/ files) not
	 * in fromTo and without an explicit script are lang-region tags like 'fr-CA'.
	 * While CLDR does have alternate-script entries for some of those regions
	 * (e.g. 'en-Shaw-GB'), those entries always carry an explicit script subtag
	 * in their key, so they are never synthesised — they hit the direct
	 * fromTo.has() branch instead.
	 *
	 * @param {string} tag - A BCP 47 locale tag, already hyphen-normalised.
	 * @returns {string | null}
	 */
	const expand = (tag) => {
		if (fromTo.has(tag)) return fromTo.get(tag);
		const parts = tag.split('-');
		const lang = parts[0];
		const hasScript = parts[1]?.length === 4;
		const script = hasScript ? parts[1] : undefined;
		const region = hasScript ? parts[2] : parts[1];
		const base = fromTo.get(lang);
		if (!base) return null;
		const [baseLang, baseScript, baseRegion] = base.split('-');
		return [baseLang, script ?? baseScript, region ?? baseRegion].filter(Boolean).join('-');
	};

	_likelySubtags = { fromTo, toFrom, expand };
	return _likelySubtags;
}

/**
 * Given a locale tag, returns the shortest known CLDR available locale tag
 * that maximises to the same fully-expanded form, or `null` if none is found.
 *
 * For example:
 *   getLikelySubtagSource('fr-Latn-CA') // → 'fr-CA'
 *   getLikelySubtagSource('zh-CN')      // → 'zh'
 *   getLikelySubtagSource('en-Latn-US') // → 'en'
 *
 * @param {string} locale - A BCP 47 locale tag.
 * @returns {string | null} The shortest matching available locale, or `null`.
 */
export function getLikelySubtagSource(locale) {
	const { toFrom, expand } = getLikelySubtagsMaps();
	const expanded = expand(locale.replaceAll('_', '-'));
	if (!expanded) return null;

	// Walk available locales shortest-first; the first one whose maximised form
	// matches is the shortest available tag for this maximised form.
	for (const available of getAvailableLocales()) {
		if (expand(available) === expanded) return available;
	}

	// Safety net: fall back to the direct CLDR reverse map.
	return toFrom.get(expanded) ?? null;
}

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

	const regional = locale.replace('-', '_');
	const base = locale.split('-')[0];
	const candidates = regional !== base ? [regional, base] : [base];

	for (const candidate of candidates) {
		try {
			const override = await import(`${overridesPath}/${candidate}.js`);
			if (override.default?.shouldTitleCaseMonths) {
				return { ...result, ...override.default.shouldTitleCaseMonths };
			}
		} catch {
			// no override file
		}
	}

	// Check CLDR XML. Always include both the regional and base language files as
	// candidates, matching ICU4J's getWithFallback() resource bundle inheritance behaviour.
	// A regional file with no `<contextTransforms>` block, or one that has the block but
	// omits month entries entirely, is treated as "inherit from parent" — we `continue`
	// in both cases so the base locale's month rules are used as the fallback.

	for (const candidate of candidates) {
		const filePath = resolve(cldrMainPath, `${candidate}.xml`);
		let xml;
		try {
			xml = readFileSync(filePath, 'utf-8');
		} catch {
			continue;
		}

		if (!xml.includes('<contextTransforms>')) continue;

		const formatBlock = xml.match(
			/<contextTransformUsage\s+type="month-format-except-narrow">([\s\S]*?)<\/contextTransformUsage>/
		);
		const standaloneBlock = xml.match(
			/<contextTransformUsage\s+type="month-standalone-except-narrow">([\s\S]*?)<\/contextTransformUsage>/
		);

		if (!formatBlock && !standaloneBlock) continue;

		if (formatBlock) {
			result.formatStandAlone = formatBlock[1].includes('type="stand-alone"');
			result.formatUiListOrMenu = formatBlock[1].includes('type="uiListOrMenu"');
		}

		if (standaloneBlock) {
			result.standaloneStandAlone = standaloneBlock[1].includes('type="stand-alone"');
			result.standaloneUiListOrMenu = standaloneBlock[1].includes('type="uiListOrMenu"');
		}

		return result;
	}

	return result;
}

export function parseLocaleTag(tag) {
	const canonicalTag = Intl.getCanonicalLocales([tag])[0];
	let gc, languageTag, territoryTag, scriptTag;
	try {
		({ language: languageTag, region: territoryTag, script: scriptTag } = new Intl.Locale(canonicalTag));
	} catch {
		[gc, languageTag, scriptTag, territoryTag] =
			//                    [ language ]    [    script   ]      [territory]
			canonicalTag.match(/^([a-z]{2,3})(?:-([A-Z][a-z]{3}))?(?:-([A-Z]{2}))?/);
	}
	return { languageTag, territoryTag, scriptTag };
}

// Keyed by the full run of repeated CLDR pattern characters.
// Characters not listed here pass through unchanged.
const UNICODE_TO_DOTNET_MAP = {
	// Year: always normalise to 4-digit year
	'y': 'yyyy', 'yy': 'yyyy', 'yyy': 'yyyy', 'yyyy': 'yyyy',
	// Day-of-week
	'E': 'ddd', 'EE': 'ddd', 'EEE': 'ddd', 'EEEE': 'dddd',
	// AM/PM designator
	'a': 'tt',
	// Calendar era
	'G': 'g', 'GG': 'g', 'GGG': 'g',
	// Standalone month form (CLDR L → .NET M)
	'L': 'M', 'LL': 'MM', 'LLL': 'MMM', 'LLLL': 'MMMM',
	// Timezone
	'z': 'zzz', 'zz': 'zzz', 'zzz': 'zzz',
};

// Map for patterns where year tokens should NOT be converted to yyyy
// (e.g. ShortDateFormat and TimeFormat).
const UNICODE_TO_DOTNET_MAP_PASSTHROUGH_Y = {
	'E': 'ddd', 'EE': 'ddd', 'EEE': 'ddd', 'EEEE': 'dddd',
	'a': 'tt',
	'G': 'g', 'GG': 'g', 'GGG': 'g',
	'L': 'M', 'LL': 'MM', 'LLL': 'MMM', 'LLLL': 'MMMM',
	'z': 'zzz', 'zz': 'zzz', 'zzz': 'zzz',
};

// Match quoted literals (pass through) or runs of repeated pattern characters
const CLDR_PATTERN_REGEX = /'[^']*'|(.)\1*/g;

/**
 * Converts a CLDR Unicode date/time pattern to a .NET format string.
 * Year tokens (y, yy, etc.) are normalised to yyyy.
 *
 * @param {string} pattern - A CLDR date/time pattern string.
 * @returns {string}
 */
export function unicodePatternToDotNetFormat(pattern) {
	CLDR_PATTERN_REGEX.lastIndex = 0;
	return pattern.replace(CLDR_PATTERN_REGEX, (match, symbol) => {
		if (!symbol) return match;
		return UNICODE_TO_DOTNET_MAP[match] ?? match;
	});
}

/**
 * Like unicodePatternToDotNetFormat but year tokens are left unchanged.
 * Use for ShortDateFormat and TimeFormat where the raw CLDR pattern is
 * preserved as-is (e.g. "d/M/yy" stays "d/M/yy").
 *
 * @param {string} pattern - A CLDR date/time pattern string.
 * @returns {string}
 */
export function unicodePatternToDotNetFormatPassthroughYear(pattern) {
	CLDR_PATTERN_REGEX.lastIndex = 0;
	return pattern.replace(CLDR_PATTERN_REGEX, (match, symbol) => {
		if (!symbol) return match;
		return UNICODE_TO_DOTNET_MAP_PASSTHROUGH_Y[match] ?? match;
	});
}

/**
 * Derives the InputDateFormat from a CLDR short date pattern:
 * applies the full conversion (y→yyyy, etc.) then pads single M→MM
 * and single d→dd so the result always uses zero-padded month/day.
 *
 * @param {string} shortPattern - A CLDR short date pattern.
 * @returns {string}
 */
export function toInputDateFormat(shortPattern) {
	let result = unicodePatternToDotNetFormat(shortPattern);
	// Pad single M (not already part of MM / MMM / MMMM)
	result = result.replace(/(?<!M)M(?!M)/g, 'MM');
	// Pad single d (not already part of dd / ddd / dddd)
	result = result.replace(/(?<!d)d(?!d)/g, 'dd');
	return result;
}
