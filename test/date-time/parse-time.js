'use strict';

var chai = require('chai'),
	expect = chai.expect,
	DateTimeParse = require('../../src/date-time/parse');

chai.should();

var nowMorning = new Date(2015, 7, 26, 2, 5);
var nowAfternoon = new Date(2015, 7, 26, 13, 15);
var now;

function parseTime(input, options) {
	options = options || {};
	options.nowProvider = function() { return now; };
	var parser = new DateTimeParse('en-US', options);
	var time = parser.parseTime(input);
	return time;
}

function assert(time, expectedHour, expectedMinute) {
	expect(time.getHours()).to.equal(expectedHour);
	expect(time.getMinutes()).to.equal(expectedMinute);
}

describe('DateTimeParse', function() {

	describe('parse-time', function() {

		beforeEach(function() {
			now = nowMorning;
		});

		[
			undefined,
			null,
			'',
			'  	',
			'abcd'
		].forEach(function(input) {
			it('should return "null" for input "' + input + '"', function() {
				var time = parseTime(input);
				expect(time).to.be.null;
			});
		});

		it('should use today as default "nowProvider"', function() {
			var now = new Date();
			var parser = new DateTimeParse('en-US');
			var time = parser.parseTime('3:01 PM');
			expect(time.getFullYear()).to.equal(now.getFullYear());
			expect(time.getMonth()).to.equal(now.getMonth());
			expect(time.getDate()).to.equal(now.getDate());
		});

		describe('morning', function() {

			it('should interpret a single digit as the hour', function() {
				var time = parseTime('5');
				assert(time, 5, 0);
			});

			it('should treat leading zeros in 1-digit input as midnight', function() {
				var time = parseTime('0');
				assert(time, 0, 0);
			});

			it('should interpret two digits as the hour', function() {
				var time = parseTime('18');
				assert(time, 18, 0);
			});

			it('should treat leading zeros in 2-digit input as 0h', function() {
				var time = parseTime('08');
				assert(time, 8, 0);
			});

			it('should round hour down to 23', function() {
				var time = parseTime('39');
				assert(time, 23, 0);
			});

			it('should interpret three digits as hmm', function() {
				var time = parseTime('231');
				assert(time, 2, 31);
			});

			it('should treat leading zeros in 3-digit inputs as 0mm', function() {
				var time = parseTime('023');
				assert(time, 0, 23);
			});

			it('should round minute down to 59', function() {
				var time = parseTime('299');
				assert(time, 2, 59);
			});

			it('should interpret four digits as hhmm', function() {
				var time = parseTime('1439');
				assert(time, 14, 39);
			});

			it('should treat leading zeros in four-digit inputs as 0hmm', function() {
				var time = parseTime('0439');
				assert(time, 4, 39);
			});

			it('should ignore digits beyond 4', function() {
				var time = parseTime('11345678');
				assert(time, 11, 34);
			});

			it('should treat "12" hour as midnight in the morning', function() {
				var time = parseTime('12');
				assert(time, 0, 0);
			});

			it('should support custom PM day period', function() {
				var options = {locale:{date:{calendar:{dayPeriods:{'pm':'vw'}}}}};
				var time = parseTime('5 vw', options);
				assert(time, 17, 0);
			});

			[
				{val: '1:01', hour: 1, minute: 1},
				{val: '1:01 PM', hour: 13, minute: 1},
				{val: '1:01 pm', hour: 13, minute: 1},
				{val: '1:01 P.M.', hour: 13, minute: 1},
				{val: '11 h 29', hour: 11, minute: 29},
				{val: '22 h 56', hour: 22, minute: 56},
				{val: 'pm 9:29', hour: 21, minute: 29}
			].forEach(function(input) {
				it('should parse time "' + input.val + '"', function() {
					var time = parseTime(input.val);
					assert(time, input.hour, input.minute);
				});
			});

		});

		describe('afternoon', function() {

			beforeEach(function() {
				now = nowAfternoon;
			});

			it('should treat leading zeros in 1-digit input as midnight', function() {
				var time = parseTime('0');
				assert(time, 0, 0);
			});

			it('should treat hour as PM if now is afternoon', function() {
				var time = parseTime('5');
				assert(time, 17, 0);
			});

			it('should treat leading zeros in 2-digit input as 0h', function() {
				var time = parseTime('05');
				assert(time, 5, 0);
			});

			it('should treat leading zeros in 3-digit input as 0mm', function() {
				var time = parseTime('029');
				assert(time, 0, 29);
			});

			it('should treat leading zeros in 4-digit input as 0hmm', function() {
				var time = parseTime('0420');
				assert(time, 4, 20);
			});

			it('should not treat hour as PM if using 24-hour clock', function() {
				var options = {
					locale: {date:{hour24: true}}
				};
				var time = parseTime('5', options);
				assert(time, 5, 0);
			});

			it('should treat "12" as noon', function() {
				var time = parseTime('12');
				assert(time, 12, 0);
			});

			it('should support custom AM day period', function() {
				var options = {locale:{date:{calendar:{dayPeriods:{'am':'zy'}}}}};
				var time = parseTime('3 zy', options);
				assert(time, 3, 0);
			});

			[
				{val: '1:01', hour: 13, minute: 1},
				{val: '1:01 am', hour: 1, minute: 1},
				{val: '1:01 am', hour: 1, minute: 1},
				{val: '1:01 A.M.', hour: 1, minute: 1},
				{val: '11 h 29', hour: 23, minute: 29},
				{val: '22 h 56', hour: 22, minute: 56},
				{val: 'am 9:29', hour: 9, minute: 29}
			].forEach(function(input) {
				it('should parse time "' + input.val + '"', function() {
					var time = parseTime(input.val);
					assert(time, input.hour, input.minute);
				});
			});

		});

	});

});
