'use strict';

var chai = require('chai'),
	expect = chai.expect,
	d2lIntl = require('../src/index');

chai.should();

describe('Intl', function() {

	it('should be defined', function() {
		expect(d2lIntl).to.be.defined;
	});

	it('should expose DateTimeFormat class', function() {
		expect(d2lIntl.DateTimeFormat).to.be.defined;
	});

	it('should expose DateTimeParse class', function() {
		expect(d2lIntl.DateTimeParse).to.be.defined;
	});

	it('should expose NumberFormat class', function() {
		expect(d2lIntl.NumberFormat).to.be.defined;
	});

	it('should expose NumberParse class', function() {
		expect(d2lIntl.NumberParse).to.be.defined;
	});

});
