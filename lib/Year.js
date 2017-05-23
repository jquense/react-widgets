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

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = function format(props) {
  return _localizers.date.getFormat('month', props.monthFormat);
};

var propTypes = {
  culture: _propTypes2.default.string,
  today: _propTypes2.default.instanceOf(Date),
  value: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func.isRequired,

  monthFormat: _propTypes4.default.dateFormat
};

var optionId = function optionId(id, date) {
  return id + '__year_' + _dates2.default.year(date) + '-' + _dates2.default.month(date);
};

var YearView = _react2.default.createClass({

  displayName: 'YearView',

  mixins: [require('./mixins/RtlChildContextMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: propTypes,

  componentDidUpdate: function componentDidUpdate() {
    var activeId = optionId((0, _widgetHelpers.instanceId)(this), this.props.focused);
    this.ariaActiveDescendant(activeId);
  },
  render: function render() {
    var focused = this.props.focused,
        months = _dates2.default.monthsInYear(_dates2.default.year(focused));


    return _react2.default.createElement(
      _CalendarView2.default,
      _3.default.omitOwnProps(this),
      _react2.default.createElement(
        'tbody',
        null,
        _3.default.chunk(months, 4).map(this.renderRow)
      )
    );
  },
  renderRow: function renderRow(row, rowIdx) {
    var _this = this;

    var _props = this.props,
        focused = _props.focused,
        disabled = _props.disabled,
        onChange = _props.onChange,
        value = _props.value,
        today = _props.today,
        culture = _props.culture,
        min = _props.min,
        max = _props.max;


    var id = (0, _widgetHelpers.instanceId)(this),
        labelFormat = _localizers.date.getFormat('header');

    return _react2.default.createElement(
      _CalendarView2.default.Row,
      { key: rowIdx },
      row.map(function (date, colIdx) {
        var label = _localizers.date.format(date, labelFormat, culture);

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
            unit: 'month',
            onChange: onChange,
            focused: focused,
            selected: value,
            disabled: disabled
          },
          _localizers.date.format(date, format(_this.props), culture)
        );
      })
    );
  }
});

exports.default = YearView;
module.exports = exports['default'];