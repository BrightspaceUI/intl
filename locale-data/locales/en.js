export default {
	sourceLocale: "en",
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
		full: "EEEE, MMMM d, y",
		long: "MMMM d, y",
		medium: "MMM d, y",
		short: "M/d/yy"
	},
	dateFormatItems: {
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EBh: "E h B",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		Ed: "d E",
		Eh: "E h a",
		Ehm: "E h:mm a",
		EHm: "E HH:mm",
		Ehms: "E h:mm:ss a",
		EHms: "E HH:mm:ss",
		Gy: "y G",
		GyM: "M/y G",
		GyMd: "M/d/y G",
		GyMEd: "E, M/d/y G",
		GyMMM: "MMM y G",
		GyMMMd: "MMM d, y G",
		GyMMMEd: "E, MMM d, y G",
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
		Md: "M/d",
		MEd: "E, M/d",
		MMM: "LLL",
		MMMd: "MMM d",
		MMMEd: "E, MMM d",
		MMMMd: "MMMM d",
		MMMMW: "'week' W 'of' MMMM",
		ms: "mm:ss",
		y: "y",
		yM: "M/y",
		yMd: "M/d/y",
		yMEd: "E, M/d/y",
		yMMM: "MMM y",
		yMMMd: "MMM d, y",
		yMMMEd: "E, MMM d, y",
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
				"Sep",
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
				"Sep",
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
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, and {1}"
		},
		or: {
			2: "{0} or {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, or {1}"
		},
		orNarrow: {
			2: "{0} or {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, or {1}"
		},
		orShort: {
			2: "{0} or {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, or {1}"
		},
		standardNarrow: {
			2: "{0}, {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, {1}"
		},
		standardShort: {
			2: "{0} & {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, & {1}"
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
