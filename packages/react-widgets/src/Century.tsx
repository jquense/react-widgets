import React, { useMemo } from 'react'
import CalendarView, { CalendarViewProps } from './CalendarView'
import { Localizer } from './Localization'
import { chunk } from './_'
import dates from './dates'

interface CenturyProps extends CalendarViewProps {
  disabled?: boolean
  onChange: (nextDate: Date) => void
  value?: Date | null
  min: Date
  max: Date
  localizer: Localizer
}

function CenturyView({
  focusedItem,
  disabled,
  onChange,
  value,
  localizer,
  min,
  max,
  ...props
}: CenturyProps) {
  const chunks = useMemo(() => chunk(getCenturyDecades(focusedItem), 4), [
    focusedItem,
  ])

  return (
    <CalendarView {...props} focusedItem={focusedItem}>
      <CalendarView.Body>
        {chunks.map((row, rowIdx) => (
          <CalendarView.Row key={rowIdx}>
            {row.map((date, colIdx) => {
              let label = localizer.formatDate(
                dates.startOf(date, 'decade'),
                'decade',
              )

              return (
                <CalendarView.Cell
                  key={colIdx}
                  unit="decade"
                  viewUnit="century"
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

function getCenturyDecades(_date: Date) {
  let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let date = dates.add(dates.startOf(_date, 'century'), -20, 'year')

  return days.map(() => (date = dates.add(date, 10, 'year')))
}

export default CenturyView
