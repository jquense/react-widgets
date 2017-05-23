'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  contextTypes: {
    isRtl: _propTypes2.default.bool
  },

  isRtl: function isRtl() {
    return !!this.context.isRtl;
  }
};
module.exports = exports['default'];