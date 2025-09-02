import { getDocumentLocaleSettings } from './common.js';
import { TimeZoneMapper } from './_timeZones/mapper.js';

let timeZoneData;
getDocumentLocaleSettings().addChangeListener(() => timeZoneData = null);

const tzMap = {
	'Asia/Calcutta': 'Asia/Kolkata',
};

export const timeZoneIdentifiers = Intl.supportedValuesOf('timeZone').map(t => tzMap[t] || t);

export async function getTimeZonesData(region, modules) {
	let timeZones;
	if (region) {
		timeZones = new Intl.Locale(`en-${region}`).getTimeZones?.();
		if (!timeZones?.length) {
			const mapper = new TimeZoneMapper(modules);
			await mapper.loadMappings();
			timeZones = mapper.getTimeZonesForRegion(region);
		}
	} else {
		if (timeZoneData) return timeZoneData;
		timeZones = timeZoneIdentifiers;
	}
	return timeZones.map(l => getTimeZoneData(l));
}

export function getTimeZoneData(identifier = getDocumentLocaleSettings().timeZone.identifier, locale = getDocumentLocaleSettings().language || 'en') {
	const localName = new Intl.DateTimeFormat(locale, { timeZone: identifier, timeZoneName: 'long' }).formatToParts().find(({ type }) => type === 'timeZoneName').value;
	const abbreviation = new Intl.DateTimeFormat(locale, { timeZone: identifier, timeZoneName: 'short' }).formatToParts().find(({ type }) => type === 'timeZoneName').value;
	const offset = new Intl.DateTimeFormat(locale, { timeZone: identifier, timeZoneName: 'longOffset' }).formatToParts().find(({ type }) => type === 'timeZoneName').value;
	const city = identifier.replace(/[^/]*\//, '').replace('_', ' ');
	const friendlyName = `(${offset}) ${city} - ${localName}`;

	return {
		identifier,
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
