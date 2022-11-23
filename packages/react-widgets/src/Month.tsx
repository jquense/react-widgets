import cn from 'clsx'
import React from 'react'
import CalendarView, { CalendarViewProps } from './CalendarView'
import { Localizer } from './Localization'
import { RenderProp } from './types'
import { chunk } from './_'
import dates from './dates'

export type RenderDayProp = RenderProp<{ date: Date; label: string }>

interface MonthProps extends CalendarViewProps {
  disabled?: boolean
  onChange: (nextDate: Date) => void
  value?: Date | null
  min: Date
  max: Date
  localizer: Localizer
  renderDay?: RenderDayProp
}

function visibleDays(date: Date, weekStart: number) {
  let current = dates.startOf(dates.startOf(date, 'month'), 'week', weekStart)
  let last = dates.endOf(dates.endOf(date, 'month'), 'week', weekStart)
  let days = [] as Date[]

  while (dates.lte(current, last, 'day')) {
    days.push(current)
    current = dates.add(current, 1, 'day')
  }

  return days
}

function MonthView({
  className,
  focusedItem,
  disabled,
  onChange,
  value,
  min,
  max,
  localizer,
  renderDay,
  ...props
}: MonthProps) {
  let month = visibleDays(focusedItem, localizer.firstOfWeek())
  let rows = chunk(month, 7)

  return (
    <CalendarView
      {...props}
      focusedItem={focusedItem}
      className={cn(className, 'rw-calendar-month')}
    >
      <div role="rowgroup" className="rw-calendar-head">
        <CalendarView.Row className="rw-calendar-row">
          {rows[0].map((date, idx) => (
            <div role="columnheader" className="rw-head-cell" key={idx}>
              {localizer.formatDate(date, 'weekday')}
            </div>
          ))}
        </CalendarView.Row>
      </div>
      <CalendarView.Body>
        {rows.map((row, rowIdx) => (
          <CalendarView.Row key={rowIdx}>
            {row.map((date, colIdx) => {
              let formattedDate = localizer.formatDate(date, 'dayOfMonth')
              let label = localizer.formatDate(date, 'date')

              return (
                <CalendarView.Cell
                  key={colIdx}
                  label={label}
                  date={date}
                  min={min}
                  max={max}
                  unit="day"
                  viewUnit="month"
                  onChange={onChange}
                  focusedItem={focusedItem}
                  selected={value}
                  disabled={disabled}
                >
                  {renderDay
                    ? renderDay({ date, label: formattedDate })
                    : formattedDate}
                </CalendarView.Cell>
              )
            })}
          </CalendarView.Row>
        ))}
      </CalendarView.Body>
    </CalendarView>
  )
}

export default MonthView
