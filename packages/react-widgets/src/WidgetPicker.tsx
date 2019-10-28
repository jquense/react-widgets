import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
  tabIndex: PropTypes.node,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  open: PropTypes.bool,
  dropUp: PropTypes.bool,
  picker: PropTypes.bool,
}

interface Props extends React.HTMLProps<HTMLDivElement> {
  focused: boolean
  open: boolean
  dropUp: boolean
}

function WidgetPicker({
  open,
  dropUp,
  className,
  disabled,
  readOnly,
  focused,
  ...props
}: Props) {
  // XXX: unused?
  let openClass = `rw-open${dropUp ? '-up' : ''}`

  return (
    <div
      {...props}
      className={cn(
        className,
        'rw-widget-picker',
        'rw-widget-container',
        open && openClass,
        disabled && 'rw-state-disabled',
        readOnly && 'rw-state-readonly',
        focused && 'rw-state-focus',
      )}
    />
  )
}

WidgetPicker.propTypes = propTypes

export default WidgetPicker
