import validate from '../../src/util/validate-integer.js';

var expect = chai.expect;

describe('validate-integer', function() {

	it('should default undefined', function() {
		var value = validate('foo', undefined, 42);
		expect(value).to.equal(42);
	});

	it('should default null', function() {
		var value = validate('foo', null, 14);
		expect(value).to.equal(14);
	});

	it('should parse string values', function() {
		var value = validate('foo', '3');
		expect(value).to.equal(3);
	});

	it('should throw range error for non-parsable strings', function() {
		expect(function() {
			validate('foo', 'oh no');
		}).to.throw(RangeError);
	});

	it('should throw range error for non-number values', function() {
		expect(function() {
			validate('foo', new Date());
		}).to.throw(RangeError);
	});

	it('should throw range error if value is less than min', function() {
		expect(function() {
			validate('foo', 12, undefined, 13);
		}).to.throw(RangeError);
	});

	it('should throw range error if value is greater than max', function() {
		expect(function() {
			validate('foo', 12, undefined, undefined, 11);
		}).to.throw(RangeError);
	});

});
