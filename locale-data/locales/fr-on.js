export default {
	sourceLocale: "fr-CA",
	layout: {
		orientation: {
			characterOrder: "left-to-right",
			lineOrder: "top-to-bottom"
		}
	},
	pluralClass: {
		cardinal: [
			"one",
			"many",
			"other"
		],
		ordinal: [
			"one",
			"other"
		]
	},
	localeDisplayPattern: {
		localeKeyTypePattern: "{0}: {1}",
		localePattern: "{0} ({1})",
		localeSeparator: "{0}, {1}"
	},
	dateFormats: {
		full: "EEEE d MMMM y",
		long: "d MMMM y",
		medium: "d MMM y",
		short: "y-MM-dd"
	},
	dateFormatItems: {
		Bh: "h 'h' B",
		Bhm: "h 'h' mm B",
		Bhms: "h 'h' mm 'min' ss 's' B",
		EBh: "E h 'h' B",
		EBhm: "E h 'h' mm B",
		EBhms: "E h 'h' mm 'min' ss 's' B",
		Eh: "E h 'h' a",
		Ehm: "E h 'h' mm a",
		EHm: "E HH 'h' mm",
		Ehms: "E h 'h' mm 'min' ss 's' a",
		EHms: "E HH 'h' mm 'min' ss 's'",
		GyM: "y-MM G",
		GyMd: "y-MM-dd GGGGG",
		GyMEd: "E y-MM-dd G",
		h: "h 'h' a",
		hm: "h 'h' mm a",
		Hm: "HH 'h' mm",
		hms: "h 'h' mm 'min' ss 's' a",
		Hms: "HH 'h' mm 'min' ss 's'",
		hmsv: "h 'h' mm 'min' ss 's' a v",
		Hmsv: "HH 'h' mm 'min' ss 's' v",
		hmv: "h 'h' mm a v",
		Hmv: "HH 'h' mm v",
		hv: "h 'h' a v",
		Hv: "H 'h' v",
		Md: "MM-dd",
		MEd: "E MM-dd",
		MMd: "MM-dd",
		MMdd: "MM-dd",
		ms: "mm 'min' ss 's'",
		yM: "y-MM",
		yMd: "y-MM-dd",
		yMEd: "E y-MM-dd",
		yMM: "y-MM",
		E: "E",
		Ed: "E d",
		Gy: "y G",
		GyMMM: "MMM y G",
		GyMMMd: "d MMM y G",
		GyMMMEd: "E d MMM y G",
		H: "HH 'h'",
		MMMd: "d MMM",
		MMMEd: "E d MMM",
		MMMMd: "d MMMM",
		MMMMW: "'semaine' W (MMMM)",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "E d MMM y",
		yMMMM: "MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "'semaine' w 'de' Y",
		d: "d",
		M: "L",
		MMM: "LLL",
		y: "y"
	},
	months: {
		format: {
			abbreviated: [
				"janv.",
				"févr.",
				"mars",
				"avr.",
				"mai",
				"juin",
				"juill.",
				"août",
				"sept.",
				"oct.",
				"nov.",
				"déc."
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
				"janvier",
				"février",
				"mars",
				"avril",
				"mai",
				"juin",
				"juillet",
				"août",
				"septembre",
				"octobre",
				"novembre",
				"décembre"
			]
		},
		standAlone: {
			abbreviated: [
				"janv.",
				"févr.",
				"mars",
				"avr.",
				"mai",
				"juin",
				"juill.",
				"août",
				"sept.",
				"oct.",
				"nov.",
				"déc."
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
				"janvier",
				"février",
				"mars",
				"avril",
				"mai",
				"juin",
				"juillet",
				"août",
				"septembre",
				"octobre",
				"novembre",
				"décembre"
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
			group: " ",
			approximatelySign: "≈",
			decimal: ",",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN",
			timeSeparator: ":"
		},
		default: {
			group: " ",
			approximatelySign: "≈",
			decimal: ",",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			nan: "NaN",
			timeSeparator: ":"
		}
	},
	delimiters: {
		alternateQuotationStart: "”",
		alternateQuotationEnd: "“",
		quotationStart: "«",
		quotationEnd: "»",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0} et {1}",
			end: "{0} et {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} ou {1}",
			end: "{0} ou {1}",
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
		}
	}
};
