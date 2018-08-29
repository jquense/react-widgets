import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import CalendarView from './CalendarView'
import dates from './util/dates'
import { chunk } from './util/_'
import * as Props from './util/Props'

let isEqual = (dateA, dateB) => dates.eq(dateA, dateB, 'day')

class MonthView extends React.Component {
  static isEqual = isEqual

  static propTypes = {
    activeId: PropTypes.string,
    today: PropTypes.instanceOf(Date),
    value: PropTypes.instanceOf(Date),
    focused: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,

    localizer: PropTypes.object.isRequired,
    dayComponent: PropTypes.any,
    disabled: PropTypes.bool,
  }

  renderHeaders(week) {
    const { localizer } = this.props
    return week.map(date => {
      return (
        <th
          className="rw-head-cell"
          key={
            'header_' + dates.weekday(date, undefined, localizer.firstOfWeek)
          }
        >
          {localizer.formatDate(date, 'weekday')}
        </th>
      )
    })
  }

  renderRow = (row, rowIdx) => {
    let {
      focused,
      today,
      activeId,
      disabled,
      onChange,
      value,
      min,
      max,
      localizer,
      dayComponent: Day,
    } = this.props

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          let formattedDate = localizer.formatDate(date, 'dayOfMonth')
          let label = localizer.formatDate(date, 'footer')

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
              {Day ? <Day date={date} label={formattedDate} /> : formattedDate}
            </CalendarView.Cell>
          )
        })}
      </CalendarView.Row>
    )
  }

  render() {
    let { className, focused, activeId, localizer } = this.props
    let month = dates.visibleDays(focused, localizer.firstOfWeek)
    let rows = chunk(month, 7)

    return (
      <CalendarView
        {...Props.omitOwn(this)}
        activeId={activeId}
        className={cn(className, 'rw-calendar-month')}
      >
        <thead className="rw-calendar-head">
          <tr className="rw-calendar-row">{this.renderHeaders(rows[0])}</tr>
        </thead>
        <CalendarView.Body>{rows.map(this.renderRow)}</CalendarView.Body>
      </CalendarView>
    )
  }
}

export default MonthView
