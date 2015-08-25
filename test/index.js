var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();
chai.use(require('sinon-chai'));

import {Intl} from '../src/index';

describe('Intl', () => {

	it('should be defined', () => {
		expect(Intl).to.be.defined;
	});

});
