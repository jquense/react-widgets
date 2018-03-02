import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'

import SlideDownTransition from './SlideDownTransition'
import { elementType } from './util/PropTypes'

class StaticContainer extends React.Component {
  static propTypes = { shouldUpdate: () => {} }
  shouldComponentUpdate({ shouldUpdate }) {
    return !!shouldUpdate
  }
  render() {
    const { className, children, ...props } = this.props
    delete props.shouldUpdate
    return cloneElement(children, {
      ...props,
      className: cn(className, children.props.className, 'rw-popup'),
    })
  }
}

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
        className={cn(className, 'rw-popup-container')}
      >
        <StaticContainer shouldUpdate={open}>
          {React.Children.only(this.props.children)}
        </StaticContainer>
      </Transition>
    )
  }
}

export default Popup
