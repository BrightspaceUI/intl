let chai = require('chai'),
	expect = chai.expect;

chai.should();

import validate from '../../src/number/validate-format-value';

describe('validate-format-value', () => {

	it('should default undefined to 0', () => {
		let value = validate(undefined);
		expect(value).to.equal(0);
	});

	it('should default null to 0', () => {
		let value = validate(null);
		expect(value).to.equal(0);
	});

	it('should parse string values', () => {
		let value = validate('3.14');
		expect(value).to.equal(3.14);
	});

	it('should throw range error for non-parsable strings', () => {
		expect(() => {
			validate('oh no');
		}).to.throw(RangeError);
	});

	it('should throw range error for non-number values', () => {
		expect(() => {
			validate(new Date());
		}).to.throw(RangeError);
	});

});
