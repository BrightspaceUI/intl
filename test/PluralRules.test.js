import { expect } from '@brightspace-ui/testing';
import { getDocumentLocaleSettings } from '../lib/common.js';
import { getSeparator } from '../lib/PluralRules.js';

describe('PluralRules', () => {

	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => documentLocaleSettings.reset());

	[
		{ locale: 'mi', type: 'cardinal', expect: { categories: [ 'one', 'other' ] } },
		{ locale: 'mi', type: 'ordinal', expect: { categories: [ 'other' ] } }
	].forEach(({ locale, type, expect }) => {
		it(`should use custom data for "${locale}"`, () => {
			documentLocaleSettings.language = locale;
			const pluralRules = new Intl.PluralRules(locale, { type });
			expect(pluralRules).to.have.deeo.properties(expect);
		});
	});

});
