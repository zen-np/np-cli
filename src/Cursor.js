import {defaults} from './util'

import {Styler} from './Styler';

const CODE_ESC = '\x1b[';

export class Cursor {
	constructor(options = {}) {
		let cursor  = this;

		this.options_ = defaults({
			stream: process.stdout,
			resetCode: CODE_ESC + '0m'
		}, options);

		this.buffer_ = [];
		this.buffering_ = false;

		this.fg = new Styler(this, 0);
		this.bg = new Styler(this, 10);

		let methods = cursor.fg.methods_;
		methods.forEach((name) => {
			Object.defineProperty(cursor, name, {
				value: cursor.fg[name].bind(cursor.fg)
			});
		});
	}

	buffer() {
		this.buffering_ = true;
		return this;
	}

	flush() {
		let buffered = this.buffer_.join('');
		this.buffering_ = false;
		return this.write(buffered);
	}

	write(str) {
		let stream = this.options_.stream;
		if (this.buffering_) {
			this.buffer_.push(str);
			return this;
		}
		else if (stream === null) {
			return str;
		}
		else {
			stream.write(str);
			return this;
		}
	}

	print(str) {
		this.write(str + this.options_.resetCode + '\n');
		return this;
	}

	reset() {
		this.fg.reset();
		this.bg.reset();
		this.write(this.options_.resetCode)
		return this;
	}

	pos() {

	}

	goto(x = 0, y = 0) {
		this.write(CODE_ESC + y + ';' + x + 'H')
	}

	up(n = 1) {
		this.write(CODE_ESC + n + 'A');
		return this;
	}

	down(n = 1) {
		this.write(CODE_ESC + n + 'B');
		return this;
	}

	right(n = 1) {
		this.write(CODE_ESC + n + 'C');
		return this;
	}

	left(n = 1) {
		this.write(CODE_ESC + n + 'D');
		return this;
	}

	save() {
		this.write(CODE_ESC + 's');
		return this;
	}

	restore() {
		this.write(CODE_ESC + 'u');
		return this;
	}

	show() {
		this.write(CODE_ESC + '?25h');
		return this;
	}

	hide() {
		this.write(CODE_ESC + '?25l');
		return this;
	}
}

