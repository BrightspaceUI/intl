import { commonResourcesImportCount, Localize, localizeMarkup } from '../lib/localize.js';
import { expect, fixture } from '@brightspace-ui/testing';

const resources = {
	en: {
		basic: '{employerName} is my employer',
		many: 'This {type} has {count} arguments',
		html: '<paragraph>Wrapped in tags</paragraph>'
	},
	'en-gb': {
		basic: '{employerName} is my employer, but British!'
	},
	mi: {
		plural: '{a, plural, one {one} other {other}}',
		ordinal: '{a, selectordinal, one {one} other {other}}'
	}
};

describe('Localize', () => {

	let config, localizer, runCount, updatePromise;
	beforeEach(async() => {
		await fixture('<div></div>');
		runCount = 0;

		let resolve;
		updatePromise = new Promise(r => resolve = r);

		config = {
			importFunc: async lang => await new Promise(r => setTimeout(() => r(resources[lang]), 1)),
			onResourcesChange: () => {
				if (runCount) resolve();
				runCount++;
			}
		};
		localizer = new Localize(config);
		expect(runCount).to.equal(0);
	});

	afterEach(() => {
		localizer.disconnect();
	});

	it('should not be set up before ready', async() => {
		expect(runCount).to.equal(0);
		expect(localizer.localize.resources).to.be.undefined;
		expect(localizer.localize.resolvedLocale).to.be.undefined;
		expect(localizer.pristine).to.be.true;
	});

	it('should have been set up when ready', async() => {
		await localizer.ready;
		expect(runCount).to.equal(1);
		expect(localizer.localize.resources).to.be.an('object');
		expect(localizer.localize.resolvedLocale).to.equal('en');
		expect(localizer.pristine).to.be.false;
	});

	it('should have its own localize method', async() => {
		await localizer.ready;
		expect(Object.hasOwn(localizer, 'localize')).to.be.true;
	});

	it('should not share resources between instances', async() => {
		await localizer.ready;
		const localizer2 = new Localize({ importFunc: config.importFunc });
		expect(localizer2.localize.resources).to.be.undefined;
		await localizer2.ready;
		expect(localizer2.localize.resources).to.be.an('object');
		expect(localizer.localize.resources).to.not.equal(localizer2.localize.resources);
		expect(localizer.localize.resources).to.deep.equal(localizer2.localize.resources);
	});

	it('should handle static resources with no importFunc', async() => {
		class StaticLocalizer extends Localize {
			static async getLocalizeResources(langs) {
				for (let i = 0; i < langs.length; i++) {
					if (resources[langs[i]]) {
						return {
							language: langs[i],
							resources: resources[langs[i]]
						};
					}
				}
			}
			constructor() {
				super({});
			}
		}
		const staticLocalizer = new StaticLocalizer();
		await staticLocalizer.ready;
		const localized = staticLocalizer.localize('basic', { employerName: 'D2L' });
		expect(localized).to.equal('D2L is my employer');
	});

	describe('onResourcesChange', () => {

		it('runs when the document locale changes', async() => {
			await localizer.ready;
			expect(localizer.localize.resolvedLocale).to.equal('en');
			document.documentElement.lang = 'en-gb';
			await updatePromise;
			expect(runCount).to.equal(2);
			expect(localizer.localize.resolvedLocale).to.equal('en-gb');
		});

	});

	describe('localize()', () => {

		it('should localize text', async() => {
			await localizer.ready;
			const localized = localizer.localize('basic', { employerName: 'D2L' });
			expect(localized).to.equal('D2L is my employer');
		});

		it('should accept exapnded/spread params', async() => {
			await localizer.ready;
			const localized = localizer.localize('many', 'type', 'message', 'count', 2);
			expect(localized).to.equal('This message has 2 arguments');
		});

		it('should select the correct category for shimmed locales', async() => {
			await localizer.ready;
			document.documentElement.lang = 'mi';
			await updatePromise;

			const pluralOne = localizer.localize('plural', { a: 1 });
			expect(pluralOne).to.equal('one');

			const pluralTwo = localizer.localize('plural', { a: 2 });
			expect(pluralTwo).to.equal('other');

			const ordinalOne = localizer.localize('ordinal', { a: 1 });
			expect(ordinalOne).to.equal('other');

			const ordinalTwo = localizer.localize('ordinal', { a: 2 });
			expect(ordinalTwo).to.equal('other');
		});

	});

	describe('common', () => {

		let localizerCommon;
		beforeEach(async() => {
			localizerCommon = new Localize({
				loadCommon: true
			});
			await localizerCommon.ready;
		});

		afterEach(() => localizerCommon.disconnect());

		it('should only load common resources once', async() => {
			const localizer1 = new Localize({ loadCommon: true });
			const localizer2 = new Localize({ loadCommon: true });
			await Promise.all([localizer1.ready, localizer2.ready]);
			expect(commonResourcesImportCount).to.equal(1);
			localizer1.disconnect();
			localizer2.disconnect();
		});

		describe('localizeCharacter', () => {

			it('should localize "&"', async() => {
				const localized = localizerCommon.localizeCharacter('&');
				expect(localized).to.equal('ampersand');
			});

			it('should throw an error for unknown characters', async() => {
				expect(() => localizerCommon.localizeCharacter('$'))
					.to.throw('localizeCharacter() does not support character: "$"');
			});

			it('should throw an error if common resources are not loaded', async() => {
				await localizer.ready;
				expect(() => localizer.localizeCharacter(':'))
					.to.throw('localizeCharacter() cannot be used unless loadCommon in localizeConfig is enabled');
			});

		});

	});

	describe('localizeHTML()', () => {

		it('should localize, replacing tags with HTML', async() => {
			await localizer.ready;
			const localized = localizer.localizeHTML('html', { paragraph: chunks => localizeMarkup`<p id="my-paragraph">${chunks}</p>` });
			expect(localized).to.equal('<p id="my-paragraph">Wrapped in tags</p>');
		});

	});

});
