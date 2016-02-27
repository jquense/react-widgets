'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _utilDates = require('./util/dates');

var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

var _List = require('./List');

var _List2 = babelHelpers.interopRequireDefault(_List);

var _utilLocalizers = require('./util/localizers');

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var format = function format(props) {
  return _utilLocalizers.date.getFormat('time', props.format);
};

exports['default'] = _react2['default'].createClass({

  displayName: 'TimeList',

  propTypes: {
    value: _react2['default'].PropTypes.instanceOf(Date),
    min: _react2['default'].PropTypes.instanceOf(Date),
    max: _react2['default'].PropTypes.instanceOf(Date),
    currentDate: _react2['default'].PropTypes.instanceOf(Date),
    step: _react2['default'].PropTypes.number,
    itemComponent: _utilPropTypes2['default'].elementType,
    format: _utilPropTypes2['default'].dateFormat,
    onSelect: _react2['default'].PropTypes.func,
    preserveDate: _react2['default'].PropTypes.bool,
    culture: _react2['default'].PropTypes.string
  },

  mixins: [require('./mixins/TimeoutMixin')],

  getDefaultProps: function getDefaultProps() {
    return {
      step: 30,
      onSelect: function onSelect() {},
      min: new Date(1900, 0, 1),
      max: new Date(2099, 11, 31),
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
        focusedItem = this._closestDate(data, nextProps.value),
        valChanged = !_utilDates2['default'].eq(nextProps.value, this.props.value, 'minutes'),
        minChanged = !_utilDates2['default'].eq(nextProps.min, this.props.min, 'minutes'),
        maxChanged = !_utilDates2['default'].eq(nextProps.max, this.props.max, 'minutes'),
        localeChanged = this.props.format !== nextProps.format || this.props.culture !== nextProps.culture;

    if (valChanged || minChanged || maxChanged || localeChanged) {
      this.setState({
        focusedItem: focusedItem || data[0],
        dates: data
      });
    }
  },

  render: function render() {
    var _props = this.props;
    var min = _props.min;
    var max = _props.max;
    var value = _props.value;
    var step = _props.step;
    var props = babelHelpers.objectWithoutProperties(_props, ['min', 'max', 'value', 'step']);

    var times = this.state.dates,
        date = this._closestDate(times, value);

    return _react2['default'].createElement(_List2['default'], babelHelpers._extends({}, props, {
      ref: 'list',
      data: times,
      textField: 'label',
      valueField: 'date',
      selected: date,
      focused: this.state.focusedItem
    }));
  },

  _closestDate: function _closestDate(times, date) {
    var roundTo = 1000 * 60 * this.props.step,
        inst = null,
        label;

    if (!date) return null;

    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo);
    label = _utilLocalizers.date.format(date, format(this.props), this.props.culture);

    times.some(function (time) {
      if (time.label === label) return inst = time;
    });

    return inst;
  },

  _data: function _data() {
    return this.state.dates;
  },

  _dates: function _dates(props) {
    var times = [],
        i = 0,
        values = this._dateValues(props),
        start = values.min,
        startDay = _utilDates2['default'].date(start);

    while (_utilDates2['default'].date(start) === startDay && _utilDates2['default'].lte(start, values.max)) {
      i++;
      times.push({ date: start, label: _utilLocalizers.date.format(start, format(props), props.culture) });
      start = _utilDates2['default'].add(start, props.step || 30, 'minutes');
    }
    return times;
  },

  _dateValues: function _dateValues(props) {
    var value = props.value || props.currentDate || _utilDates2['default'].today(),
        useDate = props.preserveDate,
        min = props.min,
        max = props.max,
        start,
        end;

    //compare just the time regradless of whether they fall on the same day
    if (!useDate) {
      start = _utilDates2['default'].startOf(_utilDates2['default'].merge(new Date(), min, props.currentDate), 'minutes');
      end = _utilDates2['default'].startOf(_utilDates2['default'].merge(new Date(), max, props.currentDate), 'minutes');

      if (_utilDates2['default'].lte(end, start) && _utilDates2['default'].gt(max, min, 'day')) end = _utilDates2['default'].tomorrow();

      return {
        min: start,
        max: end
      };
    }

    start = _utilDates2['default'].today();
    end = _utilDates2['default'].tomorrow();
    //date parts are equal
    return {
      min: _utilDates2['default'].eq(value, min, 'day') ? _utilDates2['default'].merge(start, min, props.currentDate) : start,
      max: _utilDates2['default'].eq(value, max, 'day') ? _utilDates2['default'].merge(start, max, props.currentDate) : end
    };
  },

  _keyDown: function _keyDown(e) {
    var key = e.key,
        focusedItem = this.state.focusedItem,
        list = this.refs.list;

    if (key === 'End') this.setState({ focusedItem: list.last() });else if (key === 'Home') this.setState({ focusedItem: list.first() });else if (key === 'Enter') this.props.onSelect(focusedItem);else if (key === 'ArrowDown') {
      e.preventDefault();
      this.setState({ focusedItem: list.next(focusedItem) });
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      this.setState({ focusedItem: list.prev(focusedItem) });
    }
  },

  _keyPress: function _keyPress(e) {
    var _this = this;

    e.preventDefault();

    this.search(String.fromCharCode(e.which), function (item) {
      _this.isMounted() && _this.setState({ focusedItem: item });
    });
  },

  scrollTo: function scrollTo() {
    this.refs.list.move && this.refs.list.move();
  },

  search: function search(character, cb) {
    var _this2 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase();

    this._searchTerm = word;

    this.setTimeout('search', function () {
      var list = _this2.refs.list,
          item = list.next(_this2.state.focusedItem, word);

      _this2._searchTerm = '';
      if (item) cb(item);
    }, this.props.delay);
  }

});
module.exports = exports['default'];