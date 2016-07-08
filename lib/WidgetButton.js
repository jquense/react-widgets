'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = _react2.default.createClass({
  displayName: 'WidgetButton',
  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var disabled = _props.disabled;
    var label = _props.label;
    var icon = _props.icon;
    var busy = _props.busy;
    var active = _props.active;
    var children = _props.children;
    var _props$component = _props.component;
    var Tag = _props$component === undefined ? 'button' : _props$component;

    var props = _objectWithoutProperties(_props, ['className', 'disabled', 'label', 'icon', 'busy', 'active', 'children', 'component']);

    return _react2.default.createElement(
      Tag,
      _extends({}, props, {
        tabIndex: '-1',
        title: label,
        disabled: disabled,
        'aria-disabled': disabled,
        'aria-label': label,
        className: (0, _classnames2.default)(className, 'rw-btn', active && !disabled && 'rw-state-active')
      }),
      icon && _react2.default.createElement('i', {
        'aria-hidden': true,
        className: (0, _classnames2.default)('rw-i', 'rw-i-' + icon, busy && 'rw-loading')
      }),
      children
    );
  }
});
module.exports = exports['default'];