"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    dates = require("./util/dates"),
    List = require("./List"),
    CustomPropTypes = require("./util/propTypes"),
    _ = require("./util/_"); // omit


module.exports = React.createClass({

  displayName: "TimeList",

  propTypes: {
    value: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    step: React.PropTypes.number,
    itemComponent: CustomPropTypes.elementType,
    onSelect: React.PropTypes.func,
    preserveDate: React.PropTypes.bool,
    culture: React.PropTypes.string },

  mixins: [require("./mixins/TimeoutMixin")],

  getDefaultProps: function getDefaultProps() {
    return {
      step: 30,
      format: "t",
      onSelect: function () {},
      preserveDate: true,
      delay: 300
    };
  },

  getInitialState: function getInitialState() {
    var data = this._dates(this.props),
        focusedItem = this._closestDate(data, this.props.value);

    return {
      focusedItem: focusedItem || data[0],
      dates: data
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var data = this._dates(nextProps),
        focusedItem = this._closestDate(data, this.props.value);

    if (nextProps.value !== this.props.value) this.setState({
      focusedItem: focusedItem || data[0],
      dates: data
    });
  },

  render: function () {
    var times = this.state.dates,
        date = this._closestDate(times, this.props.value);

    return React.createElement(List, _extends({}, _.omit(this.props, "value"), {
      ref: "list",
      data: times,
      textField: "label",
      valueField: "date",
      selected: date,
      focused: this.state.focusedItem,
      itemComponent: this.props.itemComponent,
      onSelect: this.props.onSelect }));
  },

  _closestDate: function (times, date) {
    var roundTo = 1000 * 60 * this.props.step,
        inst = null,
        label;

    if (!date) return null;

    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo);
    label = dates.format(date, this.props.format, this.props.culture);

    times.some(function (time) {
      if (time.label === label) return inst = time;
    });

    return inst;
  },

  _data: function _data() {
    return this.state.dates;
  },

  _dates: function (props) {
    var times = [],
        i = 0,
        values = this._dateValues(props),
        start = values.min,
        startDay = dates.date(start);

    // debugger;
    while (i < 100 && (dates.date(start) === startDay && dates.lte(start, values.max))) {
      i++;
      times.push({ date: start, label: dates.format(start, props.format, props.culture) });
      start = dates.add(start, props.step || 30, "minutes");
    }
    return times;
  },

  _dateValues: function (props) {
    var value = props.value || dates.today(),
        useDate = props.preserveDate,
        min = props.min,
        max = props.max,
        start,
        end;

    //compare just the time regradless of whether they fall on the same day
    if (!useDate) {
      start = dates.startOf(dates.merge(new Date(), min), "minutes");
      end = dates.startOf(dates.merge(new Date(), max), "minutes");

      if (dates.lte(end, start) && dates.gt(max, min, "day")) end = dates.tomorrow();

      return {
        min: start,
        max: end
      };
    }

    //date parts are equal
    return {
      min: dates.eq(value, min, "day") ? min : dates.today(),
      max: dates.eq(value, max, "day") ? min : dates.tomorrow()
    };
  },

  _keyDown: function (e) {
    var _this = this;
    var key = e.key,
        character = String.fromCharCode(e.keyCode),
        focusedItem = this.state.focusedItem,
        list = this.refs.list;

    if (key === "End") this.setState({ focusedItem: list.last() });else if (key === "Home") this.setState({ focusedItem: list.first() });else if (key === "Enter") this.props.onSelect(focusedItem);else if (key === "ArrowDown") {
      e.preventDefault();
      this.setState({ focusedItem: list.next(focusedItem) });
    } else if (key === "ArrowUp") {
      e.preventDefault();
      this.setState({ focusedItem: list.prev(focusedItem) });
    } else {
      e.preventDefault();

      this.search(character, function (item) {
        _this.setState({ focusedItem: item });
      });
    }
  },

  search: function (character, cb) {
    var _this = this;
    var word = ((this._searchTerm || "") + character).toLowerCase();

    this._searchTerm = word;

    this.setTimeout("search", function () {
      var list = _this.refs.list,
          item = list.next(_this.state.focusedItem, word);

      _this._searchTerm = "";
      if (item) cb(item);
    }, this.props.delay);
  } });