'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _localizers = require('./util/localizers');

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _timeoutManager = require('./util/timeoutManager');

var _timeoutManager2 = _interopRequireDefault(_timeoutManager);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var format = function format(props) {
  return _localizers.date.getFormat('time', props.format);
};

var TimeList = (_temp = _class = function (_React$Component) {
  _inherits(TimeList, _React$Component);

  function TimeList() {
    _classCallCheck(this, TimeList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _initialiseProps.call(_this);

    _this.timeouts = (0, _timeoutManager2.default)(_this);

    var data = _this.getDates(_this.props);
    var focusedItem = _this.getClosestDate(data, _this.props.value);

    _this.state = {
      focusedItem: focusedItem || data[0],
      dates: data
    };
    return _this;
  }

  TimeList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var data = this.getDates(nextProps);
    var focusedItem = this.getClosestDate(data, nextProps.value);

    var valChanged = !_dates2.default.eq(nextProps.value, this.props.value, 'minutes');
    var minChanged = !_dates2.default.eq(nextProps.min, this.props.min, 'minutes');
    var maxChanged = !_dates2.default.eq(nextProps.max, this.props.max, 'minutes');

    var localeChanged = this.props.format !== nextProps.format || this.props.culture !== nextProps.culture;

    if (valChanged || minChanged || maxChanged || localeChanged) {
      this.setState({
        focusedItem: focusedItem || data[0],
        dates: data
      });
    }
  };

  TimeList.prototype.render = function render() {
    var _props = this.props;
    var value = _props.value;
    var onSelect = _props.onSelect;


    var times = this.state.dates,
        date = this.getClosestDate(times, value);

    return _react2.default.createElement(_List2.default, _extends({}, _3.default.omitOwnProps(this), {
      ref: 'list',
      data: times,
      textField: 'label',
      valueField: 'date',
      selected: date,
      onSelect: onSelect,
      focused: this.state.focusedItem
    }));
  };

  TimeList.prototype.getClosestDate = function getClosestDate(times, date) {
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
  };

  TimeList.prototype.getDates = function getDates(props) {
    var times = [];
    var values = this.getBounds(props);
    var start = values.min;
    var startDay = _dates2.default.date(start);

    while (_dates2.default.date(start) === startDay && _dates2.default.lte(start, values.max)) {
      times.push({
        date: start,
        label: _localizers.date.format(start, format(props), props.culture)
      });
      start = _dates2.default.add(start, props.step || 30, 'minutes');
    }
    return times;
  };

  TimeList.prototype.getBounds = function getBounds(props) {
    var value = props.value || props.currentDate || _dates2.default.today(),
        useDate = props.preserveDate,
        min = props.min,
        max = props.max,
        start,
        end;

    //compare just the time regradless of whether they fall on the same day
    if (!useDate) {
      start = _dates2.default.startOf(_dates2.default.merge(new Date(), min, props.currentDate), 'minutes');
      end = _dates2.default.startOf(_dates2.default.merge(new Date(), max, props.currentDate), 'minutes');

      if (_dates2.default.lte(end, start) && _dates2.default.gt(max, min, 'day')) end = _dates2.default.tomorrow();

      return {
        min: start,
        max: end
      };
    }

    start = _dates2.default.today();
    end = _dates2.default.tomorrow();
    //date parts are equal
    return {
      min: _dates2.default.eq(value, min, 'day') ? _dates2.default.merge(start, min, props.currentDate) : start,
      max: _dates2.default.eq(value, max, 'day') ? _dates2.default.merge(start, max, props.currentDate) : end
    };
  };

  TimeList.prototype.search = function search(character, cb) {
    var _this2 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase();

    this._searchTerm = word;

    this.timeouts.set('search', function () {
      var list = _this2.refs.list,
          item = list.next(_this2.state.focusedItem, word);

      _this2._searchTerm = '';
      if (item) cb(item);
    }, this.props.delay);
  };

  return TimeList;
}(_react2.default.Component), _class.propTypes = {
  value: _react2.default.PropTypes.instanceOf(Date),
  step: _react2.default.PropTypes.number,
  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),
  currentDate: _react2.default.PropTypes.instanceOf(Date),

  itemComponent: _propTypes2.default.elementType,
  format: _propTypes2.default.dateFormat,
  onSelect: _react2.default.PropTypes.func,
  preserveDate: _react2.default.PropTypes.bool,
  culture: _react2.default.PropTypes.string,
  delay: _react2.default.PropTypes.number
}, _class.defaultProps = {
  step: 30,
  onSelect: function onSelect() {},
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  preserveDate: true,
  delay: 300
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleKeyDown = function (e) {
    var key = e.key,
        focusedItem = _this3.state.focusedItem,
        list = _this3.refs.list;

    if (key === 'End') {
      e.preventDefault();
      _this3.setState({ focusedItem: list.last() });
    } else if (key === 'Home') {
      e.preventDefault();
      _this3.setState({ focusedItem: list.first() });
    } else if (key === 'Enter') _this3.props.onSelect(focusedItem);else if (key === 'ArrowDown') {
      e.preventDefault();
      _this3.setState({ focusedItem: list.next(focusedItem) });
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      _this3.setState({ focusedItem: list.prev(focusedItem) });
    }
  };

  this.handleKeyPress = function (e) {
    e.preventDefault();

    _this3.search(String.fromCharCode(e.which), function (item) {
      _this3.isMounted() && _this3.setState({ focusedItem: item });
    });
  };

  this.scrollTo = function () {
    _this3.refs.list.move && _this3.refs.list.move();
  };
}, _temp);
exports.default = TimeList;
module.exports = exports['default'];