import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import CalendarView from './CalendarView'
import dates from './util/dates'
import { date as dateLocalizer } from './util/localizers'
import * as CustomPropTypes from './util/PropTypes'
import { chunk } from './util/_'
import * as Props from './util/Props'

let isEqual = (dateA, dateB) => dates.eq(dateA, dateB, 'day')

class MonthView extends React.Component {
  static isEqual = isEqual

  static propTypes = {
    activeId: PropTypes.string,
    culture: PropTypes.string,
    today: PropTypes.instanceOf(Date),
    value: PropTypes.instanceOf(Date),
    focused: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,

    dayComponent: CustomPropTypes.elementType,
    dayFormat: CustomPropTypes.dateFormat,
    dateFormat: CustomPropTypes.dateFormat,
    footerFormat: CustomPropTypes.dateFormat,
    disabled: PropTypes.bool,
  }

  renderHeaders(week, format, culture) {
    let firstOfWeek = dateLocalizer.firstOfWeek(culture)
    return week.map(date => {
      return (
        <th
          className="rw-head-cell"
          key={'header_' + dates.weekday(date, undefined, firstOfWeek)}
        >
          {dateLocalizer.format(date, format, culture)}
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
      culture,
      min,
      max,
      footerFormat,
      dateFormat,
      dayComponent: Day,
    } = this.props

    footerFormat = dateLocalizer.getFormat('footer', footerFormat)
    dateFormat = dateLocalizer.getFormat('dayOfMonth', dateFormat)

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          let formattedDate = dateLocalizer.format(date, dateFormat, culture)
          let label = dateLocalizer.format(date, footerFormat, culture)

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
    let { className, focused, culture, activeId, dayFormat } = this.props
    let month = dates.visibleDays(focused, culture)
    let rows = chunk(month, 7)

    dayFormat = dateLocalizer.getFormat('weekday', dayFormat)

    return (
      <CalendarView
        {...Props.omitOwn(this)}
        activeId={activeId}
        className={cn(className, 'rw-calendar-month')}
      >
        <thead className="rw-calendar-head">
          <tr className="rw-calendar-row">
            {this.renderHeaders(rows[0], dayFormat, culture)}
          </tr>
        </thead>
        <CalendarView.Body>{rows.map(this.renderRow)}</CalendarView.Body>
      </CalendarView>
    )
  }
}

export default MonthView
