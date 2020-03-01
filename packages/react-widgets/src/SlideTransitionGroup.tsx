import cn from 'classnames'
import transitionEnd from 'dom-helpers/transitionEnd'
import PropTypes from 'prop-types'
import React from 'react'
import { ClassValue } from 'classnames/types'

const DirectionPropType = PropTypes.oneOf(['left', 'right', 'top', 'bottom'])

const prefix = 'rw-calendar-transition'
const active = `${prefix}-active`
const next = `${prefix}-next`
const prev = `${prefix}-prev`

const clone = (el: React.ReactElement, cls: ClassValue[]) =>
  el &&
  React.cloneElement(el, {
    className: cn(el.props.className, prefix, cls),
  })

interface SlideTransitionGroupProps{
  onTransitionEnd: ()=> void;
}

class SlideTransitionGroup extends React.Component<SlideTransitionGroupProps> {
  static defaultProps = {
    direction: 'left',
  }

  static propTypes = {
    direction: DirectionPropType,
    onTransitionEnd: PropTypes.func,
  }
  
  isTransitioning?: boolean;
  container: React.RefObject<HTMLDivElement>
  current: React.ReactNode
  flush?: boolean;
  prev: React.ReactNode | null;

  constructor(args: SlideTransitionGroupProps) {
    super(args)

    this.current = this.props.children
    this.container = React.createRef()

    this.state = {
      prevClasses: '',
      currentClasses: '',
    }
  }

  componentDidUpdate() {
    if (!this.flush || this.isTransitioning) return

    this.flush = false
    this.isTransitioning = true

    let previous = this.container.current!.firstChild!
    const hadFocus =
      document.activeElement && previous.contains(document.activeElement)

    this.setState({ prevClasses: '', currentClasses: next }, () => {
      let current = this.container.current!.lastChild! as HTMLElement

      current.clientHeight // eslint-disable-line

      this.setState(
        {
          prevClasses: prev,
          currentClasses: cn(next, active),
        },
        () => {
          transitionEnd(current, () => {
            this.prev = null

            if (this.current.key !== this.props.children.key) {
              this.current = this.props.children
            }

            this.setState({ prevClasses: '', currentClasses: '' }, () =>
              this.handleTransitionEnd(hadFocus),
            )
          })
        },
      )
    })
  }

  handleTransitionEnd = hadFocus => {
    this.isTransitioning = false
    let current = this.container.current.lastChild
    if (this.props.onTransitionEnd)
      this.props.onTransitionEnd(current, hadFocus)
  }

  render() {
    let { direction, children, onTransitionEnd: _, ...props } = this.props

    if (!this.isTransitioning) {
      if (this.current.key !== children.key) {
        this.prev = this.current
        this.flush = true
      }

      this.current = children
    }

    let { prevClasses, currentClasses } = this.state
    return (
      <div
        {...props}
        ref={this.container}
        className={cn(`${prefix}-group`, `${prefix}-${direction}`)}
      >
        {clone(this.prev, prevClasses)}
        {clone(this.current, currentClasses)}
      </div>
    )
  }
}

export default SlideTransitionGroup
