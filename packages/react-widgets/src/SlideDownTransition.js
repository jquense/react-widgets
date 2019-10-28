import cn from 'classnames'
import addEventListener from 'dom-helpers/addEventListener'
import css from 'dom-helpers/css'
import getHeight from 'dom-helpers/height'
import { emulateTransitionEnd, parseDuration } from 'dom-helpers/transitionEnd'
import PropTypes from 'prop-types'
import React from 'react'
import Transition, {
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition'

const transitionClasses = {
  [ENTERING]: 'rw-popup-transition-entering',
  [EXITING]: 'rw-popup-transition-exiting',
  [EXITED]: 'rw-popup-transition-exited',
}

const propTypes = {
  in: PropTypes.bool.isRequired,
  innerClassName: PropTypes.string,
  dropUp: PropTypes.bool,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
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

  handleTransitionEnd = (el, done) => {
    const duration = parseDuration(el.firstChild)
    emulateTransitionEnd(el, duration + 10)
    addEventListener(el, 'transitionend', done, { once: true })
  }

  attachRef = ref => (this.element = ref)

  render() {
    const { children, className, innerClassName, dropUp } = this.props

    return (
      <Transition
        appear
        in={this.props.in}
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
