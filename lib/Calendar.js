"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    Header = require("./Header"),
    Month = require("./Month"),
    Year = require("./Year"),
    Decade = require("./Decade"),
    Century = require("./Century"),
    cx = require("classnames"),
    CustomPropTypes = require("./util/propTypes"),
    controlledInput = require("./util/controlledInput"),
    SlideTransition = require("./SlideTransition"),
    dates = require("./util/dates"),
    constants = require("./util/constants"),
    _ = require("./util/_"); //values, omit, object

var dir = constants.directions;

var views = constants.calendarViews,
    VIEW_OPTIONS = Object.keys(views).map(function (k) {
  return views[k];
}),
    ALT_VIEW = _.transform(constants.calendarViewHierarchy, function (o, val, key) {
  o[val] = key;
}, {}),
    NEXT_VIEW = constants.calendarViewHierarchy,
    VIEW_UNIT = constants.calendarViewUnits,
    VIEW = (function () {
  var _VIEW = {};
  _VIEW[views.MONTH] = Month;
  _VIEW[views.YEAR] = Year;
  _VIEW[views.DECADE] = Decade;
  _VIEW[views.CENTURY] = Century;
  return _VIEW;
})();

var MULTIPLIER = (function () {
  var _MULTIPLIER = {};
  _MULTIPLIER[views.YEAR] = 1;
  _MULTIPLIER[views.DECADE] = 10;
  _MULTIPLIER[views.CENTURY] = 100;
  return _MULTIPLIER;
})();

var VIEW_FORMATS = (function () {
  var _VIEW_FORMATS = {};
  _VIEW_FORMATS[views.MONTH] = "dateFormat";
  _VIEW_FORMATS[views.YEAR] = "monthFormat";
  _VIEW_FORMATS[views.DECADE] = "yearFormat";
  _VIEW_FORMATS[views.CENTURY] = "yearFormat";
  return _VIEW_FORMATS;
})();

function msgs(msgs) {
  return _extends({
    moveBack: "navigate back",
    moveForward: "navigate forward",
    yearFormat: dates.formats.YEAR,
    dateFormat: dates.formats.DAY_OF_MONTH,
    monthFormat: dates.formats.MONTH_NAME_ABRV,
    headerFormat: dates.formats.MONTH_YEAR }, msgs);
}

var propTypes = {

  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.instanceOf(Date),

  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),

  initialView: React.PropTypes.oneOf(VIEW_OPTIONS),
  finalView: React.PropTypes.oneOf(VIEW_OPTIONS),

  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),

  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]),

  culture: React.PropTypes.string,

  messages: React.PropTypes.shape({
    moveBack: React.PropTypes.string,
    moveForward: React.PropTypes.string,
    yearFormat: CustomPropTypes.dateFormat,
    dateFormat: CustomPropTypes.dateFormat,
    monthFormat: CustomPropTypes.dateFormat,
    headerFormat: CustomPropTypes.dateFormat })
};

var Calendar = React.createClass({

  displayName: "Calendar",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/TimeoutMixin"), require("./mixins/PureRenderMixin"), require("./mixins/RtlParentContextMixin")],

  propTypes: propTypes,

  getInitialState: function () {
    var value = this.inRangeValue(this.props.value);

    return {
      selectedIndex: 0,
      view: this.props.initialView || "month",
      currentDate: value ? new Date(value) : new Date()
    };
  },

  getDefaultProps: function () {
    return {

      value: null,
      min: new Date(1900, 0, 1),
      max: new Date(2099, 11, 31),

      initialView: "month",
      finalView: "century",

      tabIndex: "0",

      messages: msgs({})
    };
  },

  componentWillReceiveProps: function (nextProps) {
    var bottom = VIEW_OPTIONS.indexOf(nextProps.initialView),
        top = VIEW_OPTIONS.indexOf(nextProps.finalView),
        current = VIEW_OPTIONS.indexOf(this.state.view),
        view = this.state.view,
        val = this.inRangeValue(nextProps.value);

    if (current < bottom) this.setState({ view: view = nextProps.initialView });else if (current > top) this.setState({ view: view = nextProps.finalView });

    //if the value changes reset views to the new one
    if (!dates.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) this.setState({
      currentDate: val ? new Date(val) : new Date()
    });
  },

  render: function () {
    var _this = this;

    var _$omit = _.omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var props = _objectWithoutProperties(_$omit, ["className"]);
    var View = VIEW[this.state.view];
    var format = VIEW_FORMATS[this.state.view];
    var unit = this.state.view;
    var messages = msgs(this.props.messages);

    var disabled = this.props.disabled || this.props.readOnly;
    var date = this.state.currentDate;
    var todaysDate = new Date();
    var labelId = this._id("_view_label");
    var key = this.state.view + "_" + dates[this.state.view](date);
    var id = this._id("_view");

    return React.createElement(
      "div",
      _extends({}, props, {
        onKeyDown: this._keyDown,
        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
        onBlur: this._focus.bind(null, false),
        className: cx(className, "rw-calendar", "rw-widget", {
          "rw-state-focus": this.state.focused,
          "rw-state-disabled": this.props.disabled,
          "rw-state-readonly": this.props.readOnly,
          "rw-rtl": this.isRtl()
        }) }),
      React.createElement(Header, {
        label: this._label(),
        labelId: labelId,
        messages: messages,
        upDisabled: disabled || this.state.view === this.props.finalView,
        prevDisabled: disabled || !dates.inRange(this.nextDate(dir.LEFT), this.props.min, this.props.max, unit),
        nextDisabled: disabled || !dates.inRange(this.nextDate(dir.RIGHT), this.props.min, this.props.max, unit),
        onViewChange: this._maybeHandle(this.navigate.bind(null, dir.UP, null)),
        onMoveLeft: this._maybeHandle(this.navigate.bind(null, dir.LEFT, null)),
        onMoveRight: this._maybeHandle(this.navigate.bind(null, dir.RIGHT, null)) }),
      React.createElement(
        SlideTransition,
        {
          ref: "animation",
          duration: this.props.duration,
          direction: this.state.slideDirection,
          onAnimate: function () {
            return _this._focus(true);
          } },
        React.createElement(View, { ref: "currentView",
          key: key,
          id: id,
          culture: this.props.culture,
          "aria-labelledby": labelId,
          selectedDate: this.props.value,
          today: todaysDate,
          value: this.state.currentDate,
          onChange: this._maybeHandle(this.change),
          onKeyDown: this._maybeHandle(this._keyDown),
          onMoveLeft: this._maybeHandle(this.navigate.bind(null, dir.LEFT)),
          onMoveRight: this._maybeHandle(this.navigate.bind(null, dir.RIGHT)),
          disabled: this.props.disabled,
          readOnly: this.props.readOnly,
          min: this.props.min,
          max: this.props.max,
          format: messages[format] })
      )
    );
  },

  navigate: function (direction, date) {
    var view = this.state.view,
        slideDir = direction === dir.LEFT || direction === dir.UP ? "right" : "left";

    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.state.currentDate;

    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;

    if (direction === dir.UP) view = NEXT_VIEW[view] || view;

    if (this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      this._focus(true, "nav");

      this.setState({
        currentDate: date,
        slideDirection: slideDir,
        view: view
      });
    }
  },

  _focus: function (focused, e) {
    var _this = this;

    if (+this.props.tabIndex === -1) return;

    this.setTimeout("focus", function () {

      if (focused) _this.getDOMNode().focus();

      if (focused !== _this.state.focused) {
        _this.notify(focused ? "onFocus" : "onBlur", e);
        _this.setState({ focused: focused });
      }
    });
  },

  change: function (date) {
    var _this = this;

    setTimeout(function () {
      return _this._focus(true);
    });

    if (this.props.onChange && this.state.view === this.props.initialView) return this.notify("onChange", date);

    this.navigate(dir.DOWN, date);
  },

  nextDate: function (direction) {
    var method = direction === dir.LEFT ? "subtract" : "add",
        view = this.state.view,
        unit = view === views.MONTH ? view : views.YEAR,
        multi = MULTIPLIER[view] || 1;

    return dates[method](this.state.currentDate, 1 * multi, unit);
  },

  _keyDown: function (e) {
    var ctrl = e.ctrlKey,
        key = e.key;

    if (ctrl) {
      if (key === "ArrowDown") {
        e.preventDefault();
        this.navigate(dir.DOWN);
      }
      if (key === "ArrowUp") {
        e.preventDefault();
        this.navigate(dir.UP);
      }
      if (key === "ArrowLeft") {
        e.preventDefault();
        this.navigate(dir.LEFT);
      }
      if (key === "ArrowRight") {
        e.preventDefault();
        this.navigate(dir.RIGHT);
      }
    } else {
      this.refs.currentView._keyDown && this.refs.currentView._keyDown(e);
    }

    this.notify("onKeyDown", [e]);
  },

  _label: function () {
    var _props = this.props;
    var culture = _props.culture;
    var messages = _props.messages;
    var view = this.state.view;
    var dt = this.state.currentDate;

    messages = msgs(messages);

    if (view === "month") return dates.format(dt, messages.headerFormat, culture);else if (view === "year") return dates.format(dt, messages.yearFormat, culture);else if (view === "decade") return dates.format(dates.firstOfDecade(dt), messages.yearFormat, culture) + " - " + dates.format(dates.lastOfDecade(dt), messages.yearFormat, culture);else if (view === "century") return dates.format(dates.firstOfCentury(dt), messages.yearFormat, culture) + " - " + dates.format(dates.lastOfCentury(dt), messages.yearFormat, culture);
  },

  inRangeValue: function (_value) {
    var value = dateOrNull(_value);

    if (value === null) return value;

    return dates.max(dates.min(value, this.props.max), this.props.min);
  },

  isValidView: function (next) {
    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
        top = VIEW_OPTIONS.indexOf(this.props.finalView),
        current = VIEW_OPTIONS.indexOf(next);

    return current >= bottom && current <= top;
  }
});

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

module.exports = controlledInput.createControlledClass(Calendar, { value: "onChange" });

module.exports.BaseCalendar = Calendar;