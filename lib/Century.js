'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var React = require('react'),
    cx = require('classnames'),
    dates = require('./util/dates'),
    localizers = require('./util/configuration').locale,
    directions = require('./util/constants').directions,
    Btn = require('./WidgetButton'),
    _ = require('./util/_'),
    CustomPropTypes = require('./util/propTypes'); //omit

var format = function format(props) {
  return props.decadeFormat || localizers.date.formats.decade;
};

module.exports = React.createClass({

  displayName: 'CenturyView',

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/PureRenderMixin'), require('./mixins/RtlChildContextMixin')],

  propTypes: {
    culture: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),

    onChange: React.PropTypes.func.isRequired,

    decadeFormat: CustomPropTypes.dateFormat
  },

  render: function render() {
    var props = _.omit(this.props, ['max', 'min', 'value', 'onChange']),
        years = getCenturyDecades(this.props.focused),
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
        var focused = dates.eq(date, _this.props.focused, 'decade'),
            selected = dates.eq(date, _this.props.value, 'decade'),
            d = inRangeDate(date, _this.props.min, _this.props.max),
            currentDecade = dates.eq(date, _this.props.today, 'decade');

        return !inRange(date, _this.props.min, _this.props.max) ? React.createElement(
          'td',
          { key: i, role: 'gridcell', className: 'rw-empty-cell' },
          ' '
        ) : React.createElement(
          'td',
          { key: i, role: 'gridcell' },
          React.createElement(
            Btn,
            { onClick: _this.props.onChange.bind(null, d),
              tabIndex: '-1',
              id: focused ? id : undefined,
              'aria-pressed': selected,
              'aria-disabled': _this.props.disabled,
              disabled: _this.props.disabled || undefined,
              className: cx({
                'rw-off-range': !inCentury(date, _this.props.focused),
                'rw-state-focus': focused,
                'rw-state-selected': selected,
                'rw-now': currentDecade
              }) },
            localizers.date.format(dates.startOf(date, 'decade'), format(_this.props), _this.props.culture)
          )
        );
      })
    );
  }

});

function inRangeDate(decade, min, max) {
  return dates.max(dates.min(decade, max), min);
}

function inRange(decade, min, max) {
  return dates.gte(decade, dates.startOf(min, 'decade'), 'year') && dates.lte(decade, dates.endOf(max, 'decade'), 'year');
}

function inCentury(date, start) {
  return dates.gte(date, dates.startOf(start, 'century'), 'year') && dates.lte(date, dates.endOf(start, 'century'), 'year');
}

function getCenturyDecades(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = dates.add(dates.startOf(_date, 'century'), -20, 'year');

  return days.map(function (i) {
    return date = dates.add(date, 10, 'year');
  });
}