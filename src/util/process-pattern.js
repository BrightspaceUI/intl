export default function(pattern, replacements) {

	let reStr = '';
	Object.keys(replacements).forEach((key) => {
		reStr += ((reStr === '') ? '' : '|') + key;
	});
	const re = new RegExp(reStr, 'g');

	const doReplacements = function(buf) {
		return buf.replace(re, (m) => {
			return replacements[m];
		});
	};

	let escape = false;
	let buffer = '';
	let value = '';
	for(let c of pattern) {
		if(c == "'") {
			if(!escape) {
				value += doReplacements(buffer);
				buffer = '';
			}
			escape = !escape;
		} else if(escape) {
			value += c;
		} else {
			buffer += c;
		}
	}
	value += doReplacements(buffer);

	return value;

}
