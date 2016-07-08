import React, { PropTypes } from 'react';
import cn from 'classnames';

class Widget extends React.Component {
  static propTypes = {
    tabIndex: PropTypes.node,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    open: PropTypes.bool,
    dropUp: PropTypes.bool
  };

  static contextTypes = {
    isRtl: PropTypes.bool
  };

  render() {
    let {
       className, tabIndex, open, dropUp
      , disabled, readOnly, focused, ...props } = this.props;

    let isRtl = !!this.context.isRtl;
    let openClass = `rw-open${dropUp ? '-up' : ''}`

    tabIndex = tabIndex != null ? tabIndex : '-1'

    return (
      <div
        {...props}
        tabIndex={tabIndex}
        className={cn(
          className,
          'rw-widget',
          isRtl && 'rw-rtl',
          open && openClass,
          focused && 'rw-state-focus',
          disabled && 'rw-state-disabled',
          readOnly && 'rw-state-readonly',
        )}
      />
    )
  }
}

export default Widget;
