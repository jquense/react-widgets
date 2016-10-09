'use strict';

exports.__esModule = true;
exports.propTypes = exports.presets = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.indexOf = indexOf;
exports.filter = filter;
exports.suggest = suggest;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('./propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dataHelpers = require('./dataHelpers');

var _ = require('./_');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var presets = exports.presets = {
  eq: function eq(a, b) {
    return a === b;
  },
  neq: function neq(a, b) {
    return a !== b;
  },
  gt: function gt(a, b) {
    return a > b;
  },
  gte: function gte(a, b) {
    return a >= b;
  },
  lt: function lt(a, b) {
    return a < b;
  },
  lte: function lte(a, b) {
    return a <= b;
  },

  contains: function contains(a, b) {
    return a.indexOf(b) !== -1;
  },

  startsWith: function startsWith(a, b) {
    return a.lastIndexOf(b, 0) === 0;
  },

  endsWith: function endsWith(a, b) {
    var pos = a.length - b.length,
        lastIndex = a.indexOf(b, pos);

    return lastIndex !== -1 && lastIndex === pos;
  }
};

function normalizeFilterType(type) {
  if (type === false) return null;
  if (type === true) return 'startsWith';
  return type || 'eq';
}

function normalizeFilter(_ref) {
  var filter = _ref.filter;
  var _ref$caseSensitive = _ref.caseSensitive;
  var caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive;
  var textField = _ref.textField;

  filter = normalizeFilterType(filter);

  if (typeof filter === 'function' || !filter) {
    return filter;
  }

  filter = presets[filter];

  return function (item, searchTerm) {
    var textValue = (0, _dataHelpers.dataText)(item, textField);

    if (!caseSensitive) {
      textValue = textValue.toLowerCase();
      searchTerm = searchTerm.toLowerCase();
    }

    return filter(textValue, searchTerm);
  };
}

function normalizeOptions(nextOptions) {
  var options = _extends({}, nextOptions);
  options.minLengh = options.minLengh || 0;
  options.filter = normalizeFilter(options);
  return options;
}

var propTypes = exports.propTypes = {
  textField: _propTypes2.default.accessor,
  caseSensitive: _react2.default.PropTypes.bool,
  minLength: _react2.default.PropTypes.number,
  filter: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.bool, _react2.default.PropTypes.oneOf(Object.keys(presets))])
};

function indexOf(data, _ref2) {
  var _ref2$searchTerm = _ref2.searchTerm;
  var searchTerm = _ref2$searchTerm === undefined ? '' : _ref2$searchTerm;

  var options = _objectWithoutProperties(_ref2, ['searchTerm']);

  var _normalizeOptions = normalizeOptions(options);

  var filter = _normalizeOptions.filter;
  var minLength = _normalizeOptions.minLength;


  var idx = -1;

  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return -1;

  data.every(function (item, i) {
    if (filter(item, searchTerm, i)) return idx = i, false;

    return true;
  });

  return idx;
}

function filter(data, _ref3) {
  var _ref3$searchTerm = _ref3.searchTerm;
  var searchTerm = _ref3$searchTerm === undefined ? '' : _ref3$searchTerm;

  var options = _objectWithoutProperties(_ref3, ['searchTerm']);

  var _normalizeOptions2 = normalizeOptions(options);

  var filter = _normalizeOptions2.filter;
  var minLength = _normalizeOptions2.minLength;


  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return data;

  return data.filter(function (item, idx) {
    return filter(item, searchTerm, idx);
  });
}

function suggest(data, _ref4) {
  var _ref4$searchTerm = _ref4.searchTerm;
  var searchTerm = _ref4$searchTerm === undefined ? '' : _ref4$searchTerm;

  var options = _objectWithoutProperties(_ref4, ['searchTerm']);

  var _normalizeOptions3 = normalizeOptions(options);

  var filter = _normalizeOptions3.filter;
  var minLength = _normalizeOptions3.minLength;


  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return searchTerm;

  return (0, _.find)(data, function (item, idx) {
    return filter(item, searchTerm, idx);
  }) || searchTerm;
}