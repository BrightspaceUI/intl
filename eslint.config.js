import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
	includeIgnoreFile(gitignorePath),
	...compat.extends('brightspace/browser-config').map(config => ({
		...config,
		files: ['**/*.js'],
	})),
	...compat.extends('brightspace/testing-config').map(config => ({
		...config,
		files: ['test/*'],
	})),
	{
		files: ['helpers/getLocalizeResources.js'],

		rules: {
			'no-console': 0,
		},
	},
];
