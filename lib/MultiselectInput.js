'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({

  displayName: 'MultiselectInput',

  propTypes: {
    value: _react2.default.PropTypes.string,
    maxLength: _react2.default.PropTypes.number,
    onChange: _react2.default.PropTypes.func.isRequired,
    onFocus: _react2.default.PropTypes.func,

    disabled: _propTypes2.default.disabled,
    readOnly: _propTypes2.default.readOnly
  },

  render: function render() {
    var value = this.props.value,
        placeholder = this.props.placeholder,
        size = Math.max((value || placeholder).length, 1) + 1;

    return _react2.default.createElement('input', _extends({}, this.props, {
      className: 'rw-input',
      autoComplete: 'off',
      'aria-disabled': this.props.disabled,
      'aria-readonly': this.props.readOnly,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      size: size
    }));
  },
  focus: function focus() {
    _compat2.default.findDOMNode(this).focus();
  }
});
module.exports = exports['default'];