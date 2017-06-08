'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _caret = require('./util/caret');

var _caret2 = _interopRequireDefault(_caret);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = (0, _createReactClass2.default)({

  displayName: 'ComboboxInput',

  propTypes: {
    value: _propTypes2.default.string,
    suggest: _propTypes2.default.bool,
    onChange: _propTypes2.default.func.isRequired
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
    var _props = this.props,
        onKeyDown = _props.onKeyDown,
        props = _objectWithoutProperties(_props, ['onKeyDown']);

    delete props.suggest;

    return _react2.default.createElement(_Input2.default, _extends({}, props, {
      onKeyDown: onKeyDown,
      onChange: this.handleChange
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
  handleChange: function handleChange(e) {
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