import React from 'react';
import cn from 'classnames';

class Input extends React.Component {
  static propTypes = {
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    value: React.PropTypes.string,
    tabIndex: React.PropTypes.string,
    component: React.PropTypes.any,
  };

  render() {
    let {
        className
      , disabled
      , readOnly
      , value
      , tabIndex
      , component: Component = 'input'
      , ...props
    } = this.props;

    return (
      <Component
        {...props}
        type="text"
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
