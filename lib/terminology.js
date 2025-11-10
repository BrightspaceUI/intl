import { getDocumentLocaleSettings } from './common.js';

export function getTerminology() {
	return getDocumentLocaleSettings().terminology;
}
