export default {
	sourceLocale: "mi",
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
		full: "EEEE, d MMMM y",
		long: "d MMMM y",
		medium: "d MMM y",
		short: "dd-MM-y"
	},
	dateFormatItems: {
		Ed: "E, d",
		Ehm: "E h:mm a",
		Ehms: "E h:mm:ss a",
		Gy: "y G",
		GyMMM: "MMM y G",
		GyMMMd: "d MMM y G",
		GyMMMEd: "E, d MMM y G",
		hm: "h:mm a",
		hms: "h:mm:ss a",
		hmsv: "h:mm:ss a v",
		hmv: "h:mm a v",
		Md: "dd-MM",
		MEd: "E, dd-MM",
		MMMd: "d MMM",
		MMMEd: "E, d MMM",
		MMMMd: "d MMMM",
		MMMMW: "'wiki' W 'o' MMMM",
		yM: "MM-y",
		yMd: "dd-MM-y",
		yMEd: "E, dd-MM-y",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "E, d MMM y",
		yMMMM: "MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ y",
		yw: "'wiki' w 'o' Y",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EBh: "E h B",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		Eh: "E h a",
		EHm: "E HH:mm",
		EHms: "E HH:mm:ss",
		GyM: "G y-MM",
		GyMd: "G y-MM-dd",
		GyMEd: "G y-MM-dd, E",
		h: "h a",
		H: "HH",
		Hm: "HH:mm",
		Hms: "HH:mm:ss",
		Hmsv: "HH:mm:ss v",
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
				"Hān",
				"Pēp",
				"Māe",
				"Āpe",
				"Mei",
				"Hun",
				"Hūr",
				"Āku",
				"Hep",
				"Oke",
				"Noe",
				"Tīh"
			],
			narrow: [
				"H",
				"P",
				"M",
				"Ā",
				"M",
				"H",
				"H",
				"Ā",
				"H",
				"O",
				"N",
				"T"
			],
			wide: [
				"Hānuere",
				"Pēpuere",
				"Māehe",
				"Āpereira",
				"Mei",
				"Hune",
				"Hūrae",
				"Ākuhata",
				"Hepetema",
				"Oketopa",
				"Noema",
				"Tīhema"
			]
		},
		standAlone: {
			abbreviated: [
				"Hān",
				"Pēp",
				"Māe",
				"Āpe",
				"Mei",
				"Hun",
				"Hūr",
				"Āku",
				"Hep",
				"Oke",
				"Noe",
				"Tīh"
			],
			narrow: [
				"H",
				"P",
				"M",
				"Ā",
				"M",
				"H",
				"H",
				"Ā",
				"H",
				"O",
				"N",
				"T"
			],
			wide: [
				"Hānuere",
				"Pēpuere",
				"Māehe",
				"Āperira",
				"Mei",
				"Hune",
				"Hūrae",
				"Ākuhata",
				"Hepetema",
				"Oketopa",
				"Noema",
				"Tīhema"
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
		or: {
			2: "{0}, {1} rānei",
			end: "{0}, {1} rānei",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		standardNarrow: {
			2: "{0}, {1}",
			end: "{0}, {1}"
		},
		standardShort: {
			2: "{0} & {1}",
			end: "{0}, & {1}"
		},
		unitNarrow: {
			2: "{0} {1}",
			start: "{0} {1}",
			middle: "{0} {1}",
			end: "{0} {1}"
		},
		default: {
			2: "{0}, {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}",
			end: "{0}, {1}"
		}
	}
};
