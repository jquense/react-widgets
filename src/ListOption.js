import React from 'react';
import cn from 'classnames';
import _  from './util/_';

class ListOption extends React.Component {
  static propTypes = {
    dataItem: React.PropTypes.any,
    focused:  React.PropTypes.bool,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  };

  render() {
    let { className, children, focused, selected, disabled } = this.props;

    let props = _.omitOwnProps(this);

    let classes = {
      'rw-state-focus':    focused,
      'rw-state-selected': selected,
      'rw-state-disabled': disabled,
    };

    return (
      <li
        role='option'
        tabIndex={!disabled ? '-1' : undefined}
        aria-selected={!!selected}
        className={cn('rw-list-option', className, classes)}
        {...props}
      >
        {children}
      </li>
    );
  }
}

export default ListOption;
