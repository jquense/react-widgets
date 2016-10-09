'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetPicker = (_temp = _class = function (_React$Component) {
  _inherits(WidgetPicker, _React$Component);

  function WidgetPicker() {
    _classCallCheck(this, WidgetPicker);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  WidgetPicker.prototype.render = function render() {
    var _props = this.props;
    var open = _props.open;
    var dropUp = _props.dropUp;
    var className = _props.className;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var focused = _props.focused;

    var props = _objectWithoutProperties(_props, ['open', 'dropUp', 'className', 'disabled', 'readOnly', 'focused']);

    var openClass = 'rw-open' + (dropUp ? '-up' : '');

    return _react2.default.createElement('div', _extends({}, props, {
      className: (0, _classnames2.default)(className, 'rw-widget-picker', 'rw-widget-container', open && openClass, disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly', focused && 'rw-state-focus')
    }));
  };

  return WidgetPicker;
}(_react2.default.Component), _class.propTypes = {
  tabIndex: _react2.default.PropTypes.node,
  focused: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  readOnly: _react2.default.PropTypes.bool,
  open: _react2.default.PropTypes.bool,
  dropUp: _react2.default.PropTypes.bool
}, _temp);
exports.default = WidgetPicker;
module.exports = exports['default'];