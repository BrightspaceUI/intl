import format from '../../src/number/format.js';

var expect = chai.expect;

describe('NumberFormat', function() {

	describe('format', function() {

		describe('style', function() {

			it('should default to decimal format', function() {
				var numberFormat = new format('en-US');
				var value = numberFormat.format(23);
				expect(value).to.equal('23');
			});

			it('should use decimal format', function() {
				var numberFormat = new format('en-US', {style:'decimal'});
				var value = numberFormat.format(1075.3219);
				expect(value).to.equal('1,075.322');
			});

			it('should use percent format', function() {
				var numberFormat = new format('en-US', {style:'percent'});
				var value = numberFormat.format(-0.753219);
				expect(value).to.equal('-75.322 %');
			});

		});

		describe('all locales', () => {
			[
				{locale: 'ar', expect: ['42', '42-', '0.392', '0.392-', '1,234,567,890', '1,234,567,890-']},
				{locale: 'ar-SA', expect: ['42', '42-', '0.392', '0.392-', '1,234,567,890', '1,234,567,890-']},
				{locale: 'da', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'da-DK', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'de', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'de-DE', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'en', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'en-CA', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'en-GB', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'en-US', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'es', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890']},
				{locale: 'es-MX', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'fr', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890']},
				{locale: 'fr-FR', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890']},
				{locale: 'fr-CA', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890']},
				{locale: 'ja', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'ja-JP', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'ko', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'ko-KR', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'nl', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'nl-NL', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'pt', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890']},
				{locale: 'pt-BR', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890']},
				{locale: 'sv', expect: ['42', '-42', '0,392', '-0,392', '1 234 567 890', '-1 234 567 890']},
				{locale: 'sv-SE', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890']},
				{locale: 'tr', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890']},
				{locale: 'tr-TR', expect: ['42', '-42', '0,392', '-0,392', '1.234.567.890', '-1.234.567.890']},
				{locale: 'zh', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'zh-CN', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']},
				{locale: 'zh-TW', expect: ['42', '-42', '0.392', '-0.392', '1,234,567,890', '-1,234,567,890']}
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
							index++;
							const numberFormat = new format(input.locale, {style: 'decimal'});
							const output = numberFormat.format(signedValue);
							expect(output).to.equal(input.expect[index]);
						});
					});
				});
			});

			[
				{locale: 'ar', expect: ['42 %', '-42 %']},
				{locale: 'ar-SA', expect: ['42 %', '-42 %']},
				{locale: 'da', expect: ['42 %', '-42 %']},
				{locale: 'da-DK', expect: ['42 %', '-42 %']},
				{locale: 'de', expect: ['42 %', '-42 %']},
				{locale: 'de-DE', expect: ['42 %', '-42 %']},
				{locale: 'en', expect: ['42 %', '-42 %']},
				{locale: 'en-CA', expect: ['42 %', '-42 %']},
				{locale: 'en-GB', expect: ['42 %', '-42 %']},
				{locale: 'en-US', expect: ['42 %', '-42 %']},
				{locale: 'es', expect: ['42 %', '-42 %']},
				{locale: 'es-MX', expect: ['42%', '-42%']},
				{locale: 'fr', expect: ['42 %', '-42 %']},
				{locale: 'fr-FR', expect: ['42 %', '-42 %']},
				{locale: 'fr-CA', expect: ['42 %', '-42 %']},
				{locale: 'ja', expect: ['42%', '-42%']},
				{locale: 'ja-JP', expect: ['42%', '-42%']},
				{locale: 'ko', expect: ['42 %', '-42 %']},
				{locale: 'ko-KR', expect: ['42 %', '-42 %']},
				{locale: 'nl', expect: ['42 %', '-42 %']},
				{locale: 'nl-NL', expect: ['42 %', '-42 %']},
				{locale: 'pt', expect: ['42%', '-42%']},
				{locale: 'pt-BR', expect: ['42%', '-42%']},
				{locale: 'sv', expect: ['42 %', '-42 %']},
				{locale: 'sv-SE', expect: ['%42', '-%42']},
				{locale: 'tr', expect: ['%42', '-%42']},
				{locale: 'tr-TR', expect: ['%42', '-%42']},
				{locale: 'zh', expect: ['42%', '-42%']},
				{locale: 'zh-CN', expect: ['42%', '-42%']},
				{locale: 'zh-TW', expect: ['42%', '-42%']}
			].forEach((input) => {
				let index = -1;
				['+', '-'].forEach((sign) => {
					const signedValue = (sign === '-') ? -0.42 : 0.42;
					it(`should format "${signedValue}" as a percent in locale ${input.locale}`, () => {
						index++;
						const numberFormat = new format(input.locale, {style: 'percent'});
						const output = numberFormat.format(signedValue);
						expect(output).to.equal(input.expect[index]);
					});
				});
			});

		});

	});

});
