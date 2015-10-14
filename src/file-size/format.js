import FileSizeFormatter from './format-file-size';
import localeProvider from '../locale-provider';

export default class FileSizeFormat {
	constructor(locale) {
		this.localeData = localeProvider(locale);
	}
	format(fileSize){
		return FileSizeFormatter(fileSize, this.localeData);
	}
}
