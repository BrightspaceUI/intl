import merge from './util/merge.js';
import arSA from './locale-data/ar-SA.js';
import ar from './locale-data/ar.js';
import enCA from './locale-data/en-CA.js';
import enGB from './locale-data/en-GB.js';
import enUS from './locale-data/en-US.js';
import en from './locale-data/en.js';
import esMX from './locale-data/es-MX.js';
import es from './locale-data/es.js';
import frCA from './locale-data/fr-CA.js';
import fr from './locale-data/fr.js';
import ja from './locale-data/ja.js';
import koKR from './locale-data/ko-KR.js';
import ko from './locale-data/ko.js';
import ptBR from './locale-data/pt-BR.js';
import pt from './locale-data/pt.js';
import svSE from './locale-data/sv-SE.js';
import sv from './locale-data/sv.js';
import trTR from './locale-data/tr-TR.js';
import tr from './locale-data/tr.js';
import zhCN from './locale-data/zh-CN.js';
import zhTW from './locale-data/zh-TW.js';
import zh from './locale-data/zh.js';

var allLocales = {
	'ar-SA': arSA,
	'ar': ar,
	'en-CA': enCA,
	'en-GB': enGB,
	'en-US': enUS,
	'en': en,
	'es-MX': esMX,
	'es': es,
	'fr-CA': frCA,
	'fr': fr,
	'ja': ja,
	'ko-KR': koKR,
	'ko': ko,
	'pt-BR': ptBR,
	'pt': pt,
	'sv-SE': svSE,
	'sv': sv,
	'tr-TR': trTR,
	'tr': tr,
	'zh-CN': zhCN,
	'zh-TW': zhTW,
	'zh': zh
};

function normalizeLangTag(langTag) {

	if (langTag === undefined || langTag === null) {
		return 'en';
	}

	langTag = langTag.trim().toLowerCase();

	var subtags = langTag.split('-');
	if (subtags.length < 2) {
		return langTag;
	}

	var langSubtag = subtags[0];
	var regionSubtag = subtags[subtags.length - 1].toUpperCase();

	return langSubtag + '-' + regionSubtag;

}

function resolveLangTag(langTag, locales) {

	langTag = normalizeLangTag(langTag);

	var localeData = allLocales[langTag];
	if (localeData === undefined) {
		var subtags = langTag.split('-');
		if (subtags.length > 0 && allLocales[subtags[0]]) {
			locales.push(subtags[0]);
		}
	}

	return localeData;

}

export default function localeProvider(locales, override) {

	if (!locales) {
		locales = [];
	}
	if (!Array.isArray(locales)) {
		locales = [locales];
	}

	var localeData;
	for (var i = 0; i < locales.length; i++) {
		localeData = resolveLangTag(locales[i], locales);
		if (localeData) {
			break;
		}
	}
	localeData = localeData || allLocales.en;

	var copy = JSON.parse(JSON.stringify(localeData));
	merge(copy, override);
	return copy;

}
