import { getTerminology, TerminologyKey } from '../lib/terminology.js';
import { expect } from '@brightspace-ui/testing';
import { getDocumentLocaleSettings } from '../lib/common.js';

describe('terminology', () => {
	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => {
		documentLocaleSettings.reset();
	});

	describe('getTerminology', () => {
		describe('without key parameter', () => {
			it('should throw an error', () => {
				expect(() => getTerminology()).to.throw('Terminology key is required.');
			});
		});
		describe('with invalid key parameter', () => {
			it('should throw an error', () => {
				expect(() => getTerminology('invalidKey')).to.throw('Invalid terminology key "invalidKey".');
			});
		});
		describe('with valid key parameter', () => {
			it('should return the corresponding terminology value from the document locale settings', () => {
				documentLocaleSettings.terminology = {
					[TerminologyKey.Educator]: 'teacher',
				};
				expect(getTerminology(TerminologyKey.Educator)).to.equal('teacher');
				expect(getTerminology(TerminologyKey.ModuleHierarchy)).to.be.undefined;
			});
		});
	});
});
