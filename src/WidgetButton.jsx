import React from 'react';
import cn from 'classnames';

export default React.createClass({

  render() {
    let {
        className
      , disabled
      , label
      , icon
      , busy
      , active
      , children
      , component: Tag = 'button'
      , ...props } = this.props;

    return (
      <Tag
        {...props}
        tabIndex="-1"
        title={label}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={label}
        className={cn(
          className,
          'rw-btn',
          active && !disabled && 'rw-state-active'
        )}
      >
        {icon &&
          <i
            aria-hidden
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
})
