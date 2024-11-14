import { commonResourcesImportCount, LocalizeCommon } from '../lib/localize-common.js';
import { expect, fixture } from '@brightspace-ui/testing';

describe('LocalizeCommon', () => {

	let localizer;
	beforeEach(async() => {
		await fixture('<div></div>');
		localizer = new LocalizeCommon();
		await localizer.ready;
	});

	afterEach(() => localizer.disconnect());

	it('should only load common resources once', async() => {
		const localizer2 = new LocalizeCommon();
		await localizer2.ready;
		expect(commonResourcesImportCount).to.equal(1);
		localizer2.disconnect();
	});

	describe('localizeCharacter', () => {

		it('should localize "&"', async() => {
			const localized = localizer.localizeCharacter('&');
			expect(localized).to.equal('ampersand');
		});

		it('should throw an error for unknown characters', async() => {
			expect(() => localizer.localizeCharacter('$'))
				.to.throw('localizeCharacter() does not support character: "$"');
		});

	});

});
