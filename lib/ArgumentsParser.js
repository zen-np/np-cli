"use strict";
Object.defineProperties(exports, {
  ArgumentsParser: {get: function() {
      return ArgumentsParser;
    }},
  __esModule: {value: true}
});
var ArgumentsParser = function ArgumentsParser() {
  var options = arguments[0] !== (void 0) ? arguments[0] : {};
  this.options_ = defaults({argv: process.argv}, options);
};
($traceurRuntime.createClass)(ArgumentsParser, {}, {});
