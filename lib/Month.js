"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    cx = require("classnames"),
    dates = require("./util/dates"),
    directions = require("./util/constants").directions,
    CustomPropTypes = require("./util/propTypes"),
    _ = require("./util/_"),
    Btn = require("./WidgetButton");

var opposite = {
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT
};

module.exports = React.createClass({

  displayName: "MonthView",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/RtlChildContextMixin"), require("./mixins/DateFocusMixin")("month", "day")],

  propTypes: {
    culture: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    selectedDate: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),

    dayFormat: CustomPropTypes.localeFormat.isRequired,
    dateFormat: CustomPropTypes.localeFormat.isRequired,

    onChange: React.PropTypes.func.isRequired, //value is chosen
    onMoveLeft: React.PropTypes.func,
    onMoveRight: React.PropTypes.func
  },

  render: function () {
    var props = _.omit(this.props, ["max", "min", "value", "onChange"]),
        month = dates.visibleDays(this.props.value, this.props.culture),
        rows = _.chunk(month, 7);

    return React.createElement(
      "table",
      babelHelpers._extends({}, props, {
        role: "grid",
        className: "rw-calendar-grid",
        "aria-activedescendant": this._id("_selected_item"),
        onKeyUp: this._keyUp }),
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          this._headers(props.dayFormat, props.culture)
        )
      ),
      React.createElement(
        "tbody",
        null,
        rows.map(this._row)
      )
    );
  },

  _row: function (row, i) {
    var _this = this;

    var id = this._id("_selected_item");

    return React.createElement(
      "tr",
      { key: "week_" + i, role: "row" },
      row.map(function (day, idx) {
        var focused = dates.eq(day, _this.state.focusedDate, "day"),
            selected = dates.eq(day, _this.props.selectedDate, "day"),
            today = dates.eq(day, _this.props.today, "day");

        return !dates.inRange(day, _this.props.min, _this.props.max) ? React.createElement(
          "td",
          { key: "day_" + idx, role: "gridcell", className: "rw-empty-cell" },
          " "
        ) : React.createElement(
          "td",
          { key: "day_" + idx, role: "gridcell" },
          React.createElement(
            Btn,
            {
              tabIndex: "-1",
              onClick: _this.props.onChange.bind(null, day),
              "aria-pressed": selected,
              "aria-disabled": _this.props.disabled || undefined,
              disabled: _this.props.disabled,
              className: cx({
                "rw-off-range": dates.month(day) !== dates.month(_this.state.focusedDate),
                "rw-state-focus": focused,
                "rw-state-selected": selected,
                "rw-now": today
              }),
              id: focused ? id : undefined },
            dates.format(day, _this.props.dateFormat, _this.props.culture)
          )
        );
      })
    );
  },

  _headers: function (format, culture) {
    return [0, 1, 2, 3, 4, 5, 6].map(function (day) {
      return React.createElement(
        "th",
        { key: "header_" + day },
        dates.format(day, format, culture)
      );
    });
  },

  move: function (date, direction) {
    var min = this.props.min,
        max = this.props.max;

    if (this.isRtl() && opposite[direction]) direction = opposite[direction];

    if (direction === directions.LEFT) date = nextDate(date, -1, "day", min, max);else if (direction === directions.RIGHT) date = nextDate(date, 1, "day", min, max);else if (direction === directions.UP) date = nextDate(date, -1, "week", min, max);else if (direction === directions.DOWN) date = nextDate(date, 1, "week", min, max);

    return date;
  }

});

function nextDate(date, val, unit, min, max) {
  var newDate = dates.add(date, val, unit);

  return dates.inRange(newDate, min, max, "day") ? newDate : date;
}