import formatFileSize from './format-file-size.js';
import localeProvider from '../locale-provider.js';

export default function FileSizeFormat(locale) {
	this.localeData = localeProvider(locale);
}
FileSizeFormat.prototype.format = function(fileSize) {
	return formatFileSize(fileSize, this.localeData);
};
