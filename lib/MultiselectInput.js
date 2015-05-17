'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var React = require('react'),
    compat = require('./util/compat');

module.exports = React.createClass({

  displayName: 'MultiselectInput',

  propTypes: {
    value: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,

    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool },

  componentDidUpdate: function componentDidUpdate() {
    this.props.focused && this.focus();
  },

  render: function render() {
    var value = this.props.value,
        placeholder = this.props.placeholder,
        size = Math.max((value || placeholder).length, 1) + 1;

    return React.createElement('input', babelHelpers._extends({}, this.props, {
      type: 'text',
      className: 'rw-input',
      'aria-disabled': this.props.disabled,
      'aria-readonly': this.props.readOnly,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      size: size }));
  },

  focus: function focus() {
    compat.findDOMNode(this).focus();
  }

});