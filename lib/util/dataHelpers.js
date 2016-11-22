'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.dataValue = dataValue;
exports.dataText = dataText;
exports.dataIndexOf = dataIndexOf;
exports.valueMatcher = valueMatcher;
exports.dataItem = dataItem;

var _ = require('./_');

function accessor(data, field) {
  var value = data;

  if (typeof field === 'function') value = field(data);else if (data == null) value = data;else if (typeof field === 'string' && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && field in data) value = data[field];

  return value;
}

function dataValue(item, valueField) {
  return valueField && item && (0, _.has)(item, valueField) ? item[valueField] : item;
}

function dataText(item, textField) {
  var value = accessor(item, textField);
  return value == null ? '' : value + '';
}

function dataIndexOf(data, item, valueField) {
  var idx = -1,
      len = data.length,
      isValueEqual = function isValueEqual(datum) {
    return valueMatcher(item, datum, valueField);
  };

  while (++idx < len) {
    var datum = data[idx];
    if (datum === item || isValueEqual(datum)) return idx;
  }

  return -1;
}

/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */
function valueMatcher(a, b, valueField) {
  return (0, _.isShallowEqual)(dataValue(a, valueField), dataValue(b, valueField));
}

function dataItem(data, item, valueField) {
  var idx = dataIndexOf(data, dataValue(item, valueField), valueField);

  if (idx !== -1) return data[idx];

  return item;
}