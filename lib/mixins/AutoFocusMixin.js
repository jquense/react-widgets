'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  propTypes: {
    autoFocus: _react2.default.PropTypes.bool
  },

  componentDidMount: function componentDidMount() {
    var autoFocus = this.props.autoFocus;


    if (autoFocus) this.focus ? this.focus() : (0, _reactDom.findDOMNode)(this).focus();
  }
};
module.exports = exports['default'];