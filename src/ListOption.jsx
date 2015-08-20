import React from 'react';
import cn from 'classnames';

let ListOption = React.createClass({
  propTypes: {
    dataItem: React.PropTypes.any,
    focused:  React.PropTypes.bool,
    selected: React.PropTypes.bool
  },

  render() {
    let { className, children, focused, selected, ...props } = this.props;
    let classes = {
      'rw-state-focus':    focused,
      'rw-state-selected': selected
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
