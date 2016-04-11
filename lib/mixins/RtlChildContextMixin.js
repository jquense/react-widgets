'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  contextTypes: {
    isRtl: _react2.default.PropTypes.bool
  },

  isRtl: function isRtl() {
    return !!this.context.isRtl;
  }
};
module.exports = exports['default'];