import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

Input.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
  tabIndex: PropTypes.string,
  component: PropTypes.any,
  nodeRef: PropTypes.func,
}

function Input({
  className,
  disabled,
  readOnly,
  value,
  tabIndex,
  nodeRef,
  type = 'text',
  component: Component = 'input',
  ...props
}) {
  return (
    <Component
      {...props}
      type={type}
      ref={nodeRef}
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
}

export default Input
