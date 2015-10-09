import FileSizeFormatter from './format-file-size';
import localeProvider from '../locale-provider';

export default class FileSizeFormat {
	constructor(locale, options) {
		this.options = options || {};
		this.localeData = localeProvider(locale, options.locale);
	}
	formatFileSize(fileSize, options){
		for(var option in options){
			this.options[option] = options[option];
		}
		return FileSizeFormatter(fileSize, this.localeData, this.options);
	}
}
