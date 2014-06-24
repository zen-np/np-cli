"use strict";
Object.defineProperties(exports, {
  merge: {get: function() {
      return merge;
    }},
  defaults: {get: function() {
      return defaults;
    }},
  __esModule: {value: true}
});
function merge() {
  for (var srcs = [],
      $__0 = 0; $__0 < arguments.length; $__0++)
    $traceurRuntime.setProperty(srcs, $__0, arguments[$traceurRuntime.toProperty($__0)]);
  var dest = Object.create(null);
  srcs.forEach((function(src) {
    Object.keys(src).forEach((function(key) {
      $traceurRuntime.setProperty(dest, key, src[$traceurRuntime.toProperty(key)]);
    }));
  }));
  return dest;
}
function defaults(initial) {
  for (var srcs = [],
      $__1 = 1; $__1 < arguments.length; $__1++)
    $traceurRuntime.setProperty(srcs, $__1 - 1, arguments[$traceurRuntime.toProperty($__1)]);
  var dest = Object.create(initial);
  srcs.forEach((function(src) {
    Object.keys(src).forEach((function(key) {
      if ($traceurRuntime.toProperty(key) in initial)
        $traceurRuntime.setProperty(dest, key, src[$traceurRuntime.toProperty(key)]);
    }));
  }));
  return dest;
}
