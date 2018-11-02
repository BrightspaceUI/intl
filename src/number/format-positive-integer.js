export default function formatPositiveInteger(value, localeData/*, options*/) {
	value = Math.floor(value);

	var valueStr = '' + value;
	var ret = '';

	var groupSizes = Array.isArray(localeData.groupSize)
		? localeData.groupSize
		: [localeData.groupSize];
	var currentGroupSizeIndex = -1;
	var maxGroupSizeIndex = groupSizes.length - 1;
	var currentGroupSize = 0;

	var groupEnd = valueStr.length;

	while (groupEnd > 0) {
		if (currentGroupSizeIndex < maxGroupSizeIndex) {
			currentGroupSize = groupSizes[++currentGroupSizeIndex];
		}

		var chunk = null;
		if (currentGroupSize === 0) {
			chunk = valueStr.substring(0, groupEnd);
		} else {
			var groupStart = groupEnd - currentGroupSize;
			chunk = valueStr.substring(groupStart, groupEnd);
		}

		// not first or only chunk
		if (groupEnd !== valueStr.length) {
			ret = localeData.symbols.group + ret;
		}

		ret = chunk + ret;

		groupEnd -= chunk.length;
	}

	return ret;
}
