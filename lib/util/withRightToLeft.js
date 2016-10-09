'use strict';

exports.__esModule = true;
exports.isRtl = undefined;
exports.default = withRightToLeft;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixInContext = require('./mixInContext');

var _mixInContext2 = _interopRequireDefault(_mixInContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isRtl = exports.isRtl = function isRtl(instance) {
  return !!(instance.props.isRtl || instance.context && instance.context.isRtl);
};

function withRightToLeft(componentClass) {
  componentClass.prototype.isRtl = function $isRtl() {
    return isRtl(this);
  };

  return (0, _mixInContext2.default)(componentClass, {
    propTypes: {
      isRtl: _react2.default.PropTypes.bool
    },

    contextTypes: {
      isRtl: _react2.default.PropTypes.bool
    },

    childContextTypes: {
      isRtl: _react2.default.PropTypes.bool
    },

    getChildContext: function getChildContext() {
      return {
        isRtl: isRtl(this)
      };
    }
  });
}