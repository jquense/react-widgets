'use strict';

exports.__esModule = true;
exports.dataValue = dataValue;
exports.dataText = dataText;
exports.dataIndexOf = dataIndexOf;
exports.valueMatcher = valueMatcher;
exports.dataItem = dataItem;

var _ = require('./_');

function accessor(data, field) {
  var value = data;

  if (typeof field === 'function') value = field(data);else if (data == null) value = data;else if (typeof field === 'string' && typeof data === 'object' && field in data) value = data[field];

  return value;
}

function dataValue(item, valueField) {
  return valueField && item && _.has(item, valueField) ? item[valueField] : item;
}

function dataText(item, textField) {
  var value = accessor(item, textField);
  return value == null ? '' : value + '';
}

function dataIndexOf(data, item, valueField) {
  var idx = -1,
      len = data.length,
      finder = function finder(datum) {
    return valueMatcher(item, datum, valueField);
  };

  while (++idx < len) if (finder(data[idx])) return idx;

  return -1;
}

/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */

function valueMatcher(a, b, valueField) {
  return _.isShallowEqual(dataValue(a, valueField), dataValue(b, valueField));
}

function dataItem(data, item, valueField) {
  var first = data[0],
      idx;

  // make an attempt to see if we were passed in dataItem vs just a valueField value
  // either an object with the right prop, or a primitive
  // { valueField: 5 } || "hello" [ "hello" ]
  if (_.has(item, valueField) || typeof first === typeof val) return item;

  idx = dataIndexOf(data, dataValue(item, valueField), valueField);

  if (idx !== -1) return data[idx];

  return item;
}