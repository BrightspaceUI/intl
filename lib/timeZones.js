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
	const mapper = new TimeZoneMapper(modules);
	await mapper.loadMappings();

	if (region) {
		timeZones = new Intl.Locale(`en-${region}`).getTimeZones?.();
		if (!timeZones?.length) {
			timeZones = mapper.getTimeZonesForRegion(region);
		}
	} else {
		if (timeZoneData) return timeZoneData;
		timeZones = timeZoneIdentifiers;
	}
	return await Promise.all(timeZones.map(l => getTimeZoneData(l, { mapper })));
}

export async function getTimeZoneData(
	identifier = getDocumentLocaleSettings().timezone.identifier,
	{
		modules,
		mapper,
		locale = getDocumentLocaleSettings().language || 'en'
	} = {}) {
	mapper ??= new TimeZoneMapper(modules);
	await mapper.loadMappings();
	const localName = new Intl.DateTimeFormat(locale, { timeZone: identifier, timeZoneName: 'long' }).formatToParts().find(({ type }) => type === 'timeZoneName').value;
	const abbreviation = new Intl.DateTimeFormat(locale, { timeZone: identifier, timeZoneName: 'short' }).formatToParts().find(({ type }) => type === 'timeZoneName').value;
	const offset = new Intl.DateTimeFormat(locale, { timeZone: identifier, timeZoneName: 'longOffset' }).formatToParts().find(({ type }) => type === 'timeZoneName').value;
	const city = identifier.replace(/[^/]*\//, '').replace('_', ' ');
	const country = mapper.getRegionName(identifier) || '';
	const friendlyName = `${country && `${country} - `}${city}`;
	const inputName = `(${offset}) ${city} - ${localName}`;

	return {
		identifier,
		abbreviation,
		city,
		country,
		friendlyName,
		inputName,
		localName,
		offset
	};
}

export function validateTimeZone(identifier = getDocumentLocaleSettings().timezone.identifier) {
	return timeZoneIdentifiers.includes(identifier);
}
