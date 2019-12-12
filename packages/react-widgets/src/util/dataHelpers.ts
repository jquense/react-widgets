import { DataItem, Value } from '../types'
import { isShallowEqual } from './_'

export type DataKeyAccessorFn = (item: DataItem) => DataItem

export type DataKeyAccessor = string | DataKeyAccessorFn

export type TextAccessorFn = (item: DataItem) => string

export type TextAccessor = string | TextAccessorFn

export const dataValue = (
  dataItem: DataItem,
  field?: DataKeyAccessor,
): unknown => {
  if (typeof field === 'function') return field(dataItem)
  if (dataItem == null) return dataItem
  if (
    typeof field === 'string' &&
    typeof dataItem === 'object' &&
    field in dataItem!
  )
    return dataItem![field]

  return dataItem
}

export const dataText = (
  dataItem: DataItem,
  textField?: TextAccessor,
): string => {
  const value = dataValue(dataItem, textField)
  return value == null ? '' : String(value)
}

/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */
export function valueMatcher(
  a: DataItem,
  b: DataItem,
  dataKey?: DataKeyAccessor,
) {
  return isShallowEqual(dataValue(a, dataKey), dataValue(b, dataKey))
}

export function dataIndexOf(
  data: DataItem[],
  value: Value,
  dataKey?: DataKeyAccessor,
) {
  let idx = -1
  while (++idx < data.length) {
    const datum = data[idx]
    if (datum === value || valueMatcher(value, datum, dataKey)) return idx
  }

  return -1
}

export function dataItem<TDataItem = DataItem>(
  data: TDataItem[],
  value: Value,
  dataKey?: DataKeyAccessor,
): TDataItem {
  const idx = dataIndexOf(data, value, dataKey)
  // This isn't strictly safe, but we want to allow items that aren't in the list
  return idx !== -1 ? data[idx] : (value as TDataItem)
}
