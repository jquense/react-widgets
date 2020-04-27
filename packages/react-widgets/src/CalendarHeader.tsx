import React from 'react'
import CalendarButton from './CalendarButton'
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
      <CalendarButton
        id={labelId}
        onClick={onViewChange}
        className="rw-calendar-btn-view"
        disabled={upDisabled}
        aria-live="polite"
        aria-atomic="true"
      >
        {label} {caretDown}
      </CalendarButton>
      <CalendarButton
        className="rw-calendar-btn-left"
        onClick={onMoveLeft}
        disabled={prevDisabled}
        label={localizer.messages.moveBack()}
        icon={navigatePrevIcon}
      />
      <CalendarButton
        className="rw-calendar-btn-today"
        disabled={todayDisabled}
        onClick={onMoveToday}
      >
        {localizer.messages.moveToday()}
      </CalendarButton>
      <CalendarButton
        className="rw-calendar-btn-right"
        onClick={onMoveRight}
        disabled={nextDisabled}
        label={localizer.messages.moveForward()}
        icon={navigateNextIcon}
      />
    </div>
  )
}

export default CalendarHeader
