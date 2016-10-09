'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CalendarView = require('./CalendarView');

var _CalendarView2 = _interopRequireDefault(_CalendarView);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizers = require('./util/localizers');

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dayFormat = function dayFormat(props) {
  return _localizers.date.getFormat('weekday', props.dayFormat);
},
    dateFormat = function dateFormat(props) {
  return _localizers.date.getFormat('dayOfMonth', props.dateFormat);
};

var isEqual = function isEqual(dateA, dateB) {
  return _dates2.default.eq(dateA, dateB, 'day');
};

var MonthView = (_temp2 = _class = function (_React$Component) {
  _inherits(MonthView, _React$Component);

  function MonthView() {
    var _temp, _this, _ret;

    _classCallCheck(this, MonthView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props;
      var focused = _this$props.focused;
      var today = _this$props.today;
      var activeId = _this$props.activeId;
      var disabled = _this$props.disabled;
      var onChange = _this$props.onChange;
      var value = _this$props.value;
      var culture = _this$props.culture;
      var min = _this$props.min;
      var max = _this$props.max;
      var Day = _this$props.dayComponent;


      var labelFormat = _localizers.date.getFormat('footer');

      return _react2.default.createElement(
        _CalendarView2.default.Row,
        { key: rowIdx },
        row.map(function (date, colIdx) {
          var formattedDate = _localizers.date.format(date, dateFormat(_this.props), culture),
              label = _localizers.date.format(date, labelFormat, culture);

          return _react2.default.createElement(
            _CalendarView2.default.Cell,
            {
              key: colIdx,
              activeId: activeId,
              label: label,
              date: date,
              now: today,
              min: min,
              max: max,
              unit: 'day',
              viewUnit: 'month',
              onChange: onChange,
              focused: focused,
              selected: value,
              disabled: disabled
            },
            Day ? _react2.default.createElement(Day, { date: date, label: formattedDate }) : formattedDate
          );
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MonthView.prototype.renderHeaders = function renderHeaders(week, format, culture) {
    return week.map(function (date) {
      return _react2.default.createElement(
        'th',
        { key: 'header_' + _dates2.default.weekday(date, undefined, _localizers.date.startOfWeek(culture)) },
        _localizers.date.format(date, format, culture)
      );
    });
  };

  MonthView.prototype.render = function render() {
    var _props = this.props;
    var focused = _props.focused;
    var culture = _props.culture;
    var activeId = _props.activeId;
    var month = _dates2.default.visibleDays(focused, culture);
    var rows = _3.default.chunk(month, 7);

    return _react2.default.createElement(
      _CalendarView2.default,
      _extends({}, _3.default.omitOwnProps(this), {
        activeId: activeId,
        className: 'rw-calendar-month'
      }),
      _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          this.renderHeaders(rows[0], dayFormat(this.props), culture)
        )
      ),
      _react2.default.createElement(
        _CalendarView2.default.Body,
        null,
        rows.map(this.renderRow)
      )
    );
  };

  return MonthView;
}(_react2.default.Component), _class.propTypes = {
  activeId: _react2.default.PropTypes.string,
  culture: _react2.default.PropTypes.string,
  today: _react2.default.PropTypes.instanceOf(Date),
  value: _react2.default.PropTypes.instanceOf(Date),
  focused: _react2.default.PropTypes.instanceOf(Date),
  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),
  onChange: _react2.default.PropTypes.func.isRequired,

  dayComponent: _propTypes2.default.elementType,
  dayFormat: _propTypes2.default.dateFormat,
  dateFormat: _propTypes2.default.dateFormat,
  disabled: _react2.default.PropTypes.bool
}, _class.isEqual = isEqual, _temp2);
exports.default = MonthView;
module.exports = exports['default'];