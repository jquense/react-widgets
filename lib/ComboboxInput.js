"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    caretPos = require("./util/caret"),
    compat = require("./util/compat");

module.exports = React.createClass({

  displayName: "ComboboxInput",

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  componentDidUpdate: function () {
    var input = compat.findDOMNode(this),
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
    return React.createElement("input", babelHelpers._extends({}, this.props, {
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
    var val = compat.findDOMNode(this).value || "",
        end = val.length;

    this._last = null;
    removeCaret && caretPos(compat.findDOMNode(this), end, end);
  },

  _change: function (e) {
    var val = e.target.value;
    this._last = val;
    this.props.onChange(e, val);
  },

  focus: function () {
    compat.findDOMNode(this).focus();
  }
});