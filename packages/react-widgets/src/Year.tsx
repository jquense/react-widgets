import React from 'react'
import CalendarView, { CalendarViewProps } from './CalendarView'
import { Localizer } from './Localization'
import { chunk } from './util/_'
import dates from './util/dates'

interface YearProps extends CalendarViewProps {
  disabled?: boolean
  onChange: (nextDate: Date) => void
  value?: Date | null;
  min: Date
  max: Date
  localizer: Localizer
}

function YearView({
  focusedItem,
  disabled,
  onChange,
  value,
  min,
  localizer,
  max,
  ...props
}: YearProps) {
  let months = dates.monthsInYear(dates.year(focusedItem))

  return (
    <CalendarView {...props} focusedItem={focusedItem}>
      <CalendarView.Body>
        {chunk(months, 4).map((row, rowIdx) => (
          <CalendarView.Row key={rowIdx}>
            {row.map((date, colIdx) => {
              let label = localizer.formatDate(date, 'header')

              return (
                <CalendarView.Cell
                  key={colIdx}
                  label={label}
                  date={date}
                  min={min}
                  max={max}
                  unit="month"
                  viewUnit="year"
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

export default YearView
