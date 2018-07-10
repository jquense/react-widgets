import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { chevronRight, chevronLeft } from './Icon'

class Header extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    labelId: PropTypes.string,

    upDisabled: PropTypes.bool.isRequired,
    prevDisabled: PropTypes.bool.isRequired,
    nextDisabled: PropTypes.bool.isRequired,
    onViewChange: PropTypes.func.isRequired,
    onMoveLeft: PropTypes.func.isRequired,
    onMoveRight: PropTypes.func.isRequired,

    navigatePrevIcon: PropTypes.node,
    navigateNextIcon: PropTypes.node,

    messages: PropTypes.shape({
      moveBack: PropTypes.func.isRequired,
      moveForward: PropTypes.func.isRequired,
    }),
    isRtl: PropTypes.bool,
  }

  render() {
    let {
      messages,
      label,
      labelId,
      onMoveRight,
      onMoveLeft,
      onViewChange,
      prevDisabled,
      upDisabled,
      nextDisabled,
      navigatePrevIcon = chevronLeft,
      navigateNextIcon = chevronRight,
      isRtl,
    } = this.props

    return (
      <div className="rw-calendar-header">
        <Button
          className="rw-calendar-btn-left"
          onClick={onMoveLeft}
          disabled={prevDisabled}
          label={messages.moveBack()}
          icon={isRtl ? navigateNextIcon : navigatePrevIcon}
        />
        <Button
          id={labelId}
          onClick={onViewChange}
          className="rw-calendar-btn-view"
          disabled={upDisabled}
          aria-live="polite"
          aria-atomic="true"
        >
          {label}
        </Button>
        <Button
          className="rw-calendar-btn-right"
          onClick={onMoveRight}
          disabled={nextDisabled}
          label={messages.moveForward()}
          icon={isRtl ? navigatePrevIcon : navigateNextIcon}
        />
      </div>
    )
  }
}

export default Header
