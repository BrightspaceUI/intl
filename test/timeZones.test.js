import { getTimeZoneData, validateTimeZone } from '../lib/timeZones.js';
import { expect } from '@brightspace-ui/testing';
import { getDocumentLocaleSettings } from '../lib/common.js';

describe('timeZones', () => {

	const documentLocaleSettings = getDocumentLocaleSettings();

	document.documentElement.setAttribute('lang', 'en-US');

	afterEach(() => documentLocaleSettings.reset());

	describe('getTimeZoneData', () => {
		it('should return valid time zone data', async() => {
			const timeZoneId = 'Pacific/Honolulu';

			const timeZones = await getTimeZoneData(timeZoneId);
			expect(timeZones).to.deep.equal({
				abbreviation: 'HST',
				city: 'Honolulu',
				country: 'United States',
				friendlyName: 'United States - Honolulu',
				identifier: 'Pacific/Honolulu',
				localName: 'Hawaii-Aleutian Standard Time',
				offset: 'GMT-10:00',
				inputName: '(GMT-10:00) Honolulu - Hawaii-Aleutian Standard Time'
			});
		});
	});

	describe('validateTimeZone', () => {

		it('should validate known time zones', () => {
			expect(validateTimeZone('America/New_York')).to.be.true;
			expect(validateTimeZone('Europe/London')).to.be.true;
			expect(validateTimeZone('Asia/Kolkata')).to.be.true;
		});

		it('should invalidate unknown time zones', () => {
			expect(validateTimeZone('America/Not_A_Time_Zone')).to.be.false;
			expect(validateTimeZone('Not_A_Region/Not_A_City')).to.be.false;
			expect(validateTimeZone('Invalid/Invalid')).to.be.false;
		});

	});
});
