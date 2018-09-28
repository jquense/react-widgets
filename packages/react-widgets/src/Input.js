import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Input = React.forwardRef(function Input(
  {
    className,
    disabled,
    readOnly,
    value,
    tabIndex,
    type = 'text',
    component: Component = 'input',
    ...props
  },
  ref
) {
  return (
    <Component
      {...props}
      type={type}
      ref={ref}
      tabIndex={tabIndex || 0}
      autoComplete="off"
      disabled={disabled}
      readOnly={readOnly}
      aria-disabled={disabled}
      aria-readonly={readOnly}
      value={value == null ? '' : value}
      className={cn(className, 'rw-input')}
    />
  )
})

Input.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
  tabIndex: PropTypes.string,
  component: PropTypes.any,
}

export default Input
