"use strict";
Object.defineProperties(exports, {
  create: {get: function() {
      return create;
    }},
  copyProperty: {get: function() {
      return copyProperty;
    }},
  merge: {get: function() {
      return merge;
    }},
  defaults: {get: function() {
      return defaults;
    }},
  tap: {get: function() {
      return tap;
    }},
  __esModule: {value: true}
});
function create(props) {
  var target = Object.create(null);
  Object.keys(props).forEach((function(name) {
    var value = props[$traceurRuntime.toProperty(name)];
    Object.defineProperty(target, name, {get: (function() {
        return value;
      })});
  }));
  return target;
}
function copyProperty(src, name, trg) {
  Object.defineProperty(trg, name, Object.getOwnPropertyDescriptor(src, name));
}
function merge() {
  for (var srcs = [],
      $__0 = 0; $__0 < arguments.length; $__0++)
    $traceurRuntime.setProperty(srcs, $__0, arguments[$traceurRuntime.toProperty($__0)]);
  var trg = Object.create(null);
  srcs.forEach((function(src) {
    Object.keys(src).forEach((function(key) {
      return copyProperty(src, key, trg);
    }));
  }));
  return trg;
}
function defaults(initial) {
  for (var srcs = [],
      $__1 = 1; $__1 < arguments.length; $__1++)
    $traceurRuntime.setProperty(srcs, $__1 - 1, arguments[$traceurRuntime.toProperty($__1)]);
  var trg = Object.create(initial);
  srcs.forEach((function(src) {
    Object.keys(src).filter((function(key) {
      return $traceurRuntime.toProperty(key) in initial;
    })).forEach((function(key) {
      return copyProperty(src, key, trg);
    }));
  }));
  return trg;
}
function tap(obj, path) {
  var def = arguments[2];
  var steps = path.split('.'),
      step;
  while (step = steps.shift()) {
    if (obj[$traceurRuntime.toProperty(step)] === void(0))
      return def;
    obj = obj[$traceurRuntime.toProperty(step)];
  }
  return obj;
}
