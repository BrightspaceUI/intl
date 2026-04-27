export default {
	sourceLocale: "cy",
	layout: {
		orientation: {
			characterOrder: "left-to-right",
			lineOrder: "top-to-bottom"
		}
	},
	pluralClass: {
		cardinal: [
			"zero",
			"one",
			"two",
			"few",
			"many",
			"other"
		],
		ordinal: [
			"zero",
			"one",
			"two",
			"few",
			"many",
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
		short: "dd/MM/yy"
	},
	dateFormatItems: {
		Ehm: "E, h:mm a",
		EHm: "E, HH:mm",
		Ehms: "E, h:mm:ss a",
		EHms: "E, HH:mm:ss",
		Gy: "y G",
		GyM: "M/y G",
		GyMd: "M/d/y GGGGG",
		GyMEd: "E, M/d/y G",
		GyMMM: "MMM y G",
		GyMMMd: "d MMM y G",
		GyMMMEd: "E, d MMM y G",
		hm: "h:mm a",
		hms: "h:mm:ss a",
		hmsv: "h:mm:ss a v",
		hmv: "h:mm a v",
		Md: "d/M",
		MEd: "E, d/M",
		MMMd: "d MMM",
		MMMEd: "E, d MMM",
		MMMMW: "'wythnos' W 'o' MMMM",
		yM: "M/y",
		yMd: "d/M/y",
		yMEd: "E, d/M/y",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "E, d MMM y",
		yMMMM: "MMMM y",
		yQ: "Q y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "'wythnos' w 'o' Y",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EBh: "E h B",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		Ed: "d, E",
		Eh: "E h a",
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
		MMMMd: "MMMM d",
		ms: "mm:ss",
		y: "y"
	},
	months: {
		format: {
			abbreviated: [
				"Ion",
				"Chwef",
				"Maw",
				"Ebr",
				"Mai",
				"Meh",
				"Gorff",
				"Awst",
				"Medi",
				"Hyd",
				"Tach",
				"Rhag"
			],
			narrow: [
				"I",
				"Ch",
				"M",
				"E",
				"M",
				"M",
				"G",
				"A",
				"M",
				"H",
				"T",
				"Rh"
			],
			wide: [
				"Ionawr",
				"Chwefror",
				"Mawrth",
				"Ebrill",
				"Mai",
				"Mehefin",
				"Gorffennaf",
				"Awst",
				"Medi",
				"Hydref",
				"Tachwedd",
				"Rhagfyr"
			]
		},
		standAlone: {
			abbreviated: [
				"Ion",
				"Chw",
				"Maw",
				"Ebr",
				"Mai",
				"Meh",
				"Gor",
				"Awst",
				"Medi",
				"Hyd",
				"Tach",
				"Rhag"
			],
			narrow: [
				"I",
				"Ch",
				"M",
				"E",
				"M",
				"M",
				"G",
				"A",
				"M",
				"H",
				"T",
				"Rh"
			],
			wide: [
				"Ionawr",
				"Chwefror",
				"Mawrth",
				"Ebrill",
				"Mai",
				"Mehefin",
				"Gorffennaf",
				"Awst",
				"Medi",
				"Hydref",
				"Tachwedd",
				"Rhagfyr"
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
			approximatelySign: "~",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN",
			timeSeparator: ":"
		},
		default: {
			decimal: ".",
			group: ",",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			approximatelySign: "~",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN",
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
			2: "{0} a(c) {1}",
			end: "{0}, a(c) {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} neu {1}",
			end: "{0} neu {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		standardNarrow: {
			2: "{0}, {1}",
			end: "{0}, {1}"
		},
		unitShort: {
			2: "{0}, {1}",
			end: "{0}, {1}"
		}
	}
};
