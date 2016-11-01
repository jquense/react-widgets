'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CalendarView = require('./CalendarView');

var _CalendarView2 = _interopRequireDefault(_CalendarView);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizers = require('./util/localizers');

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = function format(props) {
  return _localizers.date.getFormat('decade', props.decadeFormat);
};

var optionId = function optionId(id, date) {
  return id + '__century_' + _dates2.default.year(date);
};

var propTypes = {
  culture: _react2.default.PropTypes.string,
  today: _react2.default.PropTypes.instanceOf(Date),
  value: _react2.default.PropTypes.instanceOf(Date),
  focused: _react2.default.PropTypes.instanceOf(Date),
  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),
  onChange: _react2.default.PropTypes.func.isRequired,
  decadeFormat: _propTypes2.default.dateFormat
};

exports.default = _react2.default.createClass({

  displayName: 'CenturyView',

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
        _3.default.chunk(getCenturyDecades(focused), 4).map(this.renderRow)
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


    var id = (0, _widgetHelpers.instanceId)(this, '_century');

    return _react2.default.createElement(
      _CalendarView2.default.Row,
      { key: rowIdx },
      row.map(function (date, colIdx) {
        var label = _localizers.date.format(_dates2.default.startOf(date, 'decade'), format(_this.props), culture);

        return _react2.default.createElement(
          _CalendarView2.default.Cell,
          {
            key: colIdx,
            unit: 'decade',
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


function getCenturyDecades(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = _dates2.default.add(_dates2.default.startOf(_date, 'century'), -20, 'year');

  return days.map(function () {
    return date = _dates2.default.add(date, 10, 'year');
  });
}
module.exports = exports['default'];