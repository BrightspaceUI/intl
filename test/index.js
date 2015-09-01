var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import Intl from '../src/index';

describe('Intl', () => {

	it('should be defined', () => {
		expect(Intl).to.be.defined;
	});

	it('should expose DateTimeFormat class', () => {
		expect(Intl.DateTimeFormat).to.be.defined;
	});

	it('should expose DateTimeParse class', () => {
		expect(Intl.DateTimeParse).to.be.defined;
	});

	it('should expose NumberFormat class', () => {
		expect(Intl.NumberFormat).to.be.defined;
	});

	it('should expose NumberParse class', () => {
		expect(Intl.NumberParse).to.be.defined;
	});

});
