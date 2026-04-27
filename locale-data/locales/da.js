export default {
	sourceLocale: "da",
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
		full: "EEEE 'den' d. MMMM y",
		long: "d. MMMM y",
		medium: "d. MMM y",
		short: "dd.MM.y"
	},
	dateFormatItems: {
		Bhm: "h.mm B",
		Bhms: "h.mm.ss B",
		d: "d.",
		EBhm: "E h.mm B",
		EBhms: "E h.mm.ss B",
		Ed: "E 'den' d.",
		Ehm: "E h.mm a",
		EHm: "E HH.mm",
		Ehms: "E h.mm.ss a",
		EHms: "E HH.mm.ss",
		Gy: "y G",
		GyM: "M/y G",
		GyMd: "d.M.y GGGGG",
		GyMEd: "E d/M/y G",
		GyMMM: "MMM y G",
		GyMMMd: "d. MMM y G",
		GyMMMEd: "E d. MMM y G",
		hm: "h.mm a",
		Hm: "HH.mm",
		hms: "h.mm.ss a",
		Hms: "HH.mm.ss",
		hmsv: "h.mm.ss a v",
		Hmsv: "HH.mm.ss v",
		hmv: "h.mm a v",
		Hmv: "HH.mm v",
		M: "M",
		Md: "d.M",
		MEd: "E d.M",
		MMdd: "dd.MM",
		MMM: "MMM",
		MMMd: "d. MMM",
		MMMEd: "E d. MMM",
		MMMMd: "d. MMMM",
		MMMMEd: "E d. MMMM",
		MMMMW: "W. 'uge' 'i' MMMM",
		ms: "mm.ss",
		yM: "M.y",
		yMd: "d.M.y",
		yMEd: "E d.M.y",
		yMM: "MM.y",
		yMMM: "MMM y",
		yMMMd: "d. MMM y",
		yMMMEd: "E d. MMM y",
		yMMMM: "MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "'uge' w 'i' Y",
		Bh: "h B",
		E: "ccc",
		EBh: "E h B",
		Eh: "E h a",
		h: "h a",
		H: "HH",
		hv: "h a v",
		Hv: "HH'h' v",
		y: "y"
	},
	months: {
		format: {
			abbreviated: [
				"jan.",
				"feb.",
				"mar.",
				"apr.",
				"maj",
				"jun.",
				"jul.",
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
				"januar",
				"februar",
				"marts",
				"april",
				"maj",
				"juni",
				"juli",
				"august",
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
				"mar.",
				"apr.",
				"maj",
				"jun.",
				"jul.",
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
				"januar",
				"februar",
				"marts",
				"april",
				"maj",
				"juni",
				"juli",
				"august",
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
			timeSeparator: ".",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			approximatelySign: "~",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN"
		},
		default: {
			decimal: ",",
			group: ".",
			timeSeparator: ".",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			approximatelySign: "~",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN"
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
			2: "{0} og {1}",
			end: "{0} og {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} eller {1}",
			end: "{0} eller {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		orShort: {
			2: "{0} el. {1}",
			end: "{0} el. {1}"
		}
	}
};
