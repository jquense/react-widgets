'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

exports['default'] = _react2['default'].createClass({
  displayName: 'WidgetButton',

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'children']);

    return _react2['default'].createElement(
      'button',
      babelHelpers._extends({}, props, { type: 'button', className: _classnames2['default'](className, 'rw-btn') }),
      children
    );
  }
});
module.exports = exports['default'];