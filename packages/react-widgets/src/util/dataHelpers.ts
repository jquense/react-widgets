import { isShallowEqual } from './_'

export type ValueAccessorFn = (item: object) => unknown

export type ValueAccessor = string | ValueAccessorFn

export type TextAccessorFn = (item: object) => string

export type TextAccessor = string | TextAccessorFn

export const dataValue = (dataItem: object, field: ValueAccessor): unknown => {
  if (typeof field === 'function') return field(dataItem)
  if (dataItem == null) return dataItem
  if (
    typeof field === 'string' &&
    typeof dataItem === 'object' &&
    field in dataItem
  )
    return dataItem[field]

  return dataItem
}

export const dataText = (dataItem: object, textField: TextAccessor): string => {
  const value = dataValue(dataItem, textField)
  return value == null ? '' : String(value)
}

/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */
export function valueMatcher(a: object, b: object, valueField: ValueAccessor) {
  return isShallowEqual(dataValue(a, valueField), dataValue(b, valueField))
}

export function dataIndexOf(
  data: object[],
  dataItem: object,
  valueField: ValueAccessor,
) {
  let idx = -1
  const isValueEqual = (datum: object) =>
    valueMatcher(dataItem, datum, valueField)

  while (++idx < data.length) {
    const datum = data[idx]
    if (datum === dataItem || isValueEqual(datum)) return idx
  }

  return -1
}

export function dataItem(
  data: object[],
  dataItem: object,
  valueField: ValueAccessor,
) {
  const idx = dataIndexOf(data, dataItem, valueField)
  return idx !== -1 ? data[idx] : dataItem
}
