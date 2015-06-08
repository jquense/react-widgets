'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var React = require('react');
var cn = require('classnames');
module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'children']);

    return React.createElement(
      'button',
      babelHelpers._extends({}, props, { type: 'button', className: cn(className, 'rw-btn') }),
      children
    );
  }
});