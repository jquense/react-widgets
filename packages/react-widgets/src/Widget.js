import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Widget = React.forwardRef(function Widget(
  {
    className,
    tabIndex,
    focused,
    open,
    dropUp,
    disabled,
    readOnly,
    autofilling,
    isRtl,
    ...props
  },
  ref
) {
  tabIndex = tabIndex != null ? tabIndex : '-1'

  return (
    <div
      {...props}
      ref={ref}
      tabIndex={tabIndex}
      className={cn(
        className,
        'rw-widget',
        isRtl && 'rw-rtl',
        disabled && 'rw-state-disabled',
        readOnly && 'rw-state-readonly',
        focused && 'rw-state-focus',
        autofilling && 'rw-webkit-autofill',
        open && `rw-open${dropUp ? '-up' : ''}`
      )}
    />
  )
})

Widget.propTypes = {
  tabIndex: PropTypes.node,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  autofilling: PropTypes.bool,
  open: PropTypes.bool,
  dropUp: PropTypes.bool,
  isRtl: PropTypes.bool,
}
export default Widget
