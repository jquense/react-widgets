"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    CustomPropTypes = require("./util/propTypes"),
    config = require("./util/configuration");

module.exports = React.createClass({

  displayName: "NumberPickerInput",

  propTypes: {
    value: React.PropTypes.number,

    format: CustomPropTypes.localeFormat.isRequired,
    parse: React.PropTypes.func.isRequired,
    culture: React.PropTypes.string,

    min: React.PropTypes.number,

    onChange: React.PropTypes.func.isRequired,
    onKeyDown: React.PropTypes.func },

  getDefaultProps: function () {
    return {
      value: null,
      format: "d",
      editing: false,
      parse: function (number, culture) {
        return config.globalize.parseFloat(number, 10, culture);
      }
    };
  },

  getDefaultState: function (props) {
    var value = props.editing ? props.value : formatNumber(props.value, props.format, props.culture);

    if (value == null || isNaN(props.value)) value = "";

    return {
      stringValue: "" + value
    };
  },

  getInitialState: function () {
    return this.getDefaultState(this.props);
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState(this.getDefaultState(nextProps));
  },

  render: function () {
    var value = this.state.stringValue;

    return React.createElement("input", babelHelpers._extends({}, this.props, {
      type: "text",
      className: "rw-input",
      onChange: this._change,
      onBlur: this._finish,
      "aria-disabled": this.props.disabled,
      "aria-readonly": this.props.readOnly,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      value: value }));
  },

  _change: function (e) {
    var val = e.target.value,
        number = this.props.parse(e.target.value, this.props.culture),
        isNull = val !== 0 && !val,
        hasMin = this.props.min && isFinite(this.props.min);

    //a null value is only possible when there is no min
    if (!hasMin && isNull) return this.props.onChange(null);

    if (this.isValid(number) && number !== this.props.value && !this.isAtDecimal(number, val)) return this.props.onChange(number);

    //console.log(val !== 0 && !val)
    this.current(e.target.value);
  },

  _finish: function (e) {
    var str = this.state.stringValue,
        number = this.props.parse(str, this.props.culture);

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if (!isNaN(number) && (number < this.props.min || this.isAtDecimal(number, str))) {
      this.props.onChange(number);
    }
  },

  isAtDecimal: function (num, str) {
    var next;

    if (str.length <= 1) return false;

    next = this.props.parse(str.substr(0, str.length - 1), this.props.culture);

    return typeof next === "number" && !isNaN(next) && next === num;
  },

  isValid: function (num) {
    if (typeof num !== "number" || isNaN(num)) return false;
    return num >= this.props.min;
  },

  //this intermediate state is for when one runs into the decimal or are typing the number
  current: function (val) {
    this.setState({ stringValue: val });
  }

});

function parseLocaleFloat(number, parser, culture) {
  if (typeof format === "function") return format(number, culture);

  return config.globalize.parseFloat(number, 10, culture);
}

function formatNumber(number, format, culture) {
  if (typeof format === "function") return format(number, culture);

  return config.globalize.format(number, format, culture);
}