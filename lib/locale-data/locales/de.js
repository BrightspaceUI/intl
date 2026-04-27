export default {
	sourceLocale: "de",
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
			"other"
		]
	},
	localeDisplayPattern: {
		localePattern: "{0} ({1})",
		localeSeparator: "{0}, {1}",
		localeKeyTypePattern: "{0}: {1}"
	},
	dateFormats: {
		full: "EEEE, d. MMMM y",
		long: "d. MMMM y",
		medium: "dd.MM.y",
		short: "dd.MM.yy"
	},
	dateFormatItems: {
		Bh: "h 'Uhr' B",
		EBh: "E, h 'Uhr' B",
		EBhm: "E, h:mm 'Uhr' B",
		EBhms: "E, h:mm:ss 'Uhr' B",
		Ed: "E, d.",
		Eh: "E, h a",
		Ehm: "E h:mm a",
		EHm: "E, HH:mm",
		Ehms: "E, h:mm:ss a",
		EHms: "E, HH:mm:ss",
		Gy: "y G",
		GyM: "MM/y G",
		GyMd: "dd.MM.y G",
		GyMEd: "E, dd.MM.y G",
		GyMMM: "MMM y G",
		GyMMMd: "d. MMM y G",
		GyMMMEd: "E, d. MMM y G",
		h: "h a",
		H: "HH 'Uhr'",
		hm: "h:mm a",
		hms: "h:mm:ss a",
		hmsv: "h:mm:ss a v",
		hmv: "h:mm a v",
		hv: "h a v",
		Hv: "HH 'Uhr' v",
		Md: "d.M.",
		MEd: "E, d.M.",
		MMd: "dd.MM.",
		MMdd: "dd.MM.",
		MMMd: "d. MMM",
		MMMEd: "E, d. MMM",
		MMMMd: "d. MMMM",
		MMMMEd: "E, d. MMMM",
		MMMMW: "'Woche' W 'im' MMMM",
		yM: "M/y",
		yMd: "d.M.y",
		yMEd: "E, d.M.y",
		yMM: "MM/y",
		yMMdd: "dd.MM.y",
		yMMM: "MMM y",
		yMMMd: "d. MMM y",
		yMMMEd: "E, d. MMM y",
		yMMMM: "MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "'Woche' w 'des' 'Jahres' Y",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		Hm: "HH:mm",
		Hms: "HH:mm:ss",
		Hmsv: "HH:mm:ss v",
		Hmv: "HH:mm v",
		M: "L",
		MMM: "LLL",
		ms: "mm:ss",
		y: "y"
	},
	months: {
		format: {
			abbreviated: [
				"Jan.",
				"Feb.",
				"März",
				"Apr.",
				"Mai",
				"Juni",
				"Juli",
				"Aug.",
				"Sept.",
				"Okt.",
				"Nov.",
				"Dez."
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
				"Januar",
				"Februar",
				"März",
				"April",
				"Mai",
				"Juni",
				"Juli",
				"August",
				"September",
				"Oktober",
				"November",
				"Dezember"
			]
		},
		standAlone: {
			abbreviated: [
				"Jan",
				"Feb",
				"Mär",
				"Apr",
				"Mai",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Okt",
				"Nov",
				"Dez"
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
				"Januar",
				"Februar",
				"März",
				"April",
				"Mai",
				"Juni",
				"Juli",
				"August",
				"September",
				"Oktober",
				"November",
				"Dezember"
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
			decimal: ",",
			group: ".",
			approximatelySign: "≈",
			superscriptingExponent: "·",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			exponential: "E",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN",
			timeSeparator: ":"
		},
		default: {
			decimal: ",",
			group: ".",
			approximatelySign: "≈",
			superscriptingExponent: "·",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			exponential: "E",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN",
			timeSeparator: ":"
		}
	},
	delimiters: {
		quotationStart: "„",
		quotationEnd: "“",
		alternateQuotationStart: "‚",
		alternateQuotationEnd: "‘",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0} und {1}",
			end: "{0} und {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} oder {1}",
			end: "{0} oder {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		unitShort: {
			2: "{0}, {1}"
		}
	}
};
