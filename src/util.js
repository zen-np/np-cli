export function merge(...srcs) {
	var dest = Object.create(null);
	srcs.forEach((src) => {
		Object.keys(src).forEach((key) => {
			dest[key] = src[key];
		});
	});
	return dest;
}

export function defaults(initial, ...srcs) {
	var dest = Object.create(initial);
	srcs.forEach((src) => {
		Object.keys(src).forEach((key) => {
			if (key in initial)
				dest[key] = src[key];
		});
	});
	return dest;
}
