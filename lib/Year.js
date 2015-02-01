"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    cx = require("./util/cx"),
    dates = require("./util/dates"),
    directions = require("./util/constants").directions,
    Btn = require("./WidgetButton"),
    _ = require("./util/_");

var opposite = {
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT
};

module.exports = React.createClass({

  displayName: "YearView",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/RtlChildContextMixin"), require("./mixins/DateFocusMixin")("year", "month")],

  propTypes: {
    culture: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func.isRequired
  },


  render: function () {
    var props = _.omit(this.props, ["max", "min", "value", "onChange"]),
        months = dates.monthsInYear(dates.year(this.props.value)),
        rows = _.chunk(months, 4);

    return React.createElement(
      "table",
      _extends({}, props, {
        tabIndex: this.props.disabled ? "-1" : "0",
        ref: "table",
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
      { key: i, role: "row" },
      row.map(function (date, i) {
        var focused = dates.eq(date, _this.state.focusedDate, "month"),
            selected = dates.eq(date, _this.props.value, "month");

        return dates.inRange(date, _this.props.min, _this.props.max, "month") ? React.createElement(
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
                "rw-state-focus": focused,
                "rw-state-selected": selected
              }) },
            dates.format(date, dates.formats.MONTH_NAME_ABRV, _this.props.culture)
          )
        ) : React.createElement(
          "td",
          { key: i, className: "rw-empty-cell", role: "gridcell" },
          " "
        );
      })
    );
  },

  focus: function () {
    this.refs.table.getDOMNode().focus();
  },

  move: function (date, direction) {
    var min = this.props.min,
        max = this.props.max;

    if (this.isRtl() && opposite[direction]) direction = opposite[direction];

    if (direction === directions.LEFT) date = nextDate(date, -1, "month", min, max);else if (direction === directions.RIGHT) date = nextDate(date, 1, "month", min, max);else if (direction === directions.UP) date = nextDate(date, -4, "month", min, max);else if (direction === directions.DOWN) date = nextDate(date, 4, "month", min, max);

    return date;
  }

});

function nextDate(date, val, unit, min, max) {
  var newDate = dates.add(date, val, unit);
  return dates.inRange(newDate, min, max, "month") ? newDate : date;
}