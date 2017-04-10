import React from 'react';
import PropTypes from 'prop-types';
import CalendarView from './CalendarView';
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import CustomPropTypes from './util/propTypes';
import _   from './util/_';
import { instanceId } from './util/widgetHelpers';

let dayFormat = props => dateLocalizer.getFormat('weekday', props.dayFormat)
  , dateFormat = props => dateLocalizer.getFormat('dayOfMonth', props.dateFormat)

let optionId = (id, date) => `${id}__month_${dates.month(date)}-${dates.date(date)}`;

let propTypes = {
  culture: PropTypes.string,
  today: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  focused: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,

  dayComponent: CustomPropTypes.elementType,
  dayFormat: CustomPropTypes.dateFormat,
  dateFormat: CustomPropTypes.dateFormat
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
    let { focused, culture } = this.props
      , month = dates.visibleDays(focused, culture)
      , rows  = _.chunk(month, 7);

    return (
      <CalendarView {..._.omitOwnProps(this)}>
        <thead>
          <tr>
            {this.renderHeaders(
              rows[0],
              dayFormat(this.props),
              culture
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map(this.renderRow)}
        </tbody>
      </CalendarView>
    )
  },

  renderRow(row, rowIdx) {
    let {
        focused, today, disabled, onChange
      , value, culture, min, max
      , dayComponent: Day } = this.props
      , id = instanceId(this)
      , labelFormat = dateLocalizer.getFormat('footer');

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          let formattedDate = dateLocalizer.format(date, dateFormat(this.props), culture)
            , label = dateLocalizer.format(date, labelFormat, culture);

          return (
            <CalendarView.Cell
              key={colIdx}
              id={optionId(id, date)}
              label={label}
              date={date}
              now={today}
              min={min}
              max={max}
              unit="day"
              viewUnit="month"
              onChange={onChange}
              focused={focused}
              selected={value}
              disabled={disabled}
            >
              {Day ? <Day date={date} label={formattedDate}/> : formattedDate }
            </CalendarView.Cell>
          )
        })}
      </CalendarView.Row>
    )
  },

  renderHeaders(week, format, culture){
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
