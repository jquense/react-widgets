import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Loading = () => <span aria-hidden="true" className="rw-i rw-loading" />

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
    onClick: PropTypes.func,
  }

  render() {
    let {
      className,
      disabled,
      label,
      icon,
      busy,
      active,
      children,
      onClick,
      variant = 'primary',
      spinner = <Loading />,
      component: Tag = 'a',
      ...props
    } = this.props

    let type = props.type

    if (Tag === 'button') {
      type = type || 'button'
    } else {
      // only "real" buttons are truly disabled in browsers
      // remove onClick handler in other cases
      if (disabled && onClick) onClick = null
    }

    return (
      <Tag
        {...props}
        role="button"
        tabIndex="-1"
        title={label}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={label}
        onClick={onClick}
        className={cn(
          className,
          'rw-btn',
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
