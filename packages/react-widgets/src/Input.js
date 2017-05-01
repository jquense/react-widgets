import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Input extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    type: PropTypes.string,
    tabIndex: PropTypes.string,
    component: PropTypes.any,
  };

  render() {
    let {
        className
      , disabled
      , readOnly
      , value
      , tabIndex
      , type = 'text'
      , component: Component = 'input'
      , ...props
    } = this.props;

    return (
      <Component
        {...props}
        type={type}
        tabIndex={tabIndex || 0}
        autoComplete='off'
        disabled={disabled}
        readOnly={readOnly}
        aria-disabled={disabled}
        aria-readonly={readOnly}
        value={value == null ? '' : value}
        className={cn(
          className,
          'rw-input'
        )}
      />
    )
  }
}

export default Input;
