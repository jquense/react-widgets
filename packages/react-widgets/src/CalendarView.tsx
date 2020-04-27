import cn from 'classnames'
import { DateUnit } from 'date-arithmetic'
import React, { ReactNode, useEffect, useRef } from 'react'
import dates from './dates'
import useFocusManager from './useFocusManager'

function clamp(date: Date, min: Date, max: Date) {
  return dates.max(dates.min(date, max), min)
}

export interface CalendarViewProps {
  id: string
  className?: string
  children?: ReactNode
  focusedItem: Date
  onKeyDown: React.KeyboardEventHandler<HTMLTableElement>
  'aria-labelledby': string
}

function CalendarView({
  className,
  focusedItem,
  onKeyDown,
  children,
  'aria-labelledby': labelledby,
}: CalendarViewProps) {
  const ref = useRef<HTMLTableElement>(null)
  const [focusEvents, focused] = useFocusManager(ref)

  useEffect(() => {
    const node = ref.current
    if (!node || !focused) return

    node.querySelector<HTMLElement>('.rw-cell[tabindex]')?.focus()
  }, [focusedItem, focused, ref])

  return (
    <table
      role="grid"
      ref={ref}
      tabIndex={-1}
      {...focusEvents}
      onKeyDown={onKeyDown}
      aria-labelledby={labelledby}
      className={cn(className, 'rw-nav-view', 'rw-calendar-grid')}
    >
      {children}
    </table>
  )
}

interface CellProps {
  onChange(date: Date): void
  now?: Date
  min: Date
  max: Date
  date: Date
  unit: DateUnit
  disabled?: boolean
  selected?: Date | null
  focusedItem?: Date
  viewUnit: 'month' | 'year' | 'decade' | 'century'
  children?: ReactNode
  label: string
}

function CalendarViewCell({
  onChange,
  min,
  max,
  date,
  unit,
  disabled,
  selected,
  focusedItem,
  viewUnit,
  children,
  label,
}: CellProps) {
  const isEqual = (nextDate: Date | undefined) => dates.eq(date, nextDate, unit)

  const isEmpty = !dates.inRange(date, min, max, unit)
  const isDisabled = disabled || isEmpty

  // const isNow = now && isEqual(now)

  const isFocused = !disabled && !isEmpty && isEqual(focusedItem)
  const isSelected = selected && isEqual(selected)

  const isOffView =
    date &&
    focusedItem &&
    viewUnit &&
    dates[viewUnit](date) !== dates[viewUnit](focusedItem)

  const handleChange = () => {
    onChange(clamp(date, min, max))
  }

  return (
    <td
      role="gridcell"
      title={label}
      aria-label={label}
      aria-readonly={disabled}
      aria-selected={Boolean(isSelected)}
      tabIndex={isFocused ? 0 : void 0}
      onClick={!isDisabled ? handleChange : undefined}
      className={cn(
        'rw-cell',
        // isNow && 'rw-now',
        isDisabled && 'rw-state-disabled',
        isEmpty && 'rw-cell-not-allowed',
        isOffView && 'rw-cell-off-range',
        isSelected && 'rw-state-selected',
      )}
    >
      <span aria-hidden>{children}</span>
    </td>
  )
}

CalendarView.Body = (
  props: React.AllHTMLAttributes<HTMLTableSectionElement>,
) => <tbody className="rw-calendar-body" {...props} />

CalendarView.Row = (props: React.AllHTMLAttributes<HTMLTableRowElement>) => (
  <tr role="row" className="rw-calendar-row" {...props} />
)
CalendarView.Cell = CalendarViewCell

export default CalendarView
