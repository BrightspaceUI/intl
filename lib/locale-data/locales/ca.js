export default {
	sourceLocale: "ca",
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
			"two",
			"few",
			"other"
		]
	},
	localeDisplayPattern: {
		localePattern: "{0} ({1})",
		localeSeparator: "{0}, {1}",
		localeKeyTypePattern: "{0}: {1}"
	},
	dateFormats: {
		full: "EEEE, d MMMM 'del' y",
		long: "d MMMM 'del' y",
		medium: "d MMM y",
		short: "d/M/yy"
	},
	dateFormatItems: {
		Ed: "E d",
		Ehm: "E h:mm a",
		EHm: "E H:mm",
		Ehms: "E h:mm:ss a",
		EHms: "E H:mm:ss",
		Gy: "y G",
		GyM: "M/y G",
		GyMd: "dd-MM-y GGGGG",
		GyMEd: "E, d/M/y G",
		GyMMM: "LLL y G",
		GyMMMd: "d MMM 'del' y G",
		GyMMMEd: "E, d MMM 'del' y G",
		GyMMMM: "LLLL 'del' y G",
		GyMMMMd: "d MMMM 'del' y G",
		GyMMMMEd: "E, d MMMM 'del' y G",
		H: "H",
		hm: "h:mm a",
		Hm: "H:mm",
		hms: "h:mm:ss a",
		Hms: "H:mm:ss",
		hmsv: "h:mm:ss a v",
		Hmsv: "H:mm:ss v",
		hmsvvvv: "h:mm:ss a (vvvv)",
		Hmsvvvv: "H:mm:ss (vvvv)",
		hmv: "h:mm a v",
		Hmv: "H:mm v",
		hmvvvv: "h:mm a (vvvv)",
		Hmvvvv: "H:mm (vvvv)",
		Hv: "H 'h' v",
		Md: "d/M",
		MEd: "E d/M",
		MMMd: "d MMM",
		MMMEd: "E, d MMM",
		MMMMd: "d MMMM",
		MMMMEd: "E, d MMMM",
		MMMMW: "'setmana' W MMMM",
		yM: "M/y",
		yMd: "d/M/y",
		yMEd: "E, d/M/y",
		yMMM: "LLL 'del' y",
		yMMMd: "d MMM 'del' y",
		yMMMEd: "E, d MMM y",
		yMMMM: "LLLL 'del' y",
		yMMMMd: "d MMMM 'del' y",
		yMMMMEd: "E, d MMMM 'del' y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ 'del' y",
		yw: "'setmana' w 'del' Y",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EBh: "E h B",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		Eh: "E h a",
		h: "h a",
		hv: "h a v",
		M: "L",
		MMM: "LLL",
		ms: "mm:ss",
		y: "y"
	},
	months: {
		format: {
			abbreviated: [
				"de gen.",
				"de febr.",
				"de març",
				"d’abr.",
				"de maig",
				"de juny",
				"de jul.",
				"d’ag.",
				"de set.",
				"d’oct.",
				"de nov.",
				"de des."
			],
			narrow: [
				"GN",
				"FB",
				"MÇ",
				"AB",
				"MG",
				"JN",
				"JL",
				"AG",
				"ST",
				"OC",
				"NV",
				"DS"
			],
			wide: [
				"de gener",
				"de febrer",
				"de març",
				"d’abril",
				"de maig",
				"de juny",
				"de juliol",
				"d’agost",
				"de setembre",
				"d’octubre",
				"de novembre",
				"de desembre"
			]
		},
		standAlone: {
			abbreviated: [
				"gen.",
				"febr.",
				"març",
				"abr.",
				"maig",
				"juny",
				"jul.",
				"ag.",
				"set.",
				"oct.",
				"nov.",
				"des."
			],
			narrow: [
				"GN",
				"FB",
				"MÇ",
				"AB",
				"MG",
				"JN",
				"JL",
				"AG",
				"ST",
				"OC",
				"NV",
				"DS"
			],
			wide: [
				"gener",
				"febrer",
				"març",
				"abril",
				"maig",
				"juny",
				"juliol",
				"agost",
				"setembre",
				"octubre",
				"novembre",
				"desembre"
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
		quotationStart: "«",
		quotationEnd: "»",
		alternateQuotationStart: "“",
		alternateQuotationEnd: "”",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0} i {1}",
			end: "{0} i {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} o {1}",
			end: "{0} o {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		}
	}
};
