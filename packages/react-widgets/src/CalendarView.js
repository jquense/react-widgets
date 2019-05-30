import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import dates from './util/dates'
import useFocusManager from './util/useFocusManager'

const VIEW_UNITS = ['month', 'year', 'decade', 'century']

function clamp(date, min, max) {
  return dates.max(dates.min(date, max), min)
}

const viewPropTypes = {
  focusedItem: PropTypes.any,
  onKeyDown: PropTypes.func,
  'aria-labelledby': PropTypes.string,
}

function CalendarView({
  className,
  focusedItem,
  onKeyDown,
  children,
  'aria-labelledby': labelledby,
}) {
  const ref = useRef(null)
  const [focusEvents, focused] = useFocusManager(ref)

  useEffect(() => {
    const node = ref.current
    if (!node || !focused) return

    node.querySelector('.rw-cell[tabindex]').focus()
  }, [focusedItem, focused, ref])

  return (
    <table
      role="grid"
      ref={ref}
      tabIndex="-1"
      {...focusEvents}
      onKeyDown={onKeyDown}
      aria-labelledby={labelledby}
      className={cn(className, 'rw-nav-view', 'rw-calendar-grid')}
    >
      {children}
    </table>
  )
}

CalendarView.propTypes = viewPropTypes

const cellPropTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  now: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date),
  focusedItem: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  unit: PropTypes.oneOf(['day', ...VIEW_UNITS]),
  viewUnit: PropTypes.oneOf(VIEW_UNITS),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

function CalendarViewCell({
  onChange,
  now,
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
}) {
  const isEqual = nextDate => dates.eq(date, nextDate, unit)

  const isEmpty = !dates.inRange(date, min, max, unit)
  const isDisabled = disabled || isEmpty

  const isNow = now && isEqual(now)

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
      aria-selected={isSelected}
      tabIndex={isFocused ? 0 : null}
      onClick={!isDisabled ? handleChange : undefined}
      className={cn(
        'rw-cell',
        isNow && 'rw-now',
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

CalendarViewCell.propTypes = cellPropTypes

CalendarView.Body = props => <tbody className="rw-calendar-body" {...props} />

CalendarView.Row = props => (
  <tr role="row" className="rw-calendar-row" {...props} />
)
CalendarView.Cell = CalendarViewCell

export default CalendarView
