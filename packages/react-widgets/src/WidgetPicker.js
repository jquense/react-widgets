import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class WidgetPicker extends React.Component {
  static propTypes = {
    tabIndex: PropTypes.node,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    open: PropTypes.bool,
    dropUp: PropTypes.bool,
    picker: PropTypes.bool,
  };

  render() {
    let {
        open
      , dropUp
      , className
      , disabled
      , readOnly
      , focused
      , ...props
    } = this.props

    let openClass = `rw-open${dropUp ? '-up' : ''}`;

    return (
      <div
        {...props}
        className={cn(
          className,
          'rw-widget-picker',
          'rw-widget-container',
          open && openClass,
          disabled && 'rw-state-disabled',
          readOnly && 'rw-state-readonly',
          focused && 'rw-state-focus'
        )}
      />
    );
  }
}

export default WidgetPicker;
