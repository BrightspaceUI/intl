import format from '../../src/file-size/format';

let chai = require('chai'),
	expect = chai.expect;

chai.should();

describe('file-size', () => {
	describe('format-file-size', () => {
		[
			{byteNum:0, expect:'0 Bytes'},
			{byteNum:-1, expect:'-1 Byte'},
			{byteNum:1, expect:'1 Byte'},
			{byteNum:2, expect:'2 Bytes'},
			{byteNum:-2, expect:'-2 Bytes'},
			{byteNum:1023, expect:'1,023 Bytes'},
			{byteNum:-1023, expect:'-1,023 Bytes'},
			{byteNum:1024, expect:'1 KB'},
			{byteNum:-1024, expect:'-1 KB'},
			{byteNum:1048576, expect:'1 MB'},
			{byteNum:-1048576, expect:'-1 MB'},
			{byteNum:1073741824, expect:'1 GB'},
			{byteNum:1073741824 * 2, expect:'2 GB'},
			{byteNum:-1073741824, expect:'-1 GB'},
			{byteNum:1881111114, expect:'1.75 GB'},
		].forEach(input => {
			it(`should parse the file-size: "${input.byteNum}" bytes`, () => {
				var options;
				var formatFileSize = new format('en', {});
				const parsedFileSize = formatFileSize.format(input.byteNum, options);
				expect(parsedFileSize).to.equal(input.expect);
			});
		});
	});
});
