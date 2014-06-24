"use strict";
Object.defineProperties(exports, {
  Cursor: {get: function() {
      return Cursor;
    }},
  __esModule: {value: true}
});
var defaults = $traceurRuntime.assertObject(require('./util')).defaults;
var Styler = $traceurRuntime.assertObject(require('./Styler')).Styler;
var CODE_ESC = '\x1b[';
var Cursor = function Cursor() {
  var options = arguments[0] !== (void 0) ? arguments[0] : {};
  var cursor = this;
  this.options_ = defaults({
    stream: process.stdout,
    resetCode: CODE_ESC + '0m'
  }, options);
  this.buffer_ = [];
  this.buffering_ = false;
  this.fg = new Styler(this, 0);
  this.bg = new Styler(this, 10);
  var methods = cursor.fg.methods_;
  methods.forEach((function(name) {
    Object.defineProperty(cursor, name, {value: cursor.fg[$traceurRuntime.toProperty(name)].bind(cursor.fg)});
  }));
};
($traceurRuntime.createClass)(Cursor, {
  buffer: function() {
    this.buffering_ = true;
    return this;
  },
  flush: function() {
    var buffered = this.buffer_.join('');
    this.buffering_ = false;
    return this.write(buffered);
  },
  write: function(str) {
    var stream = this.options_.stream;
    if (this.buffering_) {
      this.buffer_.push(str);
      return this;
    } else if (stream === null) {
      return str;
    } else {
      stream.write(str);
      return this;
    }
  },
  print: function(str) {
    this.write(str + this.options_.resetCode + '\n');
    return this;
  },
  reset: function() {
    this.fg.reset();
    this.bg.reset();
    this.write(this.options_.resetCode);
    return this;
  },
  pos: function() {},
  goto: function() {
    var x = arguments[0] !== (void 0) ? arguments[0] : 0;
    var y = arguments[1] !== (void 0) ? arguments[1] : 0;
    this.write(CODE_ESC + y + ';' + x + 'H');
  },
  up: function() {
    var n = arguments[0] !== (void 0) ? arguments[0] : 1;
    this.write(CODE_ESC + n + 'A');
    return this;
  },
  down: function() {
    var n = arguments[0] !== (void 0) ? arguments[0] : 1;
    this.write(CODE_ESC + n + 'B');
    return this;
  },
  right: function() {
    var n = arguments[0] !== (void 0) ? arguments[0] : 1;
    this.write(CODE_ESC + n + 'C');
    return this;
  },
  left: function() {
    var n = arguments[0] !== (void 0) ? arguments[0] : 1;
    this.write(CODE_ESC + n + 'D');
    return this;
  },
  save: function() {
    this.write(CODE_ESC + 's');
    return this;
  },
  restore: function() {
    this.write(CODE_ESC + 'u');
    return this;
  },
  show: function() {
    this.write(CODE_ESC + '?25h');
    return this;
  },
  hide: function() {
    this.write(CODE_ESC + '?25l');
    return this;
  }
}, {});
