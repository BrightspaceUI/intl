function buildRe( part ) {

	var re = '';

	var or = '';
	for( var i = 0; i < part.length; i++ ) {
		re += or + part.substr( 0, i + 1 );
		or = '|';
	}

	return new RegExp( re, 'i' );

}

export default function(input, localeData, options) {

	if(input === undefined || input === null || input === '') {
		return null;
	}

	var nowProvider = options.nowProvider || function() { return new Date(); };
	var am = localeData.date.calendar.dayPeriods.am;
	var pm = localeData.date.calendar.dayPeriods.pm;
	var is24HourClock = localeData.date.hour24;
	var reAm = buildRe( am );
	var rePm = buildRe( pm );
	var today = nowProvider();
	var isMorning = ( today.getHours() < 12 );

	var reDigits = new RegExp( '(\\d+)', 'g' );

	var match = input.match( reDigits );
	if( match === null ) {
		return null;
	}

	var digits = match.join( '' );
	var hour = 0;
	var minute = 0;
	var leadingZero = (digits.substr(0, 1) === '0');

	if( digits.length === 1 ) {
		hour = digits.substr( 0, 1 );
	} else if( digits.length === 2 ) {
		hour = digits.substr( 0, 2 );
	} else if( digits.length === 3 ) {
		hour = digits.substr( 0, 1 );
		minute = digits.substr( 1, 2 );
	} else {
		hour = parseInt( digits.substr( 0, 2 ) );
		minute = parseInt( digits.substr( 2, 2 ) );
	}
	
	hour = parseInt( hour, 10 );
	hour = Math.min( Math.max( hour, 0 ), 23 );
	minute = parseInt( minute, 10 );
	minute = Math.min( Math.max( minute, 0 ), 59 );

	if( !is24HourClock && hour < 13 ) {

		var matchPm = input.match( rePm );
		var matchAm = input.match( reAm );
		var noAmPm = ( matchAm === null && matchPm === null );

		if( matchPm !== null || ( noAmPm && !isMorning && !leadingZero ) ) {
			hour += 12;
			if( hour == 24 ) {
				hour = 12;
			}
		} else if( hour == 12 ) {
			hour = 0;
		}

	}

	var time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute, 0 );
	return time;

}
