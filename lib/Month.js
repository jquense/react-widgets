'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var React = require('react'),
    cx = require('classnames'),
    dates = require('./util/dates'),
    localizers = require('./util/configuration').locale,
    CustomPropTypes = require('./util/propTypes'),
    _ = require('./util/_'),
    Btn = require('./WidgetButton');

var dayFormat = function dayFormat(props) {
  return props.dayFormat || localizers.date.formats.weekday;
},
    dateFormat = function dateFormat(props) {
  return props.dateFormat || localizers.date.formats.dayOfMonth;
};

module.exports = React.createClass({

  displayName: 'MonthView',

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/RtlChildContextMixin')],

  propTypes: {
    culture: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    focused: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),

    dayComponent: CustomPropTypes.elementType,

    dayFormat: CustomPropTypes.dateFormat,
    dateFormat: CustomPropTypes.dateFormat,

    onChange: React.PropTypes.func.isRequired },

  render: function render() {
    var props = _.omit(this.props, ['max', 'min', 'value', 'onChange']),
        month = dates.visibleDays(this.props.focused, this.props.culture),
        rows = _.chunk(month, 7);

    return React.createElement(
      'table',
      babelHelpers._extends({}, props, {
        role: 'grid',
        className: 'rw-calendar-grid',
        'aria-activedescendant': this._id('_selected_item') }),
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          this._headers(dayFormat(this.props), props.culture)
        )
      ),
      React.createElement(
        'tbody',
        null,
        rows.map(this._row)
      )
    );
  },

  _row: function _row(row, i) {
    var _this = this;

    var id = this._id('_selected_item'),
        DayComponent = this.props.dayComponent;

    return React.createElement(
      'tr',
      { key: 'week_' + i, role: 'row' },
      row.map(function (day, idx) {
        var focused = dates.eq(day, _this.props.focused, 'day'),
            selected = dates.eq(day, _this.props.value, 'day'),
            today = dates.eq(day, _this.props.today, 'day'),
            date = localizers.date.format(day, dateFormat(_this.props), _this.props.culture);

        return !dates.inRange(day, _this.props.min, _this.props.max) ? React.createElement(
          'td',
          { key: 'day_' + idx, role: 'gridcell', className: 'rw-empty-cell' },
          ' '
        ) : React.createElement(
          'td',
          { key: 'day_' + idx, role: 'gridcell' },
          React.createElement(
            Btn,
            {
              tabIndex: '-1',
              onClick: _this.props.onChange.bind(null, day),
              'aria-pressed': selected,
              'aria-disabled': _this.props.disabled || undefined,
              disabled: _this.props.disabled,
              className: cx({
                'rw-off-range': dates.month(day) !== dates.month(_this.props.focused),
                'rw-state-focus': focused,
                'rw-state-selected': selected,
                'rw-now': today
              }),
              id: focused ? id : undefined },
            DayComponent ? React.createElement(DayComponent, { date: day, label: date }) : date
          )
        );
      })
    );
  },

  _headers: function _headers(format, culture) {
    return [0, 1, 2, 3, 4, 5, 6].map(function (day) {
      return React.createElement(
        'th',
        { key: 'header_' + day },
        localizers.date.format(day, format, culture)
      );
    });
  }

});
//value is chosen