export default {
	sourceLocale: "es-MX",
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
		short: "dd/MM/yy"
	},
	dateFormatItems: {
		Ehm: "E h:mm a",
		EHm: "E HH:mm",
		Ehms: "E h:mm:ss a",
		EHms: "E HH:mm:ss",
		GyMMMd: "d MMM y G",
		Hmsvvvv: "HH:mm:ss (vvvv)",
		MMd: "d/MM",
		MMdd: "dd/MM",
		MMMEd: "E d 'de' MMM",
		yMEd: "E, d/M/y",
		yMM: "MM/y",
		yMMMEd: "EEE, d 'de' MMM 'de' y",
		yQQQ: "QQQ y",
		H: "HH",
		Hm: "HH:mm",
		Hms: "HH:mm:ss",
		Hmsv: "HH:mm:ss v",
		Hmv: "HH:mm v",
		MMMdd: "dd-MMM",
		Ed: "E d",
		Gy: "y G",
		GyM: "M/y G",
		GyMd: "d/M/y G",
		GyMEd: "E, d/M/y G",
		GyMMM: "MMM y G",
		GyMMMEd: "E, d MMM y G",
		GyMMMM: "MMMM 'de' y G",
		GyMMMMd: "d 'de' MMMM 'de' y G",
		GyMMMMEd: "E, d 'de' MMMM 'de' y G",
		hm: "h:mm a",
		hms: "h:mm:ss a",
		hmsv: "h:mm:ss a v",
		hmsvvvv: "h:mm:ss a (vvvv)",
		hmv: "h:mm a v",
		Hv: "H 'h' v",
		Md: "d/M",
		MEd: "E, d/M",
		MMMd: "d MMM",
		MMMMd: "d 'de' MMMM",
		MMMMEd: "E, d 'de' MMMM",
		MMMMW: "'semana' W 'de' MMMM",
		yM: "M/y",
		yMd: "d/M/y",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMM: "MMMM 'de' y",
		yMMMMd: "d 'de' MMMM 'de' y",
		yMMMMEd: "EEE, d 'de' MMMM 'de' y",
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
				"sep",
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
				"sep",
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
