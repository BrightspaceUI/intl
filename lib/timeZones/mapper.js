/**
 * Timezone Utilities
 * 
 * This module provides utilities for working with IANA timezone identifiers
 * and their corresponding country information using ES modules.
 * 
 * Data is based on the IANA Time Zone Database (tzdata) and excludes
 * backward compatibility and etcetera entries.
 */

class TimezoneMapper {
  constructor() {
    this.mappings = new Map();
    this.loaded = false;
  }

  /**
   * Load timezone mappings from JavaScript modules
   * @param {string} basePath - Base path to the timezone mappings directory
   * @returns {Promise<void>}
   */
  async loadMappings(basePath = './') {
    if (this.loaded) return;

    const modules = [
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

    try {
      for (const moduleName of modules) {
        const module = await import(`${basePath}${moduleName}.js`);
        const timezoneData = module.default || module[`${moduleName}Timezones`];
        
        // Merge all timezone data into the main mappings
        for (const [timezone, info] of Object.entries(timezoneData)) {
          this.mappings.set(timezone, info);
        }
      }
      this.loaded = true;
    } catch (error) {
      console.error('Failed to load timezone mappings:', error);
      throw error;
    }
  }

  /**
   * Load timezone mappings from a single combined object
   * @param {Object} timezoneData - Combined timezone data object
   */
  loadFromData(timezoneData) {
    this.mappings.clear();
    for (const [timezone, info] of Object.entries(timezoneData)) {
      this.mappings.set(timezone, info);
    }
    this.loaded = true;
  }

  /**
   * Get country code for a timezone
   * @param {string} timezoneId - IANA timezone identifier (e.g., "America/New_York")
   * @returns {string|null} ISO 3166-1 alpha-2 country code or null if not found
   */
  getCountryCode(timezoneId) {
    this._ensureLoaded();
    const mapping = this.mappings.get(timezoneId);
    return mapping ? mapping.countryCode : null;
  }

  /**
   * Get localized country name using Intl.DisplayNames
   * @param {string} timezoneId - IANA timezone identifier
   * @param {string|string[]} locales - Locale(s) for display names
   * @returns {string|null} Localized country name or null if not found
   */
  getCountryName(timezoneId, locales = 'en') {
    const countryCode = this.getCountryCode(timezoneId);
    if (!countryCode) return null;

    try {
      const displayNames = new Intl.DisplayNames(locales, { type: 'region' });
      return displayNames.of(countryCode);
    } catch (error) {
      console.warn('Failed to get localized country name:', error);
      return null;
    }
  }

  /**
   * Get IANA source file for a timezone
   * @param {string} timezoneId - IANA timezone identifier
   * @returns {string|null} Source file name or null if not found
   */
  getIanaSource(timezoneId) {
    this._ensureLoaded();
    const mapping = this.mappings.get(timezoneId);
    return mapping ? mapping.ianaSource : null;
  }

  /**
   * Get complete mapping information for a timezone
   * @param {string} timezoneId - IANA timezone identifier
   * @returns {Object|null} Complete mapping object or null if not found
   */
  getTimezoneInfo(timezoneId) {
    this._ensureLoaded();
    return this.mappings.get(timezoneId) || null;
  }

  /**
   * Get all timezones for a specific country
   * @param {string} countryCode - ISO 3166-1 alpha-2 country code
   * @returns {string[]} Array of timezone identifiers
   */
  getTimezonesForCountry(countryCode) {
    this._ensureLoaded();
    const timezones = [];
    
    for (const [timezone, info] of this.mappings.entries()) {
      if (info.countryCode === countryCode.toUpperCase()) {
        timezones.push(timezone);
      }
    }
    
    return timezones.sort();
  }

  /**
   * Get all available timezone identifiers
   * @returns {string[]} Sorted array of all timezone identifiers
   */
  getAllTimezones() {
    this._ensureLoaded();
    return Array.from(this.mappings.keys()).sort();
  }

  /**
   * Get all unique country codes
   * @returns {string[]} Sorted array of all country codes
   */
  getAllCountryCodes() {
    this._ensureLoaded();
    const countryCodes = new Set();
    
    for (const info of this.mappings.values()) {
      countryCodes.add(info.countryCode);
    }
    
    return Array.from(countryCodes).sort();
  }

  /**
   * Get all countries with their localized names
   * @param {string|string[]} locales - Locale(s) for display names
   * @returns {Array<{code: string, name: string}>} Array of country objects
   */
  getAllCountries(locales = 'en') {
    const countryCodes = this.getAllCountryCodes();
    const displayNames = new Intl.DisplayNames(locales, { type: 'region' });
    
    return countryCodes.map(code => ({
      code,
      name: displayNames.of(code)
    })).sort((a, b) => a.name.localeCompare(b.name, locales));
  }

  /**
   * Search timezones by partial name match
   * @param {string} query - Search query
   * @param {string|string[]} locales - Locale(s) for country name matching
   * @returns {string[]} Array of matching timezone identifiers
   */
  searchTimezones(query, locales = 'en') {
    this._ensureLoaded();
    const lowerQuery = query.toLowerCase();
    const results = [];
    
    for (const [timezone, info] of this.mappings.entries()) {
      // Match timezone identifier
      if (timezone.toLowerCase().includes(lowerQuery)) {
        results.push(timezone);
        continue;
      }
      
      // Match country name
      try {
        const countryName = this.getCountryName(timezone, locales);
        if (countryName && countryName.toLowerCase().includes(lowerQuery)) {
          results.push(timezone);
        }
      } catch (error) {
        // Continue if country name lookup fails
      }
    }
    
    return results.sort();
  }

  /**
   * Group timezones by country
   * @param {string|string[]} locales - Locale(s) for country names
   * @returns {Object} Object with country codes as keys and timezone arrays as values
   */
  getTimezonesByCountry(locales = 'en') {
    this._ensureLoaded();
    const result = {};
    
    for (const [timezone, info] of this.mappings.entries()) {
      const countryCode = info.countryCode;
      if (!result[countryCode]) {
        result[countryCode] = {
          name: this.getCountryName(timezone, locales),
          timezones: []
        };
      }
      result[countryCode].timezones.push(timezone);
    }
    
    // Sort timezones within each country
    for (const country of Object.values(result)) {
      country.timezones.sort();
    }
    
    return result;
  }

  /**
   * Check if mappings are loaded
   * @private
   */
  _ensureLoaded() {
    if (!this.loaded) {
      throw new Error('Timezone mappings not loaded. Call loadMappings() first.');
    }
  }
}

/**
 * Utility functions for working with timezones
 */
const TimezoneUtils = {
  /**
   * Get user's current timezone identifier
   * @returns {string} IANA timezone identifier
   */
  getUserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  },

  /**
   * Get timezone offset in minutes for a specific timezone
   * @param {string} timezoneId - IANA timezone identifier
   * @param {Date} date - Date to check offset for (defaults to now)
   * @returns {number} Offset in minutes from UTC
   */
  getTimezoneOffset(timezoneId, date = new Date()) {
    const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const local = new Date(date.toLocaleString('en-US', { timeZone: timezoneId }));
    return (utc.getTime() - local.getTime()) / (1000 * 60);
  },

  /**
   * Check if a timezone is currently observing daylight saving time
   * @param {string} timezoneId - IANA timezone identifier
   * @param {Date} date - Date to check (defaults to now)
   * @returns {boolean} True if DST is active
   */
  isDaylightSavingTime(timezoneId, date = new Date()) {
    const january = new Date(date.getFullYear(), 0, 1);
    const july = new Date(date.getFullYear(), 6, 1);
    
    const janOffset = TimezoneUtils.getTimezoneOffset(timezoneId, january);
    const julOffset = TimezoneUtils.getTimezoneOffset(timezoneId, july);
    const currentOffset = TimezoneUtils.getTimezoneOffset(timezoneId, date);
    
    return currentOffset !== Math.max(janOffset, julOffset);
  },

  /**
   * Format a date for a specific timezone
   * @param {Date} date - Date to format
   * @param {string} timezoneId - IANA timezone identifier
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string} Formatted date string
   */
  formatDateForTimezone(date, timezoneId, options = {}) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezoneId,
      ...options
    }).format(date);
  },

  /**
   * Get timezone display name (e.g., "Eastern Standard Time")
   * @param {string} timezoneId - IANA timezone identifier
   * @param {string|string[]} locales - Locale(s) for display name
   * @param {string} style - Style of name ('long', 'short', 'shortOffset', 'longOffset')
   * @param {Date} date - Date for context (affects DST names)
   * @returns {string} Timezone display name
   */
  getTimezoneDisplayName(timezoneId, locales = 'en', style = 'long', date = new Date()) {
    try {
      const formatter = new Intl.DateTimeFormat(locales, {
        timeZone: timezoneId,
        timeZoneName: style
      });
      const parts = formatter.formatToParts(date);
      const timezonePart = parts.find(part => part.type === 'timeZoneName');
      return timezonePart ? timezonePart.value : timezoneId;
    } catch (error) {
      return timezoneId;
    }
  },

  /**
   * Get all supported timezone identifiers from the browser
   * @returns {string[]} Array of supported timezone identifiers
   */
  getSupportedTimezones() {
    if (Intl.supportedValuesOf) {
      return Intl.supportedValuesOf('timeZone');
    }
    
    // Fallback for older browsers
    console.warn('Intl.supportedValuesOf not available, returning empty array');
    return [];
  },

  /**
   * Convert a time from one timezone to another
   * @param {Date} date - Source date/time
   * @param {string} fromTimezone - Source timezone
   * @param {string} toTimezone - Target timezone
   * @returns {Date} Converted date in target timezone
   */
  convertTimezone(date, fromTimezone, toTimezone) {
    // Get the time in the source timezone
    const sourceTime = new Date(date.toLocaleString('en-US', { timeZone: fromTimezone }));
    // Get the offset difference
    const sourceOffset = TimezoneUtils.getTimezoneOffset(fromTimezone, date);
    const targetOffset = TimezoneUtils.getTimezoneOffset(toTimezone, date);
    const offsetDiff = targetOffset - sourceOffset;
    
    // Apply the offset difference
    return new Date(date.getTime() + (offsetDiff * 60 * 1000));
  }
};

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  // Node.js/CommonJS
  module.exports = { TimezoneMapper, TimezoneUtils };
} else if (typeof define === 'function' && define.amd) {
  // AMD
  define([], () => ({ TimezoneMapper, TimezoneUtils }));
} else {
  // Browser global
  window.TimezoneMapper = TimezoneMapper;
  window.TimezoneUtils = TimezoneUtils;
}