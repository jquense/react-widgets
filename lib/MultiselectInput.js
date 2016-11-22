'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
        props = _objectWithoutProperties(_props, ['disabled', 'readOnly']);

    var size = Math.max((props.value || props.placeholder).length, 1) + 1;

    return _react2.default.createElement('input', _extends({}, props, {
      size: size,
      className: 'rw-input',
      autoComplete: 'off',
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      disabled: disabled,
      readOnly: readOnly
    }));
  };

  MultiselectInput.prototype.focus = function focus() {
    _compat2.default.findDOMNode(this).focus();
  };

  return MultiselectInput;
}(_react2.default.Component), _class.propTypes = {
  value: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  maxLength: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func.isRequired,

  disabled: _propTypes2.default.disabled,
  readOnly: _propTypes2.default.readOnly
}, _temp);
exports.default = MultiselectInput;
module.exports = exports['default'];