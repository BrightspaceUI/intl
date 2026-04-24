export default {
	sourceLocale: "en-GB",
	layout: {
		orientation: {
			characterOrder: "left-to-right",
			lineOrder: "top-to-bottom"
		}
	},
	pluralClass: {
		cardinal: [
			"one",
			"other"
		],
		ordinal: [
			"one",
			"two",
			"few",
			"other"
		]
	},
	localeDisplayPattern: {
		localePattern: "{0} ({1})",
		localeSeparator: "{0}, {1}",
		localeKeyTypePattern: "{0}: {1}"
	},
	dateFormats: {
		full: "EEEE, d MMMM y",
		long: "d MMMM y",
		medium: "d MMM y",
		short: "dd/MM/y"
	},
	dateFormatItems: {
		GyMEd: "E, d/M/y G",
		GyMMMEEEEd: "EEEE, d MMM y G",
		MEd: "E dd/MM",
		MMMEd: "E d MMM",
		MMMEEEEd: "EEEE d MMM",
		MMMMEEEEd: "EEEE d MMMM",
		yMMMEEEEd: "EEEE, d MMM y",
		yMMMMEEEEd: "EEEE, d MMMM y",
		Ed: "E d",
		GyMd: "dd/MM/y G",
		GyMMMd: "d MMM y G",
		GyMMMEd: "E, d MMM y G",
		Md: "dd/MM",
		MMdd: "dd/MM",
		MMMd: "d MMM",
		MMMMd: "d MMMM",
		yM: "MM/y",
		yMd: "dd/MM/y",
		yMEd: "E, dd/MM/y",
		yMMMd: "d MMM y",
		yMMMEd: "E, d MMM y",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EBh: "E h B",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		Eh: "E h a",
		Ehm: "E h:mm a",
		EHm: "E HH:mm",
		Ehms: "E h:mm:ss a",
		EHms: "E HH:mm:ss",
		Gy: "y G",
		GyM: "M/y G",
		GyMMM: "MMM y G",
		h: "h a",
		H: "HH",
		hm: "h:mm a",
		Hm: "HH:mm",
		hms: "h:mm:ss a",
		Hms: "HH:mm:ss",
		hmsv: "h:mm:ss a v",
		Hmsv: "HH:mm:ss v",
		hmv: "h:mm a v",
		Hmv: "HH:mm v",
		hv: "h a v",
		Hv: "HH'h' v",
		M: "L",
		MMM: "LLL",
		MMMMW: "'week' W 'of' MMMM",
		ms: "mm:ss",
		y: "y",
		yMMM: "MMM y",
		yMMMM: "MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "'week' w 'of' Y"
	},
	months: {
		format: {
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sept",
				"Oct",
				"Nov",
				"Dec"
			],
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		standAlone: {
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sept",
				"Oct",
				"Nov",
				"Dec"
			],
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		transforms: {
			titleCase: {}
		}
	},
	numberingSystemId: "latn",
	numberingSystem: {
		type: "numeric",
		digits: [
			"0",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9"
		]
	},
	numberSymbols: {
		latn: {
			decimal: ".",
			group: ",",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN",
			approximatelySign: "~",
			timeSeparator: ":"
		},
		default: {
			decimal: ".",
			group: ",",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN",
			approximatelySign: "~",
			timeSeparator: ":"
		}
	},
	delimiters: {
		quotationStart: "“",
		quotationEnd: "”",
		alternateQuotationStart: "‘",
		alternateQuotationEnd: "’",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0} and {1}",
			end: "{0} and {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} or {1}",
			end: "{0} or {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		orNarrow: {
			2: "{0} or {1}",
			end: "{0} or {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		orShort: {
			2: "{0} or {1}",
			end: "{0} or {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		standardShort: {
			2: "{0} and {1}",
			end: "{0} and {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		standardNarrow: {
			2: "{0}, {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, {1}"
		},
		unit: {
			2: "{0}, {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, {1}"
		},
		unitNarrow: {
			2: "{0} {1}",
			start: "{0} {1}",
			middle: "{0} {1}",
			end: "{0} {1}"
		},
		unitShort: {
			2: "{0}, {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, {1}"
		}
	}
};
