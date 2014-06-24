"use strict";
Object.defineProperties(exports, {
  Styler: {get: function() {
      return Styler;
    }},
  __esModule: {value: true}
});
var defaults = $traceurRuntime.assertObject(require('./util')).defaults;
var namedColors = $traceurRuntime.assertObject(require('./colors')).systemColors;
var CODE_ESC = '\x1b[';
var CODE_STYLE = {
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27]
};
function fromRGB(r, g, b) {
  var red = Math.round(r / 255 * 5),
      green = Math.round(g / 255 * 5),
      blue = Math.round(b / 255 * 5);
  return 16 + (red * 36) + (green * 6) + blue;
}
function fromHex(str) {
  var code = str.replace(/^#/, ''),
      short = code.length === 3,
      red = short ? code[0].repeat(2) : code.substring(0, 2),
      green = short ? code[1].repeat(2) : code.substring(2, 4),
      blue = short ? code[2].repeat(2) : code.substring(4, 6);
  return [parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16)];
}
function wrapCode(code) {
  return CODE_ESC + code + 'm';
}
var Styler = function Styler(cursor) {
  var base = arguments[1] !== (void 0) ? arguments[1] : 0;
  var styler = this;
  this.cursor_ = cursor;
  this.base_ = base;
  this.bold_ = false;
  this.underline_ = false;
  this.italic_ = false;
  this.reverse_ = false;
  this.methods_ = Object.keys(CODE_STYLE).concat(Object.keys(namedColors)).concat(['rgb', 'hex', 'color']);
  Object.keys(namedColors).forEach((function(name) {
    Object.defineProperty(styler, name, {value: (function() {
        var cursor = styler.cursor_,
            base = styler.base_;
        cursor.write(wrapCode(base + namedColors[$traceurRuntime.toProperty(name)]));
        return cursor;
      })});
  }));
};
($traceurRuntime.createClass)(Styler, {
  rgb: function(r, g, b) {
    var cursor = this.cursor_,
        base = this.base_ + 38,
        code = fromRGB(r, g, b);
    cursor.write(wrapCode(base + ';5;' + code));
    return cursor;
  },
  hex: function(str) {
    return this.rgb.apply(this, fromHex(str));
  },
  color: function(str) {
    var cursor = this.cursor_,
        base = this.base_;
    if (str[0] === '#')
      return this.hex(str);
    else if ($traceurRuntime.toProperty(str) in namedColors)
      cursor.write(wrapCode((str[0].toLowerCase() === str[0] ? base : base + 38) + namedColors[$traceurRuntime.toProperty(str)]));
    return cursor;
  },
  bold: function() {
    var cursor = this.cursor_;
    this.bold_ = !this.bold_;
    cursor.write(wrapCode(CODE_STYLE.bold[$traceurRuntime.toProperty(bold ? 0 : 1)]));
    return cursor;
  },
  italic: function() {
    var cursor = this.cursor_;
    this.italic_ = !this.italic_;
    cursor.write(wrapCode(CODE_STYLE.italic[$traceurRuntime.toProperty(this.italic_ ? 0 : 1)]));
    return cursor;
  },
  underline: function() {
    var cursor = this.cursor_;
    this.underline_ = !this.underline_;
    cursor.write(wrapCode(CODE_STYLE.underline[$traceurRuntime.toProperty(this.underline_ ? 0 : 1)]));
    return cursor;
  },
  inverse: function() {
    var cursor = this.cursor_;
    this.inverse_ = !this.inverse_;
    cursor.write(wrapCode(CODE_STYLE.inverse[$traceurRuntime.toProperty(this.inverse_ ? 0 : 1)]));
    return cursor;
  },
  reset: function() {
    var silent = arguments[0] !== (void 0) ? arguments[0] : false;
    var cursor = this.cursor_,
        base = this.base_ + 38;
    if (!silent)
      cursor.write(wrapCode(base + 1));
    this.bold_ = false;
    this.italic_ = false;
    this.underline_ = false;
    this.inverse_ = false;
    return cursor;
  }
}, {});
