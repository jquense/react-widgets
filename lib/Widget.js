'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Widget = (_temp = _class = function (_React$Component) {
  _inherits(Widget, _React$Component);

  function Widget() {
    _classCallCheck(this, Widget);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Widget.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        tabIndex = _props.tabIndex,
        open = _props.open,
        dropUp = _props.dropUp,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        focused = _props.focused,
        props = _objectWithoutProperties(_props, ['className', 'tabIndex', 'open', 'dropUp', 'disabled', 'readOnly', 'focused']);

    var isRtl = !!this.context.isRtl;
    var openClass = 'rw-open' + (dropUp ? '-up' : '');

    tabIndex = tabIndex != null ? tabIndex : '-1';

    return _react2.default.createElement('div', _extends({}, props, {
      tabIndex: tabIndex,
      className: (0, _classnames2.default)(className, 'rw-widget', isRtl && 'rw-rtl', open && openClass, focused && 'rw-state-focus', disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly')
    }));
  };

  return Widget;
}(_react2.default.Component), _class.propTypes = {
  tabIndex: _propTypes2.default.node,
  focused: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  open: _propTypes2.default.bool,
  dropUp: _propTypes2.default.bool
}, _class.contextTypes = {
  isRtl: _propTypes2.default.bool
}, _temp);
exports.default = Widget;
module.exports = exports['default'];