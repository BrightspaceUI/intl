import {default as prePadByZero} from '../../util/pre-pad-by-zero';

export default function(date, localeData) {

	var timeFormat = localeData.date.formats.timeFormats.short;
	var am = localeData.date.calendar.dayPeriods.am;
	var pm = localeData.date.calendar.dayPeriods.pm;

	var hour = date.getHours();
	var hour24 = hour;
	var hour24Pad = prePadByZero( hour, 2 );
	var hour12 = hour % 12;
	if( hour12 === 0 ) {
		hour12 = 12;
	}
	var hour12Pad = prePadByZero( hour12, 2 );
	var minute = prePadByZero( date.getMinutes(), 2 );

	var replacements = [
			{ key: 'HH', value: hour24Pad },
			{ key: 'H', value: hour24 },
			{ key: 'hh', value: hour12Pad },
			{ key: 'h', value: hour12 },
			{ key: 'mm', value: minute },
			{ key: 'tt', value: ( hour > 11 ) ? pm : am }
		];

	var doReplacements = function( buf ) {
			for( var i = 0; i < replacements.length; i++ ) {
				var rep = replacements[i];
				buf = buf.replace( rep.key, rep.value );
			}
			return buf;
		};

	var escape = false;
	var buffer = '';
	var value = '';
	for( var i = 0; i < timeFormat.length; i++ ) {
		var c = timeFormat.charAt( i );
		if( c == "'" ) {
			if( !escape ) {
				value += doReplacements( buffer );
				buffer = '';
			}
			escape = !escape;
		} else if( escape ) {
			value += c;
		} else {
			buffer += c;
			if( i == timeFormat.length - 1 ) {
				value += doReplacements( buffer );
			}
		}
	}

	return value;

}
