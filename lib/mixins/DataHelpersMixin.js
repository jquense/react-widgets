'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _propTypes3 = require('../util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _dataHelpers = require('../util/dataHelpers');

var dataHelpers = _interopRequireWildcard(_dataHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  propTypes: {
    valueField: _propTypes2.default.string,
    textField: _propTypes4.default.accessor
  },

  componentWillMount: function componentWillMount() {
    (0, _warning2.default)(false, '`DataHelpersMixin` is deprecated and will be removed in a later version');
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