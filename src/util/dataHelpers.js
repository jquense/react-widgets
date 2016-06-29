import { has, isShallowEqual } from './_';

function accessor(data, field){
  var value = data;

  if (typeof field === 'function')
    value = field(data)
  else if (data == null)
    value = data
  else if ((typeof field === 'string' || typeof field === 'number') && typeof data === 'object' && field in data)
    value = data[field]

  return value
}

export function dataValue(item, valueField){
  return valueField !== undefined && valueField !== null && item && has(item, valueField)
    ? item[valueField]
    : item
}

export function dataText(item, textField){
  var value = accessor(item, textField);
  return value == null ? '' : (value + '')
}

export function dataIndexOf(data, item, valueField){
  var idx = -1, len = data.length
    , finder = datum => valueMatcher(item, datum, valueField);

  while (++idx < len)
    if (finder(data[idx])) return idx

  return -1
}

/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */
export function valueMatcher(a, b, valueField){
  return isShallowEqual(
    dataValue(a, valueField), dataValue(b, valueField))
}

export function dataItem(data, item, valueField) {
  var first = data[0]
    , idx;

  // make an attempt to see if we were passed in dataItem vs just a valueField value
  // either an object with the right prop, or a primitive
  // { valueField: 5 } || "hello" [ "hello" ]
  if (has(item, valueField) || typeof first === typeof item)
    return item

  idx = dataIndexOf(data, item, valueField)

  if (idx !== -1)
    return data[idx]

  return item
}
