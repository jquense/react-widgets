import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import SlideDownTransition from './SlideDownTransition'
import { elementType } from './util/PropTypes'

const StaticContainer = React.memo(
  ({ children }) => children,
  (_, { shouldUpdate }) => !shouldUpdate,
)

const defaultProps = {
  open: false,
  transition: SlideDownTransition,
}

const propTypes = {
  open: PropTypes.bool,
  dropUp: PropTypes.bool,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  transition: elementType,
}

const Popup = React.forwardRef(
  (
    {
      className,
      dropUp,
      open,
      role,
      id,
      transition: Transition,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Transition
        {...props}
        in={open}
        dropUp={dropUp}
        className={cn('rw-popup-container', className)}
      >
        <div id={id} className="rw-popup" ref={ref} role={role}>
          <StaticContainer shouldUpdate={open}>{children}</StaticContainer>
        </div>
      </Transition>
    )
  },
)

Popup.displayName = 'Popup'
Popup.propTypes = propTypes
Popup.defaultProps = defaultProps

export default Popup
