let chai = require('chai'),
	expect = chai.expect;

chai.should();

import format from '../../src/number/format';

describe('NumberFormat', () => {

	describe('format', () => {

		describe('style', () => {

			it('should default to decimal format', () => {
				const numberFormat = new format('en-US');
				const value = numberFormat.format(23);
				expect(value).to.equal('23');
			});

			it('should use decimal format', () => {
				const numberFormat = new format('en-US', {style:'decimal'});
				const value = numberFormat.format(1075.3219);
				expect(value).to.equal('1,075.322');
			});

			it('should use percent format', () => {
				const numberFormat = new format('en-US', {style:'percent'});
				const value = numberFormat.format(-0.753219);
				expect(value).to.equal('-75.322 %');
			});

		});

	});

});
