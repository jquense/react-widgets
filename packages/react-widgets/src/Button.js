import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Button extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    icon: PropTypes.string,
    busy: PropTypes.bool,
    active: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'select']),
    component: PropTypes.any,
  };

  render() {
    let {
        className
      , disabled
      , label
      , icon
      , busy
      , active
      , children
      , variant = 'primary'
      , component: Tag = 'button'
      , ...props } = this.props;

    let type = props.type;

    if (Tag === 'button')
     type = type || 'button';

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
          variant && ('rw-btn-' + variant)
        )}
      >
        {(icon || busy) &&
          <span
            aria-hidden="true"
            className={cn(
              'rw-i',
              `rw-i-${icon}`,
              busy && 'rw-loading'
            )}
          />
        }
        {children}
      </Tag>
    )
  }
}

export default Button;
