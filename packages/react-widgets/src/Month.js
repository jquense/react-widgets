import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import CalendarView from './CalendarView'
import dates from './util/dates'
import { chunk } from './util/_'

function renderHeaders(week, localizer) {
  return week.map(date => {
    return (
      <th
        scope="col"
        className="rw-head-cell"
        key={'header_' + dates.weekday(date, undefined, localizer.firstOfWeek)}
      >
        {localizer.formatDate(date, 'weekday')}
      </th>
    )
  })
}

function MonthView({
  className,
  focusedItem,
  today,
  activeId,
  disabled,
  onChange,
  value,
  min,
  max,
  localizer,
  dayComponent: Day,
  ...props
}) {
  let month = dates.visibleDays(focusedItem, localizer.firstOfWeek)
  let rows = chunk(month, 7)

  return (
    <CalendarView
      {...props}
      onChange={onChange}
      activeId={activeId}
      focusedItem={focusedItem}
      className={cn(className, 'rw-calendar-month')}
    >
      <thead className="rw-calendar-head">
        <tr className="rw-calendar-row">{renderHeaders(rows[0], localizer)}</tr>
      </thead>
      <CalendarView.Body>
        {rows.map((row, rowIdx) => (
          <CalendarView.Row key={rowIdx}>
            {row.map((date, colIdx) => {
              let formattedDate = localizer.formatDate(date, 'dayOfMonth')
              let label = localizer.formatDate(date, 'footer')

              return (
                <CalendarView.Cell
                  key={colIdx}
                  label={label}
                  date={date}
                  now={today}
                  min={min}
                  max={max}
                  unit="day"
                  viewUnit="month"
                  onChange={onChange}
                  focusedItem={focusedItem}
                  selected={value}
                  disabled={disabled}
                >
                  {Day ? (
                    <Day date={date} label={formattedDate} />
                  ) : (
                    formattedDate
                  )}
                </CalendarView.Cell>
              )
            })}
          </CalendarView.Row>
        ))}
      </CalendarView.Body>
    </CalendarView>
  )
}

MonthView.propTypes = {
  activeId: PropTypes.string,
  today: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  focusedItem: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,

  localizer: PropTypes.object.isRequired,
  dayComponent: PropTypes.any,
  disabled: PropTypes.bool,
}

export default MonthView
