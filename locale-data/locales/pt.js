export default {
	sourceLocale: "pt",
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
		medium: "d 'de' MMM 'de' y",
		short: "dd/MM/y"
	},
	dateFormatItems: {
		EBh: "E, h B",
		Ed: "E, d",
		Eh: "E, h a",
		Ehm: "E, h:mm a",
		EHm: "E, HH:mm",
		Ehms: "E, h:mm:ss a",
		EHms: "E, HH:mm:ss",
		Gy: "y G",
		GyM: "MM/y G",
		GyMd: "dd/MM/y GGGGG",
		GyMEd: "E, MM/dd/y G",
		GyMMM: "MMM 'de' y G",
		GyMMMd: "d 'de' MMM 'de' y G",
		GyMMMEd: "E, d 'de' MMM 'de' y G",
		hm: "h:mm a",
		hms: "h:mm:ss a",
		hmsv: "h:mm:ss a v",
		hmv: "h:mm a v",
		hv: "h a, v",
		Hv: "HH'h', v",
		Md: "dd/MM",
		MEd: "E, dd/MM",
		MMdd: "dd/MM",
		MMMd: "d 'de' MMM",
		MMMEd: "E, d 'de' MMM",
		MMMMd: "d 'de' MMMM",
		MMMMEd: "E, d 'de' MMMM",
		MMMMW: "W'ª' 'semana' 'de' MMMM",
		yM: "MM/y",
		yMd: "dd/MM/y",
		yMEd: "E, dd/MM/y",
		yMM: "MM/y",
		yMMM: "MMM 'de' y",
		yMMMd: "d 'de' MMM 'de' y",
		yMMMEd: "E, d 'de' MMM 'de' y",
		yMMMM: "MMMM 'de' y",
		yMMMMd: "d 'de' MMMM 'de' y",
		yMMMMEd: "E, d 'de' MMMM 'de' y",
		yQQQ: "QQQ 'de' y",
		yQQQQ: "QQQQ 'de' y",
		yw: "w'ª' 'semana' 'de' Y",
		Bh: "h B",
		Bhm: "h:mm B",
		Bhms: "h:mm:ss B",
		d: "d",
		E: "ccc",
		EBhm: "E h:mm B",
		EBhms: "E h:mm:ss B",
		h: "h a",
		H: "HH",
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
				"jan.",
				"fev.",
				"mar.",
				"abr.",
				"mai.",
				"jun.",
				"jul.",
				"ago.",
				"set.",
				"out.",
				"nov.",
				"dez."
			],
			narrow: [
				"J",
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
				"janeiro",
				"fevereiro",
				"março",
				"abril",
				"maio",
				"junho",
				"julho",
				"agosto",
				"setembro",
				"outubro",
				"novembro",
				"dezembro"
			]
		},
		standAlone: {
			abbreviated: [
				"jan.",
				"fev.",
				"mar.",
				"abr.",
				"mai.",
				"jun.",
				"jul.",
				"ago.",
				"set.",
				"out.",
				"nov.",
				"dez."
			],
			narrow: [
				"J",
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
				"janeiro",
				"fevereiro",
				"março",
				"abril",
				"maio",
				"junho",
				"julho",
				"agosto",
				"setembro",
				"outubro",
				"novembro",
				"dezembro"
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
			2: "{0} e {1}",
			end: "{0} e {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		or: {
			2: "{0} ou {1}",
			end: "{0} ou {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		standardNarrow: {
			2: "{0}, {1}",
			end: "{0}, {1}"
		},
		unitNarrow: {
			2: "{0} {1}",
			start: "{0} {1}",
			middle: "{0} {1}",
			end: "{0} {1}"
		}
	}
};
