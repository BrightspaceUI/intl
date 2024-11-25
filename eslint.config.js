import { addExtensions, browserConfig, setDirectoryConfigs, testingConfig } from 'eslint-config-brightspace';

export default [
	...addExtensions(setDirectoryConfigs(
		browserConfig,
		{
			'test': testingConfig
		}
	), ['js']),
	{
		files: ['helpers/getLocalizeResources.js'],

		rules: {
			'no-console': 0,
		},
	},
	{
		files: ['lang/*.js'],
		rules: {
			'quotes': 0
		}
	}
];
