'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;

var _utilFilter = require('../util/filter');

var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

var _utilDataHelpers = require('../util/dataHelpers');

var _utilPropTypes = require('../util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _utilInteraction = require('../util/interaction');

var EMPTY_VALUE = {};

var isDisabledOrReadonly = function isDisabledOrReadonly(item, props) {
  return _utilInteraction.isDisabledItem(item, props) || _utilInteraction.isReadOnlyItem(item, props);
};

exports['default'] = {

  propTypes: {
    textField: _utilPropTypes2['default'].accessor,
    valueField: _utilPropTypes2['default'].accessor,
    disabled: _utilPropTypes2['default'].disabled.acceptsArray,
    readOnly: _utilPropTypes2['default'].readOnly.acceptsArray
  },

  first: function first() {
    return this.next(EMPTY_VALUE);
  },

  last: function last() {
    var data = this._data(),
        item = data[data.length - 1];

    return isDisabledOrReadonly(item, this.props) ? this.prev(item) : item;
  },

  prev: function prev(item, word) {
    var data = this._data(),
        nextIdx = data.indexOf(item),
        matches = matcher(word, item, this.props.textField);

    if (nextIdx < 0 || nextIdx == null) nextIdx = 0;

    nextIdx--;

    while (nextIdx > -1 && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx]))) nextIdx--;

    return nextIdx >= 0 ? data[nextIdx] : item;
  },

  next: function next(item, word) {
    var data = this._data(),
        nextIdx = data.indexOf(item) + 1,
        len = data.length,
        matches = matcher(word, item, this.props.textField);

    while (nextIdx < len && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx]))) nextIdx++;

    return nextIdx < len ? data[nextIdx] : item;
  }
};

function matcher(word, item, textField) {
  if (!word) return function () {
    return true;
  };

  word = word.toLowerCase();
  return function (item) {
    return _utilFilter2['default'].startsWith(_utilDataHelpers.dataText(item, textField).toLowerCase(), word);
  };
}
module.exports = exports['default'];