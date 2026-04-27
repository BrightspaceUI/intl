export default {
	sourceLocale: "zh-Hant",
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
		full: "y年M月d日 EEEE",
		long: "y年M月d日",
		medium: "y年M月d日",
		short: "y/M/d"
	},
	dateFormatItems: {
		Bh: "Bh時",
		Bhm: "Bh:mm",
		Bhms: "Bh:mm:ss",
		d: "d日",
		EBh: "EBh時",
		EBhm: "EBh:mm",
		EBhms: "EBh:mm:ss",
		Ed: "d E",
		Eh: "Eah時",
		Ehm: "EBh:mm",
		Ehms: "EBh:mm:ss",
		Gy: "Gy年",
		GyM: "Gy/M",
		GyMd: "G y/M/d",
		GyMEd: "Gy/M/d（E）",
		GyMMM: "Gy年M月",
		GyMMMd: "Gy年M月d日",
		GyMMMEd: "Gy年M月d日 E",
		h: "Bh時",
		H: "H時",
		hm: "Bh:mm",
		hms: "Bh:mm:ss",
		hmsv: "Bh:mm:ss [v]",
		Hmsv: "HH:mm:ss [v]",
		hmv: "Bh:mm [v]",
		Hmv: "HH:mm [v]",
		hv: "ah v",
		M: "M月",
		Md: "M/d",
		MEd: "M/d（E）",
		MMdd: "MM/dd",
		MMMd: "M月d日",
		MMMEd: "M月d日E",
		MMMMd: "M月d日",
		MMMMW: "MMMM的第W週",
		y: "y年",
		yM: "y/M",
		yMd: "y/M/d",
		yMEd: "y/M/d（E）",
		yMEEEEd: "y年M月d日 EEEE",
		yMM: "y/MM",
		yMMM: "y年M月",
		yMMMd: "y年M月d日",
		yMMMEd: "y年M月d日E",
		yMMMM: "y年M月",
		yQQQ: "y年QQQ",
		yQQQQ: "y年QQQQ",
		yw: "Y年的第w週",
		E: "ccc",
		EHm: "E HH:mm",
		EHms: "E HH:mm:ss",
		Hm: "HH:mm",
		Hms: "HH:mm:ss",
		Hv: "HH'h' v",
		MMM: "LLL",
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
			nan: "非數值",
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
			timeSeparator: ":"
		},
		default: {
			nan: "非數值",
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
			2: "{0}和{1}",
			start: "{0}、{1}",
			middle: "{0}、{1}",
			end: "{0}和{1}"
		},
		or: {
			2: "{0}或{1}",
			start: "{0}、{1}",
			middle: "{0}、{1}",
			end: "{0}或{1}"
		},
		standardNarrow: {
			2: "{0}、{1}"
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
