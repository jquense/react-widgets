'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _version = _react2.default.version.split('.').map(parseFloat);

exports.default = {
  version: function version() {
    return _version;
  },
  findDOMNode: function findDOMNode(component) {
    return _reactDom2.default.findDOMNode(component);
  },
  batchedUpdates: function batchedUpdates(cb) {
    _reactDom2.default.unstable_batchedUpdates(cb);
  }
};
module.exports = exports['default'];