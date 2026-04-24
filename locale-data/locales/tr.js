export default {
	sourceLocale: "tr",
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
		full: "d MMMM y EEEE",
		long: "d MMMM y",
		medium: "d MMM y",
		short: "d.MM.y"
	},
	dateFormatItems: {
		Bh: "B h",
		Bhm: "B h:mm",
		Bhms: "B h:mm:ss",
		EBhm: "E B h:mm",
		EBhms: "E B h:mm:ss",
		Ed: "d E",
		Ehm: "E a h:mm",
		Ehms: "E a h:mm:ss",
		GyM: "MM/y G",
		GyMd: "G dd.MM.y",
		GyMEd: "G dd.MM.y E",
		GyMMM: "G MMM y",
		GyMMMd: "G d MMM y",
		GyMMMEd: "G d MMM y E",
		h: "a h",
		hm: "a h:mm",
		hms: "a h:mm:ss",
		hmsv: "a h:mm:ss v",
		hmv: "a h:mm v",
		Hv: "HH v",
		Md: "d/M",
		MEd: "d/M E",
		MMMd: "d MMM",
		MMMEd: "d MMM E",
		MMMMd: "d MMMM",
		MMMMEd: "d MMMM E",
		MMMMW: "MMMM 'ayının' W. 'haftası'",
		mmss: "mm:ss",
		yM: "MM/y",
		yMd: "dd.MM.y",
		yMEd: "d.M.y E",
		yMM: "MM.y",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "d MMM y E",
		yMMMM: "MMMM y",
		yw: "Y 'yılının' w. 'haftası'",
		d: "d",
		E: "ccc",
		EBh: "E h B",
		Eh: "E h a",
		EHm: "E HH:mm",
		EHms: "E HH:mm:ss",
		Gy: "G y",
		H: "HH",
		Hm: "HH:mm",
		Hms: "HH:mm:ss",
		Hmsv: "HH:mm:ss v",
		Hmv: "HH:mm v",
		hv: "h a v",
		M: "L",
		MMM: "LLL",
		ms: "mm:ss",
		y: "y",
		yQQQ: "y QQQ",
		yQQQQ: "y QQQQ"
	},
	months: {
		format: {
			abbreviated: [
				"Oca",
				"Şub",
				"Mar",
				"Nis",
				"May",
				"Haz",
				"Tem",
				"Ağu",
				"Eyl",
				"Eki",
				"Kas",
				"Ara"
			],
			narrow: [
				"O",
				"Ş",
				"M",
				"N",
				"M",
				"H",
				"T",
				"A",
				"E",
				"E",
				"K",
				"A"
			],
			wide: [
				"Ocak",
				"Şubat",
				"Mart",
				"Nisan",
				"Mayıs",
				"Haziran",
				"Temmuz",
				"Ağustos",
				"Eylül",
				"Ekim",
				"Kasım",
				"Aralık"
			]
		},
		standAlone: {
			abbreviated: [
				"Oca",
				"Şub",
				"Mar",
				"Nis",
				"May",
				"Haz",
				"Tem",
				"Ağu",
				"Eyl",
				"Eki",
				"Kas",
				"Ara"
			],
			narrow: [
				"O",
				"Ş",
				"M",
				"N",
				"M",
				"H",
				"T",
				"A",
				"E",
				"E",
				"K",
				"A"
			],
			wide: [
				"Ocak",
				"Şubat",
				"Mart",
				"Nisan",
				"Mayıs",
				"Haziran",
				"Temmuz",
				"Ağustos",
				"Eylül",
				"Ekim",
				"Kasım",
				"Aralık"
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
		quotationStart: "“",
		quotationEnd: "”",
		alternateQuotationStart: "‘",
		alternateQuotationEnd: "’",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0} ve {1}",
			end: "{0} ve {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} veya {1}",
			end: "{0} veya {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		standardNarrow: {
			2: "{0}, {1}",
			end: "{0}, {1}"
		},
		unitShort: {
			2: "{0} {1}",
			start: "{0} {1}",
			middle: "{0} {1}",
			end: "{0} {1}"
		}
	}
};
