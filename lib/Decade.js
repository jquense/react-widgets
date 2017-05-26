'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

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

var propTypes = {
  culture: _propTypes2.default.string,
  today: _propTypes2.default.instanceOf(Date),
  value: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func.isRequired,

  yearFormat: _propTypes4.default.dateFormat
};

var optionId = function optionId(id, date) {
  return id + '__decade_' + _dates2.default.year(date);
};

exports.default = (0, _createReactClass2.default)({

  displayName: 'DecadeView',

  mixins: [require('./mixins/PureRenderMixin'), require('./mixins/RtlChildContextMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: propTypes,

  componentDidUpdate: function componentDidUpdate() {
    var activeId = optionId((0, _widgetHelpers.instanceId)(this), this.props.focused);
    this.ariaActiveDescendant(activeId);
  },
  render: function render() {
    var focused = this.props.focused;


    return _react2.default.createElement(
      _CalendarView2.default,
      _3.default.omitOwnProps(this),
      _react2.default.createElement(
        'tbody',
        null,
        _3.default.chunk(getDecadeYears(focused), 4).map(this.renderRow)
      )
    );
  },
  renderRow: function renderRow(row, rowIdx) {
    var _props = this.props,
        focused = _props.focused,
        disabled = _props.disabled,
        onChange = _props.onChange,
        yearFormat = _props.yearFormat,
        value = _props.value,
        today = _props.today,
        culture = _props.culture,
        min = _props.min,
        max = _props.max;


    var id = (0, _widgetHelpers.instanceId)(this);

    return _react2.default.createElement(
      _CalendarView2.default.Row,
      { key: rowIdx },
      row.map(function (date, colIdx) {
        var label = _localizers.date.format(date, _localizers.date.getFormat('year', yearFormat), culture);

        return _react2.default.createElement(
          _CalendarView2.default.Cell,
          {
            key: colIdx,
            unit: 'year',
            id: optionId(id, date),
            label: label,
            date: date,
            now: today,
            min: min,
            max: max,
            onChange: onChange,
            focused: focused,
            selected: value,
            disabled: disabled
          },
          label
        );
      })
    );
  }
});


function getDecadeYears(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = _dates2.default.add(_dates2.default.startOf(_date, 'decade'), -2, 'year');

  return days.map(function () {
    return date = _dates2.default.add(date, 1, 'year');
  });
}
module.exports = exports['default'];