'use strict';

exports.__esModule = true;

var _filter = require('../util/filter');

var _filter2 = _interopRequireDefault(_filter);

var _dataHelpers = require('../util/dataHelpers');

var _propTypes = require('../util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _interaction = require('../util/interaction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMPTY_VALUE = {};

var isDisabledOrReadonly = function isDisabledOrReadonly(item, props) {
  return (0, _interaction.isDisabledItem)(item, props) || (0, _interaction.isReadOnlyItem)(item, props);
};

exports.default = {

  propTypes: {
    textField: _propTypes2.default.accessor,
    valueField: _propTypes2.default.accessor,
    disabled: _propTypes2.default.disabled.acceptsArray,
    readOnly: _propTypes2.default.readOnly.acceptsArray
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

    while (nextIdx > -1 && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx]))) {
      nextIdx--;
    }return nextIdx >= 0 ? data[nextIdx] : item;
  },
  next: function next(item, word) {
    var data = this._data(),
        nextIdx = data.indexOf(item) + 1,
        len = data.length,
        matches = matcher(word, item, this.props.textField);

    while (nextIdx < len && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx]))) {
      nextIdx++;
    }return nextIdx < len ? data[nextIdx] : item;
  }
};


function matcher(word, item, textField) {
  if (!word) return function () {
    return true;
  };

  word = word.toLowerCase();
  return function (item) {
    return _filter2.default.startsWith((0, _dataHelpers.dataText)(item, textField).toLowerCase(), word);
  };
}
module.exports = exports['default'];