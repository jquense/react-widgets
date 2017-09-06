import warning from 'warning';

export const makeArray = obj => obj == null ? [] : [].concat(obj)

export const has = (o, k) => o ?
  Object.prototype.hasOwnProperty.call(o, k) : false


export function isShallowEqual(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return +a === +b
  if (typeof a !== 'object' && typeof b !== 'object') return a === b
  if (typeof a !== typeof b ) return false
  if (a == null || b == null) return false; // if they were both null we wouldn't be here

  let keysA = Object.keys(a)
  let keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) if (
    !has(b, keysA[i]) ||
    a[keysA[i]] !== b[keysA[i]]
  )
    return false;
  return true;
}

export function chunk(array, chunkSize) {
  let index = 0, length = array ? array.length : 0
  let result = [];

  chunkSize = Math.max(+chunkSize || 1, 1)
  while (index < length)
    result.push(array.slice(index, (index += chunkSize)))

  return result
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
