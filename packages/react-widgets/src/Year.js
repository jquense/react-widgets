import React from 'react'

import PropTypes from 'prop-types'

import CalendarView from './CalendarView'
import dates from './util/dates'
import { chunk } from './util/_'

function YearView({
  focusedItem,
  activeId,
  disabled,
  onChange,
  value,
  today,
  min,
  localizer,
  max,
  ...props
}) {
  let months = dates.monthsInYear(dates.year(focusedItem))

  return (
    <CalendarView
      {...props}
      onChange={onChange}
      focusedItem={focusedItem}
      activeId={activeId}
    >
      <CalendarView.Body>
        {chunk(months, 4).map((row, rowIdx) => (
          <CalendarView.Row key={rowIdx}>
            {row.map((date, colIdx) => {
              let label = localizer.formatDate(date, 'header')

              return (
                <CalendarView.Cell
                  key={colIdx}
                  activeId={activeId}
                  label={label}
                  date={date}
                  now={today}
                  min={min}
                  max={max}
                  unit="month"
                  onChange={onChange}
                  focusedItem={focusedItem}
                  selected={value}
                  disabled={disabled}
                >
                  {localizer.formatDate(date, 'month')}
                </CalendarView.Cell>
              )
            })}
          </CalendarView.Row>
        ))}
      </CalendarView.Body>
    </CalendarView>
  )
}

YearView.propTypes = {
  activeId: PropTypes.string,
  today: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  focusedItem: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,

  localizer: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
}

export default YearView
