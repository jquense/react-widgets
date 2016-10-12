
function eql(a, b) {
  return a === b
}

/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 */
function _shallowEqual(objA, objB) {
  if (objA == null || objB == null)
    return false;

  let keysA = Object.keys(objA)
  let keysB = Object.keys(objB);

  if (keysA.length !== keysB.length)
    return false;

  for (let i = 0; i < keysA.length; i++)
    if (!has(objB, keysA[i]) || !eql(objA[keysA[i]], objB[keysA[i]]))
      return false;

  return true;
}


export function has(o, k){
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false
}

export const result = (value, ...args) =>  typeof value === 'function'
  ? value(...args) : value;

export function isShallowEqual(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime()
  if(typeof a !== 'object' && typeof b !== 'object')
    return a === b
  if(typeof a !== typeof b ) return false
  return _shallowEqual(a, b)
}

export function find(arr, cb) {
  let result;
  arr.every(function(val, idx){
    if (cb(val, idx, arr)) {
      result = val;
      return false
    }
    return true
  })
  return result
}

export function chunk(array, chunkSize) {
  let index = 0, length = array ? array.length : 0
    , result = [];

  chunkSize = Math.max(+chunkSize || 1, 1)

  while (index < length)
    result.push(array.slice(index, (index += chunkSize)))

  return result
}

export function splat(obj) {
  return obj == null ? [] : [].concat(obj)
}
