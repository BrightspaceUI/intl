import { dirname, posix } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import {
	toInputDateFormat,
	unicodePatternToDotNetFormat,
	unicodePatternToDotNetFormatPassthroughYear,
} from './utils.js';
import cldr from 'cldr';
import { supportedLocalesDetails } from '../lib/locale-data/supported.js';
const PATH_LMS = posix.join(dirname(import.meta.url), 'lms').replace(/file:(\/c:)?/i, '');
const PATH_LOCALE_XML = `${PATH_LMS}/LOCALE.xml`;
const PATH_LOCALE_CULTURE_XML = `${PATH_LMS}/LOCALE_CULTURE.xml`;
const PATH_LANG_LANGUAGES_XML = `${PATH_LMS}/LANG_LANGUAGES.xml`;
const PATH_LOCALE_ORGS_ENABLED_XML = `${PATH_LMS}/LOCALE_ORGS_ENABLED.xml`;
const PATH_ORG_LANGS_XML = `${PATH_LMS}/ORG_LANGS.xml`;
const PATH_INSTALL_OSLO_PS1 = `${PATH_LMS}/Install-Oslo.ps1`;

/**
 * Parses the existing LOCALE.xml to return a Map of LanguageId → LocaleId.
 * This preserves the existing LocaleId assignments across regenerations.
 *
 * @returns {Promise<Map<number, number>>}
 */
async function readExistingLocaleIdMap() {
	try {
		const xml = await readFile(PATH_LOCALE_XML, 'utf-8');
		const map = new Map();
		// Each <Row> block may have LocaleId and LanguageId in any order, so we
		// extract all rows first then parse the two field values from each block.
		for (const rowMatch of xml.matchAll(/<Row>([\s\S]*?)<\/Row>/g)) {
			const block = rowMatch[1];
			const localeIdMatch = block.match(/<Field Name="LocaleId" Value="(\d+)"/);
			const languageIdMatch = block.match(/<Field Name="LanguageId" Value="(\d+)"/);
			if (localeIdMatch && languageIdMatch) {
				map.set(parseInt(languageIdMatch[1]), parseInt(localeIdMatch[1]));
			}
		}
		return map;
	} catch {
		return new Map();
	}
}

/**
 * Returns the locale data object for the given locale details entry.
 * The data object is keyed by `pack` if present, otherwise by `code`.
 *
 * @param {Record<string, object>} data - Result of generateLocaleData().
 * @param {{ code: string, pack?: string }} localeDetails
 * @returns {object | undefined}
 */
function getLocaleData(data, localeDetails) {
	return data[localeDetails.pack] ?? data[localeDetails.code];
}

/**
 * Returns true if the given locale data indicates a right-to-left script.
 *
 * @param {object | undefined} localeData
 * @returns {boolean}
 */
function isRtl(localeData) {
	return localeData?.layout?.orientation?.characterOrder === 'right-to-left';
}

// ---------------------------------------------------------------------------
// Row builders
// ---------------------------------------------------------------------------

/**
 * Builds a single <Row> element for LOCALE.xml.
 *
 * @param {{ id: number, name: string }} localeDetails
 * @param {number} localeId
 * @param {object | undefined} localeData
 * @returns {string}
 */
function buildLocaleRow(localeDetails, localeId, localeData) {
	const name = localeDetails.name || localeData?.localeDisplayName;
	const rtl = isRtl(localeData);
	const imageSetId = rtl ? 15 : 0;
	const textDirection = rtl ? 2 : 1;

	return `\t\t<Row>
\t\t\t<Field Name="LocaleId" Value="${localeId}"/>
\t\t\t<Field Name="LocaleName" Value="${name}" />
\t\t\t<Field Name="CultureId" Value="${localeId}"/>
\t\t\t<Field Name="LanguageId" Value="${localeDetails.id}"/>
\t\t\t<Field Name="ImageSetId" Value="${imageSetId}"/>
\t\t\t<Field Name="TextDirection" Value="${textDirection}"/>
\t\t</Row>`;
}

/**
 * Builds a single <Row> element for LOCALE_CULTURE.xml.
 *
 * @param {{ id: number, code: string, pack?: string, dir: string }} localeDetails
 * @param {number} localeId
 * @param {object | undefined} localeData
 * @returns {string}
 */
function buildCultureRow(localeDetails, localeId, localeData) {
	// Number symbols: prefer the default numbering system's symbols; fall back
	// to 'latn' if default is not present under a different key.
	const ns = localeData?.numberSymbols?.default ?? localeData?.numberSymbols?.latn ?? {};
	const decimal = ns.decimal ?? '.';
	const group = ns.group ?? ',';
	const percentSign = ns.percentSign ?? '%';
	const minusSign = ns.minusSign ?? '-';

	// Native digits from the default numbering system, comma-separated.
	const nativeDigits = (localeData?.numberingSystem?.digits ?? Array.from({ length: 10 }, (_, i) => String(i))).join(',');

	const rtl = isRtl(localeData);
	const negativeNumberPattern = rtl ? 3 : 1;

	// Percent pattern: 1 if the CLDR pattern uses " %" (narrow-space + %), else 0.
	const percentPositivePattern = derivePercentPattern(localeData);

	// CultureCode: canonical BCP 47 (e.g. 'ca-ES', 'en-US').
	// For well-known overrides that LMS expects in lowercase keep them lower.
	const cultureCode = deriveCultureCode(localeDetails.code);

	// Date / time formats from CLDR data.
	const shortDate = localeData?.dateFormats?.short ?? '';
	const longDate = localeData?.dateFormats?.full ?? '';
	const standardDate = localeData?.dateFormats?.long ?? '';
	const timeShort = localeData?.timeFormats?.short ?? '';
	const yMMMM = localeData?.dateFormatItems?.yMMMM ?? '';
	const MMMMd = localeData?.dateFormatItems?.MMMMd ?? '';
	const MMMd = localeData?.dateFormatItems?.MMMd ?? '';

	// ShortDateFormat preserves the CLDR yy notation (no y→yyyy conversion).
	const shortDateFormat = unicodePatternToDotNetFormatPassthroughYear(shortDate);
	// InputDateFormat pads single d/M to dd/MM and converts y→yyyy.
	const inputDateFormat = toInputDateFormat(shortDate);
	// StandardDateFormat and LongDateFormat use the full y→yyyy conversion.
	const standardDateFormat = unicodePatternToDotNetFormat(standardDate);
	const longDateFormat = unicodePatternToDotNetFormat(longDate);
	// TimeFormat: preserve hour/minute padding as-is (no y→yyyy needed).
	const timeFormat = unicodePatternToDotNetFormatPassthroughYear(timeShort);
	const yearAndMonth = unicodePatternToDotNetFormat(yMMMM);
	const monthAndDay = unicodePatternToDotNetFormat(MMMMd);
	const shortMonthAndDay = unicodePatternToDotNetFormat(MMMd);

	const weekData = localeData?.weekData ?? {};
	const firstDayOfWeek = weekData.firstDay ?? 0;
	const weekendStartDay = weekData.weekendStart ?? 6;
	const weekendEndDay = weekData.weekendEnd ?? 0;

	return `\t\t<Row>
\t\t\t<Field Name="CultureId" Value="${localeId}"/>
\t\t\t<Field Name="CultureCode" Value="${cultureCode}"/>
\t\t\t<Field Name="NativeDigits" Value="${nativeDigits}"/>
\t\t\t<Field Name="NegativeNumberPattern" Value="${negativeNumberPattern}"/>
\t\t\t<Field Name="NegativeSign" Value="${minusSign}"/>
\t\t\t<Field Name="GroupSizes" Value="3"/>
\t\t\t<Field Name="GroupSeparator" Value="${group}"/>
\t\t\t<Field Name="DecimalSeparator" Value="${decimal}"/>
\t\t\t<Field Name="PercentSymbol" Value="${percentSign}"/>
\t\t\t<Field Name="PercentPositivePattern" Value="${percentPositivePattern}"/>
\t\t\t<Field Name="PercentNegativePattern" Value="${percentPositivePattern}"/>
\t\t\t<Field Name="InputDateFormat" Value="${inputDateFormat}"/>
\t\t\t<Field Name="ShortDateFormat" Value="${shortDateFormat}"/>
\t\t\t<Field Name="StandardDateFormat" Value="${standardDateFormat}"/>
\t\t\t<Field Name="LongDateFormat" Value="${longDateFormat}"/>
\t\t\t<Field Name="TimeFormat" Value="${timeFormat}"/>
\t\t\t<Field Name="YearAndMonth" Value="${yearAndMonth}"/>
\t\t\t<Field Name="MonthAndDay" Value="${monthAndDay}"/>
\t\t\t<Field Name="DurationFormat" Value="{hhh}:{mm}:{ss}"/>
\t\t\t<Field Name="FirstDayOfWeek" Value="${firstDayOfWeek}"/>
\t\t\t<Field Name="WeekendStartDay" Value="${weekendStartDay}"/>
\t\t\t<Field Name="WeekendEndDay" Value="${weekendEndDay}"/>
\t\t\t<Field Name="ShortMonthAndDay" Value="${shortMonthAndDay}"/>
\t\t</Row>`;
}

/**
 * Builds a single <Row> element for LANG_LANGUAGES.xml.
 *
 * @param {{ id: number, code: string, name: string }} localeDetails
 * @param {object | undefined} localeData
 * @returns {string}
 */
function buildLangLanguagesRow(localeDetails, localeData) {
	const name = localeDetails.name || localeData?.localeDisplayName;
	return `\t\t<Row>
\t\t\t<Field Name="LanguageId" Value="${localeDetails.id}" />
\t\t\t<Field Name="Name" Value="${name}" />
\t\t\t<Field Name="IsDeleted" Value="False" />
\t\t\t<Field Name="ParentLanguageId" IsNull="true" />
\t\t\t<Field Name="LanguageTypeId" Value="1" />
\t\t\t<Field Name="CultureClass" Value="${localeDetails.code}" />
\t\t\t<Field Name="OwnerOrgId" IsNull="true" />
\t\t</Row>`;
}

// ---------------------------------------------------------------------------
// Helper utilities
// ---------------------------------------------------------------------------

/**
 * Returns the canonical BCP 47 code for the given lowercase locale code,
 * falling back to the input unchanged on any error.
 *
 * @param {string} code - Lowercase locale code, e.g. 'ca-es'.
 * @returns {string} e.g. 'ca-ES'
 */
function deriveCultureCode(code) {
	try {
		return Intl.getCanonicalLocales([code])[0];
	} catch {
		return code;
	}
}

/**
 * Derives the PercentPositivePattern (and PercentNegativePattern) value from
 * the CLDR number data stored in localeData.
 *
 * Returns 1 if the percent format places the symbol after a space (e.g. "# %"),
 * otherwise returns 0.
 *
 * @param {object | undefined} localeData
 * @returns {number}
 */
/**
 * Cached map of locale-code → percent pattern (0 or 1).
 * 1 = space before % symbol (e.g. "#,##0 %"), 0 = no space ("#,##0%").
 * @type {Map<string, number>}
 */
const _percentPatternCache = new Map();

function derivePercentPattern(localeData) {
	// Resolve the CLDR locale key: prefer the localeCode stored in localeData,
	// then fall back to the source locale.
	const cacheKey = localeData?.localeCode ?? localeData?.sourceLocale ?? '';
	if (_percentPatternCache.has(cacheKey)) return _percentPatternCache.get(cacheKey);

	let pattern = 0;
	try {
		// Try the locale code first, then the base language.
		const candidates = [cacheKey, cacheKey.split('-')[0]].filter(Boolean);
		for (const candidate of candidates) {
			const nf = cldr.extractNumberFormats(candidate, 'latn');
			const pct = nf?.percent?.default;
			if (pct) {
				// Pattern 1 if the format string contains a space (regular or narrow no-break)
				// immediately before the % sign, i.e. " %" anywhere in the pattern.
				pattern = /\s%/.test(pct) ? 1 : 0;
				break;
			}
		}
	} catch {
		// Silently fall back to 0 if CLDR data is unavailable.
	}
	_percentPatternCache.set(cacheKey, pattern);
	return pattern;
}

// ---------------------------------------------------------------------------
// Document builders
// ---------------------------------------------------------------------------

/**
 * Generates the LOCALE.xml content.
 *
 * @param {Array<object>} sortedLocales - Sorted by LocaleId ascending.
 * @param {Map<number, number>} localeIdMap - id (LanguageId) → LocaleId.
 * @param {Record<string, object>} data
 * @returns {string}
 */
function buildLocaleXml(sortedLocales, localeIdMap, data) {
	const rows = sortedLocales
		.map(locale => buildLocaleRow(locale, localeIdMap.get(locale.id), getLocaleData(data, locale)))
		.join('\n');

	return `<?xml version="1.0" encoding="utf-8" ?>
<Data Table="LOCALE" xmlns="http://schemas.desire2learn.com/xml/schemas/dbschema.xsd">
\t<Columns>
\t\t<Field Name="LocaleId" Type="System.Int64"/>
\t\t<Field Name="LocaleName" Type="System.String"/>
\t\t<Field Name="CultureId" Type="System.Int64"/>
\t\t<Field Name="LanguageId" Type="System.Int64" />
\t\t<Field Name="ImageSetId" Type="System.Int64" />
\t\t<Field Name="TextDirection" Type="System.Int32" />
\t</Columns>
\t<Rows>
${rows}
\t</Rows>
</Data>
`;
}

/**
 * Generates the LOCALE_CULTURE.xml content.
 *
 * @param {Array<object>} sortedLocales - Sorted by LocaleId ascending.
 * @param {Map<number, number>} localeIdMap - id (LanguageId) → LocaleId.
 * @param {Record<string, object>} data
 * @returns {string}
 */
function buildLocaleCultureXml(sortedLocales, localeIdMap, data) {
	const rows = sortedLocales
		.map(locale => buildCultureRow(locale, localeIdMap.get(locale.id), getLocaleData(data, locale)))
		.join('\n');

	return `<?xml version="1.0" encoding="utf-8" ?>
<Data Table="LOCALE_CULTURE" xmlns="http://schemas.desire2learn.com/xml/schemas/dbschema.xsd">
\t<Columns>
\t\t<Field Name="CultureId" Type="System.Int64"/>
\t\t<Field Name="CultureCode" Type="System.String"/>
\t\t<Field Name="NativeDigits" Type="System.String"/>
\t\t<Field Name="NegativeNumberPattern" Type="System.Int32"/>
\t\t<Field Name="NegativeSign" Type="System.String"/>
\t\t<Field Name="GroupSizes" Type="System.String"/>
\t\t<Field Name="GroupSeparator" Type="System.String"/>
\t\t<Field Name="DecimalSeparator" Type="System.String"/>
\t\t<Field Name="PercentSymbol" Type="System.String"/>
\t\t<Field Name="PercentPositivePattern" Type="System.Int32"/>
\t\t<Field Name="PercentNegativePattern" Type="System.Int32"/>
\t\t<Field Name="InputDateFormat" Type="System.String"/>
\t\t<Field Name="ShortDateFormat" Type="System.String"/>
\t\t<Field Name="StandardDateFormat" Type="System.String"/>
\t\t<Field Name="LongDateFormat" Type="System.String"/>
\t\t<Field Name="TimeFormat" Type="System.String"/>
\t\t<Field Name="YearAndMonth" Type="System.String"/>
\t\t<Field Name="MonthAndDay" Type="System.String"/>
\t\t<Field Name="DurationFormat" Type="System.String"/>
\t\t<Field Name="FirstDayOfWeek" Type="System.Int32"/>
\t\t<Field Name="WeekendStartDay" Type="System.Int32"/>
\t\t<Field Name="WeekendEndDay" Type="System.Int32"/>
\t\t<Field Name="ShortMonthAndDay" Type="System.String"/>
\t</Columns>
\t<Rows>
${rows}
\t</Rows>
</Data>
`;
}

/**
 * Generates the LANG_LANGUAGES.xml content.
 *
 * @param {Array<object>} sortedByLanguageId - Sorted by LanguageId (id) ascending.
 * @param {Record<string, object>} data
 * @returns {string}
 */
function buildLangLanguagesXml(sortedByLanguageId, data) {
	const rows = sortedByLanguageId
		.map(locale => buildLangLanguagesRow(locale, getLocaleData(data, locale)))
		.join('\n');

	return `<?xml version="1.0" encoding="utf-8"?>
<Data Table="LANG_LANGUAGES" xmlns="http://schemas.desire2learn.com/xml/schemas/dbschema.xsd">
\t<Columns>
\t\t<Field Name="LanguageId" Type="System.Int32" />
\t\t<Field Name="Name" Type="System.String" />
\t\t<Field Name="IsDeleted" Type="System.Boolean" />
\t\t<Field Name="LanguageTypeId" Type="System.Int32" />
\t\t<Field Name="ParentLanguageId" Type="System.Int32" />
\t\t<Field Name="CultureClass" Type="System.String" />
\t\t<Field Name="OwnerOrgId" Type="System.Int32" />
\t</Columns>
\t<Rows>
${rows}
\t\t<Row>
\t\t\t<Field Name="LanguageId" Value="1000" />
\t\t\t<Field Name="Name" Value="D2L Last Default" />
\t\t\t<Field Name="IsDeleted" Value="True" />
\t\t\t<Field Name="ParentLanguageId" Value="1" />
\t\t\t<Field Name="LanguageTypeId" Value="1" />
\t\t\t<Field Name="CultureClass" Value="en" />
\t\t\t<Field Name="OwnerOrgId" IsNull="true" />
\t\t</Row>
\t</Rows>
</Data>
`;
}

/**
 * Generates the LOCALE_ORGS_ENABLED.xml content.
 *
 * @param {Array<object>} sortedLocales - Sorted by LocaleId ascending.
 * @param {Map<number, number>} localeIdMap - id (LanguageId) → LocaleId.
 * @returns {string}
 */
function buildLocaleOrgsEnabledXml(sortedLocales, localeIdMap) {
	const rows = sortedLocales
		.map(locale => {
			const localeId = localeIdMap.get(locale.id);
			return `\t\t<Row>
\t\t\t<Field Name="LocaleId" Value="${localeId}" />
\t\t\t<Field Name="OrgId" Value="0" />
\t\t\t<Field Name="Enabled" Value="True" />
\t\t</Row>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="utf-8"?>
<Data Table="LOCALE_ORGS_ENABLED" xmlns="http://schemas.desire2learn.com/xml/schemas/dbschema.xsd">
\t<Columns>
\t\t<Field Name="LocaleId" Type="System.Int32" />
\t\t<Field Name="OrgId" Type="System.Int32" />
\t\t<Field Name="Enabled" Type="System.Boolean" />
\t</Columns>
\t<Rows>
${rows}
\t</Rows>
</Data>
`;
}

/**
 * Generates the ORG_LANGS.xml content.
 *
 * Rows are ordered as:
 *   1. OrgId=6606 / LanguageId=1  (hardcoded)
 *   2. OrgId=6606 / LanguageId=2  (hardcoded)
 *   3. OrgId=0    / LanguageId=1  (hardcoded)
 *   4. All remaining locales sorted by LanguageId (id), each with OrgId=6606.
 *
 * @param {Array<object>} sortedByLanguageId - All locales sorted by id ascending.
 * @returns {string}
 */
function buildOrgLangsXml(sortedByLanguageId) {
	const hardcoded = `\t\t<Row>
\t\t\t<Field Name="OrgId" Value="6606" />
\t\t\t<Field Name="LanguageId" Value="1" />
\t\t\t<Field Name="IsActive" Value="True" />
\t\t\t<Field Name="IsEdited" Value="False" />
\t\t</Row>
\t\t<Row>
\t\t\t<Field Name="OrgId" Value="6606" />
\t\t\t<Field Name="LanguageId" Value="2" />
\t\t\t<Field Name="IsActive" Value="True" />
\t\t\t<Field Name="IsEdited" Value="False" />
\t\t</Row>
\t\t<Row>
\t\t\t<Field Name="OrgId" Value="0" />
\t\t\t<Field Name="LanguageId" Value="1" />
\t\t\t<Field Name="IsActive" Value="True" />
\t\t\t<Field Name="IsEdited" Value="False" />
\t\t</Row>`;

	const dynamicRows = sortedByLanguageId
		.filter(l => l.id !== 1 && l.id !== 2)
		.map(locale => `\t\t<Row>
\t\t\t<Field Name="OrgId" Value="6606" />
\t\t\t<Field Name="LanguageId" Value="${locale.id}" />
\t\t\t<Field Name="IsActive" Value="True" />
\t\t\t<Field Name="IsEdited" Value="False" />
\t\t</Row>`)
		.join('\n');

	return `<?xml version="1.0" encoding="utf-8"?>
<Data Table="ORG_LANGS" xmlns="http://schemas.desire2learn.com/xml/schemas/dbschema.xsd">
\t<Columns>
\t\t<Field Name="OrgId" Type="System.Int32" />
\t\t<Field Name="LanguageId" Type="System.Int32" />
\t\t<Field Name="IsActive" Type="System.Boolean" />
\t\t<Field Name="IsEdited" Type="System.Boolean" />
\t</Columns>
\t<Rows>
${hardcoded}
${dynamicRows}
\t</Rows>
</Data>
`;
}

/**
 * Generates the Install-Oslo.ps1 $locales array line.
 * All locale codes sorted alphabetically, excluding en-us.
 *
 * @param {Array<object>} allLocales
 * @returns {string}
 */
function buildInstallOsloPowerShell(allLocales) {
	const codes = allLocales
		.map(l => l.code)
		.filter(c => c !== 'en-us')
		.sort();
	const localesStr = codes.map(c => `"${c}"`).join(', ');
	return `param(
    [string]$TempDir = "."
)
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$locales = @(${localesStr})
`;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Generates all LMS locale XML files and supporting scripts from CLDR data.
 *
 * When the NEW_LOCALE environment variable is set, the existing LOCALE.xml is
 * read to preserve the current LocaleId assignments; the new locale is
 * assigned maxExistingLocaleId + 1.
 *
 * When NEW_LOCALE is not set (full regeneration), all files are rebuilt from
 * scratch using the LocaleId assignments already stored in LOCALE.xml.
 *
 * Output files written to build-locale-data/lms/:
 *   - LOCALE.xml
 *   - LOCALE_CULTURE.xml
 *   - LANG_LANGUAGES.xml
 *   - LOCALE_ORGS_ENABLED.xml
 *   - ORG_LANGS.xml
 *   - Install-Oslo.ps1
 *
 * @param {Record<string, object>} data - Result of generateLocaleData().
 */
export async function buildLMSFiles(data) {
	// ------------------------------------------------------------------
	// Build the LocaleId map.
	// LocaleId is a separate sequence from the `id` (LanguageId) in
	// supported.js. The source of truth is the existing LOCALE.xml.
	// New locales not yet present there are assigned maxLocaleId + 1.
	// ------------------------------------------------------------------
	const existingLocaleIdMap = await readExistingLocaleIdMap(); // LanguageId → LocaleId
	const maxExistingLocaleId = existingLocaleIdMap.size > 0
		? Math.max(...existingLocaleIdMap.values())
		: 0;

	const localeIdMap = new Map(); // id (LanguageId) → LocaleId
	let nextLocaleId = maxExistingLocaleId + 1;

	for (const locale of supportedLocalesDetails) {
		if (existingLocaleIdMap.has(locale.id)) {
			localeIdMap.set(locale.id, existingLocaleIdMap.get(locale.id));
		} else {
			localeIdMap.set(locale.id, nextLocaleId++);
		}
	}

	// ------------------------------------------------------------------
	// Sorted views
	// ------------------------------------------------------------------

	// Sorted by LocaleId for LOCALE.xml, LOCALE_CULTURE.xml, LOCALE_ORGS_ENABLED.xml
	const sortedByLocaleId = [...supportedLocalesDetails].sort(
		(a, b) => localeIdMap.get(a.id) - localeIdMap.get(b.id)
	);

	// Sorted by LanguageId (id) for LANG_LANGUAGES.xml and ORG_LANGS.xml
	const sortedByLanguageId = [...supportedLocalesDetails].sort((a, b) => a.id - b.id);

	// ------------------------------------------------------------------
	// Generate and write all files in parallel
	// ------------------------------------------------------------------
	await Promise.all([
		writeFile(PATH_LOCALE_XML, buildLocaleXml(sortedByLocaleId, localeIdMap, data)),
		writeFile(PATH_LOCALE_CULTURE_XML, buildLocaleCultureXml(sortedByLocaleId, localeIdMap, data)),
		writeFile(PATH_LANG_LANGUAGES_XML, buildLangLanguagesXml(sortedByLanguageId, data)),
		writeFile(PATH_LOCALE_ORGS_ENABLED_XML, buildLocaleOrgsEnabledXml(sortedByLocaleId, localeIdMap)),
		writeFile(PATH_ORG_LANGS_XML, buildOrgLangsXml(sortedByLanguageId)),
		writeFile(PATH_INSTALL_OSLO_PS1, buildInstallOsloPowerShell(supportedLocalesDetails)),
	]);
}
