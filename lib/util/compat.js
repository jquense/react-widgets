'use strict';

var babelHelpers = require('./babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _version = _react2['default'].version.split('.').map(parseFloat);

module.exports = {

  version: function version() {
    return _version;
  },

  findDOMNode: function findDOMNode(component) {
    return _react2['default'].findDOMNode(component);
  }

};