'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = babelHelpers.interopRequireDefault(_warning);

var _utilPropTypes = require('../util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _utilDataHelpers = require('../util/dataHelpers');

var dataHelpers = babelHelpers.interopRequireWildcard(_utilDataHelpers);
exports['default'] = {

  propTypes: {
    valueField: _react2['default'].PropTypes.string,
    textField: _utilPropTypes2['default'].accessor
  },

  componentWillMount: function componentWillMount() {
    _warning2['default'](false, '`DataHelpersMixin` is deprecated and will be removed in a later version');
  },

  _dataValue: function _dataValue(item) {
    return dataHelpers.dataValue(item, this.props.valueField);
  },

  _dataText: function _dataText(item) {
    return dataHelpers.dataText(item, this.props.textField);
  },

  _dataIndexOf: function _dataIndexOf(data, item) {
    return dataHelpers.dataIndexOf(data, item, this.props.valueField);
  },

  _valueMatcher: function _valueMatcher(a, b) {
    return dataHelpers.valueMatcher(a, b, this.props.valueField);
  },

  _dataItem: function _dataItem(data, item) {
    return dataHelpers.dataItem(data, item, this.props.valueField);
  }
};
module.exports = exports['default'];