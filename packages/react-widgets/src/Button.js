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
      variant = 'primary',
      spinner = <Loading />,
      component: Tag = 'button',
      ...props
    } = this.props

    let type = props.type

    if (Tag === 'button') type = type || 'button'

    return (
      <Tag
        {...props}
        tabIndex="-1"
        title={label}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={label}
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
