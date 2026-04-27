export default {
	sourceLocale: "ko",
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
			"other"
		]
	},
	localeDisplayPattern: {
		localePattern: "{0} ({1})",
		localeSeparator: "{0}, {1}",
		localeKeyTypePattern: "{0}: {1}"
	},
	dateFormats: {
		full: "y년 MMMM d일 EEEE",
		long: "y년 MMMM d일",
		medium: "y. M. d.",
		short: "yy. M. d."
	},
	dateFormatItems: {
		Bh: "B h시",
		Bhm: "B h:mm",
		Bhms: "B h:mm:ss",
		d: "d일",
		EBh: "(E) B h시",
		EBhm: "(E) B h:mm",
		EBhms: "(E) B h:mm:ss",
		Ed: "d일 (E)",
		EEEEd: "d일 EEEE",
		Eh: "(E) a h",
		Ehm: "(E) a h:mm",
		EHm: "(E) HH:mm",
		Ehms: "(E) a h:mm:ss",
		EHms: "(E) HH:mm:ss",
		Gy: "G y년",
		GyM: "G y/M",
		GyMd: "GGGGG y/M/d",
		GyMEd: "G y/M/d (E)",
		GyMMM: "G y년 MMM",
		GyMMMd: "G y년 MMM d일",
		GyMMMEd: "G y년 MMM d일 (E)",
		GyMMMEEEEd: "G y년 MMM d일 EEEE",
		h: "a h시",
		H: "H시",
		HHmmss: "HH:mm:ss",
		hm: "a h:mm",
		hms: "a h:mm:ss",
		Hms: "H시 m분 s초",
		hmsv: "a h:mm:ss v",
		Hmsv: "H시 m분 s초 v",
		hmv: "a h:mm v",
		hv: "a h시 v",
		Hv: "H시 v",
		M: "M월",
		Md: "M. d.",
		MEd: "M. d. (E)",
		MEEEEd: "M. d. EEEE",
		MMMd: "MMM d일",
		MMMEd: "MMM d일 (E)",
		MMMEEEEd: "MMM d일 EEEE",
		MMMMd: "MMMM d일",
		MMMMW: "MMMM W번째 주",
		mmss: "mm:ss",
		y: "y년",
		yM: "y. M.",
		yMd: "y. M. d.",
		yMEd: "y. M. d. (E)",
		yMEEEEd: "y. M. d. EEEE",
		yMM: "y. M.",
		yMMM: "y년 MMM",
		yMMMd: "y년 MMM d일",
		yMMMEd: "y년 MMM d일 (E)",
		yMMMEEEEd: "y년 MMM d일 EEEE",
		yMMMM: "y년 MMMM",
		yQQQ: "y년 QQQ",
		yQQQQ: "y년 QQQQ",
		yw: "Y년 w번째 주",
		E: "ccc",
		Hm: "HH:mm",
		Hmv: "HH:mm v",
		MMM: "LLL",
		ms: "mm:ss"
	},
	months: {
		format: {
			abbreviated: [
				"1월",
				"2월",
				"3월",
				"4월",
				"5월",
				"6월",
				"7월",
				"8월",
				"9월",
				"10월",
				"11월",
				"12월"
			],
			narrow: [
				"1월",
				"2월",
				"3월",
				"4월",
				"5월",
				"6월",
				"7월",
				"8월",
				"9월",
				"10월",
				"11월",
				"12월"
			],
			wide: [
				"1월",
				"2월",
				"3월",
				"4월",
				"5월",
				"6월",
				"7월",
				"8월",
				"9월",
				"10월",
				"11월",
				"12월"
			]
		},
		standAlone: {
			abbreviated: [
				"1월",
				"2월",
				"3월",
				"4월",
				"5월",
				"6월",
				"7월",
				"8월",
				"9월",
				"10월",
				"11월",
				"12월"
			],
			narrow: [
				"1월",
				"2월",
				"3월",
				"4월",
				"5월",
				"6월",
				"7월",
				"8월",
				"9월",
				"10월",
				"11월",
				"12월"
			],
			wide: [
				"1월",
				"2월",
				"3월",
				"4월",
				"5월",
				"6월",
				"7월",
				"8월",
				"9월",
				"10월",
				"11월",
				"12월"
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
			2: "{0} 및 {1}",
			end: "{0} 및 {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} 또는 {1}",
			end: "{0} 또는 {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		unitShort: {
			2: "{0} {1}",
			start: "{0} {1}",
			middle: "{0} {1}",
			end: "{0} {1}"
		}
	}
};
