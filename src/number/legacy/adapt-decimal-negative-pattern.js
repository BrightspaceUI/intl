export default function(pattern) {
	switch(pattern) {
		case '({number})':
			return 0;
		case '- {number}':
			return 2;
		case '{number}-':
			return 3;
		case '{number} -':
			return 4;
		default:
			return 1;
	}
}
