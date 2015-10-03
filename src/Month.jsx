import React from 'react';
import cn from 'classnames';
import dates from './util/dates';
import config from './util/configuration'
import CustomPropTypes from './util/propTypes';
import _   from './util/_';
import { instanceId } from './util/widgetHelpers';

var localizers = config.locale
  , dayFormat = props => props.dayFormat || localizers.date.formats.weekday
  , dateFormat = props => props.dateFormat || localizers.date.formats.dayOfMonth

let optionId = (id, date) => `${id}__month_${dates.month(date)}-${dates.date(date)}`;

let propTypes = {
  optionID:         React.PropTypes.func,

  culture:          React.PropTypes.string,
  value:            React.PropTypes.instanceOf(Date),
  focused:          React.PropTypes.instanceOf(Date),
  min:              React.PropTypes.instanceOf(Date),
  max:              React.PropTypes.instanceOf(Date),

  dayComponent:     CustomPropTypes.elementType,

  dayFormat:        CustomPropTypes.dateFormat,
  dateFormat:       CustomPropTypes.dateFormat,
  footerFormat:     CustomPropTypes.dateFormat,

  onChange:         React.PropTypes.func.isRequired
};

let isEqual = (dateA, dateB) => dates.eq(dateA, dateB, 'day')

let MonthView = React.createClass({

  displayName: 'MonthView',

  statics: {
    isEqual
  },

  mixins: [
    require('./mixins/RtlChildContextMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes,

  componentDidUpdate() {
    let activeId = optionId(instanceId(this), this.props.focused);
    this.ariaActiveDescendant(activeId, null)
  },

  render(){
    var { focused, culture } = this.props
      , month = dates.visibleDays(focused, culture)
      , rows  = _.chunk(month, 7);

    var elementProps = _.omit(this.props, Object.keys(propTypes));

    return (
      <table {...elementProps}
        role='grid'
      >
        <thead>
          <tr>{this._headers(dayFormat(this.props), culture)}</tr>
        </thead>
        <tbody>
          {rows.map(this._row)}
        </tbody>
      </table>
    )
  },

  _row(row, rowIdx){
    let {
        focused, today, disabled, onChange
      , value, culture, min, max
      , dayComponent: Day } = this.props
      , id = instanceId(this)
      , labelFormat = localizers.date.formats.footer;

    return (
      <tr key={'week_' + rowIdx} role='row'>
        { row.map((day, colIdx) => {

          var isFocused  = isEqual(day, focused)
            , isSelected = isEqual(day, value)
            , isToday = isEqual(day, today)
            , date = localizers.date.format(day, dateFormat(this.props), culture)
            , label = localizers.date.format(day, labelFormat, culture);

          var currentID = optionId(id, day);
          var emptyCellClass = !dates.inRange(day, min, max) ? "rw-empty-cell" : "";
          return (
                <td
                  key={'day_' + colIdx}
                  role='gridcell'
                  id={currentID}
                  title={label}
                  aria-selected={isSelected}
                  aria-label={label}
                  aria-readonly={disabled}
                  className={emptyCellClass}
                >
                  <span
                    aria-labelledby={currentID}
                    onClick={onChange.bind(null, day)}
                    className={cn('rw-btn', {
                      'rw-off-range':      dates.month(day) !== dates.month(focused),
                      'rw-state-focus':    isFocused,
                      'rw-state-selected': isSelected,
                      'rw-now':            isToday
                    })}
                  >
                    {
                      Day
                        ? <Day date={day} label={date}/>
                        : date
                    }
                  </span>
                </td>
              )
        })}
      </tr>
    )
  },

  _headers(format, culture){
    return [0, 1, 2, 3, 4, 5, 6].map( (day) =>
      <th key={'header_' + day }>{ localizers.date.format(day, format, culture) }</th>)
  }

});

export default MonthView
