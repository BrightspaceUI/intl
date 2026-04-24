export default {
	sourceLocale: "es",
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
			"other"
		]
	},
	localeDisplayPattern: {
		localePattern: "{0} ({1})",
		localeSeparator: "{0}, {1}",
		localeKeyTypePattern: "{0}: {1}"
	},
	dateFormats: {
		full: "EEEE, d 'de' MMMM 'de' y",
		long: "d 'de' MMMM 'de' y",
		medium: "d MMM y",
		short: "d/M/yy"
	},
	dateFormatItems: {
		Ed: "E d",
		Ehm: "E, h:mm a",
		EHm: "E, H:mm",
		Ehms: "E, h:mm:ss a",
		EHms: "E, H:mm:ss",
		Gy: "y G",
		GyM: "M/y G",
		GyMd: "d/M/y G",
		GyMEd: "E, d/M/y G",
		GyMMM: "MMM y G",
		GyMMMd: "d MMM y G",
		GyMMMEd: "E, d MMM y G",
		GyMMMM: "MMMM 'de' y G",
		GyMMMMd: "d 'de' MMMM 'de' y G",
		GyMMMMEd: "E, d 'de' MMMM 'de' y G",
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
		Hv: "H 'h' v",
		Md: "d/M",
		MEd: "E, d/M",
		MMd: "d/M",
		MMdd: "d/M",
		MMMd: "d MMM",
		MMMEd: "E, d MMM",
		MMMMd: "d 'de' MMMM",
		MMMMEd: "E, d 'de' MMMM",
		MMMMW: "'semana' W 'de' MMMM",
		yM: "M/y",
		yMd: "d/M/y",
		yMEd: "EEE, d/M/y",
		yMM: "M/y",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "EEE, d MMM y",
		yMMMM: "MMMM 'de' y",
		yMMMMd: "d 'de' MMMM 'de' y",
		yMMMMEd: "EEE, d 'de' MMMM 'de' y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ 'de' y",
		yw: "'semana' w 'de' Y",
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
				"ene",
				"feb",
				"mar",
				"abr",
				"may",
				"jun",
				"jul",
				"ago",
				"sept",
				"oct",
				"nov",
				"dic"
			],
			narrow: [
				"E",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			wide: [
				"enero",
				"febrero",
				"marzo",
				"abril",
				"mayo",
				"junio",
				"julio",
				"agosto",
				"septiembre",
				"octubre",
				"noviembre",
				"diciembre"
			]
		},
		standAlone: {
			abbreviated: [
				"ene",
				"feb",
				"mar",
				"abr",
				"may",
				"jun",
				"jul",
				"ago",
				"sept",
				"oct",
				"nov",
				"dic"
			],
			narrow: [
				"E",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			wide: [
				"enero",
				"febrero",
				"marzo",
				"abril",
				"mayo",
				"junio",
				"julio",
				"agosto",
				"septiembre",
				"octubre",
				"noviembre",
				"diciembre"
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
			2: "{0} y {1}",
			end: "{0} y {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} o {1}",
			end: "{0} o {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		unit: {
			end: "{0} y {1}"
		},
		unitNarrow: {
			2: "{0} {1}",
			start: "{0} {1}",
			middle: "{0} {1}",
			end: "{0} {1}"
		},
		unitShort: {
			end: "{0}, {1}"
		}
	}
};
