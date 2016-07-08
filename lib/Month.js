'use strict';

exports.__esModule = true;

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
  culture: _react2.default.PropTypes.string,
  today: _react2.default.PropTypes.instanceOf(Date),
  value: _react2.default.PropTypes.instanceOf(Date),
  focused: _react2.default.PropTypes.instanceOf(Date),
  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),
  onChange: _react2.default.PropTypes.func.isRequired,

  dayComponent: _propTypes2.default.elementType,
  dayFormat: _propTypes2.default.dateFormat,
  dateFormat: _propTypes2.default.dateFormat
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
    var _props = this.props;
    var focused = _props.focused;
    var culture = _props.culture;
    var month = _dates2.default.visibleDays(focused, culture);
    var rows = _3.default.chunk(month, 7);

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

    var _props2 = this.props;
    var focused = _props2.focused;
    var today = _props2.today;
    var disabled = _props2.disabled;
    var onChange = _props2.onChange;
    var value = _props2.value;
    var culture = _props2.culture;
    var min = _props2.min;
    var max = _props2.max;
    var Day = _props2.dayComponent;
    var id = (0, _widgetHelpers.instanceId)(this);
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