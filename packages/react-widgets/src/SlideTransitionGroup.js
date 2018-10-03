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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.isTransitioning) return

    if (this.current.key !== nextProps.children.key) {
      this.prev = this.current
      this.flush = true
    }

    this.current = nextProps.children
  }

  componentDidUpdate() {
    if (!this.flush || this.isTransitioning) return
    this.flush = false
    this.isTransitioning = true

    this.setState({ prevClasses: '', currentClasses: next }, () => {
      let current = this.container.current.lastChild

      current.clientHeight // eslint-disable-line

      this.setState(
        {
          prevClasses: prev,
          currentClasses: cn(next, active),
        },
        () => {
          this.props.onTransitionStart && this.props.onTransitionStart(current)

          transition.end(current, () => {
            this.prev = null

            if (this.current.key !== this.props.children.key) {
              this.current = this.props.children
            }

            this.setState(
              { prevClasses: '', currentClasses: '' },
              this.handleTransitionEnd,
            )
          })
        },
      )
    })
  }

  handleTransitionEnd = () => {
    let current = this.container.current.lastChild

    this.isTransitioning = false
    this.props.onTransitionEnd && this.props.onTransitionEnd(current)
  }

  render() {
    let { direction, onTransitionEnd: _, ...props } = this.props
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
