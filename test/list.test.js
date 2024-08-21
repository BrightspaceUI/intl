import { expect } from '@brightspace-ui/testing';
import { getDocumentLocaleSettings } from '../lib/common.js';
import { getSeparator } from '../lib/list.js';

describe('getSeparator', () => {

	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => documentLocaleSettings.reset());

	[
		{ locale: 'ar', expect: [' ، ', '\xa0،\xa0'] },
		{ locale: 'ar-SA', expect: [' ، ', '\xa0،\xa0'] },
		{ locale: 'cy-GB', expect: [', ', ',\xa0'] },
		{ locale: 'da', expect: [', ', ',\xa0'] },
		{ locale: 'da-DK', expect: [', ', ',\xa0'] },
		{ locale: 'de', expect: [', ', ',\xa0'] },
		{ locale: 'de-DE', expect: [', ', ',\xa0'] },
		{ locale: 'en', expect: [', ', ',\xa0'] },
		{ locale: 'en-CA', expect: [', ', ',\xa0'] },
		{ locale: 'en-GB', expect: [', ', ',\xa0'] },
		{ locale: 'en-US', expect: [', ', ',\xa0'] },
		{ locale: 'es', expect: [', ', ',\xa0'] },
		{ locale: 'es-ES', expect: [', ', ',\xa0'] },
		{ locale: 'es-MX', expect: [', ', ',\xa0'] },
		{ locale: 'fr', expect: [', ', ',\xa0'] },
		{ locale: 'fr-CA', expect: [', ', ',\xa0'] },
		{ locale: 'fr-FR', expect: [', ', ',\xa0'] },
		{ locale: 'fr-ON', expect: [', ', ',\xa0'] },
		{ locale: 'hi', expect: [', ', ',\xa0'] },
		{ locale: 'hi-IN', expect: [', ', ',\xa0'] },
		{ locale: 'ja', expect: ['、', '、'] },
		{ locale: 'ja-JP', expect: ['、', '、'] },
		{ locale: 'ko', expect: [', ', ',\xa0'] },
		{ locale: 'ko-KR', expect: [', ', ',\xa0'] },
		{ locale: 'nl', expect: [', ', ',\xa0'] },
		{ locale: 'nl-NL', expect: [', ', ',\xa0'] },
		{ locale: 'pt', expect: [', ', ',\xa0'] },
		{ locale: 'pt-BR', expect: [', ', ',\xa0'] },
		{ locale: 'sv', expect: [', ', ',\xa0'] },
		{ locale: 'sv-SE', expect: [', ', ',\xa0'] },
		{ locale: 'tr', expect: [', ', ',\xa0'] },
		{ locale: 'tr-TR', expect: [', ', ',\xa0'] },
		{ locale: 'zh', expect: ['、', '、'] },
		{ locale: 'zh-CN', expect: ['、', '、'] },
		{ locale: 'zh-TW', expect: ['、', '、'] },
	].forEach((input) => {
		it(`should return the separator for locale "${input.locale}"`, () => {
			documentLocaleSettings.language = input.locale;
			expect(getSeparator()).to.equal(input.expect[0]);
			expect(getSeparator({ nonBreaking: true })).to.equal(input.expect[1]);
		});
	});

});
