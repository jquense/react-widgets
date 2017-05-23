'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  propTypes: {
    autoFocus: _propTypes2.default.bool
  },

  componentDidMount: function componentDidMount() {
    var autoFocus = this.props.autoFocus;


    if (autoFocus) this.focus ? this.focus() : (0, _reactDom.findDOMNode)(this).focus();
  }
};
module.exports = exports['default'];