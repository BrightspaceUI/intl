export default {
	sourceLocale: "th",
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
		full: "EEEEที่ d MMMM G y",
		long: "d MMMM G y",
		medium: "d MMM y",
		short: "d/M/yy"
	},
	dateFormatItems: {
		Ed: "E d",
		EHm: "E HH:mm น.",
		GyMd: "d/M/GGGGG y",
		GyMEd: "E d/M/G y",
		GyMMM: "MMM G y",
		GyMMMd: "d MMM G y",
		GyMMMEd: "E d MMM G y",
		GyMMMEEEEd: "EEEEที่ d MMM G y",
		Hm: "HH:mm น.",
		hmv: "h:mm น. a v",
		Md: "d/M",
		MEd: "E d/M",
		MMMd: "d MMM",
		MMMEd: "E d MMM",
		MMMEEEEd: "EEEEที่ d MMM",
		MMMMd: "d MMMM",
		MMMMEd: "E d MMMM",
		MMMMEEEEd: "EEEEที่ d MMMM",
		MMMMW: "สัปดาห์ที่ W ของเดือนMMMM",
		mmss: "mm:ss",
		yM: "M/y",
		yMd: "d/M/y",
		yMEd: "E d/M/y",
		yMMM: "MMM y",
		yMMMd: "d MMM y",
		yMMMEd: "E d MMM y",
		yMMMEEEEd: "EEEEที่ d MMM y",
		yMMMM: "MMMM y",
		yMMMMd: "d MMMM y",
		yMMMMEd: "E d MMMM y",
		yMMMMEEEEd: "EEEEที่ d MMMM y",
		yQQQ: "QQQ y",
		yQQQQ: "QQQQ G y",
		yw: "สัปดาห์ที่ w ของปี Y",
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
		Ehms: "E h:mm:ss a",
		EHms: "E HH:mm:ss",
		Gy: "G y",
		GyM: "G y-MM",
		h: "h a",
		H: "HH",
		hm: "h:mm a",
		hms: "h:mm:ss a",
		Hms: "HH:mm:ss",
		hmsv: "h:mm:ss a v",
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
				"ม.ค.",
				"ก.พ.",
				"มี.ค.",
				"เม.ย.",
				"พ.ค.",
				"มิ.ย.",
				"ก.ค.",
				"ส.ค.",
				"ก.ย.",
				"ต.ค.",
				"พ.ย.",
				"ธ.ค."
			],
			narrow: [
				"ม.ค.",
				"ก.พ.",
				"มี.ค.",
				"เม.ย.",
				"พ.ค.",
				"มิ.ย.",
				"ก.ค.",
				"ส.ค.",
				"ก.ย.",
				"ต.ค.",
				"พ.ย.",
				"ธ.ค."
			],
			wide: [
				"มกราคม",
				"กุมภาพันธ์",
				"มีนาคม",
				"เมษายน",
				"พฤษภาคม",
				"มิถุนายน",
				"กรกฎาคม",
				"สิงหาคม",
				"กันยายน",
				"ตุลาคม",
				"พฤศจิกายน",
				"ธันวาคม"
			]
		},
		standAlone: {
			abbreviated: [
				"ม.ค.",
				"ก.พ.",
				"มี.ค.",
				"เม.ย.",
				"พ.ค.",
				"มิ.ย.",
				"ก.ค.",
				"ส.ค.",
				"ก.ย.",
				"ต.ค.",
				"พ.ย.",
				"ธ.ค."
			],
			narrow: [
				"ม.ค.",
				"ก.พ.",
				"มี.ค.",
				"เม.ย.",
				"พ.ค.",
				"มิ.ย.",
				"ก.ค.",
				"ส.ค.",
				"ก.ย.",
				"ต.ค.",
				"พ.ย.",
				"ธ.ค."
			],
			wide: [
				"มกราคม",
				"กุมภาพันธ์",
				"มีนาคม",
				"เมษายน",
				"พฤษภาคม",
				"มิถุนายน",
				"กรกฎาคม",
				"สิงหาคม",
				"กันยายน",
				"ตุลาคม",
				"พฤศจิกายน",
				"ธันวาคม"
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
			2: "{0}และ{1}",
			start: "{0} {1}",
			middle: "{0} {1}",
			end: "{0} และ{1}"
		},
		or: {
			2: "{0} หรือ {1}",
			end: "{0} หรือ {1}",
			start: "{0}, {1}",
			middle: "{0}, {1}"
		},
		orShort: {
			2: "{0}หรือ{1}"
		},
		unit: {
			2: "{0} และ {1}"
		},
		unitNarrow: {
			end: "{0} {1}"
		},
		unitShort: {
			2: "{0} {1}",
			end: "{0} และ {1}"
		}
	}
};
