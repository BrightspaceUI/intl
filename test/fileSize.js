import { getDocumentLocaleSettings } from '../lib/common.js';
import { formatFileSize } from '../lib/fileSize.js';

var expect = chai.expect;

describe('formatFileSize', () => {

	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => documentLocaleSettings.reset());

	[
		{ value: 0, expect: '0 bytes' },
		{ value: -1, expect: '-1 byte' },
		{ value: 1, expect: '1 byte' },
		{ value: 2, expect: '2 bytes' },
		{ value: -2, expect: '-2 bytes' },
		{ value: 1023, expect: '1,023 bytes' },
		{ value: -1023, expect: '-1,023 bytes' },
		{ value: 1024, expect: '1 KB' },
		{ value: -1024, expect: '-1 KB' },
		{ value: 1048576, expect: '1 MB' },
		{ value: -1048576, expect: '-1 MB' },
		{ value: 1073741824, expect: '1 GB' },
		{ value: 1073741824 * 2, expect: '2 GB' },
		{ value: -1073741824, expect: '-1 GB' },
		{ value: 1881111114, expect: '1.75 GB' }
	].forEach((input) => {
		it(`should format "${input.value}"`, () => {
			const value = formatFileSize(input.value);
			expect(value).to.equal(input.expect);
		});
	});

	[
		{ locale: 'ar', expect: ['1 بايت', '2 بايت', '1 كيلو بايت', '1 ميغا بايت', '1 غيغا بايت'] },
		{ locale: 'ar-SA', expect: ['1 بايت', '2 بايت', '1 كيلو بايت', '1 ميغا بايت', '1 غيغا بايت'] },
		{ locale: 'cy-GB', expect: ['1 beit', '2 beit', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'da', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'da-DK', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'de', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'de-DE', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'en', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'en-CA', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'en-GB', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'en-US', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'es', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'es-ES', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'es-MX', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'fr', expect: ['1 octet', '2 octets', '1 Ko', '1 Mo', '1 Go'] },
		{ locale: 'fr-CA', expect: ['1 octet', '2 octets', '1 Ko', '1 Mo', '1 Go'] },
		{ locale: 'fr-FR', expect: ['1 octet', '2 octets', '1 Ko', '1 Mo', '1 Go'] },
		{ locale: 'fr-ON', expect: ['1 octet', '2 octets', '1 Ko', '1 Mo', '1 Go'] },
		{ locale: 'hi', expect: ['1 बाइट', '2 बाइट्स', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'hi-IN', expect: ['1 बाइट', '2 बाइट्स', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'ja', expect: ['1 バイト', '2 バイト', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'ja-JP', expect: ['1 バイト', '2 バイト', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'ko', expect: ['1 바이트', '2 바이트', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'ko-KR', expect: ['1 바이트', '2 바이트', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'nl', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'nl-NL', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'pt', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'pt-BR', expect: ['1 byte', '2 bytes', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'sv', expect: ['1 byte', '2 byte', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'sv-SE', expect: ['1 byte', '2 byte', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'tr', expect: ['1 bayt', '2 bayt', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'tr-TR', expect: ['1 bayt', '2 bayt', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'zh', expect: ['1 字节', '2 字节', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'zh-CN', expect: ['1 字节', '2 字节', '1 KB', '1 MB', '1 GB'] },
		{ locale: 'zh-TW', expect: ['1 位元組', '2 位元組', '1 KB', '1 MB', '1 GB'] },
	].forEach((input) => {
		let index = -1;
		[1, 2, 1024, 1048576, 1073741824].forEach((size) => {
			it(`should format "${size}" bytes for locale "${input.locale}"`, () => {
				index++;
				documentLocaleSettings.language = input.locale;
				const value = formatFileSize(size);
				expect(value).to.equal(input.expect[index]);
			});
		});
	});

});
