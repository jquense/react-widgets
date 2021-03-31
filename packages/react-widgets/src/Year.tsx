import React from 'react'
import CalendarView, { CalendarViewProps } from './CalendarView'
import { Localizer } from './Localization'
import { chunk } from './_'
import dates from './dates'

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
function monthsInYear(year: number) {
  let date = new Date(year, 0, 1)
  return months.map(i => dates.month(date, i))
}

interface YearProps extends CalendarViewProps {
  disabled?: boolean
  onChange: (nextDate: Date) => void
  value?: Date | null
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
  let months = monthsInYear(dates.year(focusedItem))

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
