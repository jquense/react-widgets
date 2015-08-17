'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

exports['default'] = {

  contextTypes: {
    isRtl: _react2['default'].PropTypes.bool
  },

  isRtl: function isRtl() {
    return !!this.context.isRtl;
  }

};
module.exports = exports['default'];