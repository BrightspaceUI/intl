export default {
	sourceLocale: "ar-EG",
	layout: {
		orientation: {
			characterOrder: "right-to-left",
			lineOrder: "top-to-bottom"
		}
	},
	pluralClass: {
		cardinal: [
			"zero",
			"one",
			"two",
			"few",
			"many",
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
		full: "EEEE، d MMMM y",
		long: "d MMMM y",
		medium: "dd‏/MM‏/y",
		short: "d‏/M‏/y"
	},
	dateFormatItems: {
		Ed: "E، d",
		Gy: "y G",
		GyM: "MM، y G",
		GyMd: "dd-MM-y GGGGG",
		GyMEd: "E d/M/y G",
		GyMMM: "MMM y G",
		GyMMMd: "d MMM y G",
		GyMMMEd: "E، d MMM y G",
		Md: "d‏/M",
		MEd: "E، d‏/M",
		MMdd: "dd‏/MM",
		MMMd: "d MMM",
		MMMEd: "E، d MMM",
		MMMMd: "d MMMM",
		MMMMEd: "E، d MMMM",
		MMMMW: "الأسبوع W من MMMM",
		yM: "M‏/y",
		yMd: "d‏/M‏/y",
		yMEd: "E، d‏/M‏/y",
		yMM: "MM‏/y",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "E، d MMM y",
		yMMMM: "MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "الأسبوع w من سنة Y",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EBh: "E h B",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		Eh: "E h a",
		Ehm: "E h:mm a",
		EHm: "E HH:mm",
		Ehms: "E h:mm:ss a",
		EHms: "E HH:mm:ss",
		h: "h a",
		H: "HH",
		hm: "h:mm a",
		Hm: "HH:mm",
		hms: "h:mm:ss a",
		Hms: "HH:mm:ss",
		hmsv: "h:mm:ss a v",
		Hmsv: "HH:mm:ss v",
		hmv: "h:mm a v",
		Hmv: "HH:mm v",
		hv: "h a v",
		Hv: "HH'h' v",
		M: "L",
		MMM: "LLL",
		ms: "mm:ss",
		y: "y"
	},
	months: {
		format: {
			abbreviated: [
				"يناير",
				"فبراير",
				"مارس",
				"أبريل",
				"مايو",
				"يونيو",
				"يوليو",
				"أغسطس",
				"سبتمبر",
				"أكتوبر",
				"نوفمبر",
				"ديسمبر"
			],
			narrow: [
				"ي",
				"ف",
				"م",
				"أ",
				"و",
				"ن",
				"ل",
				"غ",
				"س",
				"ك",
				"ب",
				"د"
			],
			wide: [
				"يناير",
				"فبراير",
				"مارس",
				"أبريل",
				"مايو",
				"يونيو",
				"يوليو",
				"أغسطس",
				"سبتمبر",
				"أكتوبر",
				"نوفمبر",
				"ديسمبر"
			]
		},
		standAlone: {
			abbreviated: [
				"يناير",
				"فبراير",
				"مارس",
				"أبريل",
				"مايو",
				"يونيو",
				"يوليو",
				"أغسطس",
				"سبتمبر",
				"أكتوبر",
				"نوفمبر",
				"ديسمبر"
			],
			narrow: [
				"ي",
				"ف",
				"م",
				"أ",
				"و",
				"ن",
				"ل",
				"غ",
				"س",
				"ك",
				"ب",
				"د"
			],
			wide: [
				"يناير",
				"فبراير",
				"مارس",
				"أبريل",
				"مايو",
				"يونيو",
				"يوليو",
				"أغسطس",
				"سبتمبر",
				"أكتوبر",
				"نوفمبر",
				"ديسمبر"
			]
		},
		transforms: {
			titleCase: {}
		}
	},
	numberingSystemId: "arab",
	numberingSystem: {
		type: "numeric",
		digits: [
			"٠",
			"١",
			"٢",
			"٣",
			"٤",
			"٥",
			"٦",
			"٧",
			"٨",
			"٩"
		]
	},
	numberSymbols: {
		latn: {
			percentSign: "‎%‎",
			plusSign: "‎+",
			minusSign: "‎-",
			nan: "ليس رقمًا",
			decimal: ".",
			group: ",",
			list: ";",
			approximatelySign: "~",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			timeSeparator: ":"
		},
		default: {
			exponential: "أس",
			nan: "ليس رقمًا",
			decimal: "٫",
			group: "٬",
			list: "؛",
			percentSign: "٪؜",
			plusSign: "؜+",
			minusSign: "؜-",
			approximatelySign: "~",
			superscriptingExponent: "×",
			perMille: "؉",
			infinity: "∞",
			timeSeparator: ":"
		}
	},
	delimiters: {
		quotationStart: "”",
		quotationEnd: "“",
		alternateQuotationStart: "’",
		alternateQuotationEnd: "‘",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0} و{1}",
			start: "{0} و{1}",
			middle: "{0} و{1}",
			end: "{0} و{1}"
		},
		or: {
			2: "{0} أو {1}",
			start: "{0} أو {1}",
			middle: "{0} أو {1}",
			end: "{0} أو {1}"
		},
		unitNarrow: {
			start: "{0} و{1}",
			middle: "{0} و{1}",
			end: "{0} و{1}"
		},
		unitShort: {
			start: "{0}، و{1}",
			middle: "{0}، و{1}",
			end: "{0}، و{1}"
		}
	}
};
