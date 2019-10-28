import warning from 'warning'

export const makeArray = <T>(obj: T | T[]): T[] =>
  obj == null ? [] : ([] as T[]).concat(obj)

export const has = <T>(o: T, key: string) =>
  o ? Object.prototype.hasOwnProperty.call(o, key) : false

export function isShallowEqual(a: any, b: any): boolean {
  if (a === b) return true
  if (a instanceof Date && b instanceof Date) return +a === +b
  if (typeof a !== 'object' && typeof b !== 'object') return a === b
  if (typeof a !== typeof b) return false
  if (a == null || b == null) return false // if they were both null we wouldn't be here

  let keysA = Object.keys(a)
  let keysB = Object.keys(b)

  if (keysA.length !== keysB.length) return false
  for (let i = 0; i < keysA.length; i++)
    if (!has(b, keysA[i]) || a[keysA[i]] !== b[keysA[i]]) return false
  return true
}

export function chunk<T>(array: T[], chunkSize: number): Array<T[]> {
  let index = 0
  let length = array ? array.length : 0
  let result = [] as Array<T[]>

  chunkSize = Math.max(+chunkSize || 1, 1)
  while (index < length) result.push(array.slice(index, (index += chunkSize)))

  return result
}

export function groupBySortedKeys<TData>(
  groupBy: keyof TData | ((item: TData) => any),
  data: TData[],
  keys: string[] = [],
): Record<string, TData[]> {
  const iter = typeof groupBy === 'function' ? groupBy : item => item[groupBy]

  warning(
    typeof groupBy !== 'string' || !data.length || has(data[0], groupBy),
    `[React Widgets] You seem to be trying to group this list by a ` +
      `property \`${groupBy}\` that doesn't exist in the dataset items, this may be a typo`,
  )

  return data.reduce((grps, item) => {
    let group = iter(item)

    if (has(grps, group)) {
      grps[group].push(item)
    } else {
      keys.push(group)
      grps[group] = [item]
    }

    return grps
  }, {})
}
