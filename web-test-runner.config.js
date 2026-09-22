import { defaultReporter } from '@web/test-runner';
import { reporter } from 'd2l-test-reporting/reporters/web-test-runner.js';

export default {
	reporters: [
		defaultReporter(),
		reporter()
	],
	nodeResolve: true
};
