import { formatNumber, formatPercent, parseNumber } from '../lib/number.js';
import { getDocumentLocaleSettings } from '../lib/common.js';

const expect = chai.expect;

describe('number', () => {

	const documentLocaleSettings = getDocumentLocaleSettings();

	afterEach(() => documentLocaleSettings.reset());

	describe('formatNumber', () => {

		describe('edge values', () => {

			it('should format null as 0', () => {
				const value = formatNumber(null);
				expect(value).to.equal('0');
			});

			it('should format undefined as 0', () => {
				const value = formatNumber(undefined);
				expect(value).to.equal('0');
			});

			it('should parse strings', () => {
				const value = formatNumber('32.1935');
				expect(value).to.equal('32.194');
			});

			it('should throw for unparsable strings', () => {
				expect(() => {
					formatNumber('blah');
				}).to.throw(RangeError, 'value is out of range');
			});

		});

		describe('integers & decimals', () => {

			[
				{ val: 42, expect: '42' },
				{ val: -42, expect: '-42' },
				{ val: 0, expect: '0' },
				{ val: 0, min: 2, expect: '0.00' },
				{ val: -0, expect: '0' },
				{ val: 3.1, expect: '3.1' },
				{ val: 1.2345, expect: '1.235' },
				{ val: 1.2, max: 0, expect: '1' },
				{ val: 1.5, max: 0, expect: '2' },
				{ val: 1.234567, max: 5, expect: '1.23457' },
				{ val: 1.234567, max: 10, expect: '1.234567' },
				{ val: 1.234567, min: 3, expect: '1.235' },
				{ val: 1.234567, min: 2, expect: '1.235' },
				{ val: 1.234567, min: 8, expect: '1.23456700' },
				{ val: 0.1234567, expect: '0.123' },
				{ val: 4, min: 2, expect: '4.00' },
				{ val: 1e-9, max: 15, expect: '0.000000001' },
				{ val: -1e-9, max: 15, expect: '-0.000000001' },
				{ val: 8.256e-11, max: 15, expect: '0.00000000008256' },
				{ val: 8.256e-11, max: 12, expect: '0.000000000083' },
				{ val: 1e10, expect: '10,000,000,000' },
				{ val: 6.845e13, expect: '68,450,000,000,000' },
				{ val: 12345678901.12345, max: 3, expect: '12,345,678,901.123' },
				{ val: -12345678901.12345, max: 3, expect: '-12,345,678,901.123' },
				{ val: 5.2, max: 20, expect: '5.2' },
				{ val: -5.2, max: 20, expect: '-5.2' },
				{ val: 9999999999.1, max: 20, expect: '9,999,999,999.1' },
				{ val: 99999.133, max: 20, expect: '99,999.133' }
			].forEach((input) => {
				it(`should format ${input.val}, max:${input.max}, min:${input.min}`, () => {
					const options = {
						maximumFractionDigits: input.max,
						minimumFractionDigits: input.min
					};
					const value = formatNumber(input.val, options);
					expect(value).to.equal(input.expect);
				});
			});

			it('should use custom negative symbol', () => {
				documentLocaleSettings.overrides = { number: { symbols: { negative: '|@|' } } };
				const value = formatNumber(-42);
				expect(value).to.equal('|@|42');
			});

			it('should use custom decimal symbol', () => {
				documentLocaleSettings.overrides = { number: { symbols: { decimal: '|@|' } } };
				const value = formatNumber(3.14);
				expect(value).to.equal('3|@|14');
			});

			it('should use custom positive pattern', () => {
				documentLocaleSettings.overrides = { number: { patterns: { decimal: { positivePattern: 'foo{number}bar' } } } };
				const value = formatNumber(3.14);
				expect(value).to.equal('foo3.14bar');
			});

		});

		describe('negative patterns', () => {

			[
				{ pattern: '({number})', expected: '(4)' },
				{ pattern: '- {number}', expected: '- 4' },
				{ pattern: '{number}-', expected: '4-' },
				{ pattern: '{number} -', expected: '4 -' },
				{ pattern: '-{number}', expected: '-4' },
				{ pattern: '({number})', expected: '(4.0)', min: 1 },
				{ pattern: '- {number}', expected: '- 4.0', min: 1 },
				{ pattern: '{number}-', expected: '4.0-', min: 1 },
				{ pattern: '{number} -', expected: '4.0 -', min: 1 },
				{ pattern: '-{number}', expected: '-4.0', min: 1 }
			].forEach((input) => {
				it(`should apply negative pattern "${input.pattern}"`, async() => {
					documentLocaleSettings.overrides = { number: { patterns: { decimal: { negativePattern: input.pattern } } } };
					const options = { minimumFractionDigits: input.min };
					const value = formatNumber(-4, options);
					expect(value).to.equal(input.expected);
				});
			});

			it('should use custom negative pattern', async() => {
				documentLocaleSettings.overrides = { number: { patterns: { decimal: { negativePattern: 'foo{number}bar-' } } } };
				const value = formatNumber(-3.14);
				expect(value).to.equal('foo3.14bar-');
			});

		});

		describe('groups', () => {

			[
				{ val: 1000, expected: '1,000' },
				{ val: 1234567, expected: '1,234,567' },
				{ val: 1234567.8915, expected: '1,234,567.892' },
				{ val: 1000.123, max: 1, expected: '1,000.1' },
				{ val: 1234567.98, max: 1, expected: '1,234,568' },
				{ val: 1234567.8915, max: 1, expected: '1,234,567.9' },
				{ val: -1234567.8915, max: 1, expected: '-1,234,567.9' }
			].forEach((input) => {
				it(`should use group separator ${input.val}`, () => {
					const value = formatNumber(input.val, { maximumFractionDigits: input.max });
					expect(value).to.equal(input.expected);
				});
			});

			it('should not include group separators when "useGrouping" is false', () => {
				const value = formatNumber(1234567.891, { useGrouping: false });
				expect(value).to.equal('1234567.891');
			});

			[
				{ symbol: '|@|', expected: '1|@|000|@|000' },
				{ symbol: '\'', expected: '1\'000\'000' }
			].forEach((input) => {
				it(`should use custom group symbol "${input.symbol}"`, () => {
					documentLocaleSettings.overrides = { number: { symbols: { group: input.symbol } } };
					const value = formatNumber(1000000);
					expect(value).to.equal(input.expected);
				});
			});

			it('should use custom group size', () => {
				documentLocaleSettings.overrides = { number: { groupSize: 5 } };
				const value = formatNumber(1000000);
				expect(value).to.equal('10,00000');
			});

			it('should handle group size of 0', () => {
				documentLocaleSettings.overrides = { number: { groupSize: 0 } };
				const value = formatNumber(1000000.01, { maximumFractionDigits: 2 });
				expect(value).to.equal('1000000.01');
			});

			[
				{ val: 1000000000.01, groupSize:[3, 2, 1, 0], expected: '1000,0,00,000.01' },
				{ val: 123456789.123, groupSize:[4, 2], expected: '1,23,45,6789.12' }
			].forEach((input) => {
				it('should handle variable group sizes', () => {
					documentLocaleSettings.overrides = { number: { groupSize: input.groupSize } };
					const value = formatNumber(input.val, { maximumFractionDigits: 2 });
					expect(value).to.equal(input.expected);
				});
			});

		});

		[
			{ locale: 'ar', expect: ['42', '42-', '0.392', '0.392-', '1,234,567,890', '1,234,567,890-'] },
			{ locale: 'ar-SA', expect: ['42', '42-', '0.392', '0.392-', '1,234,567,890', '1,234,567,890-'] },
			{ locale: 'cy-GB', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'da', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'da-DK', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'de', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'de-DE', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'en', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'en-CA', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'en-GB', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'en-US', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'es', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'es-ES', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'es-MX', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'fr', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
			{ locale: 'fr-CA', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
			{ locale: 'fr-FR', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
			{ locale: 'fr-ON', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
			{ locale: 'hi', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'hi-IN', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'ja', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'ja-JP', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'ko', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'ko-KR', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'nl', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'nl-NL', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'pt', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'pt-BR', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'sv', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
			{ locale: 'sv-SE', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
			{ locale: 'tr', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'tr-TR', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
			{ locale: 'zh', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'zh-CN', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
			{ locale: 'zh-TW', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] }
		].forEach((input) => {
			let index = -1;
			[
				42, /* integer */
				0.392, /* decimal */
				1234567890, /* group separators */
			].forEach((value) => {
				['+', '-'].forEach((sign) => {
					const signedValue = (sign === '-') ? value * -1 : value;
					it(`should format "${signedValue}" as a decimal in locale ${input.locale}`, () => {
						documentLocaleSettings.language = input.locale;
						index++;
						const value = formatNumber(signedValue);
						expect(value).to.equal(input.expect[index]);
					});
				});
			});
		});

	});

	describe('formatPercent', () => {

		describe('edge values', () => {

			it('should format null as 0%', () => {
				const value = formatPercent(null);
				expect(value).to.equal('0 %');
			});

			it('should format undefined as 0', () => {
				const value = formatPercent(undefined);
				expect(value).to.equal('0 %');
			});

			it('should parse strings', () => {
				const value = formatPercent('0.321935');
				expect(value).to.equal('32.194 %');
			});

			it('should throw for unparsable strings', () => {
				expect(() => {
					formatPercent('blah');
				}).to.throw(RangeError, 'value is out of range');
			});

		});

		describe('patterns', () => {

			[
				{ pattern: '{number} %', expected: '76 %' },
				{ pattern: '{number}%', expected: '76%' },
				{ pattern: '%{number}', expected: '%76' },
				{ pattern: '% {number}', expected: '% 76' },
				{ pattern: 'unknown', expected: 'unknown' },
				{ pattern: 'foo{number}bar|%', expected: 'foo76bar|%' }
			].forEach((input) => {
				it(`should apply positive pattern "${input.pattern}"`, () => {
					documentLocaleSettings.overrides = { number: { patterns: { percent: { positivePattern: input.pattern } } } };
					const value = formatPercent(0.76);
					expect(value).to.equal(input.expected);
				});
			});

			[
				{ pattern: '-{number} %', expected: '-76 %' },
				{ pattern: '-{number}%', expected: '-76%' },
				{ pattern: '-%{number}', expected: '-%76' },
				{ pattern: '%-{number}', expected: '%-76' },
				{ pattern: '%{number}-', expected: '%76-' },
				{ pattern: '{number}-%', expected: '76-%' },
				{ pattern: '{number}%-', expected: '76%-' },
				{ pattern: '-% {number}', expected: '-% 76' },
				{ pattern: '{number} %-', expected: '76 %-' },
				{ pattern: '% {number}-', expected: '% 76-' },
				{ pattern: '% -{number}', expected: '% -76' },
				{ pattern: '{number}- %', expected: '76- %' },
				{ pattern: 'unknown', expected: 'unknown' },
				{ pattern: 'foo-|{number}bar|%', expected: 'foo-|76bar|%' }
			].forEach((input) => {
				it(`should apply negative pattern "${input.pattern}"`, () => {
					documentLocaleSettings.overrides = { number: { patterns: { percent: { negativePattern: input.pattern } } } };
					const value = formatPercent(-0.76);
					expect(value).to.equal(input.expected);
				});
			});

		});

		describe('custom symbols', () => {

			it('should use custom symbols for positive numbers', () => {
				documentLocaleSettings.overrides = { number: { symbols: { percent: '&', group: '|', decimal: '$' } } };
				const value = formatPercent(38.287257);
				expect(value).to.equal('3|828$726 &');
			});

			it('should use custom symbols for negative numbers', () => {
				documentLocaleSettings.overrides = { number: { symbols: { percent: '&', negative: '=', group: '|', decimal: '$' } } };
				const value = formatPercent(-1029.382912);
				expect(value).to.equal('=102|938$291 &');
			});

		});

		describe('options', () => {

			it('should apply maximumFractionDigits', () => {
				const value = formatPercent(0.123456, { maximumFractionDigits: 1 });
				expect(value).to.equal('12.3 %');
			});

			it('should apply minimumFractionDigits', () => {
				const value = formatPercent(0.981, { minimumFractionDigits: 3 });
				expect(value).to.equal('98.100 %');
			});

		});

		[
			{ locale: 'ar', expect: ['42 %', '-42 %'] },
			{ locale: 'ar-SA', expect: ['42 %', '-42 %'] },
			{ locale: 'cy-GB', expect: ['42 %', '-42 %'] },
			{ locale: 'da', expect: ['42 %', '-42 %'] },
			{ locale: 'da-DK', expect: ['42 %', '-42 %'] },
			{ locale: 'de', expect: ['42 %', '-42 %'] },
			{ locale: 'de-DE', expect: ['42 %', '-42 %'] },
			{ locale: 'en', expect: ['42 %', '-42 %'] },
			{ locale: 'en-CA', expect: ['42 %', '-42 %'] },
			{ locale: 'en-GB', expect: ['42 %', '-42 %'] },
			{ locale: 'en-US', expect: ['42 %', '-42 %'] },
			{ locale: 'es', expect: ['42%', '-42%'] },
			{ locale: 'es-ES', expect: ['42%', '-42%'] },
			{ locale: 'es-MX', expect: ['42%', '-42%'] },
			{ locale: 'fr', expect: ['42 %', '-42 %'] },
			{ locale: 'fr-CA', expect: ['42 %', '-42 %'] },
			{ locale: 'fr-FR', expect: ['42 %', '-42 %'] },
			{ locale: 'fr-ON', expect: ['42 %', '-42 %'] },
			{ locale: 'hi', expect: ['42%', '-42%'] },
			{ locale: 'hi-IN', expect: ['42%', '-42%'] },
			{ locale: 'ja', expect: ['42%', '-42%'] },
			{ locale: 'ja-JP', expect: ['42%', '-42%'] },
			{ locale: 'ko', expect: ['42 %', '-42 %'] },
			{ locale: 'ko-KR', expect: ['42 %', '-42 %'] },
			{ locale: 'nl', expect: ['42 %', '-42 %'] },
			{ locale: 'nl-NL', expect: ['42 %', '-42 %'] },
			{ locale: 'pt', expect: ['42%', '-42%'] },
			{ locale: 'pt-BR', expect: ['42%', '-42%'] },
			{ locale: 'sv', expect: ['42 %', '-42 %'] },
			{ locale: 'sv-SE', expect: ['42 %', '-42 %'] },
			{ locale: 'tr', expect: ['%42', '-%42'] },
			{ locale: 'tr-TR', expect: ['%42', '-%42'] },
			{ locale: 'zh', expect: ['42%', '-42%'] },
			{ locale: 'zh-CN', expect: ['42%', '-42%'] },
			{ locale: 'zh-TW', expect: ['42%', '-42%'] }
		].forEach((input) => {
			let index = -1;
			['+', '-'].forEach((sign) => {
				const signedValue = (sign === '-') ? -0.42 : 0.42;
				it(`should format "${signedValue}" as a percent in locale ${input.locale}`, () => {
					documentLocaleSettings.language = input.locale;
					index++;
					const value = formatPercent(signedValue);
					expect(value).to.equal(input.expect[index]);
				});
			});
		});

	});

	describe('parseNumber', () => {

		describe('edge', () => {

			[
				undefined,
				null,
				'',
				'  		 ',
				' 0 	',
				'0',
				',',
				'  ,  ,'
			].forEach((input) => {
				it(`should parse "${input}" as 0`, () => {
					const value = parseNumber(input);
					expect(value).to.equal(0);
				});
			});

			[
				'abc',
				'a3',
				'-D4'
			].forEach((input) => {
				it(`should return NaN for invalid input "${input}"`, () => {
					const value = parseNumber(input);
					expect(isNaN(value)).to.be.true;
				});
			});

			[
				{ val: '1b', expected: 1 },
				{ val: '1.44e', expected: 1.44 },
				{ val: ' - 0.2ab09', expected: -0.2 },
				{ val: '4,593  	329.2b392-', expected: 4593329.2 }
			].forEach((input) => {
				it(`should stop on first invalid char "${input.val}"`, () => {
					const value = parseNumber(input.val);
					expect(value).to.equal(input.expected);
				});
			});

		});

		describe('decimals', () => {

			it('should parse decimal number', () => {
				const value = parseNumber('1000.20349');
				expect(value).to.equal(1000.20349);
			});

			it('should handle custom decimal symbol', () => {
				documentLocaleSettings.overrides = { number: { symbols: { decimal: '@' } } };
				const value = parseNumber('0@2194');
				expect(value).to.equal(0.2194);
			});

			it('should ignore subsequent decimal places', () => {
				const value = parseNumber('1000.203.49.');
				expect(value).to.equal(1000.20349);
			});

		});

		describe('groups', () => {

			it('should handle group separators', () => {
				const value = parseNumber('4,193,018.2028');
				expect(value).to.equal(4193018.2028);
			});

			it('should ignore spaces', () => {
				const value = parseNumber(' 9  2	9322, 293.29 	382 ');
				expect(value).to.equal(929322293.29382);
			});

			['|', ' '].forEach((sep) => {
				it(`should handle "${sep}" as a group separator`, () => {
					documentLocaleSettings.overrides = { number: { symbols: { group: sep } } };
					const value = parseNumber(`4${sep}193${sep}018.2028`);
					expect(value).to.equal(4193018.2028);
				});
			});

		});

		describe('negative', () => {

			[
				'({number})',
				'- {number}',
				'{number}-',
				'{number} -',
				'-{number}',
				'({number})',
				'- {number}',
				'{number}-',
				'{number} -',
				'-{number}'
			].forEach((pattern) => {
				it(`should handle negative pattern "${pattern}"`, () => {
					const input = pattern.replace('{number}', '3.14');
					const value = parseNumber(input);
					expect(value).to.equal(-3.14);
				});
			});

			it('should parse with custom negative symbol', () => {
				documentLocaleSettings.overrides = { number: { symbols: { negative: '^' } } };
				const value = parseNumber('^ 42');
				expect(value).to.equal(-42);
			});

		});

		describe('all locales', () => {
			const expects = [42, -42, 0.392, -0.392, 1234567890, -1234567890];
			[
				{ locale: 'ar', inputs: ['42', '42-', '0.392', '0.392-', '1,234,567,890', '1,234,567,890-'] },
				{ locale: 'ar-SA', inputs: ['42', '42-', '0.392', '0.392-', '1,234,567,890', '1,234,567,890-'] },
				{ locale: 'cy-GB', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'da', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'da-DK', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'de', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'de-DE', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'en', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'en-CA', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'en-GB', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'en-US', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'es', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'es-ES', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'es-MX', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'fr', inputs: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
				{ locale: 'fr-CA', inputs: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
				{ locale: 'fr-FR', inputs: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
				{ locale: 'fr-ON', inputs: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
				{ locale: 'hi', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'hi-IN', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'ja', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'ja-JP', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'ko', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'ko-KR', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'nl', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'nl-NL', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'pt', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'pt-BR', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'sv', inputs: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
				{ locale: 'sv-SE', inputs: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890'] },
				{ locale: 'tr', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'tr-TR', inputs: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890'] },
				{ locale: 'zh', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'zh-CN', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] },
				{ locale: 'zh-TW', inputs: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890'] }
			].forEach((input) => {
				let index = -1;
				input.inputs.forEach((value) => {
					it(`should parse "${value}" in locale ${input.locale}`, () => {
						documentLocaleSettings.language = input.locale;
						index++;
						const parsedValue = parseNumber(value);
						expect(parsedValue).to.equal(expects[index]);
					});
				});
			});
		});

	});

});
