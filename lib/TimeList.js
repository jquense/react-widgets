'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _dates2 = require('./util/dates');

var _dates3 = _interopRequireDefault(_dates2);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _localizers = require('./util/localizers');

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = function format(props) {
  return _localizers.date.getFormat('time', props.format);
};

exports.default = (0, _createReactClass2.default)({

  displayName: 'TimeList',

  propTypes: {
    value: _propTypes2.default.instanceOf(Date),
    step: _propTypes2.default.number,
    min: _propTypes2.default.instanceOf(Date),
    max: _propTypes2.default.instanceOf(Date),
    currentDate: _propTypes2.default.instanceOf(Date),

    itemComponent: _propTypes4.default.elementType,
    format: _propTypes4.default.dateFormat,
    onSelect: _propTypes2.default.func,
    preserveDate: _propTypes2.default.bool,
    culture: _propTypes2.default.string,
    delay: _propTypes2.default.number
  },

  mixins: [require('./mixins/TimeoutMixin')],

  getDefaultProps: function getDefaultProps() {
    return {
      step: 30,
      onSelect: function onSelect() {},
      min: new Date(1900, 0, 1),
      max: new Date(2099, 11, 31),
      preserveDate: true,
      delay: 300,
      ariaActiveDescendantKey: 'timelist'
    };
  },
  getInitialState: function getInitialState() {
    var data = this._dates(this.props),
        focusedItem = this._closestDate(data, this.props.value || this.props.currentDate);

    return {
      focusedItem: focusedItem || data[0],
      dates: data
    };
  },
  componentDidMount: function componentDidMount() {
    this._mounted = true;
  },
  componentWillUnmount: function componentWillUnmount() {
    this._mounted = false;
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var data = this._dates(nextProps),
        focusedItem = this._closestDate(data, nextProps.value || this.props.currentDate),
        valChanged = !_dates3.default.eq(nextProps.value, this.props.value, 'minutes'),
        minChanged = !_dates3.default.eq(nextProps.min, this.props.min, 'minutes'),
        maxChanged = !_dates3.default.eq(nextProps.max, this.props.max, 'minutes'),
        localeChanged = this.props.format !== nextProps.format || this.props.culture !== nextProps.culture;

    if (valChanged || minChanged || maxChanged || localeChanged) {
      this.setState({
        focusedItem: focusedItem || data[0],
        dates: data
      });
    }
  },
  render: function render() {
    var _props = this.props,
        value = _props.value,
        onSelect = _props.onSelect,
        itemComponent = _props.itemComponent;


    var times = this.state.dates,
        date = this._closestDate(times, value);

    return _react2.default.createElement(_List2.default, _extends({}, _3.default.omitOwnProps(this), {
      ref: 'list',
      data: times,
      textField: 'label',
      valueField: 'date',
      selected: date,
      onSelect: onSelect,
      focused: this.state.focusedItem,
      itemComponent: itemComponent
    }));
  },
  _closestDate: function _closestDate(times, date) {
    var roundTo = 1000 * 60 * this.props.step,
        inst = null,
        label;

    if (!date) return null;

    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo);
    label = _localizers.date.format(date, format(this.props), this.props.culture);

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
        startDay = _dates3.default.date(start);

    while (_dates3.default.date(start) === startDay && _dates3.default.lte(start, values.max)) {
      i++;
      times.push({ date: start, label: _localizers.date.format(start, format(props), props.culture) });
      start = _dates3.default.add(start, props.step || 30, 'minutes');
    }
    return times;
  },
  _dateValues: function _dateValues(props) {
    var value = props.value || props.currentDate || _dates3.default.today(),
        useDate = props.preserveDate,
        min = props.min,
        max = props.max,
        start,
        end;

    //compare just the time regradless of whether they fall on the same day
    if (!useDate) {
      start = _dates3.default.startOf(_dates3.default.merge(new Date(), min, props.currentDate), 'minutes');
      end = _dates3.default.startOf(_dates3.default.merge(new Date(), max, props.currentDate), 'minutes');

      if (_dates3.default.lte(end, start) && _dates3.default.gt(max, min, 'day')) end = _dates3.default.tomorrow();

      return {
        min: start,
        max: end
      };
    }

    start = _dates3.default.today();
    end = _dates3.default.tomorrow();
    //date parts are equal
    return {
      min: _dates3.default.eq(value, min, 'day') ? _dates3.default.merge(start, min, props.currentDate) : start,
      max: _dates3.default.eq(value, max, 'day') ? _dates3.default.merge(start, max, props.currentDate) : end
    };
  },
  handleKeyDown: function handleKeyDown(e) {
    var key = e.key,
        focusedItem = this.state.focusedItem,
        list = this.refs.list;

    if (key === 'End') {
      e.preventDefault();
      this.setState({ focusedItem: list.last() });
    } else if (key === 'Home') {
      e.preventDefault();
      this.setState({ focusedItem: list.first() });
    } else if (key === 'Enter') this.props.onSelect(focusedItem);else if (key === 'ArrowDown') {
      e.preventDefault();
      this.setState({ focusedItem: list.next(focusedItem) });
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      this.setState({ focusedItem: list.prev(focusedItem) });
    }
  },
  handleKeyPress: function handleKeyPress(e) {
    var _this = this;

    e.preventDefault();

    this.search(String.fromCharCode(e.which), function (item) {
      _this._mounted && _this.setState({ focusedItem: item });
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