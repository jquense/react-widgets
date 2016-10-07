import React from 'react';
import CalendarView from './CalendarView';
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import CustomPropTypes from './util/propTypes';
import _   from './util/_';

let dayFormat = props => dateLocalizer.getFormat('weekday', props.dayFormat)
  , dateFormat = props => dateLocalizer.getFormat('dayOfMonth', props.dateFormat)

let isEqual = (dateA, dateB) => dates.eq(dateA, dateB, 'day')

class MonthView extends React.Component {

  static propTypes = {
    activeId: React.PropTypes.string,
    culture: React.PropTypes.string,
    today: React.PropTypes.instanceOf(Date),
    value: React.PropTypes.instanceOf(Date),
    focused: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func.isRequired,

    dayComponent: CustomPropTypes.elementType,
    dayFormat: CustomPropTypes.dateFormat,
    dateFormat: CustomPropTypes.dateFormat,
    disabled: React.PropTypes.bool,
  };

  static isEqual = isEqual;

  renderRow = (row, rowIdx) => {
    let {
        focused
      , today
      , activeId
      , disabled
      , onChange
      , value
      , culture, min, max
      , dayComponent: Day } = this.props

    let labelFormat = dateLocalizer.getFormat('footer');

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          let formattedDate = dateLocalizer.format(date, dateFormat(this.props), culture)
            , label = dateLocalizer.format(date, labelFormat, culture);

          return (
            <CalendarView.Cell
              key={colIdx}
              activeId={activeId}
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
              {Day ? <Day date={date} label={formattedDate}/> : formattedDate}
            </CalendarView.Cell>
          )
        })}
      </CalendarView.Row>
    )
  }

  renderHeaders(week, format, culture){
    return week.map(date => {
      return (
        <th key={'header_' + dates.weekday(date, undefined, dateLocalizer.startOfWeek(culture)) }>
          { dateLocalizer.format(date, format, culture) }
        </th>
      )
    })
  }

  render() {
    let { focused, culture, activeId } = this.props
      , month = dates.visibleDays(focused, culture)
      , rows  = _.chunk(month, 7);

    return (
      <CalendarView
        {..._.omitOwnProps(this)}
        activeId={activeId}
        className="rw-calendar-month"
      >
        <thead>
          <tr>
            {this.renderHeaders(
              rows[0],
              dayFormat(this.props),
              culture
            )}
          </tr>
        </thead>
        <CalendarView.Body >
          {rows.map(this.renderRow)}
        </CalendarView.Body>
      </CalendarView>
    )
  }
}

export default MonthView
