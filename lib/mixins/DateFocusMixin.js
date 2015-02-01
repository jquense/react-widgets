"use strict";
var React = require("react"),
    dates = require("../util/dates"),
    directions = require("../util/constants").directions;

module.exports = function (viewUnit, smallUnit) {
  return {
    propTypes: {
      value: React.PropTypes.instanceOf(Date),
      min: React.PropTypes.instanceOf(Date),
      max: React.PropTypes.instanceOf(Date) },

    getInitialState: function () {
      return {
        focusedDate: constrainValue(this.props.value, this.props.min, this.props.max)
      };
    },

    componentWillReceiveProps: function (nextProps) {
      var focused = this.state.focusedDate;

      //!dates.inRange(focused, nextProps.min, nextProps.max)

      if (!dates.eq(nextProps.value, focused, smallUnit)) this.setState({
        focusedDate: nextProps.value
      });
    },

    _keyDown: function (e) {
      var key = e.key,
          current = this.state.focusedDate,
          date = current;

      if (key === "Enter") {
        e.preventDefault();
        return this.props.onChange(date);
      }

      if (key === "ArrowLeft") date = this.move(date, directions.LEFT);else if (key === "ArrowRight") date = this.move(date, directions.RIGHT);else if (key === "ArrowUp") date = this.move(date, directions.UP);else if (key === "ArrowDown") date = this.move(date, directions.DOWN);


      if (!dates.eq(current, date, smallUnit)) {
        e.preventDefault();

        if (dates.gt(date, this.props.value, viewUnit)) return this.props.onMoveRight(date);

        if (dates.lt(date, this.props.value, viewUnit)) return this.props.onMoveLeft(date);

        this.setState({
          focusedDate: date
        });
      }
    }
  };
};


function constrainValue(value, min, max) {
  if (value == null) return value;
  return dates.max(dates.min(value, max), min);
}