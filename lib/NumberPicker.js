"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    cx = require("classnames"),
    _ = require("./util/_") //omit
,
    compat = require("./util/compat"),
    CustomPropTypes = require("./util/propTypes"),
    createUncontrolledWidget = require("uncontrollable"),
    directions = require("./util/constants").directions,
    Input = require("./NumberInput");

var Btn = require("./WidgetButton"),
    propTypes = {

  // -- controlled props -----------
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
  //------------------------------------

  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,

  culture: React.PropTypes.string,

  format: CustomPropTypes.localeFormat,

  name: React.PropTypes.string,

  parse: React.PropTypes.func,

  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),

  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]),

  messages: React.PropTypes.shape({
    increment: React.PropTypes.string,
    decrement: React.PropTypes.string
  })
};

var NumberPicker = React.createClass({

  displayName: "NumberPicker",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/TimeoutMixin"), require("./mixins/PureRenderMixin"), require("./mixins/RtlParentContextMixin")],

  propTypes: propTypes,

  getDefaultProps: function () {
    return {
      value: null,
      open: false,

      format: "d",

      min: -Infinity,
      max: Infinity,
      step: 1,

      messages: {
        increment: "increment value",
        decrement: "decrement value"
      }
    };
  },

  getInitialState: function () {
    return {
      focused: false,
      active: false };
  },

  render: function () {
    var _$omit = _.omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var onKeyDown = _$omit.onKeyDown;
    var onKeyPress = _$omit.onKeyPress;
    var onKeyUp = _$omit.onKeyUp;
    var props = babelHelpers.objectWithoutProperties(_$omit, ["className", "onKeyDown", "onKeyPress", "onKeyUp"]);
    var val = this.inRangeValue(this.props.value);

    return React.createElement(
      "div",
      babelHelpers._extends({}, props, {
        ref: "element",
        onKeyDown: this._maybeHandle(this._keyDown),
        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
        onBlur: this._focus.bind(null, false),
        tabIndex: "-1",
        className: cx(className, "rw-numberpicker", "rw-widget", {
          "rw-state-focus": this.state.focused,
          "rw-state-disabled": this.props.disabled,
          "rw-state-readonly": this.props.readOnly,
          "rw-rtl": this.isRtl()
        }) }),
      React.createElement(
        "span",
        { className: "rw-select" },
        React.createElement(
          Btn,
          {
            tabIndex: "-1",
            className: cx({ "rw-state-active": this.state.active === directions.UP }),
            onMouseDown: this._maybeHandle(this._mouseDown.bind(null, directions.UP)),
            onMouseUp: this._maybeHandle(this._mouseUp.bind(null, directions.UP)),
            onClick: this._maybeHandle(this._focus.bind(null, true)),
            disabled: val === this.props.max || this.props.disabled,
            "aria-disabled": val === this.props.max || this.props.disabled },
          React.createElement(
            "i",
            { className: "rw-i rw-i-caret-up" },
            React.createElement(
              "span",
              { className: "rw-sr" },
              this.props.messages.increment
            )
          )
        ),
        React.createElement(
          Btn,
          {
            tabIndex: "-1",
            className: cx({ "rw-state-active": this.state.active === directions.DOWN }),
            onMouseDown: this._maybeHandle(this._mouseDown.bind(null, directions.DOWN)),
            onMouseUp: this._maybeHandle(this._mouseUp.bind(null, directions.DOWN)),
            onClick: this._maybeHandle(this._focus.bind(null, true)),
            disabled: val === this.props.min || this.props.disabled,
            "aria-disabled": val === this.props.min || this.props.disabled },
          React.createElement(
            "i",
            { className: "rw-i rw-i-caret-down" },
            React.createElement(
              "span",
              { className: "rw-sr" },
              this.props.messages.decrement
            )
          )
        )
      ),
      React.createElement(Input, {
        ref: "input",
        value: val,
        editing: this.state.focused,
        format: this.props.format,
        parse: this.props.parse,
        name: this.props.name,
        role: "spinbutton",
        min: this.props.min,
        "aria-valuenow": val,
        "aria-valuemin": isFinite(this.props.min) ? this.props.min : null,
        "aria-valuemax": isFinite(this.props.max) ? this.props.max : null,
        "aria-disabled": this.props.disabled,
        "aria-readonly": this.props.readonly,
        disabled: this.props.disabled,
        readOnly: this.props.readOnly,
        onChange: this.change,
        onKeyDown: onKeyDown,
        onKeyPress: onKeyPress,
        onKeyUp: onKeyUp })
    );
  },

  //allow for styling, focus stealing keeping me from the normal what have you
  _mouseDown: function (dir) {
    var val = dir === directions.UP ? (this.props.value || 0) + this.props.step : (this.props.value || 0) - this.props.step;

    val = this.inRangeValue(val);

    this.setState({ active: dir });
    this.change(val);

    if (!(dir === directions.UP && val === this.props.max || dir === directions.DOWN && val === this.props.min)) {
      if (!this.interval) this.interval = setInterval(this._mouseDown, 500, dir);
    } else this._mouseUp();
  },

  _mouseUp: function (direction, e) {
    this.setState({ active: false });
    clearInterval(this.interval);
    this.interval = null;
  },

  _focus: function (focused, e) {
    var _this = this;

    this.setTimeout("focus", function () {
      var el = compat.findDOMNode(_this.refs.input);

      focused && el.focus();

      if (focused !== _this.state.focused) {
        _this.notify(focused ? "onFocus" : "onBlur", e);
        _this.setState({ focused: focused });
      }
    }, 0);
  },

  _keyDown: function (e) {
    var key = e.key;

    if (key === "End" && isFinite(this.props.max)) this.change(this.props.max);else if (key === "Home" && isFinite(this.props.min)) this.change(this.props.min);else if (key === "ArrowDown") {
      e.preventDefault();
      this.decrement();
    } else if (key === "ArrowUp") {
      e.preventDefault();
      this.increment();
    }
  },

  increment: function () {
    this.change(this.inRangeValue((this.props.value || 0) + this.props.step));
  },

  decrement: function () {
    this.change(this.inRangeValue((this.props.value || 0) - this.props.step));
  },

  change: function (val) {
    val = this.inRangeValue(val === "" ? null : val);

    if (this.props.value !== val) this.notify("onChange", val);
  },

  inRangeValue: function (value) {
    var max = this.props.max == null ? Infinity : this.props.max,
        min = this.props.min == null ? -Infinity : this.props.min;

    if (!isFinite(min) && value == null) return value;

    return Math.max(Math.min(value, max), min);
  }

});

module.exports = createUncontrolledWidget(NumberPicker, { value: "onChange" });

module.exports.BaseNumberPicker = NumberPicker;