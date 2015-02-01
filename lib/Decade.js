"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    _ = require("./util/_"),
    cx = require("./util/cx"),
    dates = require("./util/dates"),
    directions = require("./util/constants").directions,
    Btn = require("./WidgetButton");

var opposite = {
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT
};


module.exports = React.createClass({

  displayName: "DecadeView",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/PureRenderMixin"), require("./mixins/RtlChildContextMixin"), require("./mixins/DateFocusMixin")("decade", "year")],

  propTypes: {
    culture: React.PropTypes.string,

    value: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func.isRequired
  },

  render: function () {
    var props = _.omit(this.props, ["max", "min", "value", "onChange"]),
        years = getDecadeYears(this.props.value),
        rows = _.chunk(years, 4);

    return React.createElement(
      "table",
      _extends({}, props, {
        tabIndex: this.props.disabled ? "-1" : "0",
        role: "grid",
        className: "rw-calendar-grid rw-nav-view",
        "aria-activedescendant": this._id("_selected_item"),
        onKeyUp: this._keyUp }),
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
      { key: "row_" + i, role: "row" },
      row.map(function (date, i) {
        var focused = dates.eq(date, _this.state.focusedDate, "year"),
            selected = dates.eq(date, _this.props.value, "year");

        return !dates.inRange(date, _this.props.min, _this.props.max, "year") ? React.createElement(
          "td",
          { key: i, role: "gridcell", className: "rw-empty-cell" },
          " "
        ) : React.createElement(
          "td",
          { key: i, role: "gridcell" },
          React.createElement(
            Btn,
            { onClick: _this.props.onChange.bind(null, date), tabIndex: "-1",
              id: focused ? id : undefined,
              "aria-selected": selected,
              "aria-disabled": _this.props.disabled,
              disabled: _this.props.disabled,
              className: cx({
                "rw-off-range": !inDecade(date, _this.props.value),
                "rw-state-focus": focused,
                "rw-state-selected": selected }) },
            dates.format(date, dates.formats.YEAR, _this.props.culture)
          )
        );
      })
    );
  },

  move: function (date, direction) {
    var min = this.props.min,
        max = this.props.max;

    if (this.isRtl() && opposite[direction]) direction = opposite[direction];

    if (direction === directions.LEFT) date = nextDate(date, -1, "year", min, max);else if (direction === directions.RIGHT) date = nextDate(date, 1, "year", min, max);else if (direction === directions.UP) date = nextDate(date, -4, "year", min, max);else if (direction === directions.DOWN) date = nextDate(date, 4, "year", min, max);

    return date;
  }

});

function inDecade(date, start) {
  return dates.gte(date, dates.startOf(start, "decade"), "year") && dates.lte(date, dates.endOf(start, "decade"), "year");
}

function getDecadeYears(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = dates.add(dates.startOf(_date, "decade"), -2, "year");

  return days.map(function (i) {
    return date = dates.add(date, 1, "year");
  });
}

function nextDate(date, val, unit, min, max) {
  var newDate = dates.add(date, val, unit);
  return dates.inRange(newDate, min, max, "year") ? newDate : date;
}