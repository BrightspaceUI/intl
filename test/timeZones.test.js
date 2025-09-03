import {
	getTimeZoneData,
	getTimeZonesData,
	timeZoneIdentifiers,
	validateTimeZone
} from '../lib/timeZones.js';
import { expect } from '@brightspace-ui/testing';
import { getDocumentLocaleSettings } from '../lib/common.js';

describe('timeZones', () => {

	const documentLocaleSettings = getDocumentLocaleSettings();

	document.documentElement.setAttribute('lang', 'en-US');

	afterEach(() => documentLocaleSettings.reset());

	describe('getTimeZonesData', () => {

		it('should return all time zones by default', async() => {
			const timeZones = await getTimeZonesData();
			expect(timeZones.length).to.equal(timeZoneIdentifiers.length);
			expect(timeZones[0]).to.have.all.keys('abbreviation', 'friendlyName', 'identifier', 'inputName', 'locality', 'localName', 'offset', 'region');
		});

		it('should respect region parameter', async() => {
			const timeZones = await getTimeZonesData('US');
			expect(timeZones.length).to.equal(new Intl.Locale('ar-US').getTimeZones?.().length || 29);
			expect(timeZones[0]).to.have.all.keys('abbreviation', 'friendlyName', 'identifier', 'inputName', 'locality', 'localName', 'offset', 'region');
		});

		it('should respect modules parameter', async() => {
			const expects = navigator.userAgent.includes('Firefox') ? [0, 2] : [29, 29];
			let timeZones = await getTimeZonesData('US', 'africa');
			expect(timeZones.length).to.equal(expects[0]);
			timeZones = await getTimeZonesData('US', '_test');
			expect(timeZones.length).to.equal(expects[1]);
		});

	});

	describe('getTimeZoneData', () => {
		[
			['America/Los_Angeles', {
				abbreviation: 'PDT',
				friendlyName: 'United States - Los Angeles',
				identifier: 'America/Los_Angeles',
				inputName: '(GMT-07:00) Pacific Daylight Time - Los Angeles',
				locality: 'Los Angeles',
				localName: 'Pacific Daylight Time',
				offset: 'GMT-07:00',
				region: 'United States'
			}],
			['America/Argentina/San_Juan', {
				abbreviation: 'GMT-3',
				friendlyName: 'Argentina - San Juan',
				identifier: 'America/Argentina/San_Juan',
				inputName: '(GMT-03:00) Argentina Standard Time - San Juan, Argentina',
				locality: 'San Juan, Argentina',
				localName: 'Argentina Standard Time',
				offset: 'GMT-03:00',
				region: 'Argentina'
			}]
		].forEach(([timeZoneId, expected]) => {
			it('should return valid time zone data', async() => {
				const timeZones = await getTimeZoneData(timeZoneId);
				expect(timeZones).to.deep.equal(expected);
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
