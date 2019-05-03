import cn from 'classnames'
import transition from 'dom-helpers/transition'
import PropTypes from 'prop-types'
import React from 'react'

const DirectionPropType = PropTypes.oneOf(['left', 'right', 'top', 'bottom'])

const prefix = 'rw-calendar-transition'
const active = `${prefix}-active`
const next = `${prefix}-next`
const prev = `${prefix}-prev`

const clone = (el, cls) =>
  el &&
  React.cloneElement(el, {
    className: cn(el.props.className, prefix, cls),
  })

class SlideTransitionGroup extends React.Component {
  static defaultProps = {
    direction: 'left',
  }

  static propTypes = {
    direction: DirectionPropType,
  }

  constructor(...args) {
    super(...args)

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

    let previous = this.container.current.firstChild
    const hadFocus =
      document.activeElement && previous.contains(document.activeElement)

    this.setState({ prevClasses: '', currentClasses: next }, () => {
      let current = this.container.current.lastChild

      this.props.onTransitionStart &&
        this.props.onTransitionStart(current, hadFocus)
      current.clientHeight // eslint-disable-line

      this.setState(
        {
          prevClasses: prev,
          currentClasses: cn(next, active),
        },
        () => {
          transition.end(current, () => {
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
    this.props.onTransitionEnd && this.props.onTransitionEnd(current, hadFocus)
  }

  render() {
    let {
      direction,
      children,
      onTransitionEnd: _,
      onTransitionStart: _0,
      ...props
    } = this.props

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
