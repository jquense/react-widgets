'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _caret = require('./util/caret');

var _caret2 = _interopRequireDefault(_caret);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComboboxInput = (_temp2 = _class = function (_React$Component) {
  _inherits(ComboboxInput, _React$Component);

  function ComboboxInput() {
    var _temp, _this, _ret;

    _classCallCheck(this, ComboboxInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleChange = function (e) {
      var _this$props = _this.props;
      var placeholder = _this$props.placeholder;
      var value = _this$props.value;
      var onChange = _this$props.onChange;


      var stringValue = e.target.value,
          hasPlaceholder = !!placeholder;

      // IE fires input events when setting/unsetting placeholders.
      // issue #112
      if (hasPlaceholder && !stringValue && stringValue === (value || '')) return;

      _this._last = stringValue;
      onChange(e, stringValue);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ComboboxInput.prototype.componentDidUpdate = function componentDidUpdate() {
    var input = (0, _reactDom.findDOMNode)(this),
        val = this.props.value;

    if (this.isSuggesting()) {
      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
          end = val.length - start;

      if (start >= 0) {
        (0, _caret2.default)(input, start, start + end);
      }
    }
  };

  ComboboxInput.prototype.render = function render() {
    var _props = this.props;
    var onKeyDown = _props.onKeyDown;

    var props = _objectWithoutProperties(_props, ['onKeyDown']);

    delete props.suggest;

    return _react2.default.createElement(_Input2.default, _extends({}, props, {
      className: 'rw-widget-input',
      onKeyDown: onKeyDown,
      onChange: this.handleChange
    }));
  };

  ComboboxInput.prototype.isSuggesting = function isSuggesting() {
    var _props2 = this.props;
    var value = _props2.value;
    var suggest = _props2.suggest;


    if (!suggest) return false;

    return this._last != null && value.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;
  };

  ComboboxInput.prototype.accept = function accept(removeCaret) {
    var value = (0, _reactDom.findDOMNode)(this).value || '',
        end = value.length;

    this._last = null;
    removeCaret && (0, _caret2.default)((0, _reactDom.findDOMNode)(this), end, end);
  };

  ComboboxInput.prototype.focus = function focus() {
    (0, _reactDom.findDOMNode)(this).focus();
  };

  return ComboboxInput;
}(_react2.default.Component), _class.propTypes = {
  value: _react2.default.PropTypes.string,
  suggest: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func.isRequired
}, _class.defaultProps = {
  value: ''
}, _temp2);
exports.default = ComboboxInput;
module.exports = exports['default'];