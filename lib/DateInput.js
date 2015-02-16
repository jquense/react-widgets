"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    cx = require("./util/cx"),
    dates = require("./util/dates");

module.exports = React.createClass({

  displayName: "DatePickerInput",


  propTypes: {
    format: React.PropTypes.string,
    parse: React.PropTypes.func.isRequired,

    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func.isRequired,
    culture: React.PropTypes.string },

  getDefaultProps: function () {
    return {
      textValue: ""
    };
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      textValue: formatDate(nextProps.value, nextProps.editing && nextProps.editFormat ? nextProps.editFormat : nextProps.format, nextProps.culture)
    });
  },

  getInitialState: function () {
    var text = formatDate(this.props.value, this.props.editing && this.props.editFormat ? this.props.editFormat : this.props.format, this.props.culture);

    this.lastValue = text;

    return {
      textValue: text
    };
  },

  render: function () {
    var value = this.state.textValue;

    return React.createElement("input", _extends({}, this.props, {
      type: "text",
      className: cx({ "rw-input": true }),
      value: value,
      "aria-disabled": this.props.disabled,
      "aria-readonly": this.props.readOnly,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      onChange: this._change,
      onBlur: chain(this.props.blur, this._blur, this) }));
  },

  _change: function (e) {
    this.setState({ textValue: e.target.value });
  },

  _blur: function (e) {
    var val = e.target.value;

    this.props.onChange(this.props.parse(val), val);
  },

  focus: function () {
    this.getDOMNode().focus();
  }

});

function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format, culture) {
  var val = "";

  if (date instanceof Date && isValid(date)) val = dates.format(date, format, culture);

  return val;
}

function chain(a, b, thisArg) {
  return function () {
    a && a.apply(thisArg, arguments);
    b && b.apply(thisArg, arguments);
  };
}