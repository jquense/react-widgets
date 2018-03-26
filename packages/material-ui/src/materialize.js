import cn from 'classnames'
import React from 'react'
import Grow from 'material-ui/transitions/Grow'

class PopupTransition extends React.Component {
  render() {
    const { style, ...props } = this.props
    return (
      <Grow
        {...props}
        unmountOnExit
        style={{
          ...style,
          transformOrigin: `top ${this.context.isRtl ? 'left' : 'right'}`,
        }}
      />
    )
  }
}

PopupTransition.contextTypes = {
  isRtl: () => {},
}

export default function materialize(Component) {
  const name = Component.name || Component.displayName
  return class extends React.Component {
    static displayName = `Materialized(${name})`
    render() {
      const { error, className, ...props } = this.props
      return (
        <Component
          className={cn(className, error && 'rbc-mui-field-error')}
          popupTransition={PopupTransition}
          {...props}
        />
      )
    }
  }
}
