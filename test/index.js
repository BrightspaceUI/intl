'use strict';

var chai = require('chai'),
	expect = chai.expect,
	d2lIntl = require('../src/index');

chai.should();

describe('Intl', function() {

	it('should be defined', function() {
		expect(d2lIntl).to.not.be.undefined;
	});

	it('should expose DateTimeFormat class', function() {
		expect(d2lIntl.DateTimeFormat).to.not.be.undefined;
	});

	it('should expose DateTimeParse class', function() {
		expect(d2lIntl.DateTimeParse).to.not.be.undefined;
	});

	it('should expose NumberFormat class', function() {
		expect(d2lIntl.NumberFormat).to.not.be.undefined;
	});

	it('should expose NumberParse class', function() {
		expect(d2lIntl.NumberParse).to.not.be.undefined;
	});

	it('should expose LocaleProvider class', function() {
		expect(d2lIntl.LocaleProvider).to.not.be.undefined;
	});

});
