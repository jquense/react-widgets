import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class Widget extends React.Component {
  static contextTypes = {
    isRtl: PropTypes.bool,
  }

  static propTypes = {
    tabIndex: PropTypes.node,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    open: PropTypes.bool,
    dropUp: PropTypes.bool,
  }

  render() {
    let {
      className,
      tabIndex,
      focused,
      open,
      dropUp,
      disabled,
      readOnly,
      ...props
    } = this.props

    let isRtl = !!this.context.isRtl
    tabIndex = tabIndex != null ? tabIndex : '-1'

    return (
      <div
        {...props}
        tabIndex={tabIndex}
        className={cn(
          className,
          'rw-widget',
          isRtl && 'rw-rtl',
          disabled && 'rw-state-disabled',
          readOnly && 'rw-state-readonly',
          focused && 'rw-state-focus',
          open && `rw-open${dropUp ? '-up' : ''}`
        )}
      />
    )
  }
}

export default Widget
