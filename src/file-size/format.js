'use strict';

var FileSizeFormatter = require('./format-file-size'),
	localeProvider = require('../locale-provider');

function FileSizeFormat(locale) {
	this.localeData = localeProvider(locale);
}
FileSizeFormat.prototype.format = function(fileSize) {
	return FileSizeFormatter(fileSize, this.localeData);
};

module.exports = FileSizeFormat;
