import React from 'react'
import Button from './Button'
import { caretDown, chevronLeft, chevronRight } from './Icon'
import { Localizer } from './Localization'

interface Props {
  label: string
  labelId?: string

  upDisabled: boolean
  prevDisabled: boolean
  todayDisabled: boolean
  nextDisabled: boolean
  onViewChange: () => void
  onMoveLeft: () => void
  onMoveToday: () => void
  onMoveRight: () => void

  navigatePrevIcon?: React.ReactNode
  navigateNextIcon?: React.ReactNode

  localizer: Localizer
  isRtl?: boolean
}

function CalendarHeader({
  localizer,
  label,
  labelId,
  onMoveRight,
  onMoveToday,
  onMoveLeft,
  onViewChange,
  prevDisabled,
  todayDisabled,
  upDisabled,
  nextDisabled,
  navigatePrevIcon = chevronLeft,
  navigateNextIcon = chevronRight,
  isRtl,
}: Props) {
  return (
    <div className="rw-calendar-header">
      <Button
        acceptFocus
        id={labelId}
        onClick={onViewChange}
        className="rw-calendar-btn-view"
        disabled={upDisabled}
        aria-live="polite"
        aria-atomic="true"
      >
        {label} {caretDown}
      </Button>
      <Button
        acceptFocus
        className="rw-calendar-btn-left"
        onClick={onMoveLeft}
        disabled={prevDisabled}
        label={localizer.messages.moveBack()}
        icon={isRtl ? navigateNextIcon : navigatePrevIcon}
      />
      <Button
        acceptFocus
        className="rw-calendar-btn-today"
        disabled={todayDisabled}
        onClick={onMoveToday}
      >
        {localizer.messages.moveToday()}
      </Button>
      <Button
        acceptFocus
        className="rw-calendar-btn-right"
        onClick={onMoveRight}
        disabled={nextDisabled}
        label={localizer.messages.moveForward()}
        icon={isRtl ? navigatePrevIcon : navigateNextIcon}
      />
    </div>
  )
}

export default CalendarHeader
