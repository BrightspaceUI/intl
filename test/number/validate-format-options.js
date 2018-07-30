import validate from '../../src/number/validate-format-options.js';

var expect = chai.expect;

describe('validate-format-options', function() {

	[undefined, null, {}].forEach(function(options) {
		it('should apply proper defaults', function() {
			var value = validate(options);
			expect(value.style).to.equal('decimal');
			expect(value.minimumFractionDigits).to.equal(0);
			expect(value.maximumFractionDigits).to.equal(3);
		});
	});

	['decimal', 'percent'].forEach(function(style) {
		it('should leave valid style "' + style + '" untouched', function() {
			var value = validate({style: style});
			expect(value.style).to.equal(style);
		});
	});

	it('should convert invalid style to "decimal"', function() {
		var value = validate({style: 'bad'});
		expect(value.style).to.equal('decimal');
	});

	it('should leave valid minimumFractionDigits untouched', function() {
		var value = validate({minimumFractionDigits: 2});
		expect(value.minimumFractionDigits).to.equal(2);
	});

	it('should throw if minimumFractionDigits < 0', function() {
		expect(function() {
			validate({minimumFractionDigits: -1});
		}).to.throw(RangeError, 'minimumFractionDigits value is out of range.');
	});

	it('should throw if minimumFractionDigits > 20', function() {
		expect(function() {
			validate({minimumFractionDigits: 21});
		}).to.throw(RangeError, 'minimumFractionDigits value is out of range.');
	});

	it('should leave valid maximumFractionDigits untouched', function() {
		var value = validate({maximumFractionDigits: 2});
		expect(value.maximumFractionDigits).to.equal(2);
	});

	it('should default maximumFractionDigits to minimumFractionDigits if >3', function() {
		var value = validate({minimumFractionDigits: 4});
		expect(value.maximumFractionDigits).to.equal(4);
	});

	it('should default maximumFractionDigits to 3 if minimumFractionDigits<3', function() {
		var value = validate({minimumFractionDigits: 1});
		expect(value.maximumFractionDigits).to.equal(3);
	});

	it('should throw if maximumFractionDigits < 0', function() {
		expect(function() {
			validate({maximumFractionDigits: -1});
		}).to.throw(RangeError, 'maximumFractionDigits value is out of range.');
	});

	it('should throw if maximumFractionDigits > 20', function() {
		expect(function() {
			validate({maximumFractionDigits: 21});
		}).to.throw(RangeError, 'maximumFractionDigits value is out of range.');
	});

	it('should throw if maximumFractionDigits > minimumFractionDigits', function() {
		expect(function() {
			validate({minimumFractionDigits: 5, maximumFractionDigits: 4});
		}).to.throw(RangeError, 'maximumFractionDigits value is out of range.');
	});

});
