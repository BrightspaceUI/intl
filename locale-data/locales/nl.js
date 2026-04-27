export default {
	sourceLocale: "nl",
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
		full: "EEEE d MMMM y",
		long: "d MMMM y",
		medium: "d MMM y",
		short: "dd-MM-y"
	},
	dateFormatItems: {
		Ed: "E d",
		Gy: "y G",
		GyM: "M/y G",
		GyMd: "d/M/y GGGGG",
		GyMEd: "E d/M/y G",
		GyMMM: "MMM y G",
		GyMMMd: "d MMM y G",
		GyMMMEd: "E d MMM y G",
		Md: "d-M",
		MEd: "E d-M",
		MMMd: "d MMM",
		MMMEd: "E d MMM",
		MMMMd: "d MMMM",
		MMMMW: "'week' W 'van' MMMM",
		yM: "M-y",
		yMd: "d-M-y",
		yMEd: "E d-M-y",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "E d MMM y",
		yMMMM: "MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "'week' w 'in' Y",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EBh: "E h B",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		Eh: "E h a",
		Ehm: "E h:mm a",
		EHm: "E HH:mm",
		Ehms: "E h:mm:ss a",
		EHms: "E HH:mm:ss",
		h: "h a",
		H: "HH",
		hm: "h:mm a",
		Hm: "HH:mm",
		hms: "h:mm:ss a",
		Hms: "HH:mm:ss",
		hmsv: "h:mm:ss a v",
		Hmsv: "HH:mm:ss v",
		hmv: "h:mm a v",
		Hmv: "HH:mm v",
		hv: "h a v",
		Hv: "HH'h' v",
		M: "L",
		MMM: "LLL",
		ms: "mm:ss",
		y: "y"
	},
	months: {
		format: {
			abbreviated: [
				"jan",
				"feb",
				"mrt",
				"apr",
				"mei",
				"jun",
				"jul",
				"aug",
				"sep",
				"okt",
				"nov",
				"dec"
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
				"maart",
				"april",
				"mei",
				"juni",
				"juli",
				"augustus",
				"september",
				"oktober",
				"november",
				"december"
			]
		},
		standAlone: {
			abbreviated: [
				"jan",
				"feb",
				"mrt",
				"apr",
				"mei",
				"jun",
				"jul",
				"aug",
				"sep",
				"okt",
				"nov",
				"dec"
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
				"maart",
				"april",
				"mei",
				"juni",
				"juli",
				"augustus",
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
			group: ".",
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
			decimal: ",",
			group: ".",
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
		quotationStart: "‘",
		quotationEnd: "’",
		alternateQuotationStart: "‘",
		alternateQuotationEnd: "’",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0} en {1}",
			end: "{0} en {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} of {1}",
			end: "{0} of {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		standardNarrow: {
			2: "{0}, {1}",
			end: "{0}, {1}"
		},
		standardShort: {
			2: "{0} & {1}",
			end: "{0} & {1}"
		},
		unit: {
			2: "{0} en {1}",
			end: "{0} en {1}"
		},
		unitShort: {
			2: "{0}, {1}",
			end: "{0}, {1}"
		}
	}
};
