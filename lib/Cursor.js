"use strict";
Object.defineProperties(exports, {
  Cursor: {get: function() {
      return Cursor;
    }},
  __esModule: {value: true}
});
var defaults = $traceurRuntime.assertObject(require('./util')).defaults;
var Styler = $traceurRuntime.assertObject(require('./Styler')).Styler;
var ESC = '\x1b[';
var Cursor = function Cursor() {
  var options = arguments[0] !== (void 0) ? arguments[0] : {};
  var cursor = this;
  this.options_ = defaults({
    stream: process.stdout,
    resetCode: ESC + '0m'
  }, options);
  this.buffer_ = [];
  this.buffering_ = (this.options_.stream === null);
  this.fg = new Styler(this, 0);
  this.bg = new Styler(this, 10);
  cursor.fg.methods_.forEach((function(name) {
    Object.defineProperty(cursor, name, {get: (function() {
        return cursor.fg[$traceurRuntime.toProperty(name)].bind(cursor.fg);
      })});
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
      this.buffer();
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
  beep: function() {
    this.write('\x07');
    return this;
  },
  clear: function() {
    this.write(ESC + '2J');
    this.goto(1, 1);
    return this;
  },
  clearLine: function() {
    this.write(ESC + '2K' + ESC + '1G');
    return this;
  },
  pos: function() {
    return new Promise(function(resolve, reject) {
      process.stdin.resume();
      process.stdin.setRawMode(true);
      process.stdin.once('data', function(b) {
        var match = /\[(\d+)\;(\d+)R$/.exec(b.toString());
        process.stdin.setRawMode(false);
        process.stdin.pause();
        if (match) {
          resolve(match.slice(1, 3));
        }
      });
      process.stdout.write(ESC + '6n');
    });
  },
  goto: function() {
    var x = arguments[0] !== (void 0) ? arguments[0] : 1;
    var y = arguments[1] !== (void 0) ? arguments[1] : 1;
    this.write(ESC + y + ';' + x + 'H');
    return this;
  },
  up: function() {
    var n = arguments[0] !== (void 0) ? arguments[0] : 1;
    this.write(ESC + n + 'A');
    return this;
  },
  down: function() {
    var n = arguments[0] !== (void 0) ? arguments[0] : 1;
    this.write(ESC + n + 'B');
    return this;
  },
  right: function() {
    var n = arguments[0] !== (void 0) ? arguments[0] : 1;
    this.write(ESC + n + 'C');
    return this;
  },
  left: function() {
    var n = arguments[0] !== (void 0) ? arguments[0] : 1;
    this.write(ESC + n + 'D');
    return this;
  },
  save: function() {
    this.write(ESC + 's');
    return this;
  },
  restore: function() {
    this.write(ESC + 'u');
    return this;
  },
  show: function() {
    this.write(ESC + '?25h');
    return this;
  },
  hide: function() {
    this.write(ESC + '?25l');
    return this;
  }
}, {});
