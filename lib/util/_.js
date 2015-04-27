"use strict";
var idCount = 0;

var _ = module.exports = {

  has: has,

  assign: require("react/lib/Object.assign"),

  isShallowEqual: function (a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

    if (typeof a != "object" && typeof b != "object") return a === b;

    if (typeof a != typeof b) return false;

    return shallowEqual(a, b);
  },

  transform: function (obj, cb, seed) {
    _.each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
    return seed;
  },

  each: function (obj, cb, thisArg) {
    if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

    for (var key in obj) if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
  },

  pick: function (obj, keys) {
    keys = [].concat(keys);
    return _.transform(obj, function (mapped, val, key) {
      if (keys.indexOf(key) !== -1) mapped[key] = val;
    }, {});
  },

  omit: function (obj, keys) {
    keys = [].concat(keys);
    return _.transform(obj, function (mapped, val, key) {
      if (keys.indexOf(key) === -1) mapped[key] = val;
    }, {});
  },

  find: function (arr, cb, thisArg) {
    var result;
    if (Array.isArray(arr)) {
      arr.every(function (val, idx) {
        if (cb.call(thisArg, val, idx, arr)) return (result = val, false);
        return true;
      });
      return result;
    } else for (var key in arr) if (has(arr, key)) if (cb.call(thisArg, arr[key], key, arr)) return arr[key];
  },

  chunk: function (array, chunkSize) {
    var index = 0,
        length = array ? array.length : 0,
        result = [];

    chunkSize = Math.max(+chunkSize || 1, 1);

    while (index < length) result.push(array.slice(index, index += chunkSize));

    return result;
  },

  splat: function (obj) {
    return obj == null ? [] : [].concat(obj);
  },

  noop: function () {},

  uniqueId: function (prefix) {
    return "" + ((prefix == null ? "" : prefix) + ++idCount);
  },

  //-- Really specific Component Utilities --

  isFirstFocusedRender: function (component) {
    return component._firstFocus || component.state.focused && (component._firstFocus = true);
  },

  ifNotDisabled: function (disabledOnly, fn) {
    if (arguments.length === 1) fn = disabledOnly, disabledOnly = false;

    //console.log('create method')
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      //console.log('called', disabledOnly)
      if (!(this.isDisabled() || !disabledOnly && this.isReadOnly())) return fn.apply(this, args);
    };
  }
};

function has(o, k) {
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
}

function eql(a, b) {
  return a === b;
}

/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 */
function shallowEqual(objA, objB) {

  if (objA == null || objB == null) return false;

  var keysA = Object.keys(objA),
      keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) if (!has(objB, keysA[i]) || !eql(objA[keysA[i]], objB[keysA[i]])) return false;

  return true;
}