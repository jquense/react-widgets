"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    cx = require("./util/cx"),
    dates = require("./util/dates"),
    directions = require("./util/constants").directions,
    Btn = require("./WidgetButton"),
    _ = require("./util/_"); //omit

var opposite = {
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT
};


module.exports = React.createClass({

  displayName: "CenturyView",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/PureRenderMixin"), require("./mixins/RtlChildContextMixin"), require("./mixins/DateFocusMixin")("century", "decade")],

  propTypes: {
    culture: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),

    onChange: React.PropTypes.func.isRequired
  },

  render: function () {
    var props = _.omit(this.props, ["max", "min", "value", "onChange"]),
        years = getCenturyDecades(this.props.value),
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
        var focused = dates.eq(date, _this.state.focusedDate, "decade"),
            selected = dates.eq(date, _this.props.value, "decade"),
            d = inRangeDate(date, _this.props.min, _this.props.max);

        return !inRange(date, _this.props.min, _this.props.max) ? React.createElement(
          "td",
          { key: i, role: "gridcell", className: "rw-empty-cell" },
          " "
        ) : React.createElement(
          "td",
          { key: i, role: "gridcell" },
          React.createElement(
            Btn,
            { onClick: _this.props.onChange.bind(null, d),
              tabIndex: "-1",
              id: focused ? id : undefined,
              "aria-selected": selected,
              "aria-disabled": _this.props.disabled,
              disabled: _this.props.disabled,
              className: cx({
                "rw-off-range": !inCentury(date, _this.props.value),
                "rw-state-focus": focused,
                "rw-state-selected": selected }) },
            label(date, _this.props.culture)
          )
        );
      })
    );
  },


  move: function (date, direction) {
    var min = this.props.min,
        max = this.props.max;

    if (this.isRtl() && opposite[direction]) direction = opposite[direction];

    if (direction === directions.LEFT) date = nextDate(date, -1, "decade", min, max);else if (direction === directions.RIGHT) date = nextDate(date, 1, "decade", min, max);else if (direction === directions.UP) date = nextDate(date, -4, "decade", min, max);else if (direction === directions.DOWN) date = nextDate(date, 4, "decade", min, max);

    return date;
  }

});

function label(date, culture) {
  return dates.format(dates.startOf(date, "decade"), dates.formats.YEAR, culture) + " - " + dates.format(dates.endOf(date, "decade"), dates.formats.YEAR, culture);
}

function inRangeDate(decade, min, max) {
  return dates.max(dates.min(decade, max), min);
}

function inRange(decade, min, max) {
  return dates.gte(decade, dates.startOf(min, "decade"), "year") && dates.lte(decade, dates.endOf(max, "decade"), "year");
}

function inCentury(date, start) {
  return dates.gte(date, dates.startOf(start, "century"), "year") && dates.lte(date, dates.endOf(start, "century"), "year");
}

function getCenturyDecades(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = dates.add(dates.startOf(_date, "century"), -20, "year");

  return days.map(function (i) {
    return date = dates.add(date, 10, "year");
  });
}


function nextDate(date, val, unit, min, max) {
  var newDate = dates.add(date, val, unit);
  return dates.inRange(newDate, min, max, "decade") ? newDate : date;
}