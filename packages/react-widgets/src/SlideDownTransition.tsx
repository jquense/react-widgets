import cn from 'clsx'
import css from 'dom-helpers/css'
import getHeight from 'dom-helpers/height'
import transitionEnd from 'dom-helpers/transitionEnd'
import PropTypes from 'prop-types'
import React from 'react'
import Transition, {
  ENTERING,
  EXITED,
  EXITING,
  TransitionStatus,
} from 'react-transition-group/Transition'

const transitionClasses = {
  [ENTERING]: 'rw-slide-transition-entering',
  [EXITING]: 'rw-slide-transition-exiting',
  [EXITED]: 'rw-slide-transition-exited',
}

export interface SlideDownTransitionProps {
  in: boolean
  innerClassName?: string
  dropUp?: boolean
  onExit?: () => void
  onExited?: () => void
  onEntering?: () => void
  onEntered?: () => void
  className?: string
}

class SlideDownTransition extends React.Component<SlideDownTransitionProps> {
  static propTypes = {
    in: PropTypes.bool.isRequired,
    innerClassName: PropTypes.string,
    dropUp: PropTypes.bool,
    onExit: PropTypes.func,
    onExited: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
  }

  getHeight(container: HTMLElement) {
    let content = container.firstChild as HTMLElement
    let margin =
      parseInt(css(content, 'margin-top') as string, 10) +
      parseInt(css(content, 'margin-bottom') as string, 10)

    let old = container.style.display
    let height

    container.style.display = 'block'
    height = (getHeight(content) || 0) + (isNaN(margin) ? 0 : margin)
    container.style.display = old
    return height
  }

  setContainerHeight = (elem: HTMLElement) => {
    elem.style.height = this.getHeight(elem) + 'px'
  }

  clearContainerHeight = (elem: HTMLElement) => {
    elem.style.height = ''
  }

  handleEntered = (elem: HTMLElement) => {
    this.clearContainerHeight(elem)

    if (this.props.onEntered) this.props.onEntered()
  }

  handleEntering = () => {
    if (this.props.onEntering) this.props.onEntering()
  }

  handleExit = (elem: HTMLElement) => {
    this.setContainerHeight(elem)

    if (this.props.onExit) this.props.onExit()
  }
  handleExited = (elem: HTMLElement) => {
    this.clearContainerHeight(elem)
    if (this.props.onExited) this.props.onExited()
  }

  handleTransitionEnd = (el: HTMLElement, done: () => void) => {
    transitionEnd(el.firstChild as HTMLElement, done)
  }

  render() {
    const { children, className, dropUp, ...props } = this.props

    return (
      <Transition
        {...props}
        appear
        in={this.props.in}
        onEnter={this.setContainerHeight}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExited={this.handleExited}
        addEndListener={this.handleTransitionEnd}
        timeout={undefined as any /*hack*/}
      >
        {(status: TransitionStatus, innerProps: any) => (
          <div
            {...innerProps}
            className={cn(
              className,
              dropUp && 'rw-dropup',
              (transitionClasses as any)[status],
            )}
          >
            {React.cloneElement(children as React.ReactElement, {
              className: cn(
                'rw-slide-transition',
                (children as React.ReactElement).props.className,
              ),
            })}
          </div>
        )}
      </Transition>
    )
  }
}

export default SlideDownTransition
