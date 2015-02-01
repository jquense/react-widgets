"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");

module.exports = React.createClass({

  displayName: "MultiselectInput",

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,

    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool },


  componentDidUpdate: function () {
    this.props.focused && this.focus();
  },

  render: function () {
    var value = this.props.value,
        placeholder = this.props.placeholder,
        size = Math.max((value || placeholder).length, 1);

    return React.createElement("input", _extends({}, this.props, {
      type: "text",
      className: "rw-input",
      "aria-disabled": this.props.disabled,
      "aria-readonly": this.props.readOnly,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      size: size }));
  },

  focus: function () {
    this.getDOMNode().focus();
  }

});