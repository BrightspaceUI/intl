import { getDocumentLocaleSettings } from './common.js';

export const timeZoneIdentifiers = Intl.supportedValuesOf('timeZone');

let timeZoneData;

export function getTimeZonesData(region) {
	let timeZones;
	if (region) timeZones = new Intl.Locale(`en-${region}`).getTimeZones();
	else {
		if (timeZoneData) return timeZoneData;
		timeZones = timeZoneIdentifiers;
	}
	return timeZones.map(getTimeZoneData);
}

export function getTimeZoneData(identifier = getDocumentLocaleSettings().timeZone.identifier, locale = getDocumentLocaleSettings().locale) {
	const localName = new Intl.DateTimeFormat(locale, { timeZone: identifier, timeZoneName: 'long' }).formatToParts().find(({ type }) => type === 'timeZoneName').value;
	const abbreviation = new Intl.DateTimeFormat(locale, { timeZone: identifier, timeZoneName: 'short' }).formatToParts().find(({ type }) => type === 'timeZoneName').value;
	const offset = new Intl.DateTimeFormat('en-US', { timeZone: identifier, timeZoneName: 'longOffset' }).formatToParts().find(({ type }) => type === 'timeZoneName').value;
	const city = identifier.split('/')[1].replace('_', ' ');
	const friendlyName = `(${offset}) ${localName}(${city})`;
	return {
		abbreviation,
		city,
		friendlyName,
		localName,
		offset
	};
}

export function validateTimeZone(identifier = getDocumentLocaleSettings().timeZone.identifier) {
	return timeZoneIdentifiers.includes(identifier);
}
