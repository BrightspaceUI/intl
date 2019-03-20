export default {
	'locale': 'pt',
	'date': {
		'hour24': true,
		'formats': {
			'dateFormats': {
				'full': 'dddd, d\' de \'MMMM\' de \'yyyy',
				'medium': 'd\' de  \'MMMM\' de \'yyyy',
				'short': 'dd/MM/yyyy',
				'monthYear': 'MMMM yyyy',
				'monthDay': 'MMMM d'
			},
			'fuzzyFormats': {
				'yesterdayAtTime': 'Ontem às {time}',
				'dayAtTime': '{day} às {time}',
				'justNow': 'Agora',
				'oneMinuteAgo': '1 minuto atrás',
				'minutesAgo': '{numMinutes} minutos atrás',
				'oneHourAgo': '1 hora atrás',
				'hoursAgo': '{numHours} horas atrás',
			},
			'timeFormats': {
				'full': 'HH:mm ZZZ',
				'medium': 'HH:mm',
				'short': 'HH:mm'
			}
		},
		'calendar': {
			'type': 'gregorian',
			'firstDayOfWeek': 0,
			'weekendStartDay': 6,
			'weekendEndDay': 0,
			'months': {
				'short': [
					'jan',
					'fev',
					'mar',
					'abr',
					'mai',
					'jun',
					'jul',
					'ago',
					'set',
					'out',
					'nov',
					'dez'
				],
				'long': [
					'janeiro',
					'fevereiro',
					'março',
					'abril',
					'maio',
					'junho',
					'julho',
					'agosto',
					'setembro',
					'outubro',
					'novembro',
					'dezembro'
				]
			},
			'days': {
				'narrow': [
					'D',
					'S',
					'T',
					'Q',
					'Q',
					'S',
					'S'
				],
				'short': [
					'dom',
					'seg',
					'ter',
					'qua',
					'qui',
					'sex',
					'sáb'
				],
				'long': [
					'domingo',
					'segunda-feira',
					'terça-feira',
					'quarta-feira',
					'quinta-feira',
					'sexta-feira',
					'sábado'
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
				'positivePattern': '{number}%',
				'negativePattern': '-{number}%'
			}
		},
		'symbols': {
			'decimal': ',',
			'group': '.',
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
			'gigabyte': 'GB',
			'megabyte': 'MB',
			'kilobyte': 'KB',
			'bytes': 'Bytes',
			'byte': 'Byte'
		}
	}
};
