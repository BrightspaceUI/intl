import {default as merge} from '../util/merge';

const allLocales = {
	'ar-SA': require('./ar-SA.json'),
	'ar': require('./ar.json'),
	'en-CA': require('./en-CA.json'),
	'en-GB': require('./en-GB.json'),
	'en-US': require('./en-US.json'),
	'en': require('./en.json'),
	'es-MX': require('./es-MX.json'),
	'es': require('./es.json'),
	'fr-CA': require('./fr-CA.json'),
	'fr': require('./fr.json'),
	'ja': require('./ja.json'),
	'ko-KR': require('./ko-KR.json'),
	'pt-BR': require('./pt-BR.json'),
	'pt': require('./pt.json'),
	'sv-SE': require('./sv-SE.json'),
	'sv': require('./sv.json'),
	'tr-TR': require('./tr-TR.json'),
	'tr': require('./tr.json'),
	'zh-CN': require('./zh-CN.json'),
	'zh-TW': require('./zh-TW.json'),
	'zh': require('./zh.json')
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
