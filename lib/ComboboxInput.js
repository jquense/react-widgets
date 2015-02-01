"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    caretPos = require("./util/caret");

module.exports = React.createClass({
  displayName: "exports",


  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },


  // hello
  componentDidUpdate: function () {
    var input = this.getDOMNode(),
        val = this.props.value;

    if (this.isSuggesting()) {
      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
          end = val.length - start;

      if (start >= 0) {
        caretPos(input, start, start + end);
      }
    }
  },

  getDefaultProps: function () {
    return {
      value: ""
    };
  },

  render: function () {
    return React.createElement("input", _extends({}, this.props, {
      type: "text",
      className: this.props.className + " rw-input",
      onKeyDown: this.props.onKeyDown,
      onChange: this._change,
      value: this.props.value == null ? "" : this.props.value }));
  },

  isSuggesting: function () {
    var val = this.props.value,
        isSuggestion = this._last != null && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;

    return this.props.suggest && isSuggestion;
  },

  accept: function (removeCaret) {
    var val = this.getDOMNode().value || "",
        end = val.length;

    this._last = null;
    removeCaret && caretPos(this.getDOMNode(), end, end);
  },

  _change: function (e) {
    var val = e.target.value;
    this._last = val;
    this.props.onChange(e, val);
  },

  focus: function () {
    this.getDOMNode().focus();
  }
});