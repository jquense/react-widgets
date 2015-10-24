import React from 'react';
import cn from 'classnames';
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import CustomPropTypes from './util/propTypes';
import _   from './util/_';
import { instanceId } from './util/widgetHelpers';

var dayFormat = props => dateLocalizer.getFormat('weekday', props.dayFormat)
  , dateFormat = props => dateLocalizer.getFormat('dayOfMonth', props.dateFormat)

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
          <tr>{this._headers(rows[0], dayFormat(this.props), culture)}</tr>
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
      , labelFormat = dateLocalizer.getFormat('footer');

    return (
      <tr key={'week_' + rowIdx} role='row'>
        { row.map((day, colIdx) => {

          var isFocused  = isEqual(day, focused)
            , isSelected = isEqual(day, value)
            , isToday = isEqual(day, today)
            , date = dateLocalizer.format(day, dateFormat(this.props), culture)
            , label = dateLocalizer.format(day, labelFormat, culture);

          var currentID = optionId(id, day);

          return !dates.inRange(day, min, max)
              ? <td  key={'day_' + colIdx} role='presentation' className='rw-empty-cell'>&nbsp;</td>
              : (
                <td
                  key={'day_' + colIdx}
                  role='gridcell'
                  id={currentID}
                  title={label}
                  aria-selected={isSelected}
                  aria-label={label}
                  aria-readonly={disabled}
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

  _headers(week, format, culture){
    return week.map(date => {
      return (
        <th key={'header_' + dates.weekday(date, undefined, dateLocalizer.startOfWeek(culture)) }>
          { dateLocalizer.format(date, format, culture) }
        </th>
      )
    })
  }

});

export default MonthView
