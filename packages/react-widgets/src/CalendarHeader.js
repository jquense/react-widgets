import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { chevronRight, chevronLeft, caretDown } from './Icon'

class CalendarHeader extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    labelId: PropTypes.string,

    upDisabled: PropTypes.bool.isRequired,
    prevDisabled: PropTypes.bool.isRequired,
    todayDisabled: PropTypes.bool.isRequired,
    nextDisabled: PropTypes.bool.isRequired,
    onViewChange: PropTypes.func.isRequired,
    onMoveLeft: PropTypes.func.isRequired,
    onMoveToday: PropTypes.func.isRequired,
    onMoveRight: PropTypes.func.isRequired,

    navigatePrevIcon: PropTypes.node,
    navigateNextIcon: PropTypes.node,

    localizer: PropTypes.object.isRequired,
    isRtl: PropTypes.bool,
  }

  render() {
    let {
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
    } = this.props

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
}

export default CalendarHeader
