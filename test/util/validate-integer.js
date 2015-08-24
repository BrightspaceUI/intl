let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as validate} from '../../src/util/validate-integer';

describe('validate-integer', () => {

	it('should default undefined', () => {
		let value = validate('foo', undefined, 42);
		expect(value).to.equal(42);
	});

	it('should default null', () => {
		let value = validate('foo', null, 14);
		expect(value).to.equal(14);
	});

	it('should parse string values', () => {
		let value = validate('foo', '3');
		expect(value).to.equal(3);
	});

	it('should throw range error for non-parsable strings', () => {
		expect(() => {
			validate('foo', 'oh no');
		}).to.throw(RangeError);
	});

	it('should throw range error for non-number values', () => {
		expect(() => {
			validate('foo', new Date());
		}).to.throw(RangeError);
	});

	it('should throw range error if value is less than min', () => {
		expect(() => {
			validate('foo', 12, undefined, 13);
		}).to.throw(RangeError);
	});

	it('should throw range error if value is greater than max', () => {
		expect(() => {
			validate('foo', 12, undefined, undefined, 11);
		}).to.throw(RangeError);
	});

});
