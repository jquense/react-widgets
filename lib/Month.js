'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CalendarView = require('./CalendarView');

var _CalendarView2 = _interopRequireDefault(_CalendarView);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizers = require('./util/localizers');

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dayFormat = function dayFormat(props) {
  return _localizers.date.getFormat('weekday', props.dayFormat);
},
    dateFormat = function dateFormat(props) {
  return _localizers.date.getFormat('dayOfMonth', props.dateFormat);
};

var optionId = function optionId(id, date) {
  return id + '__month_' + _dates2.default.month(date) + '-' + _dates2.default.date(date);
};

var propTypes = {
  culture: _propTypes2.default.string,
  today: _propTypes2.default.instanceOf(Date),
  value: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func.isRequired,

  dayComponent: _propTypes4.default.elementType,
  dayFormat: _propTypes4.default.dateFormat,
  dateFormat: _propTypes4.default.dateFormat
};

var isEqual = function isEqual(dateA, dateB) {
  return _dates2.default.eq(dateA, dateB, 'day');
};

var MonthView = _react2.default.createClass({

  displayName: 'MonthView',

  statics: {
    isEqual: isEqual
  },

  mixins: [require('./mixins/RtlChildContextMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: propTypes,

  componentDidUpdate: function componentDidUpdate() {
    var activeId = optionId((0, _widgetHelpers.instanceId)(this), this.props.focused);
    this.ariaActiveDescendant(activeId, null);
  },
  render: function render() {
    var _props = this.props,
        focused = _props.focused,
        culture = _props.culture,
        month = _dates2.default.visibleDays(focused, culture),
        rows = _3.default.chunk(month, 7);

    return _react2.default.createElement(
      _CalendarView2.default,
      _3.default.omitOwnProps(this),
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
        'tbody',
        null,
        rows.map(this.renderRow)
      )
    );
  },
  renderRow: function renderRow(row, rowIdx) {
    var _this = this;

    var _props2 = this.props,
        focused = _props2.focused,
        today = _props2.today,
        disabled = _props2.disabled,
        onChange = _props2.onChange,
        value = _props2.value,
        culture = _props2.culture,
        min = _props2.min,
        max = _props2.max,
        Day = _props2.dayComponent,
        id = (0, _widgetHelpers.instanceId)(this),
        labelFormat = _localizers.date.getFormat('footer');

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
            id: optionId(id, date),
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
  },
  renderHeaders: function renderHeaders(week, format, culture) {
    return week.map(function (date) {
      return _react2.default.createElement(
        'th',
        { key: 'header_' + _dates2.default.weekday(date, undefined, _localizers.date.startOfWeek(culture)) },
        _localizers.date.format(date, format, culture)
      );
    });
  }
});

exports.default = MonthView;
module.exports = exports['default'];