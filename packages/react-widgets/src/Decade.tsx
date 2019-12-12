import React, { useMemo } from 'react'
import CalendarView, { CalendarViewProps } from './CalendarView'
import { Localizer } from './Localization'
import { chunk } from './util/_'
import dates from './util/dates'

interface DecadeProps extends CalendarViewProps {
  disabled?: boolean
  onChange: (nextDate: Date) => void
  value?: Date
  min: Date
  max: Date
  localizer: Localizer
}

function DecadeView({
  focusedItem,
  disabled,
  onChange,
  value,
  localizer,
  min,
  max,
  ...props
}: DecadeProps) {
  const chunks = useMemo(() => chunk(getDecadeYears(focusedItem), 4), [
    focusedItem,
  ])

  return (
    <CalendarView {...props} focusedItem={focusedItem}>
      <CalendarView.Body>
        {chunks.map((row, rowIdx) => (
          <CalendarView.Row key={rowIdx}>
            {row.map((date, colIdx) => {
              let label = localizer.formatDate(date, 'year')

              return (
                <CalendarView.Cell
                  key={colIdx}
                  unit="year"
                  viewUnit="decade"
                  label={label}
                  date={date}
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

function getDecadeYears(_date: Date) {
  let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let date = dates.add(dates.startOf(_date, 'decade'), -2, 'year')

  return days.map(() => (date = dates.add(date, 1, 'year')))
}

export default DecadeView
