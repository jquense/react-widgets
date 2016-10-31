'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var idCount = 0;

var _ = module.exports = {

  has: has,

  result: function result(value) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return typeof value === 'function' ? value.apply(undefined, args) : value;
  },

  isShallowEqual: function isShallowEqual(a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') return a === b;

    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) return false;

    return shallowEqual(a, b);
  },
  transform: function transform(obj, cb, seed) {
    _.each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
    return seed;
  },
  each: function each(obj, cb, thisArg) {
    if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

    for (var key in obj) {
      if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
    }
  },
  pick: function pick(obj, keys) {
    keys = [].concat(keys);
    return _.transform(obj, function (mapped, val, key) {
      if (keys.indexOf(key) !== -1) mapped[key] = val;
    }, {});
  },
  pickProps: function pickProps(props, componentClass) {
    return _.pick(props, Object.keys(componentClass.propTypes));
  },
  omit: function omit(obj, keys) {
    keys = [].concat(keys);
    return _.transform(obj, function (mapped, val, key) {
      if (keys.indexOf(key) === -1) mapped[key] = val;
    }, {});
  },
  omitOwnProps: function omitOwnProps(component) {
    for (var _len2 = arguments.length, others = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      others[_key2 - 1] = arguments[_key2];
    }

    var keys = others.reduce(function (arr, compClass) {
      return arr.concat(Object.keys(compClass.propTypes));
    }, Object.keys(component.constructor.propTypes));

    return _.omit(component.props, keys);
  },
  find: function find(arr, cb, thisArg) {
    var result;
    if (Array.isArray(arr)) {
      arr.every(function (val, idx) {
        if (cb.call(thisArg, val, idx, arr)) return result = val, false;
        return true;
      });
      return result;
    } else for (var key in arr) {
      if (has(arr, key)) if (cb.call(thisArg, arr[key], key, arr)) return arr[key];
    }
  },
  chunk: function chunk(array, chunkSize) {
    var index = 0,
        length = array ? array.length : 0,
        result = [];

    chunkSize = Math.max(+chunkSize || 1, 1);

    while (index < length) {
      result.push(array.slice(index, index += chunkSize));
    }return result;
  },
  splat: function splat(obj) {
    return obj == null ? [] : [].concat(obj);
  },
  noop: function noop() {},
  uniqueId: function uniqueId(prefix) {
    return '' + ((prefix == null ? '' : prefix) + ++idCount);
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

  for (var i = 0; i < keysA.length; i++) {
    if (!has(objB, keysA[i]) || !eql(objA[keysA[i]], objB[keysA[i]])) return false;
  }return true;
}