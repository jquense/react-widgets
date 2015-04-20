"use strict";
var React = require("react");
var propTypes = require("../util/propTypes");

var _require = require("../util/_");

var has = _require.has;
var isShallowEqual = _require.isShallowEqual;

function accessor(data, field) {
  var value = data;

  if (typeof field === "function") value = field(data);else if (data == null) value = data;else if (typeof field === "string" && typeof data === "object" && field in data) value = data[field];

  return value;
}

module.exports = {

  propTypes: {
    valueField: React.PropTypes.string,
    textField: propTypes.accessor },

  _dataValue: function (item) {
    var field = this.props.valueField;

    return field && item && has(item, field) ? item[field] : item;
  },

  _dataText: function (item) {
    var field = this.props.textField;

    return accessor(item, field) + "";
  },

  _dataIndexOf: function (data, item) {
    var _this = this;

    var idx = -1,
        len = data.length,
        finder = function (datum) {
      return _this._valueMatcher(item, datum);
    };

    while (++idx < len) if (finder(data[idx])) return idx;

    return -1;
  },

  _valueMatcher: function (a, b) {
    return isShallowEqual(this._dataValue(a), this._dataValue(b));
  },

  _dataItem: function (data, item) {
    var first = data[0],
        field = this.props.valueField,
        idx;

    // make an attempt to see if we were passed in dataItem vs just a valueField value
    // either an object with the right prop, or a primitive
    // { valueField: 5 } || "hello" [ "hello" ]
    if (has(item, field) || typeof first === typeof val) return item;

    idx = this._dataIndexOf(data, this._dataValue(item));

    if (idx !== -1) return data[idx];

    return item;
  }
};