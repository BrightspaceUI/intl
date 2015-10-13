import FileSizeFormatter from './format-file-size';
import localeProvider from '../locale-provider';

export default class FileSizeFormat {
	constructor(locale, options) {
		this.options = options || {};
		this.localeData = localeProvider(locale, options.locale);
	}
	format(fileSize){
		return FileSizeFormatter(fileSize, this.localeData);
	}
}
