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

function Popup({
  className,
  dropUp,
  open,
  transition: Transition,
  children,
  ...props
}) {
  return (
    <Transition
      {...props}
      in={open}
      dropUp={dropUp}
      innerClassName="rw-popup"
      className={cn(className, 'rw-popup-container')}
    >
      <StaticContainer shouldUpdate={open}>{children}</StaticContainer>
    </Transition>
  )
}

Popup.propTypes = propTypes
Popup.defaultProps = defaultProps

export default Popup
