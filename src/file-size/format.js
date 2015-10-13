import FileSizeFormatter from './format-file-size';
import localeProvider from '../locale-provider';

export default class FileSizeFormat {
	constructor(locale, options) {
		this.options = options || {};
		this.localeData = localeProvider(locale, options.locale);
	}
	format(fileSize, options){
		options = options || {};

		for(var option in this.options) {
			if(options[option] === undefined) {
				options[option] = this.options[option];
			}
		}

		return FileSizeFormatter(fileSize, this.localeData, options);
	}
}
