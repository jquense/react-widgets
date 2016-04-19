'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

exports['default'] = _react2['default'].createClass({

  displayName: 'MultiselectInput',

  propTypes: {
    value: _react2['default'].PropTypes.string,
    maxLength: _react2['default'].PropTypes.number,
    onChange: _react2['default'].PropTypes.func.isRequired,
    onFocus: _react2['default'].PropTypes.func,

    disabled: _utilPropTypes2['default'].disabled,
    readOnly: _utilPropTypes2['default'].readOnly
  },

  componentDidUpdate: function componentDidUpdate() {
    this.props.focused && this.focus();
  },

  render: function render() {
    var value = this.props.value,
        placeholder = this.props.placeholder,
        size = Math.max((value || placeholder).length, 1) + 1;

    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
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
    _utilCompat2['default'].findDOMNode(this).focus();
  }

});
module.exports = exports['default'];