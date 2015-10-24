'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilDates = require('./util/dates');

var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

var _utilLocalizers = require('./util/localizers');

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _utilWidgetHelpers = require('./util/widgetHelpers');

var dayFormat = function dayFormat(props) {
  return _utilLocalizers.date.getFormat('weekday', props.dayFormat);
},
    dateFormat = function dateFormat(props) {
  return _utilLocalizers.date.getFormat('dayOfMonth', props.dateFormat);
};

var optionId = function optionId(id, date) {
  return id + '__month_' + _utilDates2['default'].month(date) + '-' + _utilDates2['default'].date(date);
};

var propTypes = {
  optionID: _react2['default'].PropTypes.func,

  culture: _react2['default'].PropTypes.string,
  value: _react2['default'].PropTypes.instanceOf(Date),
  focused: _react2['default'].PropTypes.instanceOf(Date),
  min: _react2['default'].PropTypes.instanceOf(Date),
  max: _react2['default'].PropTypes.instanceOf(Date),

  dayComponent: _utilPropTypes2['default'].elementType,

  dayFormat: _utilPropTypes2['default'].dateFormat,
  dateFormat: _utilPropTypes2['default'].dateFormat,
  footerFormat: _utilPropTypes2['default'].dateFormat,

  onChange: _react2['default'].PropTypes.func.isRequired
};

var isEqual = function isEqual(dateA, dateB) {
  return _utilDates2['default'].eq(dateA, dateB, 'day');
};

var MonthView = _react2['default'].createClass({

  displayName: 'MonthView',

  statics: {
    isEqual: isEqual
  },

  mixins: [require('./mixins/RtlChildContextMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: propTypes,

  componentDidUpdate: function componentDidUpdate() {
    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
    this.ariaActiveDescendant(activeId, null);
  },

  render: function render() {
    var _props = this.props;
    var focused = _props.focused;
    var culture = _props.culture;
    var month = _utilDates2['default'].visibleDays(focused, culture);
    var rows = _util_2['default'].chunk(month, 7);

    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

    return _react2['default'].createElement(
      'table',
      babelHelpers._extends({}, elementProps, {
        role: 'grid'
      }),
      _react2['default'].createElement(
        'thead',
        null,
        _react2['default'].createElement(
          'tr',
          null,
          this._headers(rows[0], dayFormat(this.props), culture)
        )
      ),
      _react2['default'].createElement(
        'tbody',
        null,
        rows.map(this._row)
      )
    );
  },

  _row: function _row(row, rowIdx) {
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
    var id = _utilWidgetHelpers.instanceId(this);
    var labelFormat = _utilLocalizers.date.getFormat('footer');

    return _react2['default'].createElement(
      'tr',
      { key: 'week_' + rowIdx, role: 'row' },
      row.map(function (day, colIdx) {

        var isFocused = isEqual(day, focused),
            isSelected = isEqual(day, value),
            isToday = isEqual(day, today),
            date = _utilLocalizers.date.format(day, dateFormat(_this.props), culture),
            label = _utilLocalizers.date.format(day, labelFormat, culture);

        var currentID = optionId(id, day);

        return !_utilDates2['default'].inRange(day, min, max) ? _react2['default'].createElement(
          'td',
          { key: 'day_' + colIdx, role: 'presentation', className: 'rw-empty-cell' },
          ' '
        ) : _react2['default'].createElement(
          'td',
          {
            key: 'day_' + colIdx,
            role: 'gridcell',
            id: currentID,
            title: label,
            'aria-selected': isSelected,
            'aria-label': label,
            'aria-readonly': disabled
          },
          _react2['default'].createElement(
            'span',
            {
              'aria-labelledby': currentID,
              onClick: onChange.bind(null, day),
              className: _classnames2['default']('rw-btn', {
                'rw-off-range': _utilDates2['default'].month(day) !== _utilDates2['default'].month(focused),
                'rw-state-focus': isFocused,
                'rw-state-selected': isSelected,
                'rw-now': isToday
              })
            },
            Day ? _react2['default'].createElement(Day, { date: day, label: date }) : date
          )
        );
      })
    );
  },

  _headers: function _headers(week, format, culture) {
    return week.map(function (date) {
      return _react2['default'].createElement(
        'th',
        { key: 'header_' + _utilDates2['default'].weekday(date, undefined, _utilLocalizers.date.startOfWeek(culture)) },
        _utilLocalizers.date.format(date, format, culture)
      );
    });
  }

});

exports['default'] = MonthView;
module.exports = exports['default'];