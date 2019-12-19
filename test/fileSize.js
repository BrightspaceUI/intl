import {defaultLocale} from '../src/common.js';
import {setDocumentLanguage} from '../src/documentSettings.js';
import {formatFileSize} from '../src/fileSize.js';

var expect = chai.expect;

describe('formatFileSize', () => {

	beforeEach(async() => {
		setDocumentLanguage(defaultLocale);
	});

	[
		{value: 0, expect: '0 bytes'},
		{value: -1, expect: '-1 byte'},
		{value: 1, expect: '1 byte'},
		{value: 2, expect: '2 bytes'},
		{value: -2, expect: '-2 bytes'},
		{value: 1023, expect: '1,023 bytes'},
		{value: -1023, expect: '-1,023 bytes'},
		{value: 1024, expect: '1 KB'},
		{value: -1024, expect: '-1 KB'},
		{value: 1048576, expect: '1 MB'},
		{value: -1048576, expect: '-1 MB'},
		{value: 1073741824, expect: '1 GB'},
		{value: 1073741824 * 2, expect: '2 GB'},
		{value: -1073741824, expect: '-1 GB'},
		{value: 1881111114, expect: '1.75 GB'}
	].forEach((input) => {
		it(`should correct parse the file-size "${input.value}"`, () => {
			const value = formatFileSize(input.value);
			expect(value).to.equal(input.expect);
		});
	});

	[
		{byteNum:1, expect:'1 بايت', locale:'ar-SA'},
		{byteNum:2, expect:'2 بايت', locale:'ar-SA'},
		{byteNum:1024, expect:'1 كيلو بايت', locale:'ar-SA'},
		{byteNum:1048576, expect:'1 ميغا بايت', locale:'ar-SA'},
		{byteNum:1073741824, expect:'1 غيغا بايت', locale:'ar-SA'},
		{byteNum:1, expect:'1 byte', locale:'da-DK'},
		{byteNum:2, expect:'2 bytes', locale:'da-DK'},
		{byteNum:1024, expect:'1 KB', locale:'da-DK'},
		{byteNum:1048576, expect:'1 MB', locale:'da-DK'},
		{byteNum:1073741824, expect:'1 GB', locale:'da-DK'},
		{byteNum:1, expect:'1 byte', locale:'de-DE'},
		{byteNum:2, expect:'2 bytes', locale:'de-DE'},
		{byteNum:1024, expect:'1 KB', locale:'de-DE'},
		{byteNum:1048576, expect:'1 MB', locale:'de-DE'},
		{byteNum:1073741824, expect:'1 GB', locale:'de-DE'},
		{byteNum:1, expect:'1 byte', locale:'en-CA'},
		{byteNum:2, expect:'2 bytes', locale:'en-CA'},
		{byteNum:1024, expect:'1 KB', locale:'en-CA'},
		{byteNum:1048576, expect:'1 MB', locale:'en-CA'},
		{byteNum:1073741824, expect:'1 GB', locale:'en-CA'},
		{byteNum:1, expect:'1 byte', locale:'en-GB'},
		{byteNum:2, expect:'2 bytes', locale:'en-GB'},
		{byteNum:1024, expect:'1 KB', locale:'en-GB'},
		{byteNum:1048576, expect:'1 MB', locale:'en-GB'},
		{byteNum:1073741824, expect:'1 GB', locale:'en-GB'},
		{byteNum:1, expect:'1 byte', locale:'en-US'},
		{byteNum:2, expect:'2 bytes', locale:'en-US'},
		{byteNum:1024, expect:'1 KB', locale:'en-US'},
		{byteNum:1048576, expect:'1 MB', locale:'en-US'},
		{byteNum:1073741824, expect:'1 GB', locale:'en-US'},
		{byteNum:1, expect:'1 byte', locale:'es-MX'},
		{byteNum:2, expect:'2 bytes', locale:'es-MX'},
		{byteNum:1024, expect:'1 KB', locale:'es-MX'},
		{byteNum:1048576, expect:'1 MB', locale:'es-MX'},
		{byteNum:1073741824, expect:'1 GB', locale:'es-MX'},
		{byteNum:1, expect:'1 octet', locale:'fr-CA'},
		{byteNum:2, expect:'2 octets', locale:'fr-CA'},
		{byteNum:1024, expect:'1 Ko', locale:'fr-CA'},
		{byteNum:1048576, expect:'1 Mo', locale:'fr-CA'},
		{byteNum:1073741824, expect:'1 Go', locale:'fr-CA'},
		{byteNum:1, expect:'1 octet', locale:'fr-FR'},
		{byteNum:2, expect:'2 octets', locale:'fr-FR'},
		{byteNum:1024, expect:'1 Ko', locale:'fr-FR'},
		{byteNum:1048576, expect:'1 Mo', locale:'fr-FR'},
		{byteNum:1073741824, expect:'1 Go', locale:'fr-FR'},
		{byteNum:1, expect:'1 バイト', locale:'ja-JP'},
		{byteNum:2, expect:'2 バイト', locale:'ja-JP'},
		{byteNum:1024, expect:'1 KB', locale:'ja-JP'},
		{byteNum:1048576, expect:'1 MB', locale:'ja-JP'},
		{byteNum:1073741824, expect:'1 GB', locale:'ja-JP'},
		{byteNum:1, expect:'1 바이트', locale:'ko-KR'},
		{byteNum:2, expect:'2 바이트', locale:'ko-KR'},
		{byteNum:1024, expect:'1 KB', locale:'ko-KR'},
		{byteNum:1048576, expect:'1 MB', locale:'ko-KR'},
		{byteNum:1073741824, expect:'1 GB', locale:'ko-KR'},
		{byteNum:1, expect:'1 byte', locale:'nl-NL'},
		{byteNum:2, expect:'2 bytes', locale:'nl-NL'},
		{byteNum:1024, expect:'1 KB', locale:'nl-NL'},
		{byteNum:1048576, expect:'1 MB', locale:'nl-NL'},
		{byteNum:1073741824, expect:'1 GB', locale:'nl-NL'},
		{byteNum:1, expect:'1 byte', locale:'pt-BR'},
		{byteNum:2, expect:'2 bytes', locale:'pt-BR'},
		{byteNum:1024, expect:'1 KB', locale:'pt-BR'},
		{byteNum:1048576, expect:'1 MB', locale:'pt-BR'},
		{byteNum:1073741824, expect:'1 GB', locale:'pt-BR'},
		{byteNum:1, expect:'1 byte', locale:'sv-SE'},
		{byteNum:2, expect:'2 byte', locale:'sv-SE'},
		{byteNum:1024, expect:'1 KB', locale:'sv-SE'},
		{byteNum:1048576, expect:'1 MB', locale:'sv-SE'},
		{byteNum:1073741824, expect:'1 GB', locale:'sv-SE'},
		{byteNum:1, expect:'1 bayt', locale:'tr-TR'},
		{byteNum:2, expect:'2 bayt', locale:'tr-TR'},
		{byteNum:1024, expect:'1 KB', locale:'tr-TR'},
		{byteNum:1048576, expect:'1 MB', locale:'tr-TR'},
		{byteNum:1073741824, expect:'1 GB', locale:'tr-TR'},
		{byteNum:1, expect:'1 字节', locale:'zh-CN'},
		{byteNum:2, expect:'2 字节', locale:'zh-CN'},
		{byteNum:1024, expect:'1 KB', locale:'zh-CN'},
		{byteNum:1048576, expect:'1 MB', locale:'zh-CN'},
		{byteNum:1073741824, expect:'1 GB', locale:'zh-CN'},
		{byteNum:1, expect:'1 位元組', locale:'zh-TW'},
		{byteNum:2, expect:'2 位元組', locale:'zh-TW'},
		{byteNum:1024, expect:'1 KB', locale:'zh-TW'},
		{byteNum:1048576, expect:'1 MB', locale:'zh-TW'},
		{byteNum:1073741824, expect:'1 GB', locale:'zh-TW'}
	].forEach((input) => {
		it(`should parse the file-size: "${input.byteNum}" bytes for locale "${input.locale}"`, () => {
			setDocumentLanguage(input.locale);
			const value = formatFileSize(input.byteNum);
			expect(value).to.equal(input.expect);
		});
	});

});
