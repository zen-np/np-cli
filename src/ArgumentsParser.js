

export class ArgumentsParser {
	constructor(options = {}) {
		this.options_ = defaults({
			argv: process.argv
		}, options);
	}
}
