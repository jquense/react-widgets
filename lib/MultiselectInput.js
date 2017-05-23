'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiselectInput = (_temp = _class = function (_React$Component) {
  _inherits(MultiselectInput, _React$Component);

  function MultiselectInput() {
    _classCallCheck(this, MultiselectInput);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  MultiselectInput.prototype.render = function render() {
    var _props = this.props,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        placeholder = _props.placeholder,
        onChange = _props.onChange,
        value = _props.value,
        props = _objectWithoutProperties(_props, ['disabled', 'readOnly', 'placeholder', 'onChange', 'value']);

    var size = props.inputSize ? props.inputSize(value || placeholder) : Math.max((value || placeholder).length, 1) + 1;

    var elementProps = _3.default.omitOwnProps(this);

    return _react2.default.createElement('input', _extends({}, elementProps, {
      size: size,
      className: 'rw-input',
      autoComplete: 'off',
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: placeholder,
      onChange: onChange,
      value: value
    }));
  };

  MultiselectInput.prototype.focus = function focus() {
    _compat2.default.findDOMNode(this).focus();
  };

  return MultiselectInput;
}(_react2.default.Component), _class.propTypes = {
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  maxLength: _propTypes2.default.number,
  inputSize: _propTypes2.default.func,
  onChange: _propTypes2.default.func.isRequired,

  disabled: _propTypes4.default.disabled,
  readOnly: _propTypes4.default.readOnly
}, _temp);
exports.default = MultiselectInput;
module.exports = exports['default'];