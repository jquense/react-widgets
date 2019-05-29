import cn from 'classnames'
import events from 'dom-helpers/events'
import css from 'dom-helpers/style'
import getHeight from 'dom-helpers/query/height'
import {
  transitionDuration,
  transitionEnd,
} from 'dom-helpers/transition/properties'
import PropTypes from 'prop-types'
import React from 'react'
import Transition, {
  ENTERING,
  EXITING,
  EXITED,
} from 'react-transition-group/Transition'

const transitionClasses = {
  [ENTERING]: 'rw-popup-transition-entering',
  [EXITING]: 'rw-popup-transition-exiting',
  [EXITED]: 'rw-popup-transition-exited',
}

const propTypes = {
  in: PropTypes.bool.isRequired,
  dropUp: PropTypes.bool,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
}

function parseDuration(node) {
  let str = css(node, transitionDuration)
  let mult = str.indexOf('ms') === -1 ? 1000 : 1
  return parseFloat(str) * mult
}

class SlideDownTransition extends React.Component {
  getHeight(container) {
    let content = container.firstChild
    let margin =
      parseInt(css(content, 'margin-top'), 10) +
      parseInt(css(content, 'margin-bottom'), 10)

    let old = container.style.display
    let height

    container.style.display = 'block'
    height = (getHeight(content) || 0) + (isNaN(margin) ? 0 : margin)
    container.style.display = old
    return height
  }

  setContainerHeight = elem => {
    console.log(elem, this.element)
    elem.style.height = this.getHeight(elem) + 'px'
  }

  clearContainerHeight = elem => {
    elem.style.height = ''
  }

  handleEntered = elem => {
    this.clearContainerHeight(elem)

    if (this.props.onEntered) this.props.onEntered()
  }

  handleEntering = () => {
    if (this.props.onEntering) this.props.onEntering()
  }

  handleExit = elem => {
    this.setContainerHeight(elem)

    if (this.props.onExit) this.props.onExit()
  }
  handleExited = elem => {
    this.clearContainerHeight(elem)
    if (this.props.onExited) this.props.onExited()
  }

  handleTransitionEnd = (node, done) => {
    let duration = parseDuration(node.lastChild) || 0

    const handler = () => {
      events.off(node, transitionEnd, handler, false)
      done()
    }

    setTimeout(handler, duration * 1.5)
    events.on(node, transitionEnd, handler, false)
  }

  attachRef = ref => (this.element = ref)

  render() {
    const { children, className, innerClassName, dropUp } = this.props

    return (
      <Transition
        appear
        in={this.props.in}
        timeout={5000}
        onEnter={this.setContainerHeight}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExited={this.handleExited}
        addEndListener={this.handleTransitionEnd}
      >
        {(status, innerProps) => (
          <div
            {...innerProps}
            className={cn(
              className,
              dropUp && 'rw-dropup',
              transitionClasses[status],
            )}
          >
            <div className={`rw-popup-transition ${innerClassName}`}>
              {children}
            </div>
          </div>
        )}
      </Transition>
    )
  }
}

SlideDownTransition.propTypes = propTypes

export default SlideDownTransition
