export function create(props) {
	let target = Object.create(null);
	Object.keys(props).forEach((name) => {
		let value = props[name];
		Object.defineProperty(target, name, {
			get: () => value
		});
	});
	return target;
}

export function copyProperty(src, name, trg) {
	Object.defineProperty(trg, name, Object.getOwnPropertyDescriptor(src, name));
}

export function merge(...srcs) {
	let trg = Object.create(null);
	srcs.forEach((src) => {
		Object.keys(src).forEach((key) => copyProperty(src, key, trg));
	});
	return trg;
}

export function defaults(initial, ...srcs) {
	var trg = Object.create(initial);
	srcs.forEach((src) => {
		Object.keys(src)
			.filter((key) => key in initial)
			.forEach((key) => copyProperty(src, key, trg));
	});
	return trg;
}

export function tap(obj, path, def = void(0)) {
	let steps = path.split('.'),
	    step;
	while (step = steps.shift()) {
		if (obj[step] === void(0))
			return def;
		obj = obj[step];
	}
	return obj;
}
