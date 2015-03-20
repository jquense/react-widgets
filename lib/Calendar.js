"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    cx = require("classnames"),
    compat = require("./util/compat"),
    Header = require("./Header"),
    Footer = require("./Footer"),
    Month = require("./Month"),
    Year = require("./Year"),
    Decade = require("./Decade"),
    Century = require("./Century"),
    CustomPropTypes = require("./util/propTypes"),
    createUncontrolledWidget = require("uncontrollable"),
    SlideTransition = require("./SlideTransition"),
    dates = require("./util/dates"),
    constants = require("./util/constants"),
    _ = require("./util/_"); //values, omit

var dir = constants.directions,
    values = function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
},
    invert = function (obj) {
  return _.transform(obj, function (o, val, key) {
    o[val] = key;
  }, {});
};

var views = constants.calendarViews,
    VIEW_OPTIONS = values(views),
    ALT_VIEW = invert(constants.calendarViewHierarchy),
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
  _VIEW_FORMATS[views.CENTURY] = "decadeFormat";
  return _VIEW_FORMATS;
})();

var propTypes = {

  onChange: React.PropTypes.func,
  value: React.PropTypes.instanceOf(Date),

  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),

  initialView: React.PropTypes.oneOf(VIEW_OPTIONS),

  finalView: function (props, propname, componentName) {
    var err = React.PropTypes.oneOf(VIEW_OPTIONS)(props, propname, componentName);

    if (err) return err;
    if (VIEW_OPTIONS.indexOf(props[propname]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(("The `" + propname + "` prop: `" + props[propname] + "` cannot be 'lower' than the `initialView` \n                        prop. This creates a range that cannot be rendered.").replace(/\n\t/g, ""));
  },

  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),

  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]),

  culture: React.PropTypes.string,

  footer: React.PropTypes.bool,

  headerFormat: CustomPropTypes.localeFormat,
  footerFormat: CustomPropTypes.localeFormat,

  dayFormat: CustomPropTypes.localeFormat,
  dateFormat: CustomPropTypes.localeFormat,
  monthFormat: CustomPropTypes.localeFormat,
  yearFormat: CustomPropTypes.localeFormat,
  decadeFormat: CustomPropTypes.localeFormat,
  centuryFormat: CustomPropTypes.localeFormat,

  messages: React.PropTypes.shape({
    moveBack: React.PropTypes.string,
    moveForward: React.PropTypes.string })
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
      currentDate: value ? new Date(value) : this.inRangeValue(new Date())
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
      footer: false,

      headerFormat: dates.formats.MONTH_YEAR,
      footerFormat: dates.formats.FOOTER,

      dayFormat: dates.shortDay,
      dateFormat: dates.formats.DAY_OF_MONTH,
      monthFormat: dates.formats.MONTH_NAME_ABRV,
      yearFormat: dates.formats.YEAR,

      decadeFormat: function (dt, culture) {
        return "" + dates.format(dt, dates.formats.YEAR, culture) + " - " + dates.format(dates.endOf(dt, "decade"), dates.formats.YEAR, culture);
      },

      centuryFormat: function (dt, culture) {
        return "" + dates.format(dt, dates.formats.YEAR, culture) + " - " + dates.format(dates.endOf(dt, "century"), dates.formats.YEAR, culture);
      },

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
    var props = babelHelpers.objectWithoutProperties(_$omit, ["className"]);
    var View = VIEW[this.state.view];
    var viewProps = _.pick(this.props, Object.keys(compat.type(View).propTypes));
    var unit = this.state.view;
    var messages = msgs(this.props.messages);

    var disabled = this.props.disabled || this.props.readOnly;
    var date = this.state.currentDate;
    var todaysDate = new Date();
    var todayNotInRange = !dates.inRange(todaysDate, this.props.min, this.props.max, unit);
    var labelId = this._id("_view_label");
    var key = this.state.view + "_" + dates[this.state.view](date);
    var id = this._id("_view");

    return React.createElement(
      "div",
      babelHelpers._extends({}, props, {
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
          duration: props.duration,
          direction: this.state.slideDirection,
          onAnimate: function () {
            return _this._focus(true);
          } },
        React.createElement(View, babelHelpers._extends({}, viewProps, {
          tabIndex: "-1",
          ref: "currentView",
          key: key,
          id: id,
          "aria-labelledby": labelId,
          selectedDate: this.props.value,
          today: todaysDate,
          value: this.state.currentDate,
          onChange: this._maybeHandle(this.change),
          onKeyDown: this._maybeHandle(this._keyDown),
          onMoveLeft: this._maybeHandle(this.navigate.bind(null, dir.LEFT)),
          onMoveRight: this._maybeHandle(this.navigate.bind(null, dir.RIGHT)) }))
      ),
      this.props.footer && React.createElement(Footer, {
        value: todaysDate,
        format: this.props.footerFormat,
        culture: this.props.culture,
        disabled: this.props.disabled || todayNotInRange,
        readOnly: this.props.readOnly,
        onClick: this._maybeHandle(this.select)
      })
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

      if (focused) compat.findDOMNode(_this).focus();

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

  select: function (date) {
    var view = this.props.initialView,
        slideDir = view !== this.state.view || dates.gt(date, this.state.currentDate) ? "left" // move down to a the view
    : "right";

    this.notify("onChange", date);

    if (this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      this._focus(true, "nav");

      this.setState({
        currentDate: date,
        slideDirection: slideDir,
        view: view
      });
    }
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
    var props = babelHelpers.objectWithoutProperties(_props, ["culture"]);
    var view = this.state.view;
    var dt = this.state.currentDate;

    if (view === "month") return dates.format(dt, props.headerFormat, culture);else if (view === "year") return dates.format(dt, props.yearFormat, culture);else if (view === "decade") return dates.format(dates.startOf(dt, "decade"), props.decadeFormat, culture);else if (view === "century") return dates.format(dates.startOf(dt, "century"), props.centuryFormat, culture);
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

function msgs(msgs) {
  return babelHelpers._extends({
    moveBack: "navigate back",
    moveForward: "navigate forward" }, msgs);
}

function formats(obj) {
  return babelHelpers._extends({
    headerFormat: dates.formats.MONTH_YEAR,
    dateFormat: dates.formats.DAY_OF_MONTH,
    monthFormat: dates.formats.MONTH_NAME_ABRV,
    yearFormat: dates.formats.YEAR,

    decadeFormat: function (dt, culture) {
      return "" + dates.format(dt, dates.formats.YEAR, culture) + " - " + dates.format(dates.endOf(dt, "decade"), dates.formats.YEAR, culture);
    },

    centuryFormat: function (dt, culture) {
      return "" + dates.format(dt, dates.formats.YEAR, culture) + " - " + dates.format(dates.endOf(dt, "century"), dates.formats.YEAR, culture);
    } }, obj);
}

module.exports = createUncontrolledWidget(Calendar, { value: "onChange" });

module.exports.BaseCalendar = Calendar;