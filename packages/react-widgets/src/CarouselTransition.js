import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react-transition-group/TransitionGroup'

const propTypes = {}

const twice = fn => {
  let cnt = 0
  return event => {
    ++cnt >= 2 && fn(), (cnt = 0)
  }
}
class StaticContainer extends React.Component {
  static propTypes = { shouldUpdate: () => {} }
  shouldComponentUpdate({ shouldUpdate }) {
    return !!shouldUpdate
  }
  render() {
    return this.props.children
  }
}

/**
 * A TransitionGroup that accepts one child, which replaces the last child.
 * Different from using a plain TransitionGroup in that the new child is "hot swapped"
 * with the current entering child, preventing transitions from piling up
 */
class ReplaceTransition extends React.Component {
  shouldComponentUpdate() {
    return !this.flags.transitioning
  }
  // static getDerivedStateFromProps({ children }, { flags, child }) {
  //   const nextChild = React.Children.only(children)
  //   if (child && nextChild.key === child.key) return null

  //   if (!flags.transitioning) {
  //     if (child != null) flags.transitioning = true
  //     return { child: nextChild }
  //   }

  //   return null
  // }
  componentDidUpdate(nextProps) {
    if (nextProps.children.key !== this.props.children.key) {
      this.flags.transitioning = true
      console.log('start')
      // this.forceUpdate()
    }
  }
  // handleEnter = (node, child) => {
  //   this.flags.transitioning = true
  //   child.props.onEnter(node)
  //   this.forceUpdate()
  // }
  handleEntered = twice((node, child) => {
    this.flags.transitioning = false
    // child.props.onExited(node)
    cancelAnimationFrame(this.timer)
    this.timer = requestAnimationFrame(() => {
      console.log('end')
      this.forceUpdate()
    })
  })

  constructor(...args) {
    super(...args)
    this.flags = { transitioning: false }
    this.state = { flags: this.flags }
  }

  render() {
    const { children, ...props } = this.props

    return (
      <TransitionGroup {...props} onTransitionEnd={this.handleEntered}>
        {children}
      </TransitionGroup>
    )
  }
}

ReplaceTransition.propTypes = propTypes

export default ReplaceTransition
