export default {
	sourceLocale: "ja",
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
		localeSeparator: "{0}, {1}",
		localePattern: "{0} ({1})",
		localeKeyTypePattern: "{0}: {1}"
	},
	dateFormats: {
		full: "y年M月d日EEEE",
		long: "y年M月d日",
		medium: "y/MM/dd",
		short: "y/MM/dd"
	},
	dateFormatItems: {
		Bh: "BK時",
		Bhm: "BK:mm",
		Bhms: "BK:mm:ss",
		d: "d日",
		EBh: "BK時 (E)",
		EBhm: "BK:mm (E)",
		EBhms: "BK:mm:ss (E)",
		Ed: "d日(E)",
		EEEEd: "d日EEEE",
		Eh: "aK時 (E)",
		Ehm: "aK:mm (E)",
		EHm: "H:mm (E)",
		Ehms: "aK:mm:ss (E)",
		EHms: "H:mm:ss (E)",
		Gy: "Gy年",
		GyM: "Gy/M",
		GyMd: "Gy/M/d",
		GyMEd: "Gy/M/d(E)",
		GyMMM: "Gy年M月",
		GyMMMd: "Gy年M月d日",
		GyMMMEd: "Gy年M月d日(E)",
		GyMMMEEEEd: "Gy年M月d日EEEE",
		h: "aK時",
		H: "H時",
		hm: "aK:mm",
		Hm: "H:mm",
		hms: "aK:mm:ss",
		Hms: "H:mm:ss",
		hmsv: "aK:mm:ss v",
		Hmsv: "H:mm:ss v",
		hmv: "aK:mm v",
		Hmv: "H:mm v",
		hv: "aK時 v",
		Hv: "H時 v",
		M: "M月",
		Md: "M/d",
		MEd: "M/d(E)",
		MEEEEd: "M/dEEEE",
		MMM: "M月",
		MMMd: "M月d日",
		MMMEd: "M月d日(E)",
		MMMEEEEd: "M月d日EEEE",
		MMMMd: "M月d日",
		MMMMW: "M月第W週",
		y: "y年",
		yM: "y/M",
		yMd: "y/M/d",
		yMEd: "y/M/d(E)",
		yMEEEEd: "y/M/dEEEE",
		yMM: "y/MM",
		yMMM: "y年M月",
		yMMMd: "y年M月d日",
		yMMMEd: "y年M月d日(E)",
		yMMMEEEEd: "y年M月d日EEEE",
		yMMMM: "y年M月",
		yQQQ: "y/QQQ",
		yQQQQ: "y年QQQQ",
		yw: "Y年第w週",
		E: "ccc",
		ms: "mm:ss"
	},
	months: {
		format: {
			abbreviated: [
				"1月",
				"2月",
				"3月",
				"4月",
				"5月",
				"6月",
				"7月",
				"8月",
				"9月",
				"10月",
				"11月",
				"12月"
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
				"1月",
				"2月",
				"3月",
				"4月",
				"5月",
				"6月",
				"7月",
				"8月",
				"9月",
				"10月",
				"11月",
				"12月"
			]
		},
		standAlone: {
			abbreviated: [
				"1月",
				"2月",
				"3月",
				"4月",
				"5月",
				"6月",
				"7月",
				"8月",
				"9月",
				"10月",
				"11月",
				"12月"
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
				"1月",
				"2月",
				"3月",
				"4月",
				"5月",
				"6月",
				"7月",
				"8月",
				"9月",
				"10月",
				"11月",
				"12月"
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
			approximatelySign: "約",
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
			timeSeparator: ":"
		},
		default: {
			approximatelySign: "約",
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
			timeSeparator: ":"
		}
	},
	delimiters: {
		quotationStart: "「",
		quotationEnd: "」",
		alternateQuotationStart: "『",
		alternateQuotationEnd: "』",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0}、{1}",
			start: "{0}、{1}",
			middle: "{0}、{1}",
			end: "{0}、{1}"
		},
		or: {
			2: "{0}または{1}",
			start: "{0}、{1}",
			middle: "{0}、{1}",
			end: "{0}、または{1}"
		},
		unitNarrow: {
			2: "{0}{1}",
			start: "{0}{1}",
			middle: "{0}{1}",
			end: "{0}{1}"
		},
		unitShort: {
			2: "{0} {1}",
			start: "{0} {1}",
			middle: "{0} {1}",
			end: "{0} {1}"
		}
	}
};
