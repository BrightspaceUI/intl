export default {
	languageDisplayName: "русский",
	localeDisplayName: "русский",
	sourceLocale: "ru",
	localeCode: "ru",
	layout: {
		orientation: {
			characterOrder: "left-to-right",
			lineOrder: "top-to-bottom"
		}
	},
	pluralClass: {
		cardinal: [
			"one",
			"few",
			"many",
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
		full: "EEEE, d MMMM y 'г'.",
		long: "d MMMM y 'г'.",
		medium: "d MMM y 'г'.",
		short: "dd.MM.y"
	},
	dateFormatItems: {
		EBh: "E, h B",
		EBhm: "ccc, h:mm B",
		EBhms: "ccc, h:mm:ss B",
		Ed: "ccc, d",
		Eh: "E, h a",
		Ehm: "E h:mm a",
		Ehms: "E h:mm:ss a",
		Gy: "y 'г'. G",
		GyM: "MM.y GGGGG",
		GyMd: "dd.MM.y GGGGG",
		GyMEd: "E, dd.MM.y GGGGG",
		GyMMM: "LLL y 'г'. G",
		GyMMMd: "d MMM y 'г'. G",
		GyMMMEd: "E, d MMM y 'г'. G",
		H: "H",
		hm: "h:mm a",
		hms: "h:mm:ss a",
		hmsv: "h:mm:ss a v",
		hmv: "h:mm a v",
		hv: "h a, v",
		Hv: "HH 'ч'. v",
		Md: "dd.MM",
		MEd: "E, dd.MM",
		MMdd: "dd.MM",
		MMMd: "d MMM",
		MMMEd: "ccc, d MMM",
		MMMMd: "d MMMM",
		MMMMW: "W-'я' 'неделя' MMMM",
		yM: "MM.y",
		yMd: "dd.MM.y",
		yMEd: "ccc, dd.MM.y",
		yMM: "MM.y",
		yMMM: "LLL y 'г'.",
		yMMMd: "d MMM y 'г'.",
		yMMMEd: "E, d MMM y 'г'.",
		yMMMM: "LLLL y 'г'.",
		yQQQ: "QQQ y 'г'.",
		yQQQQ: "QQQQ y 'г'.",
		yw: "w-'я' 'неделя' Y 'г'.",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EHm: "E HH:mm",
		EHms: "E HH:mm:ss",
		h: "h a",
		Hm: "HH:mm",
		Hms: "HH:mm:ss",
		Hmsv: "HH:mm:ss v",
		Hmv: "HH:mm v",
		M: "L",
		MMM: "LLL",
		ms: "mm:ss",
		y: "y"
	},
	months: {
		format: {
			abbreviated: [
				"янв.",
				"февр.",
				"мар.",
				"апр.",
				"мая",
				"июн.",
				"июл.",
				"авг.",
				"сент.",
				"окт.",
				"нояб.",
				"дек."
			],
			narrow: [
				"Я",
				"Ф",
				"М",
				"А",
				"М",
				"И",
				"И",
				"А",
				"С",
				"О",
				"Н",
				"Д"
			],
			wide: [
				"января",
				"февраля",
				"марта",
				"апреля",
				"мая",
				"июня",
				"июля",
				"августа",
				"сентября",
				"октября",
				"ноября",
				"декабря"
			]
		},
		standAlone: {
			abbreviated: [
				"янв.",
				"февр.",
				"март",
				"апр.",
				"май",
				"июнь",
				"июль",
				"авг.",
				"сент.",
				"окт.",
				"нояб.",
				"дек."
			],
			narrow: [
				"Я",
				"Ф",
				"М",
				"А",
				"М",
				"И",
				"И",
				"А",
				"С",
				"О",
				"Н",
				"Д"
			],
			wide: [
				"январь",
				"февраль",
				"март",
				"апрель",
				"май",
				"июнь",
				"июль",
				"август",
				"сентябрь",
				"октябрь",
				"ноябрь",
				"декабрь"
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
			group: " ",
			approximatelySign: "≈",
			nan: "не число",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			timeSeparator: ":"
		},
		default: {
			decimal: ",",
			group: " ",
			approximatelySign: "≈",
			nan: "не число",
			list: ";",
			percentSign: "%",
			plusSign: "+",
			minusSign: "-",
			exponential: "E",
			superscriptingExponent: "×",
			perMille: "‰",
			infinity: "∞",
			timeSeparator: ":"
		}
	},
	delimiters: {
		quotationStart: "«",
		quotationEnd: "»",
		alternateQuotationStart: "„",
		alternateQuotationEnd: "“",
		apostrophe: "’"
	},
	listPatterns: {
		default: {
			2: "{0} и {1}",
			end: "{0} и {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} или {1}",
			end: "{0} или {1}",
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
