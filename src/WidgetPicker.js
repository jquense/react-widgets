import React from 'react';
import cn from 'classnames';

class WidgetPicker extends React.Component {
  static propTypes = {
    tabIndex: React.PropTypes.node,
    focused: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    open: React.PropTypes.bool,
    dropUp: React.PropTypes.bool,
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
