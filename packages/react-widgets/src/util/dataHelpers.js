import { isShallowEqual } from './_';

export const dataValue = (data, field) => {
  let value = data;
  if (typeof field === 'function')
    value = field(data)
  else if (data == null)
    value = data
  else if (
    typeof field === 'string' &&
    typeof data === 'object' &&
    field in data
  )
    value = data[field]

  return value
}

export const dataText = (item, textField) => {
  var value = dataValue(item, textField);
  return value == null ? '' : (value + '')
}

export function dataIndexOf(data, item, valueField) {
  let idx = -1
  let isValueEqual = datum => valueMatcher(item, datum, valueField);

  while (++idx < data.length) {
    var datum = data[idx];
    if (datum === item || isValueEqual(datum)) return idx
  }

  return -1
}

/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */
export function valueMatcher(a, b, valueField) {
  return isShallowEqual(
    dataValue(a, valueField),
    dataValue(b, valueField)
  )
}

export function dataItem(data, item, valueField) {
  let idx = dataIndexOf(data, item, valueField)
  return idx !== -1? data[idx] : item
}
