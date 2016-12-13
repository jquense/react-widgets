import React, { PropTypes } from 'react';
import cn from 'classnames';

class Widget extends React.Component {
  static propTypes = {
    tabIndex: PropTypes.node,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
  };

  static contextTypes = {
    isRtl: PropTypes.bool
  };

  render() {
    let { className, tabIndex, focused, disabled, readOnly, ...props } = this.props;

    let isRtl = !!this.context.isRtl;
    tabIndex = tabIndex != null ? tabIndex : '-1'

    return (
      <div
        {...props}
        tabIndex={tabIndex}
        className={cn(
          className,
          'rw-widget',
          isRtl && 'rw-rtl',
          disabled && 'rw-state-disabled',
          readOnly && 'rw-state-readonly',
          focused && 'rw-state-focus'
        )}
      />
    )
  }
}

export default Widget;
