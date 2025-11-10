import { getDocumentLocaleSettings } from './common.js';

export const TerminologyKey = Object.freeze({
	LearningOutcomes: 'outcomes',
	Educator: 'educator',
	ModuleHierarchy: 'moduleHierarchy'
});

export function getTerminology(key) {
	if (!key) {
		throw new TypeError('Terminology key is required.');
	}
	if (!Object.values(TerminologyKey).includes(key)) {
		throw new TypeError(`Invalid terminology key "${key}".`);
	}

	const terminology = getDocumentLocaleSettings().terminology;

	return terminology[key];
}
