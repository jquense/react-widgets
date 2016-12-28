import warning from 'warning';

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


export function groupBySortedKeys(groupBy, data, keys) {
  var iter = typeof groupBy === 'function' ? groupBy : item => item[groupBy]

  // the keys array ensures that groups are rendered in the order they came in
  // which means that if you sort the data array it will render sorted,
  // so long as you also sorted by group
  keys = keys || []

  warning(typeof groupBy !== 'string' || !data.length || has(data[0], groupBy)
    , `[React Widgets] You seem to be trying to group this list by a `
    + `property \`${groupBy}\` that doesn't exist in the dataset items, this may be a typo`)

  return data.reduce((grps, item) => {
    let group = iter(item);

    if (has(grps, group)) {
      grps[group].push(item)
    }
    else {
      keys.push(group)
      grps[group] = [item]
    }

    return grps
  }, {})
}
