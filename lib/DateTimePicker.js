"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    invariant = require("react/lib/invariant"),
    activeElement = require("react/lib/getActiveElement"),
    cx = require("classnames"),
    compat = require("./util/compat"),
    _ = require("./util/_") //pick, omit, has

,
    dates = require("./util/dates"),
    views = require("./util/constants").calendarViews,
    popups = require("./util/constants").datePopups,
    Popup = require("./Popup"),
    Calendar = require("./Calendar").BaseCalendar,
    Time = require("./TimeList"),
    DateInput = require("./DateInput"),
    Btn = require("./WidgetButton"),
    CustomPropTypes = require("./util/propTypes"),
    createUncontrolledWidget = require("uncontrollable");

var viewEnum = Object.keys(views).map(function (k) {
  return views[k];
});

var propTypes = babelHelpers._extends({}, compat.type(Calendar).propTypes, {

  //-- controlled props -----------
  value: React.PropTypes.instanceOf(Date),
  onChange: React.PropTypes.func,
  open: React.PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
  onToggle: React.PropTypes.func,
  //------------------------------------

  onSelect: React.PropTypes.func,

  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),

  culture: React.PropTypes.string,

  format: CustomPropTypes.localeFormat,
  editFormat: CustomPropTypes.localeFormat,

  calendar: React.PropTypes.bool,
  time: React.PropTypes.bool,

  timeComponent: CustomPropTypes.elementType,

  //popup
  dropUp: React.PropTypes.bool,
  duration: React.PropTypes.number,

  placeholder: React.PropTypes.string,
  name: React.PropTypes.string,

  initialView: React.PropTypes.oneOf(viewEnum),
  finalView: React.PropTypes.oneOf(viewEnum),

  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),

  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]),

  parse: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.string), React.PropTypes.string, React.PropTypes.func]),

  messages: React.PropTypes.shape({
    calendarButton: React.PropTypes.string,
    timeButton: React.PropTypes.string })
});

var DateTimePicker = React.createClass({

  displayName: "DateTimePicker",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/TimeoutMixin"), require("./mixins/PureRenderMixin"), require("./mixins/PopupScrollToMixin"), require("./mixins/RtlParentContextMixin")],

  propTypes: propTypes,

  getInitialState: function () {
    return {
      focused: false };
  },

  getDefaultProps: function () {

    return {
      value: null,

      min: new Date(1900, 0, 1),
      max: new Date(2099, 11, 31),
      calendar: true,
      time: true,
      open: false,

      //calendar override
      footer: true,

      messages: {
        calendarButton: "Select Date",
        timeButton: "Select Time" }
    };
  },

  render: function () {
    var _this = this;

    var _$omit = _.omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var props = babelHelpers.objectWithoutProperties(_$omit, ["className"]);
    var calProps = _.pick(this.props, Object.keys(compat.type(Calendar).propTypes));

    var timeListID = this._id("_time_listbox");
    var timeOptID = this._id("_time_option");
    var dateListID = this._id("_cal");
    var dropUp = this.props.dropUp;
    var renderPopup = _.isFirstFocusedRender(this) || this.props.open;
    var value = dateOrNull(this.props.value);
    var owns;

    if (dateListID && this.props.calendar) owns = dateListID;
    if (timeListID && this.props.time) owns += " " + timeListID;

    return React.createElement(
      "div",
      babelHelpers._extends({}, props, {
        ref: "element",
        tabIndex: "-1",
        onKeyDown: this._maybeHandle(this._keyDown),
        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
        onBlur: this._focus.bind(null, false),
        className: cx(className, "rw-datetimepicker", "rw-widget", (function () {
          var _cx = {};
          _cx["rw-state-focus"] = _this.state.focused;
          _cx["rw-state-disabled"] = _this.isDisabled();
          _cx["rw-state-readonly"] = _this.isReadOnly();
          _cx["rw-has-both"] = _this.props.calendar && _this.props.time;
          _cx["rw-has-neither"] = !_this.props.calendar && !_this.props.time;
          _cx["rw-rtl"] = _this.isRtl();
          _cx["rw-open" + (dropUp ? "-up" : "")] = _this.props.open;
          return _cx;
        })()) }),
      React.createElement(DateInput, { ref: "valueInput",
        "aria-labelledby": this.props["aria-labelledby"],
        "aria-activedescendant": this.props.open ? this.props.open === popups.CALENDAR ? this._id("_cal_view_selected_item") : timeOptID : undefined,
        "aria-expanded": !!this.props.open,
        "aria-busy": !!this.props.busy,
        "aria-owns": owns,
        "aria-haspopup": true,
        placeholder: this.props.placeholder,
        name: this.props.name,
        disabled: this.isDisabled(),
        readOnly: this.isReadOnly(),
        role: this.props.time ? "combobox" : null,
        value: value,

        format: getFormat(this.props),
        editFormat: this.props.editFormat,

        editing: this.state.focused,
        culture: this.props.culture,
        parse: this._parse,
        onChange: this._change }),
      (this.props.calendar || this.props.time) && React.createElement(
        "span",
        { className: "rw-select" },
        this.props.calendar && React.createElement(
          Btn,
          { tabIndex: "-1",
            className: "rw-btn-calendar",
            disabled: this.isDisabled() || this.isReadOnly(),
            "aria-disabled": this.isDisabled() || this.isReadOnly(),
            onClick: this._maybeHandle(this._click.bind(null, popups.CALENDAR)) },
          React.createElement(
            "i",
            { className: "rw-i rw-i-calendar" },
            React.createElement(
              "span",
              { className: "rw-sr" },
              this.props.messages.calendarButton
            )
          )
        ),
        this.props.time && React.createElement(
          Btn,
          { tabIndex: "-1",
            className: "rw-btn-time",
            disabled: this.isDisabled() || this.isReadOnly(),
            "aria-disabled": this.isDisabled() || this.isReadOnly(),
            onClick: this._maybeHandle(this._click.bind(null, popups.TIME)) },
          React.createElement(
            "i",
            { className: "rw-i rw-i-clock-o" },
            React.createElement(
              "span",
              { className: "rw-sr" },
              this.props.messages.timeButton
            )
          )
        )
      ),
      React.createElement(
        Popup,
        {
          dropUp: dropUp,
          open: this.props.open === popups.TIME,
          onRequestClose: this.close,
          duration: this.props.duration,
          onOpening: function () {
            return _this.refs.timePopup.forceUpdate();
          } },
        React.createElement(
          "div",
          null,
          renderPopup && React.createElement(Time, { ref: "timePopup",
            id: timeListID,
            optID: timeOptID,
            "aria-hidden": !this.props.open,
            value: value,
            step: this.props.step,
            min: this.props.min,
            max: this.props.max,
            culture: this.props.culture,
            onMove: this._scrollTo,
            preserveDate: !!this.props.calendar,
            itemComponent: this.props.timeComponent,
            onSelect: this._maybeHandle(this._selectTime) })
        )
      ),
      React.createElement(
        Popup,
        {
          className: "rw-calendar-popup",
          dropUp: dropUp,
          open: this.props.open === popups.CALENDAR,
          duration: this.props.duration,
          onRequestClose: this.close },
        renderPopup && React.createElement(Calendar, babelHelpers._extends({}, calProps, {
          ref: "calPopup",
          tabIndex: "-1",
          id: dateListID,
          value: value,
          "aria-hidden": !this.props.open,
          onChange: this._maybeHandle(this._selectDate) }))
      )
    );
  },

  _change: function (date, str, constrain) {
    var change = this.props.onChange;

    if (constrain) date = this.inRangeValue(date);

    if (change) {
      if (date == null || this.props.value == null) {
        if (date != this.props.value) change(date, str);
      } else if (!dates.eq(date, this.props.value)) change(date, str);
    }
  },

  _keyDown: function (e) {

    if (e.key === "Tab") return;

    if (e.key === "Escape" && this.props.open) this.close();else if (e.altKey) {
      e.preventDefault();

      if (e.key === "ArrowDown") this.open(this.props.open === popups.CALENDAR ? popups.TIME : popups.CALENDAR);else if (e.key === "ArrowUp") this.close();
    } else if (this.props.open) {
      if (this.props.open === popups.CALENDAR) this.refs.calPopup._keyDown(e);
      if (this.props.open === popups.TIME) this.refs.timePopup._keyDown(e);
    }

    this.notify("onKeyDown", [e]);
  },

  //timeout prevents transitions from breaking focus
  _focus: function (focused, e) {
    var _this = this;

    this.setTimeout("focus", function () {
      var calendarOpen = _this.props.open === popups.CALENDAR;

      // #75: need to aggressively reclaim focus from the calendar otherwise
      // disabled header/footer buttons will drop focus completely from the widget
      if (focused) calendarOpen && _this.refs.valueInput.focus();else _this.close();

      if (focused !== _this.state.focused) {
        _this.notify(focused ? "onFocus" : "onBlur", e);
        _this.setState({ focused: focused });
      }
    });
  },

  focus: function () {
    if (activeElement() !== compat.findDOMNode(this.refs.valueInput)) this.refs.valueInput.focus();
  },

  _selectDate: function (date) {
    var format = getFormat(this.props),
        dateTime = dates.merge(date, this.props.value),
        dateStr = formatDate(date, format, this.props.culture);

    this.close();
    this.notify("onSelect", [dateTime, dateStr]);
    this._change(dateTime, dateStr, true);
    this.focus();
  },

  _selectTime: function (datum) {
    var format = getFormat(this.props),
        dateTime = dates.merge(this.props.value, datum.date),
        dateStr = formatDate(datum.date, format, this.props.culture);

    this.close();
    this.notify("onSelect", [dateTime, dateStr]);
    this._change(dateTime, dateStr, true);
    this.focus();
  },

  _click: function (view, e) {
    this.focus();
    this.toggle(view, e);
  },

  _parse: function (string) {
    var format = getFormat(this.props, true),
        editFormat = this.props.editFormat,
        parse = this.props.parse,
        formats = [];

    if (typeof parse === "function") return parse(string, this.props.culture);

    if (typeof format === "string") formats.push(format);

    if (typeof editFormat === "string") formats.push(editFormat);

    if (parse) formats = formats.concat(this.props.parse);

    invariant(formats.length, "React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. " + "the DateTimePicker is unable to parse `%s` into a dateTime, " + "please provide either a parse function or Globalize.js compatible string for `format`", string);

    return formatsParser(formats, this.props.culture, string);
  },

  toggle: function (view, e) {

    this.props.open ? this.state.view !== view ? this.open(view) : this.close(view) : this.open(view);
  },

  open: function (view) {
    if (this.props.open !== view && this.props[view] === true) this.notify("onToggle", view);
  },

  close: function () {
    if (this.props.open) this.notify("onToggle", false);
  },

  inRangeValue: function (value) {
    if (value == null) return value;

    return dates.max(dates.min(value, this.props.max), this.props.min);
  } });

module.exports = createUncontrolledWidget(DateTimePicker, { open: "onToggle", value: "onChange" });

module.exports.BaseDateTimePicker = DateTimePicker;

function getFormat(props) {
  var cal = props[popups.CALENDAR] != null ? props.calendar : true,
      time = props[popups.TIME] != null ? props.time : true;

  return props.format ? props.format : cal && time || !cal && !time ? "f" : cal ? "d" : "t";
}

function formatDate(date, format, culture) {
  var val = "";

  if (date instanceof Date && !isNaN(date.getTime())) val = dates.format(date, format, culture);

  return val;
}

function formatsParser(formats, culture, str) {
  var date;

  for (var i = 0; i < formats.length; i++) {
    date = dates.parse(str, formats[i], culture);
    if (date) return date;
  }
  return null;
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}