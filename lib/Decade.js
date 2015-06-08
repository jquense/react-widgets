'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var React = require('react'),
    _ = require('./util/_'),
    cx = require('classnames'),
    dates = require('./util/dates'),
    localizers = require('./util/configuration').locale,
    CustomPropTypes = require('./util/propTypes'),
    Btn = require('./WidgetButton');

var format = function format(props) {
  return props.yearFormat || localizers.date.formats.year;
};

module.exports = React.createClass({

  displayName: 'DecadeView',

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/PureRenderMixin'), require('./mixins/RtlChildContextMixin')],

  propTypes: {
    culture: React.PropTypes.string,

    value: React.PropTypes.instanceOf(Date),
    focused: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func.isRequired,

    yearFormat: CustomPropTypes.dateFormat

  },

  render: function render() {
    var props = _.omit(this.props, ['max', 'min', 'value', 'onChange']),
        years = getDecadeYears(this.props.focused),
        rows = _.chunk(years, 4);

    return React.createElement(
      'table',
      babelHelpers._extends({}, props, {
        role: 'grid',
        className: 'rw-calendar-grid rw-nav-view',
        'aria-activedescendant': this._id('_selected_item') }),
      React.createElement(
        'tbody',
        null,
        rows.map(this._row)
      )
    );
  },

  _row: function _row(row, i) {
    var _this = this;

    var id = this._id('_selected_item');

    return React.createElement(
      'tr',
      { key: 'row_' + i, role: 'row' },
      row.map(function (date, i) {
        var focused = dates.eq(date, _this.props.focused, 'year'),
            selected = dates.eq(date, _this.props.value, 'year'),
            currentYear = dates.eq(date, _this.props.today, 'year');

        return !dates.inRange(date, _this.props.min, _this.props.max, 'year') ? React.createElement(
          'td',
          { key: i, role: 'gridcell', className: 'rw-empty-cell' },
          ' '
        ) : React.createElement(
          'td',
          { key: i, role: 'gridcell' },
          React.createElement(
            Btn,
            { onClick: _this.props.onChange.bind(null, date), tabIndex: '-1',
              id: focused ? id : undefined,
              'aria-pressed': selected,
              'aria-disabled': _this.props.disabled,
              disabled: _this.props.disabled || undefined,
              className: cx({
                'rw-off-range': !inDecade(date, _this.props.focused),
                'rw-state-focus': focused,
                'rw-state-selected': selected,
                'rw-now': currentYear
              }) },
            localizers.date.format(date, format(_this.props), _this.props.culture)
          )
        );
      })
    );
  }
});

function inDecade(date, start) {
  return dates.gte(date, dates.startOf(start, 'decade'), 'year') && dates.lte(date, dates.endOf(start, 'decade'), 'year');
}

function getDecadeYears(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = dates.add(dates.startOf(_date, 'decade'), -2, 'year');

  return days.map(function () {
    return date = dates.add(date, 1, 'year');
  });
}

//require('./mixins/DateFocusMixin')('decade', 'year')