/**
 * TimeZone Utilities
 *
 * This module provides utilities for working with IANA timeZone identifiers
 * and their corresponding region information using ES modules.
 *
 * Data is based on the IANA Time Zone Database (tzdata) and excludes
 * backward compatibility and etcetera entries.
 */

import { getDocumentLocaleSettings } from '../common.js';

export class TimeZoneMapper {
	constructor(modules) {
		this.mappings = new Map();
		this.loaded = false;
		this.modules = modules ? [].concat(modules).map(m => m.toLowerCase()) : [
			'africa',
			'america',
			'asia',
			'europe',
			'pacific',
			'australia',
			'antarctica',
			'atlantic',
			'indian'
		];
	}

	/**
   * Get all countries with their localized names
   * @param {string|string[]} locales - Locale(s) for display names
   * @returns {Array<{code: string, name: string}>} Array of region objects
   */
	getAllCountries(locales = 'en') {
		const regionCodes = this.getAllRegionCodes();
		const displayNames = new Intl.DisplayNames(locales, { type: 'region' });

		return regionCodes.map(code => ({
			code,
			name: displayNames.of(code)
		})).sort((a, b) => a.name.localeCompare(b.name, locales));
	}
	/**
   * Get all unique region codes
   * @returns {string[]} Sorted array of all region codes
   */
	getAllRegionCodes() {
		this._ensureLoaded();
		const regionCodes = new Set();

		for (const info of this.mappings.values()) {
			regionCodes.add(info.regionCode);
		}

		return Array.from(regionCodes).sort();
	}
	/**
   * Get all available timeZone identifiers
   * @returns {string[]} Sorted array of all timeZone identifiers
   */
	getAllTimeZones() {
		this._ensureLoaded();
		return Array.from(this.mappings.keys()).sort();
	}
	/**
   * Get IANA source file for a timeZone
   * @param {string} timeZoneId - IANA timeZone identifier
   * @returns {string|null} Source file name or null if not found
   */
	getIanaSource(timeZoneId) {
		this._ensureLoaded();
		const mapping = this.mappings.get(timeZoneId);
		return mapping ? mapping.ianaSource : null;
	}
	/**
   * Get region code for a timeZone
   * @param {string} timeZoneId - IANA timeZone identifier (e.g., "America/New_York")
   * @returns {string|null} ISO 3166-1 alpha-2 region code or null if not found
   */
	getRegionCode(timeZoneId) {
		this._ensureLoaded();
		const mapping = this.mappings.get(timeZoneId);
		return mapping ? mapping.regionCode : null;
	}
	/**
   * Get localized region name using Intl.DisplayNames
   * @param {string} timeZoneId - IANA timeZone identifier
   * @param {string|string[]} locales - Locale(s) for display names
   * @returns {string|null} Localized region name or null if not found
   */
	getRegionName(timeZoneId, locale = getDocumentLocaleSettings().language) {
		const regionCode = this.getRegionCode(timeZoneId);
		if (!regionCode) return null;

		try {
			const displayNames = new Intl.DisplayNames(locale, { type: 'region' });
			return displayNames.of(regionCode);
		} catch (error) {
			console.warn('Failed to get localized region name:', error);
			return null;
		}
	}

	/**
   * Get complete mapping information for a timeZone
   * @param {string} timeZoneId - IANA timeZone identifier
   * @returns {Object|null} Complete mapping object or null if not found
   */
	getTimeZoneInfo(timeZoneId) {
		this._ensureLoaded();
		return this.mappings.get(timeZoneId) || null;
	}
	/**
   * Group timeZones by region
   * @param {string|string[]} locales - Locale(s) for region names
   * @returns {Object} Object with region codes as keys and timeZone arrays as values
   */
	getTimeZonesByRegion(locales = 'en') {
		this._ensureLoaded();
		const result = {};

		for (const [timeZone, info] of this.mappings.entries()) {
			const regionCode = info.regionCode;
			if (!result[regionCode]) {
				result[regionCode] = {
					name: this.getRegionName(timeZone, locales),
					timeZones: []
				};
			}
			result[regionCode].timeZones.push(timeZone);
		}

		// Sort timeZones within each region
		for (const region of Object.values(result)) {
			region.timeZones.sort();
		}

		return result;
	}
	/**
   * Get all timeZones for a specific region
   * @param {string} regionCode - ISO 3166-1 alpha-2 region code
   * @returns {string[]} Array of timeZone identifiers
   */
	getTimeZonesForRegion(regionCode) {
		this._ensureLoaded();
		const timeZones = [];

		for (const [timeZone, info] of this.mappings.entries()) {
			if (info.regionCode === regionCode.toUpperCase()) {
				timeZones.push(timeZone);
			}
		}

		return timeZones.sort();
	}
	/**
   * Load timeZone mappings from a single combined object
   * @param {Object} timeZoneData - Combined timeZone data object
   */
	loadFromData(timeZoneData) {
		this.mappings.clear();
		for (const [timeZone, info] of Object.entries(timeZoneData)) {
			this.mappings.set(timeZone, info);
		}
		this.loaded = true;
	}

	/**
   * Load timeZone mappings from JavaScript modules
   * @param {string} basePath - Base path to the timeZone mappings directory
   * @returns {Promise<void>}
   */
	async loadMappings(basePath = './data/') {
		if (this.loaded) return;

		try {
			for (const moduleName of this.modules) {
				const module = await import(`${basePath}${moduleName}.js`);
				const timeZoneData = module.default || module[`${moduleName}TimeZones`];

				// Merge all timeZone data into the main mappings
				for (const [timeZone, info] of Object.entries(timeZoneData)) {
					this.mappings.set(timeZone, info);
				}
			}
			this.loaded = true;
		} catch (error) {
			console.error('Failed to load timeZone mappings:', error);
			throw error;
		}
	}

	/**
   * Search timeZones by partial name match
   * @param {string} query - Search query
   * @param {string|string[]} locales - Locale(s) for region name matching
   * @returns {string[]} Array of matching timeZone identifiers
   */
	searchTimeZones(query, locales = 'en') {
		this._ensureLoaded();
		const lowerQuery = query.toLowerCase();
		const results = [];

		for (const [timeZone] of this.mappings.entries()) {
			// Match timeZone identifier
			if (timeZone.toLowerCase().includes(lowerQuery)) {
				results.push(timeZone);
				continue;
			}

			// Match region name
			try {
				const regionName = this.getRegionName(timeZone, locales);
				if (regionName && regionName.toLowerCase().includes(lowerQuery)) {
					results.push(timeZone);
				}
			} catch {
				// Continue if region name lookup fails
			}
		}

		return results.sort();
	}

	/**
   * Check if mappings are loaded
   * @private
   */
	_ensureLoaded() {
		if (!this.loaded) {
			throw new Error('TimeZone mappings not loaded. Call loadMappings() first.');
		}
	}
}
