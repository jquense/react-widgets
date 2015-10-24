'use strict';

var babelHelpers = require('../util/babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _utilFilter = require('../util/filter');

var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

var _utilDataHelpers = require('../util/dataHelpers');

module.exports = {

  propTypes: {
    textField: _react2['default'].PropTypes.string
  },

  first: function first() {
    return this._data()[0];
  },

  last: function last() {
    var data = this._data();
    return data[data.length - 1];
  },

  prev: function prev(item, word) {
    var textField = this.props.textField,
        data = this._data(),
        idx = data.indexOf(item);

    if (idx === -1) idx = data.length;

    return word ? findPrevInstance(textField, data, word, idx) : --idx < 0 ? data[0] : data[idx];
  },

  next: function next(item, word) {
    var textField = this.props.textField,
        data = this._data(),
        idx = data.indexOf(item);

    return word ? findNextInstance(textField, data, word, idx) : ++idx === data.length ? data[data.length - 1] : data[idx];
  }

};

function findNextInstance(textField, data, word, startIndex) {
  var matches = _utilFilter2['default'].startsWith,
      idx = -1,
      len = data.length,
      foundStart,
      itemText;

  word = word.toLowerCase();

  while (++idx < len) {
    foundStart = foundStart || idx > startIndex;
    itemText = foundStart && _utilDataHelpers.dataText(data[idx], textField).toLowerCase();

    if (foundStart && matches(itemText, word)) return data[idx];
  }
}

function findPrevInstance(textField, data, word, startIndex) {
  var matches = _utilFilter2['default'].startsWith,
      idx = data.length,
      foundStart,
      itemText;

  word = word.toLowerCase();

  while (--idx >= 0) {
    foundStart = foundStart || idx < startIndex;
    itemText = foundStart && _utilDataHelpers.dataText(data[idx], textField).toLowerCase();

    if (foundStart && matches(itemText, word)) return data[idx];
  }
}