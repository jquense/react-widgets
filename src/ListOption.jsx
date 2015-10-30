import React from 'react';
import cn from 'classnames';

let ListOption = React.createClass({
  propTypes: {
    dataItem: React.PropTypes.any,
    focused:  React.PropTypes.bool,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool
  },

  render() {
    let { className, children, focused, selected, disabled, readOnly, ...props } = this.props;
    let classes = {
      'rw-state-focus':    focused,
      'rw-state-selected': selected,
      'rw-state-disabled': disabled,
      'rw-state-readonly': readOnly
    };

    return (
      <li
        role='option'
        tabIndex='-1'
        aria-selected={!!selected}
        className={cn('rw-list-option', className, classes)}
        {...props}
      >
        {children}
      </li>
    );
  }
});

export default ListOption;
