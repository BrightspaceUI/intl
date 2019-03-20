export default {
	'locale': 'fr',
	'date': {
		'hour24': true,
		'formats': {
			'dateFormats': {
				'full': 'dddd d MMMM yyyy',
				'medium': 'MMM d yyyy',
				'short': 'yyyy-MM-dd',
				'monthYear': 'MMMM yyyy',
				'monthDay': 'MMMM d'
			},
			'fuzzyFormats': {
				'yesterdayAtTime': 'Hier à {time}',
				'dayAtTime': '{day} à {time}',
				'justNow': 'En ce moment',
				'oneMinuteAgo': 'il y a 1 minute',
				'minutesAgo': 'il y a {numMinutes} minutes',
				'oneHourAgo': 'il y a 1 heure',
				'hoursAgo': 'il y a {numHours} heures',
			},
			'timeFormats': {
				'full': 'HH\' h \'mm ZZZ',
				'medium': 'HH\' h \'mm',
				'short': 'HH\' h \'mm'
			}
		},
		'calendar': {
			'type': 'gregorian',
			'firstDayOfWeek': 0,
			'weekendStartDay': 6,
			'weekendEndDay': 0,
			'months': {
				'short': [
					'janv.',
					'févr.',
					'mars',
					'avr.',
					'mai',
					'juin',
					'juil.',
					'août',
					'sept.',
					'oct.',
					'nov.',
					'déc.'
				],
				'long': [
					'janvier',
					'février',
					'mars',
					'avril',
					'mai',
					'juin',
					'juillet',
					'août',
					'septembre',
					'octobre',
					'novembre',
					'décembre'
				]
			},
			'days': {
				'narrow': [
					'D',
					'L',
					'M',
					'M',
					'J',
					'V',
					'S'
				],
				'short': [
					'dim.',
					'lun.',
					'mar.',
					'mer.',
					'jeu.',
					'ven.',
					'sam.'
				],
				'long': [
					'dimanche',
					'lundi',
					'mardi',
					'mercredi',
					'jeudi',
					'vendredi',
					'samedi'
				]
			},
			'dayPeriods': {
				'am': 'AM',
				'pm': 'PM'
			}
		}
	},
	'number': {
		'patterns': {
			'decimal': {
				'positivePattern': '{number}',
				'negativePattern': '-{number}'
			},
			'percent': {
				'positivePattern': '{number} %',
				'negativePattern': '-{number} %'
			}
		},
		'symbols': {
			'decimal': ',',
			'group': ' ',
			'negative': '-',
			'percent': '%'
		},
		'groupSize': 3
	},
	'fileSize': {
		'patterns': {
			'fileSizePattern': '{number} {unit}'
		},
		'units' : {
			'gigabyte': 'Go',
			'megabyte': 'Mo',
			'kilobyte': 'Ko',
			'bytes': 'octets',
			'byte': 'octet'
		}
	}
};
