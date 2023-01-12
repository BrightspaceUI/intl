import { getDocumentLocaleSettings, getLanguage, merge } from './common.js';

const hour24locales = ['cy', 'da', 'de', 'es', 'fr', 'nl', 'pt', 'sv', 'tr', 'zh'];
const mondayFirstDayLocales = ['cy', 'da', 'de', 'fr', 'hi', 'nl', 'sv', 'tr'];

// timezone abbreviations and offsets from https://www.timeanddate.com/time/zones/
const timezoneOffsetMap = {
	'ACDT': '+1030',
	'ACST': '+0930',
	'ACT': '-0500',
	'ACWST': '+0845',
	'AEDT': '+1100',
	'AEST': '+1000',
	'AET': '+1000',
	'AFT': '+0430',
	'AKDT': '-0800',
	'AKST': '-0900',
	'ALMT': '+0600',
	'ANAST': '+1200',
	'ANAT': '+1200',
	'AQTT': '+0500',
	'ART': '-0300',
	'AWDT': '+0900',
	'AWST': '+0800',
	'AZODT': '+0000',
	'AZOST': '+0000',
	'AZOT': '-0100',
	'AZST': '+0500',
	'AZT': '+0400',
	'B': '+0200',
	'BDST': '+0100',
	'BIOT': '+0600',
	'BIT': '-1200',
	'BNT': '+0800',
	'BOT': '-0400',
	'BRST': '-0200',
	'BRT': '-0300',
	'BT': '-0300',
	'BTT': '+0600',
	'C': '+0300',
	'CAST': '+0800',
	'CAT': '+0200',
	'CCT': '+0630',
	'CEDT': '+0200',
	'CEST': '+0200',
	'CET': '+0100',
	'CHADT': '+1345',
	'CHAST': '+1245',
	'CHOT': '+0800',
	'CHODT': '+0900',
	'CHODST': '+0900',
	'CHOST': '+0900',
	'CHST': '+1000',
	'CHUT': '+1000',
	'CIDST': '-0400',
	'CIST': '-0500',
	'CIT': '-0500',
	'CKT': '-1000',
	'CLDT': '-0300',
	'CLST': '-0300',
	'CLT': '-0400',
	'COST': '-0400',
	'COT': '-0500',
	'CT': '-0600',
	'CVT': '-0100',
	'CWST': '+0845',
	'CXT': '+0700',
	'D': '+0400',
	'DAVT': '+0700',
	'DDUT': '+1000',
	'DFT': '+0100',
	'E': '+0500',
	'EADT': '-0500',
	'EASST': '-0500',
	'EAST': '-0600',
	'EAT': '+0300',
	'ECST': '+0200',
	'EEDT': '+0300',
	'EEST': '+0300',
	'EET': '+0200',
	'EFATE': '+1100',
	'EGST': '+0000',
	'EGT': '-0100',
	'EIT': '+0900',
	'ET': '-0500',
	'F': '+0600',
	'FET': '+0300',
	'FJDT': '+1300',
	'FJST': '+1300',
	'FJT': '+1200',
	'FKDT': '-0300',
	'FKST': '-0300',
	'FKT': '-0400',
	'FNT': '-0200',
	'G': '+0700',
	'GALT': '-0600',
	'GAMT': '-0900',
	'GET': '+0400',
	'GFT': '-0300',
	'GILT': '+1200',
	'GIT': '-0900',
	'GMT': '+0000',
	'GT': '+0000',
	'GYT': '-0400',
	'HAC': '-0500',
	'HAR': '-0600',
	'HNA': '-0400',
	'HNC': '-0600',
	'HNP': '-0800',
	'HNR': '-0700',
	'H': '+0800',
	'HAA': '-0300',
	'HADT': '-0900',
	'HAE': '-0400',
	'HAEC': '+0200',
	'HAP': '-0700',
	'HAST': '-1000',
	'HAT': '-0230',
	'HDT': '-0900',
	'HKT': '+0800',
	'HLV': '-0400',
	'HMT': '+0500',
	'HNE': '-0500',
	'HNT': '-0330',
	'HOVDT': '+0800',
	'HOVDST': '+0800',
	'HOVST': '+0800',
	'HOVT': '+0700',
	'HST': '-1000',
	'I': '+0900',
	'ICT': '+0700',
	'IDLW': '-1200',
	'IOT': '+0600',
	'IRDT': '+0430',
	'IRKST': '+0900',
	'IRKT': '+0800',
	'IRST': '+0330',
	'JST': '+0900',
	'K': '+1000',
	'KALT': '+0200',
	'KGT': '+0600',
	'KIT': '+0500',
	'KOST': '+1100',
	'KRAST': '+0800',
	'KRAT': '+0700',
	'KST': '+0900',
	'KT': '+0900',
	'KUYT': '+0400',
	'L': '+1100',
	'LHDT': '+1100',
	'LHST': '+1030',
	'LINT': '+1400',
	'M': '+1200',
	'MAGST': '+1200',
	'MAGT': '+1100',
	'MART': '-0930',
	'MAWT': '+0500',
	'MCK': '+0300',
	'MEST': '+0200',
	'MESZ': '+0200',
	'MET': '+0100',
	'MEZ': '+0100',
	'MDST': '-0600',
	'MDT': '-0600',
	'MHT': '+1200',
	'MIST': '+1100',
	'MIT': '-0930',
	'MMT': '+0630',
	'MSD': '+0400',
	'MSK': '+0300',
	'MT': '-0700',
	'MUT': '+0400',
	'MVT': '+0500',
	'MYT': '+0800',
	'N': '-0100',
	'NACDT': '-0500',
	'NACST': '-0600',
	'NAEDT': '-0400',
	'NAEST': '-0500',
	'NAMDT': '-0600',
	'NAMST': '-0700',
	'NAPDT': '-0700',
	'NAPST': '-0800',
	'NCT': '+1100',
	'NDT': '-0230',
	'NFDT': '+1200',
	'NFT': '+1100',
	'NOVST': '+0700',
	'NOVT': '+0700',
	'NPT': '+0545',
	'NRT': '+1200',
	'NST': '-0330',
	'NT': '-0330',
	'NUT': '-1100',
	'NZDT': '+1300',
	'NZST': '+1200',
	'O': '-0200',
	'OESZ': '+0300',
	'OEZ': '+0200',
	'OMSST': '+0700',
	'OMST': '+0600',
	'ORAT': '+0500',
	'PDST': '-0700',
	'PDT': '-0700',
	'PET': '-0500',
	'PETST': '+1200',
	'PETT': '+1200',
	'PGT': '+1000',
	'PHOT': '+1300',
	'PHT': '+0800',
	'PKT': '+0500',
	'PMDT': '-0200',
	'PMST': '-0300',
	'PONT': '+1100',
	'PT': '-0800',
	'PWT': '+0900',
	'Q': '-0400',
	'QYZT': '+0600',
	'R': '-0500',
	'RET': '+0400',
	'ROTT': '-0300',
	'S': '-0600',
	'SAKT': '+1100',
	'SAMST': '+0400',
	'SAMT': '+0400',
	'SAST': '+0200',
	'SBT': '+1100',
	'SCT': '+0400',
	'SDT': '-1000',
	'SGT': '+0800',
	'SLST': '+0530',
	'SRET': '+1100',
	'SRT': '-0300',
	'ST': '+1400',
	'SYOT': '+0300',
	'T': '-0700',
	'TAHT': '-1000',
	'THA': '+0700',
	'TFT': '+0500',
	'TJT': '+0500',
	'TKT': '+1300',
	'TLT': '+0900',
	'TMT': '+0500',
	'TOST': '+1400',
	'TOT': '+1300',
	'TRT': '+0300',
	'TVT': '+1200',
	'U': '-0800',
	'ULAST': '+0900',
	'ULAT': '+0800',
	'UTC': '+0000',
	'UYST': '-0200',
	'UYT': '-0300',
	'UZT': '+0500',
	'V': '-0900',
	'VET': '-0400',
	'VLAST': '+1100',
	'VLAT': '+1000',
	'VOLT': '+0400',
	'VOST': '+0600',
	'VUT': '+1100',
	'W': '-1000',
	'WAKT': '+1200',
	'WARST': '-0300',
	'WAST': '+0200',
	'WDT': '+0900',
	'WEDT': '+0100',
	'WEST': '+0100',
	'WESZ': '+0100',
	'WET': '+0000',
	'WEZ': '+0000',
	'WFT': '+1200',
	'WGST': '-0200',
	'WGT': '-0300',
	'WIB': '+0700',
	'WIT': '+0900',
	'WITA': '+0800',
	'WT': '+0000',
	'X': '-1100',
	'Y': '-1200',
	'YAKST': '+1000',
	'YAKT': '+0900',
	'YAPT': '+1000',
	'YEKST': '+0600',
	'YEKT': '+0500',
	'Z': '+0000'
};

function buildDayPeriodRe(part) {
	let re = '';
	let or = '';
	for (let i = 0; i < part.length; i++) {
		re += or + part.substr(0, i + 1);
		or = '|';
	}
	return new RegExp(re, 'i');
}

function convertJsDateToLocalDateTime(utcDate) {
	const formattedDateTime = formatDateString(utcDate);
	const re = /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})( |, )([0-9]{1,2}):([0-9]{2}):([0-9]{2})/;
	const match = formattedDateTime.match(re);
	if (!match || match.length !== 8) {
		return null;
	}
	return {
		month: parseInt(match[1]),
		date: parseInt(match[2]),
		year: parseInt(match[3]),
		hours: parseInt(match[5]),
		minutes: parseInt(match[6]),
		seconds: parseInt(match[7])
	};
}

function formatDateString(date) {
	const timezone = getDocumentLocaleSettings().timezone.identifier;
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hourCycle: 'h23'
	};
	if (timezone) {
		options.timeZone = timezone;
		options.timeZoneName = 'short';
	}
	const formatter = new Intl.DateTimeFormat('en-US', options);
	return formatter.format(date);
}

function getDateStringWithTimezone(date, timezone) {
	let dateString = `${date.month}/${date.date}/${date.year}, ${date.hours}:${date.minutes}:${date.seconds} ${timezone}`;
	if (timezone.includes('-') || timezone.includes('+')) {
		const re = /([A-Z]{3})?(\+|-)([0-9]{1,2})(:)?([0-9]{2})?/;
		const match = timezone.match(re);
		if (match && match.length === 6) {
			// YYYY-MM-DDTHH:mm:ss(+|-)HH:MM
			const mins = match[5] ? prePadByZero(match[5], 2) : '00';
			dateString = `${date.year}-${date.month}-${date.date}T${date.hours}:${date.minutes}:${date.seconds}${match[2]}${prePadByZero(match[3], 2)}:${mins}`;
		}
	}
	return dateString;
}

function getParts() {

	const descriptor = getDateTimeDescriptor();

	const result = [];
	const separator = getSeparator();
	const parts = descriptor.formats.dateFormats.short.split(separator);

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i].trim();
		switch (part) {
			case 'dd':
			case 'd':
				result.push('d');
				break;
			case 'MM':
			case 'M':
				result.push('M');
				break;
			case 'yyyy':
				result.push('yyyy');
				break;
		}
	}

	if (result.length !== 3) {
		return ['M', 'd', 'yyyy'];
	}

	return result;

}

const reSeparator = new RegExp('\\W');

function getSeparator() {
	const descriptor = getDateTimeDescriptor();
	const match = reSeparator.exec(descriptor.formats.dateFormats.short);
	if (match !== null) {
		return match[0];
	}
	return '/';
}

function getTimeFormat(hour24, language, baseLanguage) {

	if (hour24 && baseLanguage === 'fr') {
		return 'HH\' h \'mm';
	}

	let timeFormat = hour24 ? 'HH:mm' : 'h:mm';

	// non-zero padded 24-hour clocks and zero-padded 12-hour clocks
	if (hour24 && (baseLanguage === 'ja' || language === 'pt-br' || (baseLanguage === 'zh' && language !== 'zh-tw'))) {
		timeFormat = 'H:mm';
	} else if (!hour24 && language === 'zh-tw') {
		timeFormat = 'hh:mm';
	}

	if (!hour24) {
		// AM/PM before vs. after
		if (baseLanguage === 'ko' || baseLanguage === 'zh') {
			timeFormat = `tt ${timeFormat}`;
		} else {
			timeFormat = `${timeFormat} tt`;
		}
	}

	return timeFormat;

}

function getTimezoneFromDuplicatedAbbreviation(abbrTimezone) {
	const longTimezone = getDocumentLocaleSettings().timezone.identifier;
	switch (abbrTimezone) {
		case 'ADST':
			// Alaska Daylight Saving Time -0800 (America/Anchorage, America/Juneau, America/Nome, America/Sitka, America/Yakutat)
			// Atlantic Daylight Saving TIme -0300 (America)
			if (longTimezone === 'America/Anchorage'
				|| longTimezone === 'America/Juneau'
				|| longTimezone === 'America/Nome'
				|| longTimezone === 'America/Sitka'
				|| longTimezone === 'America/Yakutat'
			) {
				return '-0800';
			} else return '-0300';
		case 'ADT':
			// Arabia Daylight Time +0400 (Asia)
			// Atlantic Daylight Time -0300 (America)
			if (longTimezone.includes('America') || longTimezone.includes('Atlantic')) return '-0300';
			else return '+0400';
		case 'AMT':
			// Amazon Time (Brazil) -0400 (America)
			// Armenia Time +0400 (Asia)
			return longTimezone.includes('Asia') ? '+0400' : '-0400';
		case 'AMST':
			// Amazon Summer Time -0300 (America)
			// Armenia Summer Time +0500 (Asia)
			return longTimezone.includes('Asia') ? '+0500' : '-0300';
		case 'AST':
			// Atlantic Standard Time -0400 (America)
			// Arabia Standard Time +0300 (Asia)
			if (longTimezone.includes('America') || longTimezone.includes('Atlantic')) return '-0400';
			else return '+0300';
		case 'AT':
			// Alaska Time -0900 (America/Anchorage, America/Juneau, America/Nome, America/Sitka, America/Yakutat)
			// Atlantic Time -0400 (America)
			if (longTimezone === 'America/Anchorage'
				|| longTimezone === 'America/Juneau'
				|| longTimezone === 'America/Nome'
				|| longTimezone === 'America/Sitka'
				|| longTimezone === 'America/Yakutat'
			) {
				return '-0900';
			} else return '-0400';
		case 'BDT':
			// British Daylight Time +0100 (Europe)
			// Brunei Time +0800 (Asia)
			return longTimezone.includes('Asia') ? '+0800' : '+0100';
		case 'BST':
			// Bangladesh Standard Time +0600 (Asia)
			// British Summer Time +0100 (Europe)
			// Bougainville Standard Time +1100 (Pacific)
			// Brazilian Summer Time -0200 (America)
			if (longTimezone.includes('Asia')) return '+0600';
			else if (longTimezone.includes('Pacific')) return '+1100';
			else if (longTimezone.includes('Europe')) return '+0100';
			else return '-0200';
		case 'CDST':
			// Central Daylight Savings Time +1030 (Australia)
			// Central Daylight Saving Time -0500 (America)
			return longTimezone.includes('Australia') ? '+1030' : '-0500';
		case 'CDT':
			// Central Daylight Time -0500 (America)
			// Cuba Daylight Time -0400 (America/Havana)
			// Central Daylight Time +1030 (Australia)
			if (longTimezone === 'America/Havana') return '-0400';
			else if (longTimezone.includes('Australia')) return '+1030';
			else return '-0500';
		case 'CST':
			// Cuba Standard Time -0500 (America/Havana)
			// Central Standard Time -0600 (America)
			// China Standard Time +0800 (Asia)
			// Australian Central Standard Time +0930 (Australia)
			if (longTimezone === 'America/Havana') return '-0500';
			else if (longTimezone.includes('Asia')) return '+0800';
			else if (longTimezone.includes('Australia')) return '+0930';
			else return '-0600';
		case 'ECT':
			// European Central Time +0100 (Europe, Africa)
			// Ecuador Time -0500 (America)
			return longTimezone.includes('America') ? '-0500' : '+0100';
		case 'EDT':
		case 'EDST':
			// Eastern Daylight Time +1100 (Australia)
			// Eastern Daylight Time -0400 (America)
			if (longTimezone.includes('Antarctica') || longTimezone.includes('Australia')) return '+1100';
			else return '-0400';
		case 'EST':
			// Eastern Standard Time +1000 (Australia)
			// Eastern Standard Time -0500 (America)
			return longTimezone.includes('Australia') ? '+1000' : '-0500';
		case 'GST':
			// South Georgia and the South Sandwich Islands Time -0200 (Atlantic)
			// Gulf Standard Time +0400 (Asia)
			// Guam Standard Time +1000 (Pacific)
			if (longTimezone.includes('Atlantic')) return '-0200';
			else if (longTimezone.includes('Pacific')) return '+1000';
			else return '+0400';
		case 'IDT':
			// Iran Daylight Time +0430 (Asia/Tehran)
			// Israel Daylight Time +0300 (Asia)
			return longTimezone === 'Asia/Tehran' ? '+0430' : '+0300';
		case 'IST':
			// Indian Standard Time +0530 (Asia/Calcutta & Asia/Colombo)
			// Irish Standard Time +0100 (Europe)
			// Israel Standard Time +0200 (Asia)
			if (longTimezone === 'Asia/Calcutta' || longTimezone === 'Asia/Colombo') return '+0530';
			else if (longTimezone.includes('Asia')) return '+0200';
			else return '+0100';
		case 'MST':
			// Malaysia Standard Time +0800 (Asia)
			// Mountain Standard Time -0700 (America)
			return longTimezone.includes('Asia') ? '+0800' : '-0700';
		case 'PST':
			// Pacific Standard Time -0800 (America)
			// Philippine Standard Time +0800 (Asia)
			return longTimezone.includes('Asia') ? '+0800' : '-0800';
		case 'PYST':
			// Pyongyan Time +0830 (Asia)
			// Paraguay Summer Time -0300 (America)
			return longTimezone.includes('Asia') ? '+0830' : '-0300';
		case 'PYT':
			// Paraguary Time -0400 (South America)
			// Pyongyang Time +0830 (Asia)
			return longTimezone.includes('Asia') ? '+0830' : '-0400';
		case 'SST':
			// Singapore Standard Time +0800 (Asia)
			// Samoa Standard Time -1100 (Pacific)
			return longTimezone.includes('Pacific') ? '-1100' : '+0800';
		case 'WAT':
			// West Africa Time +0100 (Africa)
			// Western Australia Time +0800 (Australia)
			return longTimezone.includes('Australia') ? '+0800' : '+0100';
		case 'WST':
			// West Samoa Time +1400 (Pacific)
			// Western Sahara Summer Time +0100 (Africa)
			// Western Standard Time +0800 (Australia)
			if (longTimezone.includes('Pacific')) return '+1400';
			else if (longTimezone.includes('Australia')) return '+0800';
			else return '+0100';
		default:
			throw new Error(`Invalid timezone: unable to retrieve timezone offset for ${longTimezone}`);
	}
}

function isDateValid(year, month, day) {

	if (isNaN(year) || year < 1753 || year > 9999) {
		return false;
	}
	if (isNaN(month) || month < 1 || month > 12) {
		return false;
	}
	if (isNaN(day) || day < 1 || day > 31) {
		return false;
	}

	let allowedDays = 31;
	if (month === 2) {
		if ((year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) {
			allowedDays = 29;
		} else {
			allowedDays = 28;
		}
	} else if (month === 4 || month === 6 || month === 9 || month === 11) {
		allowedDays = 30;
	}

	if (day > allowedDays) {
		return false;
	}

	return true;

}

function prePadByZero(input, maxNum) {
	input = input.toString();
	const zero = '0';
	while (zero.length > 0 && input.length < maxNum) {
		input = zero + input;
	}
	return input;
}

function processPattern(pattern, replacements) {

	let reStr = '';
	Object.keys(replacements).forEach((key) => {
		reStr += ((reStr === '') ? '' : '|') + key;
	});
	const re = new RegExp(reStr, 'g');

	const doReplacements = function(buf) {
		return buf.replace(re, (m) => {
			return replacements[m];
		});
	};

	let escape = false;
	let buffer = '';
	let value = '';
	for (let i = 0; i < pattern.length; i++) {
		const c = pattern.charAt(i);
		if (c === "'") {
			if (!escape) {
				value += doReplacements(buffer);
				buffer = '';
			}
			escape = !escape;
		} else if (escape) {
			value += c;
		} else {
			buffer += c;
		}
	}
	value += doReplacements(buffer);

	return value;

}

export function convertLocalToUTCDateTime(date) {
	if (!getDocumentLocaleSettings().timezone.identifier) {
		return date;
	}

	const dateDate = new Date(date.year, date.month - 1, date.date, date.hours, date.minutes, date.seconds);
	const datePrePad = {
		year: date.year,
		month: prePadByZero(date.month, 2),
		date: prePadByZero(date.date, 2),
		hours: prePadByZero(date.hours, 2),
		minutes: prePadByZero(date.minutes, 2),
		seconds: prePadByZero(date.seconds, 2)
	};
	let timezone = formatDateString(dateDate).split(' ')[2];
	let dateString = getDateStringWithTimezone(datePrePad, timezone);
	let parsedDateString = new Date(Date.parse(dateString));
	if (isNaN(parsedDateString.getTime())) {
		timezone = timezoneOffsetMap[timezone] || getTimezoneFromDuplicatedAbbreviation(timezone);
		dateString = getDateStringWithTimezone(datePrePad, timezone);
		parsedDateString = new Date(Date.parse(dateString));
	}

	// run again in case of DST (e.g., if timezone is CST for dateDate but local time is after CST is over, timezone is incorrect)
	let utcCorrectedTimezone = formatDateString(parsedDateString).split(' ')[2];
	let dateStringInTimezone = getDateStringWithTimezone(datePrePad, utcCorrectedTimezone);
	let utcCorrectedDate = new Date(Date.parse(dateStringInTimezone));
	if (isNaN(utcCorrectedDate.getTime())) {
		utcCorrectedTimezone = timezoneOffsetMap[utcCorrectedTimezone] || getTimezoneFromDuplicatedAbbreviation(utcCorrectedTimezone);
		dateStringInTimezone = getDateStringWithTimezone(datePrePad, utcCorrectedTimezone);
		utcCorrectedDate = new Date(Date.parse(dateStringInTimezone));
	}

	return {
		month: utcCorrectedDate.getUTCMonth() + 1,
		date: utcCorrectedDate.getUTCDate(),
		year: utcCorrectedDate.getUTCFullYear(),
		hours: utcCorrectedDate.getUTCHours(),
		minutes: utcCorrectedDate.getUTCMinutes(),
		seconds: utcCorrectedDate.getUTCSeconds()
	};
}

export function convertUTCToLocalDateTime(date) {
	if (!getDocumentLocaleSettings().timezone.identifier) {
		return date;
	}
	const utcDate = new Date(Date.UTC(date.year, date.month - 1, date.date, date.hours, date.minutes, date.seconds));
	return convertJsDateToLocalDateTime(utcDate) || date;
}

export function getDateTimeDescriptor() {

	const language = getLanguage();
	const settings = getDocumentLocaleSettings();

	const subtags = language.split('-');
	const baseLanguage = subtags[0];

	let hour24 = (hour24locales.indexOf(baseLanguage) > -1);
	if (language === 'zh-tw') {
		hour24 = false;
	}
	if (settings.overrides.date && settings.overrides.date.hour24 !== undefined) {
		hour24 = settings.overrides.date.hour24;
	}

	const timeFormat = getTimeFormat(hour24, language, baseLanguage);

	let dateFormats = ['dddd, MMMM d, yyyy', 'MMM d, yyyy', 'M/d/yyyy', 'MMMM yyyy', 'MMMM d', 'MMM d'];
	const fullTimeFormat = (baseLanguage === 'zh' && language !== 'zh-tw') ? `ZZZ ${timeFormat}` : `${timeFormat} ZZZ`;
	let dayPeriods = ['AM', 'PM'];
	let months = [
		['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	];
	let days = [
		['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		['S', 'M', 'T', 'W', 'T', 'F', 'S']
	];
	let firstDayOfWeek = (mondayFirstDayLocales.indexOf(baseLanguage) > -1) ? 1 : 0;
	let weekendStartDay = 6;
	let weekendEndDay = 0;

	switch (baseLanguage) {
		case 'ar':
			dateFormats = ['dddd, d MMMM, yyyy', 'dd MMMM, yyyy', 'dd/MM/yyyy', 'MMMM, yyyy', 'd MMMM', 'd MMM'];
			dayPeriods = ['ص', 'م'];
			months[0] = months[1] = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
			days = [
				['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
				['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
				['أ', 'إ', 'ث', 'أر', 'خ', 'ج', 'س']
			];
			firstDayOfWeek = 6;
			weekendStartDay = 4;
			weekendEndDay = 5;
			break;
		case 'cy':
			dateFormats = ['dddd, d MMMM yyyy', 'dd MMMM yyyy', 'dd/MM/yyyy', 'MMMM yyyy', 'd MMMM', 'd MMM'];
			months = [
				['Ionawr', 'Chwefror', 'Mawrth', 'Ebrill', 'Mai', 'Mehefin', 'Gorffennaf', 'Awst', 'Medi', 'Hydref', 'Tachwedd', 'Rhagfyr'],
				['Ion', 'Chwe', 'Maw', 'Ebr', 'Mai', 'Meh', 'Gor', 'Awst', 'Medi', 'Hyd', 'Tach', 'Rhag']
			];
			days = [
				['Dydd Sul', 'Dydd Llun', 'Dydd Mawrth', 'Dydd Mercher', 'Dydd Iau', 'Dydd Gwener', 'Dydd Sadwrn'],
				['Sul', 'Llun', 'Maw', 'Mer', 'Iau', 'Gwe', 'Sad'],
				['Su', 'Ll', 'Ma', 'Me', 'Ia', 'Gw', 'Sa']
			];
			break;
		case 'da':
			dateFormats = ['dddd \'den\' d. MMMM yyyy', 'd. MMM. yyyy', 'dd.MM.yyyy', 'MMMM yyyy', 'd. MMMM', 'd. MMM'];
			months = [
				['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'],
				['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.']
			];
			days = [
				['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
				['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
				['S', 'M', 'T', 'O', 'T', 'F', 'L']
			];
			break;
		case 'de':
			dateFormats = ['dddd d. MMMM yyyy', 'd. MMMM yyyy', 'dd.MM.yyyy', 'MMMM yyyy', 'd. MMMM', 'd. MMM'];
			months = [
				['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
				['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.']
			];
			days = [
				['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
				['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
				['S', 'M', 'D', 'M', 'D', 'F', 'S']
			];
			break;
		case 'es':
			dateFormats = ['dddd d\' de \'MMMM\' de \'yyyy', 'd\' de \'MMMM\' de \'yyyy', 'dd/MM/yyyy', 'MMMM yyyy', 'd\' de \'MMMM', 'd\' de \'MMM'];
			dayPeriods = ['a. m.', 'p. m.'];
			months = [
				['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
				['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.']
			];
			days = [
				['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
				['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
				['D', 'L', 'M', 'M', 'J', 'V', 'S']
			];
			break;
		case 'fr':
			dateFormats = ['dddd d MMMM yyyy', 'd MMM yyyy', 'dd/MM/yyyy', 'MMMM yyyy', 'd MMMM', 'd MMM'];
			months = [
				['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
				['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
			];
			days = [
				['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
				['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
				['D', 'L', 'M', 'M', 'J', 'V', 'S']
			];
			break;
		case 'hi':
			dateFormats = ['dddd, d MMMM yyyy', 'd MMMM yyyy', 'dd-MM-yyyy', 'MMMM yyyy', 'd MMMM', 'd MMM'];
			dayPeriods = ['पूर्वाह्न', 'अपराह्न'];
			months = [
				['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
				['जन', 'फर', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अग', 'सितं', 'अक्टू', 'नवं', 'दिसं']
			];
			days = [
				['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरूवार', 'शुक्रवार', 'शनिवार'],
				['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
				['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श']
			];
			break;
		case 'ja':
			dateFormats = ['yyyy年M月d日', 'yyyy年M月d日', 'yyyy/MM/dd', 'yyyy年M月', 'M月d日', 'M月d日'];
			dayPeriods = ['午前', '午後'];
			months[0] = months[1] = ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'];
			days[0] = days[1] = days[2] = ['日', '月', '火', '水', '木', '金', '土'];
			break;
		case 'ko':
			dateFormats = ['yyyy년 M월 d일 dddd', 'yyyy년 M월 d일', 'yyyy-MM-dd', 'yyyy년 M월', 'M월 d일', 'MMM d일'];
			dayPeriods = ['오전', '오후'];
			months[0] = months[1] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
			days[0] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
			days[1] = days[2] = ['일', '월', '화', '수', '목', '금', '토'];
			break;
		case 'nl':
			dateFormats = ['dddd d MMMM yyyy', 'd MMMM yyyy', 'dd-MM-yyyy', 'MMMM yyyy', 'd MMMM', 'd MMM'];
			dayPeriods = ['a.m.', 'p.m.'];
			months = [
				['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
				['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.']
			];
			days = [
				['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
				['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
				['Z', 'M', 'D', 'W', 'D', 'V', 'Z']
			];
			break;
		case 'pt':
			dateFormats = ['dddd, d\' de \'MMMM\' de \'yyyy', 'd\' de  \'MMMM\' de \'yyyy', 'dd/MM/yyyy', 'MMMM\' de \'yyyy', 'dd\' de \'MMMM', 'dd\' de \'MMM'];
			months = [
				['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
				['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
			];
			days = [
				['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
				['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
				['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
			];
			break;
		case 'sv':
			dateFormats = ['dddd \'den\' d MMMM yyyy', 'd MMMM yyyy', 'yyyy-MM-dd', 'MMMM yyyy', 'dd MMMM', 'dd MMM'];
			dayPeriods = ['fm', 'em'];
			months = [
				['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
				['jan.', 'feb.', 'mars', 'apr.', 'maj', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.']
			];
			days = [
				['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
				['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
				['S', 'M', 'T', 'O', 'T', 'F', 'L']
			];
			break;
		case 'tr':
			dateFormats = ['dd MMMM yyyy dddd', 'dd MMMM yyyy', 'dd.MM.yyyy', 'MMMM yyyy', 'dd MMMM', 'dd MMM'];
			dayPeriods = ['ÖÖ', 'ÖS'];
			months = [
				['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
				['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Ek', 'Kas', 'Ara']
			];
			days = [
				['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
				['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
				['P', 'P', 'S', 'Ç', 'P', 'C', 'C']
			];
			break;
		case 'zh':
			dateFormats = ['yyyy年M月d日', 'yyyy年M月d日', 'yyyy/M/d', 'yyyy年M月', 'M月d日', 'M月d日'];
			dayPeriods = ['上午', '下午'];
			months[0] = months[1] = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
			days[0] = days[1] = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
			days[2] = ['日', '一', '二', '三', '四', '五', '六'];
			break;
	}

	switch (language) {
		case 'en-gb':
			dateFormats = ['dddd, d MMMM yyyy', 'dd MMMM yyyy', 'dd/MM/yyyy', 'MMMM yyyy', 'd MMMM', 'd MMM'];
			break;
		case 'fr-ca':
			dateFormats[1] = 'MMM d yyyy';
			dateFormats[2] = 'yyyy-MM-dd';
			dateFormats[4] = 'MMMM d';
			dateFormats[5] = 'MMM d';
			firstDayOfWeek = 0;
			break;
		case 'fr-on':
			dateFormats[0] = 'dddd\' le \'d MMMM yyyy';
			dateFormats[1] = 'MMM d yyyy';
			dateFormats[2] = 'yyyy-MM-dd';
			firstDayOfWeek = 0;
			break;
		case 'zh-tw':
			days[0] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			break;
	}

	const descriptor = {
		hour24: hour24,
		formats: {
			dateFormats: {
				'full': dateFormats[0],
				'medium': dateFormats[1],
				'short': dateFormats[2],
				'monthYear': dateFormats[3],
				'monthDay': dateFormats[4],
				'shortMonthDay': dateFormats[5],
				'longDayOfWeek': 'dddd',
				'shortDayOfWeek': 'ddd',
				'longMonth': 'MMMM',
				'shortMonth': 'MMM'
			},
			timeFormats: {
				'full': fullTimeFormat,
				'medium': timeFormat,
				'short': timeFormat
			}
		},
		calendar: {
			firstDayOfWeek: firstDayOfWeek,
			weekendStartDay: weekendStartDay,
			weekendEndDay: weekendEndDay,
			months: {
				short: months[1],
				long: months[0]
			},
			days: {
				narrow: days[2],
				short: days[1],
				long: days[0]
			},
			dayPeriods: { am: dayPeriods[0], pm: dayPeriods[1] }
		}
	};

	if (settings.overrides.date) {
		merge(descriptor, settings.overrides.date);
	}

	return descriptor;

}

export function formatTime(date, options) {

	const descriptor = getDateTimeDescriptor();
	const settings = getDocumentLocaleSettings();

	options = options || {};

	const timezone = options.timezone || settings.timezone.name;
	const format = descriptor.formats.timeFormats[options.format]
		|| options.format || descriptor.formats.timeFormats['short'];

	const hour = date.getHours();
	let hour12 = hour % 12;
	if (hour12 === 0) {
		hour12 = 12;
	}

	const replacements = {
		'HH': prePadByZero(date.getHours(), 2),
		'H': date.getHours().toString(),
		'hh': prePadByZero(hour12, 2),
		'h': hour12,
		'mm': prePadByZero(date.getMinutes(), 2),
		'tt': (hour > 11) ? descriptor.calendar.dayPeriods.pm : descriptor.calendar.dayPeriods.am,
		'ZZZ': timezone
	};

	const value = processPattern(format, replacements);
	return value;

}

export function parseTime(input, options) {

	if (input === undefined || input === null || input === '') {
		return null;
	}

	const descriptor = getDateTimeDescriptor();

	const reDigits = new RegExp('(\\d+)', 'g');
	const match = input.match(reDigits);
	if (match === null) {
		return null;
	}

	options = options || {};
	const nowProvider = options.nowProvider || function() { return new Date(); };
	const reAm = buildDayPeriodRe(descriptor.calendar.dayPeriods.am);
	const rePm = buildDayPeriodRe(descriptor.calendar.dayPeriods.pm);
	const today = nowProvider();
	const isMorning = (today.getHours() < 12);
	const digits = match.join('');
	const leadingZero = (digits.substr(0, 1) === '0');

	let hour = 0;
	let minute = 0;
	switch (digits.length) {
		case 1:
			hour = digits.substr(0, 1);
			break;
		case 2:
			hour = digits.substr(0, 2);
			break;
		case 3:
			hour = digits.substr(0, 1);
			minute = digits.substr(1, 2);
			break;
		default:
			hour = parseInt(digits.substr(0, 2));
			minute = parseInt(digits.substr(2, 2));
			break;
	}

	hour = Math.min(Math.max(parseInt(hour, 10), 0), 23);
	minute = Math.min(Math.max(parseInt(minute, 10), 0), 59);

	if (!descriptor.hour24 && hour < 13) {

		const matchPm = input.match(rePm);
		const matchAm = input.match(reAm);
		const noAmPm = (matchAm === null && matchPm === null);

		if (matchPm !== null || (noAmPm && !isMorning && !leadingZero)) {
			hour += 12;
			if (hour === 24) {
				hour = 12;
			}
		} else if (hour === 12) {
			hour = 0;
		}

	}

	const time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute, 0);
	return time;

}

export function formatDate(date, options) {

	const descriptor = getDateTimeDescriptor();

	options = options || {};
	options.format = options.format || 'short';

	let format = descriptor.formats.dateFormats[options.format];
	if (format === undefined) {
		format = options.format;
	}

	const replacements = {
		'dddd': descriptor.calendar.days.long[date.getDay()],
		'ddd': descriptor.calendar.days.short[date.getDay()],
		'dd': prePadByZero(date.getDate(), 2),
		'd': date.getDate().toString(),
		'MMMM': descriptor.calendar.months.long[date.getMonth()],
		'MMM': descriptor.calendar.months.short[date.getMonth()],
		'MM': prePadByZero((date.getMonth() + 1), 2),
		'M': (date.getMonth() + 1).toString(),
		'yyyy': date.getFullYear().toString()
	};

	const value = processPattern(format, replacements);
	return value;

}

export function parseDate(input) {

	if (input === undefined || input === null) {
		input = '';
	}
	input = input.toString().trim();

	let year = null;
	let month = null;
	let day = null;
	const separator = getSeparator();
	const dateFormatParts = getParts();

	const dateParts = input.split(separator);
	if (dateParts.length !== dateFormatParts.length) {
		throw new Error('Invalid input date: not enough parts');
	}

	for (let i = 0; i < dateFormatParts.length; i++) {

		const dateFormatPart = dateFormatParts[i];
		const partValue = parseInt(dateParts[i]);
		if (isNaN(partValue)) {
			throw new Error('Invalid input date: part number value');
		}

		switch (dateFormatPart) {
			case 'yyyy':
				year = partValue;
				break;
			case 'M':
				month = partValue;
				break;
			case 'd':
				day = partValue;
				break;
		}

	}

	if (!isDateValid(year, month, day)) {
		throw new Error('Invalid input date: part range value');
	}

	const date = new Date(year, month - 1, day, 0, 0, 0);
	return date;

}

export function formatDateTime(date, options) {

	options = options || {};
	const format = options.format || 'short';

	switch (format) {
		case 'full':
		case 'medium':
		case 'short':
			return `${formatDate(date, options)} ${formatTime(date, options)}`;
	}

	return formatDate(date, options);

}

function parseLocalDateTimeFromTimestamp(timestamp) {
	const utcDate = new Date(timestamp);
	const local = convertJsDateToLocalDateTime(utcDate);
	if (!local) return utcDate;
	return new Date(local.year, local.month - 1, local.date, local.hours, local.minutes, local.seconds);
}

export function formatDateTimeFromTimestamp(timestamp, options) {
	const date = parseLocalDateTimeFromTimestamp(timestamp);
	return formatDateTime(date, options);
}

export function formatDateFromTimestamp(timestamp, options) {
	const date = parseLocalDateTimeFromTimestamp(timestamp);
	return formatDate(date, options);
}

export function formatTimeFromTimestamp(timestamp, options) {
	const date = parseLocalDateTimeFromTimestamp(timestamp);
	return formatTime(date, options);
}

export function formatRelativeDateTime(date) {

	const now = new Date();
	const then = new Date(date);

	if (!Intl.RelativeTimeFormat) {
		return now.toDateString() === then.toDateString() ? formatTime(then) : formatDate(then);
	}

	const delta = (then.getTime() - now.getTime()) / 1000;

	const unitCutoffs = {
		second: 60,
		minute: 60,
		hour: 24,
		day: 7,
		week: 4.348,
		month: 12,
		year: 0
	};

	let { value, unit } = Object.entries(unitCutoffs).reduce((acc, [unit, cutoff], idx, arr) => {
		if (cutoff && Math.round(Math.abs(acc.value)) >= Math.round(cutoff)) return { value: acc.value / cutoff };
		arr.splice(idx + 1); // short-circuit
		return { value: acc.value, unit };
	}, { value: delta });

	let numeric = 'always';
	const thenTS = then.getTime();

	if (unit === 'day' || unit === 'hour' && Math.round(Math.abs(value)) >= 6) {

		const today = new Date(now.toDateString()).getTime();
		const fullDay = 24 * 60 * 60 * 1000;

		const yesterday = thenTS < today && thenTS > (today - fullDay);
		const tomorrow = thenTS >= today + fullDay && thenTS < (today + fullDay * 2);

		if (yesterday || tomorrow) {
			numeric = 'auto';
			unit = 'day';
			value = Math.sign(value);
		}
	}

	if (unit === 'week' || unit === 'day' && Math.round(Math.abs(value)) >= 4) {
		const weekDate = new Date(now.toDateString());
		weekDate.setDate(weekDate.getDate() - weekDate.getDay());
		const thisWeek = weekDate.getTime();
		const fullWeek = 7 * 24 * 60 * 60 * 1000;

		const lastWeek = thenTS < thisWeek && thenTS > (thisWeek - fullWeek);
		const nextWeek = thenTS >= thisWeek + fullWeek && thenTS < (thisWeek + fullWeek * 2);

		if (lastWeek || nextWeek) {
			numeric = 'auto';
			unit = 'week';
			value = Math.sign(value);
		}
	}

	const rtf = new Intl.RelativeTimeFormat(getLanguage(), {
		localeMatcher: 'best fit',
		style: 'long',
		numeric
	});

	return rtf.format(Math.round(value), unit);
}
