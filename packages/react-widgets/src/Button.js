import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Spinner } from './Icon'

const propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.node,
  busy: PropTypes.bool,
  active: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'select']),
  component: PropTypes.any,
  spinner: PropTypes.node,
  acceptFocus: PropTypes.bool,
}

function Button({
  className,
  disabled,
  label,
  icon,
  busy,
  active,
  acceptFocus,
  children,
  variant = 'primary',
  spinner = Spinner,
  component: Tag = 'button',
  ...props
}) {
  let { type } = props

  if (Tag === 'button') type = type || 'button'
  if (!acceptFocus) props.tabIndex = '-1'

  return (
    <Tag
      {...props}
      title={label}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={label}
      className={cn(
        className,
        'rw-btn',
        !acceptFocus && 'rw-outline-none',
        active && !disabled && 'rw-state-active',
        variant && 'rw-btn-' + variant,
      )}
    >
      {busy ? spinner : icon}

      {children}
    </Tag>
  )
}

Button.propTypes = propTypes

export default Button
