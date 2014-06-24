import {defaults} from './util'

import {Styler} from './Styler';

const ESC = '\x1b[';

export class Cursor {
	constructor(options = {}) {
		let cursor  = this;

		this.options_ = defaults({
			stream: process.stdout,
			resetCode: ESC + '0m'
		}, options);

		this.buffer_ = [];
		this.buffering_ = (this.options_.stream === null);

		this.fg = new Styler(this, 0);
		this.bg = new Styler(this, 10);

		// Create some automagic function aliases to the foreground styler
		cursor.fg.methods_.forEach((name) => {
			Object.defineProperty(cursor, name, {
				get: () => {
					return cursor.fg[name].bind(cursor.fg)
				}
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
			this.buffer();
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

	beep() {
		this.write('\x07');
		return this;
	}

	clear() {
		this.write(ESC + '2J');
		this.goto(1, 1);
		return this;
	}

	clearLine() {
		this.write(ESC + '2K' + ESC + '1G');
		return this;
	}

	pos() {
		return new Promise(function(resolve, reject) {
			process.stdin.resume()
			process.stdin.setRawMode(true)

			process.stdin.once('data', function (b) {
				var match = /\[(\d+)\;(\d+)R$/.exec(b.toString())
				process.stdin.setRawMode(false)
				process.stdin.pause()
				if (match) {
					resolve(match.slice(1,3));
				}
			});

			process.stdout.write(ESC + '6n');
		});
	}

	goto(x = 1, y = 1) {
		this.write(ESC + y + ';' + x + 'H');
		return this;
	}

	up(n = 1) {
		this.write(ESC + n + 'A');
		return this;
	}

	down(n = 1) {
		this.write(ESC + n + 'B');
		return this;
	}

	right(n = 1) {
		this.write(ESC + n + 'C');
		return this;
	}

	left(n = 1) {
		this.write(ESC + n + 'D');
		return this;
	}

	save() {
		this.write(ESC + 's');
		return this;
	}

	restore() {
		this.write(ESC + 'u');
		return this;
	}

	show() {
		this.write(ESC + '?25h');
		return this;
	}

	hide() {
		this.write(ESC + '?25l');
		return this;
	}
}

