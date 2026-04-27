export default {
	sourceLocale: "sv",
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
			"other"
		]
	},
	localeDisplayPattern: {
		localePattern: "{0} ({1})",
		localeSeparator: "{0}, {1}",
		localeKeyTypePattern: "{0}: {1}"
	},
	dateFormats: {
		full: "EEEE d MMMM y",
		long: "d MMMM y",
		medium: "d MMM y",
		short: "y-MM-dd"
	},
	dateFormatItems: {
		Ed: "E d",
		Ehm: "E h:mm a",
		Ehms: "E h:mm:ss a",
		Gy: "y G",
		GyM: "y-MM G",
		GyMd: "y-MM-dd GGGGG",
		GyMEd: "E M-d-y G",
		GyMMM: "MMM y G",
		GyMMMd: "d MMM y G",
		GyMMMEd: "E d MMM y G",
		hm: "h:mm a",
		hms: "h:mm:ss a",
		hmsv: "h:mm:ss a v",
		hmv: "h:mm a v",
		Md: "d/M",
		MEd: "E d/M",
		MMd: "d/M",
		MMdd: "dd/MM",
		MMMd: "d MMM",
		MMMEd: "E d MMM",
		MMMMd: "d MMMM",
		MMMMEd: "E d MMMM",
		MMMMW: "'vecka' W 'i' MMMM",
		yMEd: "E, y-MM-dd",
		yMM: "y-MM",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "E d MMM y",
		yMMMM: "MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "'vecka' w, Y",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EBh: "E h B",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		Eh: "E h a",
		EHm: "E HH:mm",
		EHms: "E HH:mm:ss",
		h: "h a",
		H: "HH",
		Hm: "HH:mm",
		Hms: "HH:mm:ss",
		Hmsv: "HH:mm:ss v",
		Hmv: "HH:mm v",
		hv: "h a v",
		Hv: "HH'h' v",
		M: "L",
		MMM: "LLL",
		ms: "mm:ss",
		y: "y",
		yM: "y-MM",
		yMd: "y-MM-dd"
	},
	months: {
		format: {
			abbreviated: [
				"jan.",
				"feb.",
				"mars",
				"apr.",
				"maj",
				"juni",
				"juli",
				"aug.",
				"sep.",
				"okt.",
				"nov.",
				"dec."
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
				"januari",
				"februari",
				"mars",
				"april",
				"maj",
				"juni",
				"juli",
				"augusti",
				"september",
				"oktober",
				"november",
				"december"
			]
		},
		standAlone: {
			abbreviated: [
				"jan.",
				"feb.",
				"mars",
				"apr.",
				"maj",
				"juni",
				"juli",
				"aug.",
				"sep.",
				"okt.",
				"nov.",
				"dec."
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
				"januari",
				"februari",
				"mars",
				"april",
				"maj",
				"juni",
				"juli",
				"augusti",
				"september",
				"oktober",
				"november",
				"december"
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
			group: " ",
			minusSign: "−",
			exponential: "×10^",
			timeSeparator: ".",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			approximatelySign: "~",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN"
		},
		default: {
			decimal: ",",
			group: " ",
			minusSign: "−",
			exponential: "×10^",
			timeSeparator: ".",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			approximatelySign: "~",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN"
		}
	},
	delimiters: {
		quotationStart: "”",
		alternateQuotationStart: "’",
		quotationEnd: "”",
		alternateQuotationEnd: "’",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0} och {1}",
			end: "{0} och {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} eller {1}",
			end: "{0} eller {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		standardNarrow: {
			2: "{0}, {1}",
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
			end: "{0}, {1}"
		}
	}
};
