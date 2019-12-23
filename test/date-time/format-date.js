import DateTimeFormat from '../../src/date-time/format.js';

var expect = chai.expect;

describe('DateTimeFormat', function() {

	describe('format-date', function() {

		[
			{format: 'd/M/yyyy', expect: '3/8/2015'},
			{format: 'dd.MM.yyyy', expect: '03.08.2015'},
			{format: 'dd/MM/yyyy', expect: '03/08/2015'},
			{format: 'M/d/yyyy', expect: '8/3/2015'},
			{format: 'M/d/yyyy', expect: '8/3/2015'},
			{format: 'yyyy/M/d', expect: '2015/8/3'},
			{format: 'yyyy/MM/dd', expect: '2015/08/03'},
			{format: 'yyyy-MM-dd', expect: '2015-08-03'},
			{format: 'dd MMMM yyyy dddd', expect: '03 August 2015 Monday'},
			{format: 'dddd d\' de \'MMMM\' de \'yyyy', expect: 'Monday 3 de August de 2015'},
			{format: 'dddd d MMMM yyyy', expect: 'Monday 3 August 2015'},
			{format: 'dddd \'den\' d MMMM yyyy', expect: 'Monday den 3 August 2015'},
			{format: 'dddd, d\' de \'MMMM\' de \'yyyy', expect: 'Monday, 3 de August de 2015'},
			{format: 'dddd, d MMMM, yyyy', expect: 'Monday, 3 August, 2015'},
			{format: 'yyyy년 M월 d일 dddd', expect: '2015년 8월 3일 Monday'},
			{format: 'yyyy年M月d日', expect: '2015年8月3日'},
			{format: 'd\' de \'MMMM\' de \'yyyy', expect: '3 de August de 2015'},
			{format: 'd MMMM yyyy', expect: '3 August 2015'},
			{format: 'dd MMMM yyyy', expect: '03 August 2015'},
			{format: 'dd MMMM, yyyy', expect: '03 August, 2015'},
			{format: 'MMM d yyyy', expect: 'Aug 3 2015'},
			{format: 'MMM d, yyyy', expect: 'Aug 3, 2015'},
			{format: 'yyyy년 M월 d일', expect: '2015년 8월 3일'},
			{format: 'yyyy年M月d日', expect: '2015年8月3日'},
			{format: 'full', expect: 'Monday, August 3, 2015'},
			{format: 'medium', expect: 'Aug 3, 2015'},
			{format: 'short', expect: '8/3/2015'},
			{format: 'monthYear', expect: 'August 2015'},
			{format: 'monthDay', expect: 'August 3'},
			{format: 'dddd', expect: 'Monday'},
			{format: 'ddd', expect: 'Mon'},
			{format: 'MMMM', expect: 'August'},
			{format: 'MMM', expect: 'Aug'}
		].forEach(function(input) {
			it('should apply locale format "' + input.format + '"', function() {
				var dtFormat = new DateTimeFormat('en-US', {format: input.format});
				var value = dtFormat.formatDate(new Date(2015, 7, 3));
				expect(value).to.equal(input.expect);
			});
		});

		[
			{locale: 'ar-SA', expect: ['الثلاثاء, 4 يونيو, 2019', '04 يونيو, 2019', '04/06/2019', 'يونيو, 2019', '4 يونيو']},
			{locale: 'da-DK', expect: [/*'tirsdag \'den\' 4. M06 2019'*/'Tuesday, June 4, 2019', /*'4. M06. 2019'*/'Jun 4, 2019', /*'04/06/2019'*/'6/4/2019', /*'M06 2019'*/'June 2019', /*'4. M06'*/'June 4']},
			{locale: 'de-DE', expect: [/*'Dienstag 4. M06 2019'*/'Tuesday, June 4, 2019', /*'4. M06 2019'*/'Jun 4, 2019', /*'04-06-2019'*/'6/4/2019', /*'M06 2019'*/'June 2019', /*'4. M06'*/'June 4']},
			{locale: 'en-CA', expect: ['Tuesday, June 4, 2019', 'Jun 4, 2019', '6/4/2019', 'June 2019', 'June 4']},
			{locale: 'en-GB', expect: [/*'Tuesday, 4 June 2019'*/'Tuesday, June 4, 2019', /*'04 June 2019'*/'Jun 4, 2019', /*'04/06/2019'*/'6/4/2019', 'June 2019', /*'4 June'*/'June 4']},
			{locale: 'en-US', expect: ['Tuesday, June 4, 2019', 'Jun 4, 2019', '6/4/2019', 'June 2019', 'June 4']},
			{locale: 'es-MX', expect: ['martes 4 de junio de 2019', '4 de junio de 2019', '04/06/2019', 'junio 2019', '4 de junio']},
			{locale: 'fr-FR', expect: ['mardi 4 juin 2019', /*'4 juin 2019'*/'juin 4 2019', /*'04/06/2019'*/'2019-06-04', 'juin 2019', /*'4 juin'*/'juin 4']},
			{locale: 'fr-CA', expect: ['mardi 4 juin 2019', 'juin 4 2019', '2019-06-04', 'juin 2019', 'juin 4']},
			{locale: 'ja-JP', expect: ['2019年6月4日', '2019年6月4日', '2019/06/04', '2019年6月', '6月4日']},
			{locale: 'ko-KR', expect: ['2019년 6월 4일 화요일', '2019년 6월 4일', '2019-06-04', '2019년 6월', '6월 4일']},
			{locale: 'nl-NL', expect: [/*'dinsdag 4 M06 2019'*/'Tuesday, June 4, 2019', /*'4 M06 2019'*/'Jun 4, 2019', /*'04-06-2019'*/'6/4/2019', /*'M06 2019'*/'June 2019', /*'4 M06'*/'June 4']},
			{locale: 'pt-BR', expect: ['terça-feira, 4 de junho de 2019', '4 de  junho de 2019', '4/6/2019', /*'junho de 2019'*/'junho 2019', /*'04 de junho'*/'junho 4']},
			{locale: 'sv-SE', expect: ['Tisdag den 4 Juni 2019', '4 Juni 2019', '2019-06-04', 'Juni 2019', /*'04 Juni'*/'Juni 4']},
			{locale: 'tr-TR', expect: ['04 Haziran 2019 Salı', '04 Haziran 2019', '04.06.2019', 'Haziran 2019', '04 Haziran']},
			{locale: 'zh-CN', expect: ['2019年6月4日', '2019年6月4日', '2019/6/4', '2019年6月', '6月4日']},
			{locale: 'zh-TW', expect: ['2019年6月4日', '2019年6月4日', '2019/6/4', '2019年6月', '6月4日']}
		].forEach((input) => {
			let index = -1;
			['full', 'medium', 'short', 'monthYear', 'monthDay'].forEach((format) => {
				it(`should format ${input.locale}/${format}`, () => {
					index++;
					const date = new Date(2019, 5, 4);
					const dtFormat = new DateTimeFormat(
						input.locale,
						{format: format}
					);
					const value = dtFormat.formatDate(date);
					expect(value).to.equal(input.expect[index]);
				});
			});
		});

	});

});
