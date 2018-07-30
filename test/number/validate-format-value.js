import validate from '../../src/number/validate-format-value.js';

var expect = chai.expect;

describe('validate-format-value', function() {

	it('should default undefined to 0', function() {
		var value = validate(undefined);
		expect(value).to.equal(0);
	});

	it('should default null to 0', function() {
		var value = validate(null);
		expect(value).to.equal(0);
	});

	it('should parse string values', function() {
		var value = validate('3.14');
		expect(value).to.equal(3.14);
	});

	it('should throw range error for non-parsable strings', function() {
		expect(function() {
			validate('oh no');
		}).to.throw(RangeError);
	});

	it('should throw range error for non-number values', function() {
		expect(function() {
			validate(new Date());
		}).to.throw(RangeError);
	});

});
