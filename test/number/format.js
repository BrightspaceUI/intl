let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as format} from '../../src/number/format';
import {default as defaultLocaleData} from './default-locale-data.json';

describe('NumberFormat', () => {

	describe.only('format', () => {

		let localeData;

		beforeEach(() => {
			localeData = {
				number: JSON.parse(JSON.stringify(defaultLocaleData))
			};
		});

		it('should default to decimal format', () => {
			const numberFormat = new format(localeData);
			const value = numberFormat.format(23);
			expect(value).to.equal('23');
		});

		it('should use decimal format', () => {
			const numberFormat = new format(localeData, {style:'decimal'});
			const value = numberFormat.format(1075.3219);
			expect(value).to.equal('1,075.322');
		});

		it('should use percent format', () => {
			const numberFormat = new format(localeData, {style:'percent'});
			const value = numberFormat.format(-0.753219);
			expect(value).to.equal('-75.322 %');
		});

	});

});
