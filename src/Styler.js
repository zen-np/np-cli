import {defaults} from './util'

import {systemColors as namedColors} from './colors';

const CODE_ESC = '\x1b[';

const CODE_STYLE = {
	bold: [1, 22],
	italic: [3, 23],
	underline: [4, 24],
	inverse: [7, 27]
};

// Stolen from TooTallNate/ansi.js.git
// Translates a 255 RGB value to a 0-5 ANSI RGV value,
// then returns the single ANSI color code to use.
function fromRGB(r, g, b) {
	let red   = Math.round(r / 255 * 5),
	    green = Math.round(g / 255 * 5),
	    blue  = Math.round(b / 255 * 5);
	return 16 + (red * 36) + (green * 6) + blue;
}

function fromHex(str) {
	let code  = str.replace(/^#/, ''),
	    short = code.length === 3,
	    red   = short ? code[0].repeat(2) : code.substring(0, 2),
	    green = short ? code[1].repeat(2) : code.substring(2, 4),
	    blue  = short ? code[2].repeat(2) : code.substring(4, 6);
	return [parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16)];
}

function wrapCode(code) {
	return CODE_ESC + code + 'm';
}

export class Styler {
	constructor(cursor, base = 0) {
		let styler = this;

		this.cursor_ = cursor;
		this.base_ = base;

		this.bold_ = false;
		this.underline_ = false;
		this.italic_ = false;
		this.reverse_ = false;

		this.methods_ = Object.keys(CODE_STYLE).concat(Object.keys(namedColors)).concat(['rgb', 'hex', 'color']);

		Object.keys(namedColors).forEach((name) => {
			Object.defineProperty(styler, name, {
				value: () => {
					let cursor = styler.cursor_,
					    base   = styler.base_;
					cursor.write(wrapCode(base + namedColors[name]));
					return cursor;
				}
			});
		});
	}
	rgb(r, g, b) {
		let cursor = this.cursor_,
		    base   = this.base_ + 38,
		    code   = fromRGB(r, g, b);
		cursor.write(wrapCode(base + ';5;' + code));
		return cursor;
	}
	hex(str) {
		return this.rgb.apply(this, fromHex(str));
	}
	color(str) {
		let cursor = this.cursor_,
		    base   = this.base_;
		if (str[0] === '#')
			return this.hex(str);
		else if (str in namedColors)
			cursor.write(wrapCode((str[0].toLowerCase() === str[0] ? base : base + 38) + namedColors[str]));
		return cursor;
	}
	bold() {
		let cursor = this.cursor_;
		this.bold_ = !this.bold_;
		cursor.write(wrapCode(CODE_STYLE.bold[bold ? 0 : 1]));
		return cursor;
	}
	italic() {
		let cursor = this.cursor_;
		this.italic_ = !this.italic_;
		cursor.write(wrapCode(CODE_STYLE.italic[this.italic_ ? 0 : 1]));
		return cursor;
	}
	underline() {
		let cursor = this.cursor_;
		this.underline_ = !this.underline_;
		cursor.write(wrapCode(CODE_STYLE.underline[this.underline_ ? 0 : 1]));
		return cursor;
	}
	inverse() {
		let cursor = this.cursor_;
		this.inverse_ = !this.inverse_;
		cursor.write(wrapCode(CODE_STYLE.inverse[this.inverse_ ? 0 : 1]));
		return cursor;
	}
	reset(silent = false) {
		let cursor = this.cursor_,
		    base   = this.base_ + 38;
		if (!silent)
			cursor.write(wrapCode(base + 1));
		this.bold_ = false;
		this.italic_ = false;
		this.underline_ = false;
		this.inverse_ = false;
		return cursor;
	}
}

