import { expect, oneEvent } from '@brightspace-ui/testing';
import { localeData, registerLocaleDataListener } from '../lib/locale-data/current.js';
import { getDocumentLocaleSettings } from '../lib/common.js';

const documentLocaleSettings = getDocumentLocaleSettings();

async function setLanguage(lang) {
	documentLocaleSettings.language = lang;
	await localeData;
}

describe('current', () => {

	afterEach(async() => {
		documentLocaleSettings.reset();
		await localeData;
		registerLocaleDataListener();
	});

	describe('localeData', () => {

		it('should be populated with the document lang data on load', () => {
			expect(localeData.sourceLocale).to.equal('en');
			expect(localeData.localeCode).to.equal('en');
			expect(Object.keys(localeData).length).to.be.above(0);
		});

		it('should fall back to the default locale', async() => {
			documentLocaleSettings.language = 'fr';
			await localeData;
			expect(localeData.sourceLocale).to.equal('fr');
			documentLocaleSettings.language = null;
			await localeData;
			expect(localeData.sourceLocale).to.equal('en');
			expect(localeData.localeCode).to.equal('en');
			expect(Object.keys(localeData).length).to.be.above(0);
		});

		it('should update its content, but keep the same object reference, when the language changes', async() => {
			const originalReference = localeData;
			await setLanguage('fr');
			expect(localeData).to.equal(originalReference);
			expect(localeData.sourceLocale).to.equal('fr');
		});

		it('should dispatch a "document-locale-data-change" event when the language changes', async() => {
			const eventPromise = oneEvent(document, 'document-locale-data-change');
			documentLocaleSettings.language = 'fr-ca';
			const event = await eventPromise;
			expect(event.detail.language).to.equal('fr-CA');
			expect(localeData.sourceLocale).to.equal('fr-CA');
		});

		it('should have the same set of top-level keys after switching locales', async() => {
			const originalKeys = Object.keys(localeData).sort();
			await setLanguage('ar');
			const newKeys = Object.keys(localeData).sort();
			expect(newKeys).to.deep.equal(originalKeys);
		});

		it('should be await-able, and resolve once its content reflects the newly-set language', async() => {
			documentLocaleSettings.language = 'fr';
			expect(localeData.sourceLocale).to.equal('en');
			await localeData;
			expect(localeData.sourceLocale).to.equal('fr');
		});

		['fr', 'FR '].forEach(l => {
			it(`should not trigger a new locale data update if the language does not actually change, "${l}"`, async() => {
				await setLanguage('fr');

				let eventCount = 0;
				const listener = () => eventCount++;
				document.addEventListener('document-locale-data-change', listener);

				documentLocaleSettings.language = l;
				await localeData;

				document.removeEventListener('document-locale-data-change', listener);
				expect(eventCount).to.equal(0);
				expect(localeData.sourceLocale).to.equal('fr');
			});
		});

		it('should be safe to await even when no locale change is, or ever was, pending', async() => {
			await localeData;
			await localeData;
		});

		it('should not expose "then"/"catch"/"finally" as enumerable locale data', () => {
			expect(Object.keys(localeData)).to.not.include.members(['then', 'catch', 'finally']);
			expect(typeof localeData.then).to.equal('function');
			expect(typeof localeData.catch).to.equal('function');
			expect(typeof localeData.finally).to.equal('function');
		});

	});

	describe('immutability', () => {

		describe('top level', () => {

			it('should not be extensible', () => {
				expect(Object.isExtensible(localeData)).to.be.false;
			});

			it('should throw when adding a new property', () => {
				expect(() => {
					localeData.someBrandNewProperty = 'foo';
				}).to.throw(TypeError);
				expect(localeData.someBrandNewProperty).to.be.undefined;
			});

			it('should throw when reassigning an existing scalar property', () => {
				const original = localeData.sourceLocale;
				expect(() => localeData.sourceLocale = 'zz').to.throw(TypeError);
				expect(localeData.sourceLocale).to.equal(original);
			});

			it('should still allow setLocaleData to update existing properties when the language changes', async() => {
				const original = localeData.sourceLocale;
				await setLanguage('fr');
				expect(localeData.sourceLocale).to.not.equal(original);
				expect(localeData.sourceLocale).to.equal('fr');
			});

			it('should keep top-level properties configurable, without being sealed, to allow future updates', () => {
				const descriptor = Object.getOwnPropertyDescriptor(localeData, 'sourceLocale');
				expect(descriptor.configurable).to.be.true;
				expect(Object.isSealed(localeData)).to.be.false;
			});

			it('should throw when calling defineProperty on the exported localeData directly', () => {
				const original = localeData.sourceLocale;
				expect(() => {
					Object.defineProperty(localeData, 'sourceLocale', { value: 'zz' });
				}).to.throw(TypeError);
				expect(localeData.sourceLocale).to.equal(original);
			});

			it('should block deletion of an existing top-level property, via both `delete` and Reflect.deleteProperty', () => {
				const original = localeData.sourceLocale;

				expect(() => delete localeData.sourceLocale).to.throw(TypeError);
				expect(localeData.sourceLocale).to.equal(original);

				expect(Reflect.deleteProperty(localeData, 'sourceLocale')).to.be.false;
				expect(localeData.sourceLocale).to.equal(original);
			});

			it('should return false from Reflect.deleteProperty for a non-existent property', () => {
				expect(Reflect.deleteProperty(localeData, 'thisPropertyDoesNotExist')).to.be.false;
			});

		});

		describe('nested data', () => {

			it('should throw when reassigning a nested object property', () => {
				expect(() => {
					localeData.dateFormats.full = 'foo';
				}).to.throw(TypeError);
			});

			it('should throw when adding a new property to a nested object', () => {
				expect(() => {
					localeData.dateFormats.newFormat = 'foo';
				}).to.throw(TypeError);
			});

			it('should throw when mutating a deeply nested array via push', () => {
				expect(() => localeData.pluralClass.cardinal.push('foo')).to.throw(TypeError);
			});

			it('should throw when reassigning a deeply nested array element', () => {
				expect(() => {
					localeData.pluralClass.cardinal[0] = 'foo';
				}).to.throw(TypeError);
			});

			it('should throw when deleting a property from a nested frozen object', () => {
				expect(() => {
					delete localeData.dateFormats.full;
				}).to.throw(TypeError);
			});

			it('should be frozen at every nested object/array level', () => {
				const isDeepFrozen = (value, seen = new Set()) => {
					if (!value || typeof value !== 'object' || seen.has(value)) return true;
					seen.add(value);
					if (!Object.isFrozen(value)) return false;
					return Object.values(value).every(v => isDeepFrozen(v, seen));
				};

				for (const key of Object.keys(localeData)) {
					expect(isDeepFrozen(localeData[key]), `expected localeData.${key} to be deeply frozen`).to.be.true;
				}
			});

		});

	});

});
