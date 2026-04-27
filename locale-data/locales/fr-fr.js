export default {
	sourceLocale: "fr",
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
		short: "dd/MM/y"
	},
	dateFormatItems: {
		E: "E",
		Ed: "E d",
		Ehm: "E h:mm a",
		Ehms: "E h:mm:ss a",
		Gy: "y G",
		GyM: "MM/y G",
		GyMd: "dd/MM/y GGGGG",
		GyMEd: "E dd/MM/y GGGGG",
		GyMMM: "MMM y G",
		GyMMMd: "d MMM y G",
		GyMMMEd: "E d MMM y G",
		H: "HH 'h'",
		hm: "h:mm a",
		hms: "h:mm:ss a",
		hmsv: "h:mm:ss a v",
		hmv: "h:mm a v",
		Hv: "HH 'h' v",
		Md: "dd/MM",
		MEd: "E dd/MM",
		MMMd: "d MMM",
		MMMEd: "E d MMM",
		MMMMd: "d MMMM",
		MMMMW: "'semaine' W (MMMM)",
		yM: "MM/y",
		yMd: "dd/MM/y",
		yMEd: "E dd/MM/y",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "E d MMM y",
		yMMMM: "MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "'semaine' w 'de' Y",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		EBh: "E h B",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		Eh: "E h a",
		EHm: "E HH:mm",
		EHms: "E HH:mm:ss",
		h: "h a",
		Hm: "HH:mm",
		Hms: "HH:mm:ss",
		Hmsv: "HH:mm:ss v",
		Hmv: "HH:mm v",
		hv: "h a v",
		M: "L",
		MMM: "LLL",
		ms: "mm:ss",
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
				"juil.",
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
				"juil.",
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
			decimal: ",",
			group: " ",
			approximatelySign: "≃",
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
			decimal: ",",
			group: " ",
			approximatelySign: "≃",
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
		quotationStart: "«",
		quotationEnd: "»",
		alternateQuotationStart: "«",
		alternateQuotationEnd: "»",
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
