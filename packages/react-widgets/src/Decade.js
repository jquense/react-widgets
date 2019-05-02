import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import CalendarView from './CalendarView'
import dates from './util/dates'
import { chunk } from './util/_'

const propTypes = {
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

function DecadeView({
  focusedItem,
  activeId,
  disabled,
  onChange,
  value,
  today,
  localizer,
  min,
  max,
  ...props
}) {
  const chunks = useMemo(() => chunk(getDecadeYears(focusedItem), 4), [
    focusedItem,
  ])

  return (
    <CalendarView
      {...props}
      focusedItem={focusedItem}
      onChange={onChange}
      activeId={activeId}
    >
      <CalendarView.Body>
        {chunks.map((row, rowIdx) => (
          <CalendarView.Row key={rowIdx}>
            {row.map((date, colIdx) => {
              let label = localizer.formatDate(date, 'year')

              return (
                <CalendarView.Cell
                  key={colIdx}
                  unit="year"
                  activeId={activeId}
                  label={label}
                  date={date}
                  now={today}
                  min={min}
                  max={max}
                  onChange={onChange}
                  focusedItem={focusedItem}
                  selected={value}
                  disabled={disabled}
                >
                  {label}
                </CalendarView.Cell>
              )
            })}
          </CalendarView.Row>
        ))}
      </CalendarView.Body>
    </CalendarView>
  )
}

DecadeView.propTypes = propTypes

function getDecadeYears(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    date = dates.add(dates.startOf(_date, 'decade'), -2, 'year')

  return days.map(() => (date = dates.add(date, 1, 'year')))
}

export default DecadeView
