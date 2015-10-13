import {default as merge} from './util/merge';

const allLocales = {
	'ar-SA': require('./locale-data/ar-SA.json'),
	'ar': require('./locale-data/ar.json'),
	'en-CA': require('./locale-data/en-CA.json'),
	'en-GB': require('./locale-data/en-GB.json'),
	'en-US': require('./locale-data/en-US.json'),
	'en': require('./locale-data/en.json'),
	'es-MX': require('./locale-data/es-MX.json'),
	'es': require('./locale-data/es.json'),
	'fr-CA': require('./locale-data/fr-CA.json'),
	'fr': require('./locale-data/fr.json'),
	'ja': require('./locale-data/ja.json'),
	'ko-KR': require('./locale-data/ko-KR.json'),
	'ko': require('./locale-data/ko.json'),
	'pt-BR': require('./locale-data/pt-BR.json'),
	'pt': require('./locale-data/pt.json'),
	'sv-SE': require('./locale-data/sv-SE.json'),
	'sv': require('./locale-data/sv.json'),
	'tr-TR': require('./locale-data/tr-TR.json'),
	'tr': require('./locale-data/tr.json'),
	'zh-CN': require('./locale-data/zh-CN.json'),
	'zh-TW': require('./locale-data/zh-TW.json'),
	'zh': require('./locale-data/zh.json')
};

function normalizeLangTag(langTag) {

	if(langTag === undefined || langTag === null) {
		return 'en';
	}

	langTag = langTag.trim().toLowerCase();

	const subtags = langTag.split('-');
	if(subtags.length < 2) {
		return langTag;
	}

	const langSubtag = subtags[0];
	const regionSubtag = subtags[subtags.length-1].toUpperCase();

	return langSubtag + '-' + regionSubtag;

}

function resolveLangTag(langTag, locales) {

	langTag = normalizeLangTag(langTag);

	let localeData = allLocales[langTag];
	if(localeData === undefined) {
		const subtags = langTag.split('-');
		if(subtags.length > 0 && allLocales[subtags[0]]) {
			locales.push(subtags[0]);
		}
	}

	return localeData;

}

export default function(locales, override) {

	if(!locales) {
		locales = [];
	}
	if(!Array.isArray(locales)) {
		locales = [locales];
	}

	let localeData;
	for(let i=0; i<locales.length; i++) {
		localeData = resolveLangTag(locales[i], locales);
		if(localeData) {
			break;
		}
	}
	localeData = localeData || allLocales.en;

	let copy = JSON.parse(JSON.stringify(localeData));
	merge(copy, override);
	return copy;

}
