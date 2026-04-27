export default {
	sourceLocale: "zh-Hans",
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
		full: "y年M月d日EEEE",
		long: "y年M月d日",
		medium: "y年M月d日",
		short: "y/M/d"
	},
	dateFormatItems: {
		Bh: "Bh时",
		Bhm: "Bh:mm",
		Bhms: "Bh:mm:ss",
		d: "d日",
		EBh: "EBh时",
		EBhm: "EBh:mm",
		EBhms: "EBh:mm:ss",
		Ed: "d日E",
		Eh: "Eah时",
		Ehm: "Eah:mm",
		EHm: "EHH:mm",
		Ehms: "Eah:mm:ss",
		EHms: "EHH:mm:ss",
		Gy: "Gy年",
		GyM: "Gy年M月",
		GyMd: "Gy-MM-dd",
		GyMEd: "Gy-MM-ddE",
		GyMMM: "Gy年M月",
		GyMMMd: "Gy年M月d日",
		GyMMMEd: "Gy年M月d日E",
		h: "ah时",
		H: "H时",
		hm: "ah:mm",
		hms: "ah:mm:ss",
		hmsv: "vah:mm:ss",
		Hmsv: "vHH:mm:ss",
		hmv: "vah:mm",
		Hmv: "v HH:mm",
		hv: "vah时",
		Hv: "vH时",
		M: "M月",
		Md: "M/d",
		MEd: "M/dE",
		MMdd: "MM/dd",
		MMMd: "M月d日",
		MMMEd: "M月d日E",
		MMMMd: "M月d日",
		MMMMW: "MMMM第W周",
		y: "y年",
		yM: "y/M",
		yMd: "y/M/d",
		yMEd: "y/M/dE",
		yMEEEEd: "y年M月d日EEEE",
		yMM: "y年M月",
		yMMM: "y年M月",
		yMMMd: "y年M月d日",
		yMMMEd: "y年M月d日E",
		yMMMM: "y年M月",
		yQQQ: "y年第Q季度",
		yQQQQ: "y年第Q季度",
		yw: "Y年第w周",
		E: "ccc",
		Hm: "HH:mm",
		Hms: "HH:mm:ss",
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
				"一月",
				"二月",
				"三月",
				"四月",
				"五月",
				"六月",
				"七月",
				"八月",
				"九月",
				"十月",
				"十一月",
				"十二月"
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
				"一月",
				"二月",
				"三月",
				"四月",
				"五月",
				"六月",
				"七月",
				"八月",
				"九月",
				"十月",
				"十一月",
				"十二月"
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
			2: "{0}、{1}",
			end: "{0}、{1}"
		},
		unitShort: {
			2: "{0}{1}",
			start: "{0}{1}",
			middle: "{0}{1}",
			end: "{0}{1}"
		}
	}
};
