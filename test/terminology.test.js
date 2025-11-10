import { expect } from '@brightspace-ui/testing';
import { getDocumentLocaleSettings } from '../lib/common.js';
import { getTerminology } from '../lib/terminology.js';

describe('terminology', () => {
	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => {
		documentLocaleSettings.reset();
	});

	describe('getTerminology', () => {
		it('should return the "terminology" value from the document locale settings', () => {
			expect(getTerminology()).to.deep.equal(documentLocaleSettings.terminology);
			documentLocaleSettings.terminology = { educator: 'teacher' };
			expect(getTerminology()).to.deep.equal(documentLocaleSettings.terminology);
		});
	});
});
