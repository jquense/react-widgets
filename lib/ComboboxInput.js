'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _caret = require('./util/caret');

var _caret2 = _interopRequireDefault(_caret);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({

  displayName: 'ComboboxInput',

  propTypes: {
    value: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  componentDidUpdate: function componentDidUpdate() {
    var input = _compat2.default.findDOMNode(this),
        val = this.props.value;

    if (this.isSuggesting()) {
      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
          end = val.length - start;

      if (start >= 0) {
        (0, _caret2.default)(input, start, start + end);
      }
    }
  },
  getDefaultProps: function getDefaultProps() {
    return {
      value: ''
    };
  },
  render: function render() {
    return _react2.default.createElement('input', _extends({}, this.props, {
      type: 'text',
      autoComplete: 'off',
      'aria-disabled': this.props.disabled,
      'aria-readonly': this.props.readOnly,
      className: this.props.className + ' rw-input',
      onKeyDown: this.props.onKeyDown,
      onChange: this._change,
      value: this.props.value == null ? '' : this.props.value
    }));
  },
  isSuggesting: function isSuggesting() {
    var val = this.props.value,
        isSuggestion = this._last != null && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;

    return this.props.suggest && isSuggestion;
  },
  accept: function accept(removeCaret) {
    var val = _compat2.default.findDOMNode(this).value || '',
        end = val.length;

    this._last = null;
    removeCaret && (0, _caret2.default)(_compat2.default.findDOMNode(this), end, end);
  },
  _change: function _change(e) {
    var val = e.target.value,
        pl = !!this.props.placeholder;

    // IE fires input events when setting/unsetting placeholders.
    // issue #112
    if (pl && !val && val === (this.props.value || '')) return;

    this._last = val;
    this.props.onChange(e, val);
  },
  focus: function focus() {
    _compat2.default.findDOMNode(this).focus();
  }
});
module.exports = exports['default'];