/* eslint-disable @typescript-eslint/consistent-type-assertions */
import warning from 'warning'
import { GroupBy } from './List'

export function toItemArray<TDataItem>(a?: TDataItem[] | boolean): TDataItem[] {
  if (Array.isArray(a)) return a
  return []
}

export const makeArray = <T>(
  obj: T | T[] | undefined | null,
  excludeNull = true,
): T[] => {
  const result: T[] = []

  return excludeNull
    ? obj == null
      ? result
      : result.concat(obj)
    : result.concat(obj!)
}

export const has = <T>(o: T, key: string) =>
  o ? Object.prototype.hasOwnProperty.call(o, key) : false

export function chunk<T>(array: T[], chunkSize: number): Array<T[]> {
  let index = 0
  let length = array ? array.length : 0
  let result = [] as Array<T[]>

  chunkSize = Math.max(+chunkSize || 1, 1)
  while (index < length) result.push(array.slice(index, (index += chunkSize)))

  return result
}

export function groupBySortedKeys<TData>(
  groupBy: GroupBy<TData>,
  data: TData[],
  _keys: unknown[] = [],
) {
  const iter =
    typeof groupBy === 'function' ? groupBy : (item: any) => item[groupBy]

  warning(
    typeof groupBy !== 'string' || !data.length || has(data[0], groupBy),
    `[React Widgets] You seem to be trying to group this list by a ` +
      `property \`${groupBy}\` that doesn't exist in the dataset items, this may be a typo`,
  )

  const groups = new Map<unknown, TData[]>()

  data.forEach(item => {
    let group = iter(item)

    if (groups.has(group)) groups.get(group)!.push(item)
    else groups.set(group, [item])
  })

  return Array.from(groups)
}
