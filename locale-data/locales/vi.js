export default {
	sourceLocale: "vi",
	layout: {
		orientation: {
			characterOrder: "left-to-right",
			lineOrder: "top-to-bottom"
		}
	},
	pluralClass: {
		cardinal: [
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
		full: "EEEE, d MMMM, y",
		long: "d MMMM, y",
		medium: "d MMM, y",
		short: "d/M/yy"
	},
	dateFormatItems: {
		Bh: "h 'giờ' B",
		EBh: "h 'giờ' B E",
		EBhm: "h:mm B E",
		EBhms: "h:mm:ss B E",
		Ed: "E, 'ngày' d",
		Eh: "h 'giờ' a E",
		Ehm: "h:mm a E",
		EHm: "HH:mm E",
		Ehms: "h:mm:ss a E",
		EHms: "HH:mm:ss E",
		Gy: "y G",
		GyM: "M/y G",
		GyMd: "d/M/y G",
		GyMEd: "E, d/M/y G",
		GyMMM: "MMM y G",
		GyMMMd: "d MMM, y G",
		GyMMMEd: "E, d MMM, y G",
		H: "HH 'giờ'",
		hm: "h:mm a",
		Hm: "H:mm",
		hms: "h:mm:ss a",
		hmsv: "h:mm:ss a v",
		hmv: "h:mm a v",
		hv: "h 'giờ' a v",
		Md: "d/M",
		MEd: "E, d/M",
		MMdd: "dd-MM",
		MMMd: "d MMM",
		MMMEd: "E, d MMM",
		MMMMd: "d MMMM",
		MMMMEd: "E, d MMMM",
		MMMMW: "'tuần' W 'của' 'tháng' M",
		mmss: "mm:ss",
		yM: "M/y",
		yMd: "d/M/y",
		yMEd: "E, d/M/y",
		yMM: "'tháng' MM, y",
		yMMM: "MMM y",
		yMMMd: "d MMM, y",
		yMMMEd: "E, d MMM, y",
		yMMMM: "MMMM 'năm' y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ 'năm' y",
		yw: "'tuần' w 'của' 'năm' Y",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		h: "h a",
		Hms: "HH:mm:ss",
		Hmsv: "HH:mm:ss v",
		Hmv: "HH:mm v",
		Hv: "HH'h' v",
		M: "L",
		MMM: "LLL",
		ms: "mm:ss",
		y: "y"
	},
	months: {
		format: {
			abbreviated: [
				"thg 1",
				"thg 2",
				"thg 3",
				"thg 4",
				"thg 5",
				"thg 6",
				"thg 7",
				"thg 8",
				"thg 9",
				"thg 10",
				"thg 11",
				"thg 12"
			],
			narrow: [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12"
			],
			wide: [
				"tháng 1",
				"tháng 2",
				"tháng 3",
				"tháng 4",
				"tháng 5",
				"tháng 6",
				"tháng 7",
				"tháng 8",
				"tháng 9",
				"tháng 10",
				"tháng 11",
				"tháng 12"
			]
		},
		standAlone: {
			abbreviated: [
				"Tháng 1",
				"Tháng 2",
				"Tháng 3",
				"Tháng 4",
				"Tháng 5",
				"Tháng 6",
				"Tháng 7",
				"Tháng 8",
				"Tháng 9",
				"Tháng 10",
				"Tháng 11",
				"Tháng 12"
			],
			narrow: [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12"
			],
			wide: [
				"Tháng 1",
				"Tháng 2",
				"Tháng 3",
				"Tháng 4",
				"Tháng 5",
				"Tháng 6",
				"Tháng 7",
				"Tháng 8",
				"Tháng 9",
				"Tháng 10",
				"Tháng 11",
				"Tháng 12"
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
			2: "{0} và {1}",
			end: "{0} và {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} hoặc {1}",
			end: "{0} hoặc {1}",
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
