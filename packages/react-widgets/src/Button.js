import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Spinner } from './Icon'

class Button extends React.Component {
  static propTypes = {
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

  render() {
    let {
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
    } = this.props

    let type = props.type

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
          variant && 'rw-btn-' + variant
        )}
      >
        {busy ? spinner : icon}

        {children}
      </Tag>
    )
  }
}

export default Button
