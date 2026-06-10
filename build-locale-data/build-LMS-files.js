import { dirname, posix } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import {
	toInputDateFormat,
	unicodePatternToDotNetFormat,
	unicodePatternToDotNetFormatPassthroughYear,
} from './utils.js';
import cldr from 'cldr';
import { env } from 'node:process';
import { supportedLocalesDetails } from '../lib/locale-data/supported.js';

const { NEW_LOCALE } = env;
// Full file: URL for supported.js — used with a cache-busting query string
// to force a fresh import after buildIntlFiles has updated the file.
const PATH_SUPPORTED = new URL('../lib/locale-data/supported.js', import.meta.url).href;
const PATH_LMS = posix.join(dirname(import.meta.url), 'lms').replace(/file:(\/c:)?/i, '');
const PATH_LOCALE_XML = `${PATH_LMS}/LOCALE.xml`;
const PATH_LOCALE_CULTURE_XML = `${PATH_LMS}/LOCALE_CULTURE.xml`;
const PATH_LANG_LANGUAGES_XML = `${PATH_LMS}/LANG_LANGUAGES.xml`;
const PATH_LOCALE_ORGS_ENABLED_XML = `${PATH_LMS}/LOCALE_ORGS_ENABLED.xml`;
const PATH_ORG_LANGS_XML = `${PATH_LMS}/ORG_LANGS.xml`;
const PATH_INSTALL_OSLO_PS1 = `${PATH_LMS}/Install-Oslo.ps1`;

async function readExistingLocaleIdMap() {
	try {
		const xml = await readFile(PATH_LOCALE_XML, 'utf-8');
		const map = new Map();
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

function getLocaleData(data, localeDetails) {
	return data[localeDetails.pack] ?? data[localeDetails.code];
}

function isRtl(localeData) {
	return localeData?.layout?.orientation?.characterOrder === 'right-to-left';
}

// ---------------------------------------------------------------------------
// Row builders
// ---------------------------------------------------------------------------

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

function buildCultureRow(localeDetails, localeId, localeData) {
	const ns = localeData?.numberSymbols?.default ?? localeData?.numberSymbols?.latn ?? {};
	const decimal = ns.decimal ?? '.';
	const group = ns.group ?? ',';
	const percentSign = ns.percentSign ?? '%';
	const minusSign = ns.minusSign ?? '-';

	const nativeDigits = (localeData?.numberingSystem?.digits ?? Array.from({ length: 10 }, (_, i) => String(i))).join(',');

	const rtl = isRtl(localeData);
	const negativeNumberPattern = rtl ? 3 : 1;

	const percentPositivePattern = derivePercentPattern(localeData);

	const cultureCode = deriveCultureCode(localeDetails.code);

	const shortDate = localeData?.dateFormats?.short ?? '';
	const longDate = localeData?.dateFormats?.full ?? '';
	const standardDate = localeData?.dateFormats?.medium ?? '';
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
	if (NEW_LOCALE) {
		// buildIntlFiles has already run (build-files.js sequences them when
		// NEW_LOCALE is set). Re-import supported.js fresh by appending a
		// cache-busting query string — Node keys the module cache on the full
		// URL, so this bypasses the stale startup snapshot.
		const { supportedLocalesDetails: freshLocales } = await import(
			`${PATH_SUPPORTED}?t=${Date.now()}`
		);

		// Find the entry that buildIntlFiles just added.
		const existingCodes = new Set(supportedLocalesDetails.map(l => l.code));
		const newLocale = freshLocales.find(l => !existingCodes.has(l.code));
		if (!newLocale) return;

		// Assign the next available LocaleId from the existing LOCALE.xml.
		const existingLocaleIdMap = await readExistingLocaleIdMap();
		const newLocaleId = existingLocaleIdMap.size > 0
			? Math.max(...existingLocaleIdMap.values()) + 1
			: 1;

		const localeData = getLocaleData(data, newLocale);

		// Read all existing files in parallel.
		const [localeXml, cultureXml, langXml, orgsXml, orgLangsXml] = await Promise.all([
			readFile(PATH_LOCALE_XML, 'utf-8'),
			readFile(PATH_LOCALE_CULTURE_XML, 'utf-8'),
			readFile(PATH_LANG_LANGUAGES_XML, 'utf-8'),
			readFile(PATH_LOCALE_ORGS_ENABLED_XML, 'utf-8'),
			readFile(PATH_ORG_LANGS_XML, 'utf-8'),
		]);

		// Insert anchors: rows go just before </Rows> in most files;
		// in LANG_LANGUAGES they go before the hardcoded LanguageId=1000 row.
		const ROWS_CLOSE = '\t</Rows>';
		const LANG_ANCHOR = '\t\t<Row>\n\t\t\t<Field Name="LanguageId" Value="1000"';

		// Use replacer functions so that special $ characters in locale
		// display names or format strings are never misinterpreted.
		await Promise.all([
			writeFile(PATH_LOCALE_XML,
				localeXml.replace(ROWS_CLOSE, () =>
					`${buildLocaleRow(newLocale, newLocaleId, localeData)}\n${ROWS_CLOSE}`)),
			writeFile(PATH_LOCALE_CULTURE_XML,
				cultureXml.replace(ROWS_CLOSE, () =>
					`${buildCultureRow(newLocale, newLocaleId, localeData)}\n${ROWS_CLOSE}`)),
			writeFile(PATH_LANG_LANGUAGES_XML,
				langXml.replace(LANG_ANCHOR, () =>
					`${buildLangLanguagesRow(newLocale, localeData)}\n${LANG_ANCHOR}`)),
			writeFile(PATH_LOCALE_ORGS_ENABLED_XML,
				orgsXml.replace(ROWS_CLOSE, () =>
					`\t\t<Row>\n\t\t\t<Field Name="LocaleId" Value="${newLocaleId}" />\n\t\t\t<Field Name="OrgId" Value="0" />\n\t\t\t<Field Name="Enabled" Value="True" />\n\t\t</Row>\n${ROWS_CLOSE}`)),
			writeFile(PATH_ORG_LANGS_XML,
				orgLangsXml.replace(ROWS_CLOSE, () =>
					`\t\t<Row>\n\t\t\t<Field Name="OrgId" Value="6606" />\n\t\t\t<Field Name="LanguageId" Value="${newLocale.id}" />\n\t\t\t<Field Name="IsActive" Value="True" />\n\t\t\t<Field Name="IsEdited" Value="False" />\n\t\t</Row>\n${ROWS_CLOSE}`)),
			writeFile(PATH_INSTALL_OSLO_PS1, buildInstallOsloPowerShell(freshLocales)),
		]);

		return;
	}

	// ------------------------------------------------------------------
	// Full regeneration (no NEW_LOCALE).
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

	// Sorted by LocaleId for LOCALE.xml, LOCALE_CULTURE.xml, LOCALE_ORGS_ENABLED.xml
	const sortedByLocaleId = [...supportedLocalesDetails].sort(
		(a, b) => localeIdMap.get(a.id) - localeIdMap.get(b.id)
	);

	// Sorted by LanguageId (id) for LANG_LANGUAGES.xml and ORG_LANGS.xml
	const sortedByLanguageId = [...supportedLocalesDetails].sort((a, b) => a.id - b.id);

	await Promise.all([
		writeFile(PATH_LOCALE_XML, buildLocaleXml(sortedByLocaleId, localeIdMap, data)),
		writeFile(PATH_LOCALE_CULTURE_XML, buildLocaleCultureXml(sortedByLocaleId, localeIdMap, data)),
		writeFile(PATH_LANG_LANGUAGES_XML, buildLangLanguagesXml(sortedByLanguageId, data)),
		writeFile(PATH_LOCALE_ORGS_ENABLED_XML, buildLocaleOrgsEnabledXml(sortedByLocaleId, localeIdMap)),
		writeFile(PATH_ORG_LANGS_XML, buildOrgLangsXml(sortedByLanguageId)),
		writeFile(PATH_INSTALL_OSLO_PS1, buildInstallOsloPowerShell(supportedLocalesDetails)),
	]);
}
