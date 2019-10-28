import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

interface Props extends React.HTMLProps<HTMLDivElement> {
  focused: boolean
  open: boolean
  dropUp: boolean
  autofilling: boolean
  isRtl: boolean
}

const Widget = React.forwardRef<HTMLDivElement, Props>(
  (
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
    ref,
  ) => {
    tabIndex = tabIndex != null ? tabIndex : -1

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
          open && `rw-open${dropUp ? '-up' : ''}`,
        )}
      />
    )
  },
)

Widget.displayName = 'Widget'

Widget.propTypes = {
  tabIndex: PropTypes.number,
  focused: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  autofilling: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  dropUp: PropTypes.bool.isRequired,
  isRtl: PropTypes.bool.isRequired,
}

export default Widget
