'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListOption = _react2.default.createClass({
  displayName: 'ListOption',

  propTypes: {
    dataItem: _react2.default.PropTypes.any,
    focused: _react2.default.PropTypes.bool,
    selected: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    readOnly: _react2.default.PropTypes.bool
  },

  render: function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        focused = _props.focused,
        selected = _props.selected,
        disabled = _props.disabled,
        readOnly = _props.readOnly;


    var props = _3.default.omitOwnProps(this);

    var classes = {
      'rw-state-focus': focused,
      'rw-state-selected': selected,
      'rw-state-disabled': disabled,
      'rw-state-readonly': readOnly
    };

    return _react2.default.createElement(
      'li',
      _extends({
        role: 'option',
        tabIndex: !(disabled || readOnly) ? '-1' : undefined,
        'aria-selected': !!selected,
        className: (0, _classnames2.default)('rw-list-option', className, classes)
      }, props),
      children
    );
  }
});

exports.default = ListOption;
module.exports = exports['default'];