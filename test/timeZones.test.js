import {
	getTimeZonesData,
	timeZoneIdentifiers,
	validateTimeZone
} from '../lib/timeZones.js';
import { expect } from '@brightspace-ui/testing';
import { getDocumentLocaleSettings } from '../lib/common.js';

describe('timeZones', () => {

	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => documentLocaleSettings.reset());

	describe('getTimeZones', () => {

		it('should return all time zones by default', () => {
			const timeZones = getTimeZonesData();
			expect(timeZones.length).to.equal(timeZoneIdentifiers.length);
			expect(timeZones[0]).to.have.all.keys('abbreviation', 'city', 'friendlyName', 'localName', 'offset');
		});

		it('should respect region parameter', () => {
			const timeZones = getTimeZonesData('US');
			expect(timeZones.length).to.equal(new Intl.Locale('ar-US').getTimeZones().length);
			expect(timeZones[0]).to.have.all.keys('abbreviation', 'city', 'friendlyName', 'localName', 'offset');
		});

	});
});
