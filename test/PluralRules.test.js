import '../lib/PluralRules.js';
import { expect } from '@brightspace-ui/testing';
import { getDocumentLocaleSettings } from '../lib/common.js';

describe('PluralRules', () => {

	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => documentLocaleSettings.reset());

	it('extends native Intl.PluralRules', () => {
		const native = Object.getPrototypeOf(Intl.PluralRules);
		expect(Intl.PluralRules.shim).to.be.true;
		expect(native).to.have.property('name', 'PluralRules');
		expect(native).to.not.have.property('shim');
	});

	it('uses native data by default', () => {
		const shim = new Intl.PluralRules('cy');
		const native = new (Object.getPrototypeOf(Intl.PluralRules))('cy');
		expect(shim.resolvedOptions()).to.deep.equal(native.resolvedOptions());
	});

	it('resolves to canonical locales', () => {
		expect(new Intl.PluralRules('mao').resolvedOptions().locale).to.equal('mi');
		expect(new Intl.PluralRules('mri').resolvedOptions().locale).to.equal('mi');
		expect(new Intl.PluralRules(['abcdefg', 'mri']).resolvedOptions().locale).to.equal('mi');
	});

	it('includes custom locales as supported', () => {
		expect(Intl.PluralRules.supportedLocalesOf(['abc', 'mao', 'en'])).to.deep.equal(['mi', 'en']);
	});

	[
		{
			locale: 'mi',
			type: 'cardinal',
			options: {
				locale: 'mi',
				shim: true,
				pluralCategories: [ 'one', 'other' ]
			},
			select: {
				one: [1],
				other: [0, 2, 3, 11]
			}
		},
		{
			locale: 'mi',
			type: 'ordinal',
			options: {
				locale: 'mi',
				shim: true,
				pluralCategories: [ 'other' ]
			},
			select: {
				other: [0, 1, 2, 3, 11]
			}
		}
	].forEach(({ locale, type, options, select }) => {

		documentLocaleSettings.language = locale;
		const pluralRules = new Intl.PluralRules(locale, { type });

		it(`should use custom ${type} data for "${locale}"`, () => {
			expect(pluralRules.resolvedOptions()).to.deep.include(options);
		});

		it(`should select the correct ${type} number categories for "${locale}"`, () => {
			options.pluralCategories.forEach(cat => {
				select[cat].forEach(num => {
					expect(pluralRules.select(num)).to.equal(cat);
				});
			});
		});
	});

});
