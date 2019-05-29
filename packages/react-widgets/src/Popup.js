import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import SlideDownTransition from './SlideDownTransition'
import { elementType } from './util/PropTypes'

const StaticContainer = React.memo(
  ({ children }) => children,
  (_, { shouldUpdate }) => !shouldUpdate,
)

class Popup extends React.Component {
  static defaultProps = {
    open: false,
    transition: SlideDownTransition,
  }

  static propTypes = {
    open: PropTypes.bool,
    dropUp: PropTypes.bool,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    transition: elementType,
  }

  render() {
    let {
      className,
      dropUp,
      open,
      transition: Transition,
      ...props
    } = this.props

    return (
      <Transition
        {...props}
        in={open}
        dropUp={dropUp}
        innerClassName="rw-popup"
        className={cn(className, 'rw-popup-container')}
      >
        <StaticContainer shouldUpdate={open}>
          {this.props.children}
        </StaticContainer>
      </Transition>
    )
  }
}

export default Popup
