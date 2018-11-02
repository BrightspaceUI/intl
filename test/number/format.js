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

	});

});
