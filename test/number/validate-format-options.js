let chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {default as validate} from '../../src/number/validate-format-options';

describe('validate-format-options', () => {

	[undefined, null, {}].forEach((options) => {
		it('should apply proper defaults', () => {
			let value = validate(options);
			expect(value.style).to.equal('decimal');
			expect(value.minimumFractionDigits).to.equal(0);
			expect(value.maximumFractionDigits).to.equal(3);
		});
	});

	['decimal', 'percent'].forEach((style) => {
		it(`should leave valid style "${style}" untouched`, () => {
			let value = validate({style: style});
			expect(value.style).to.equal(style);
		});
	});

	it('should convert invalid style to "decimal"', () => {
		let value = validate({style: 'bad'});
		expect(value.style).to.equal('decimal');
	});

	it('should leave valid minimumFractionDigits untouched', () => {
		let value = validate({minimumFractionDigits: 2});
		expect(value.minimumFractionDigits).to.equal(2);
	});

	it('should throw if minimumFractionDigits < 0', () => {
		expect(() => {
			validate({minimumFractionDigits: -1});
		}).to.throw(RangeError, 'minimumFractionDigits value is out of range.');
	});

	it('should throw if minimumFractionDigits > 20', () => {
		expect(() => {
			validate({minimumFractionDigits: 21});
		}).to.throw(RangeError, 'minimumFractionDigits value is out of range.');
	});

	it('should leave valid maximumFractionDigits untouched', () => {
		let value = validate({maximumFractionDigits: 2});
		expect(value.maximumFractionDigits).to.equal(2);
	});

	it('should default maximumFractionDigits to minimumFractionDigits if >3', () => {
		let value = validate({minimumFractionDigits: 4});
		expect(value.maximumFractionDigits).to.equal(4);
	});

	it('should default maximumFractionDigits to 3 if minimumFractionDigits<3', () => {
		let value = validate({minimumFractionDigits: 1});
		expect(value.maximumFractionDigits).to.equal(3);
	});

	it('should throw if maximumFractionDigits < 0', () => {
		expect(() => {
			validate({maximumFractionDigits: -1});
		}).to.throw(RangeError, 'maximumFractionDigits value is out of range.');
	});

	it('should throw if maximumFractionDigits > 20', () => {
		expect(() => {
			validate({maximumFractionDigits: 21});
		}).to.throw(RangeError, 'maximumFractionDigits value is out of range.');
	});

	it('should throw if maximumFractionDigits > minimumFractionDigits', () => {
		expect(() => {
			validate({minimumFractionDigits: 5, maximumFractionDigits: 4});
		}).to.throw(RangeError, 'maximumFractionDigits value is out of range.');
	});

});
