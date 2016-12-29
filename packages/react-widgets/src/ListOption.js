import React from 'react';
import cn from 'classnames';

import * as Props from './util/Props';

class ListOption extends React.Component {
  static propTypes = {
    activeId: React.PropTypes.string,
    dataItem: React.PropTypes.any,
    focused:  React.PropTypes.bool,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
  };
  handleSelect = (event) => {
    let { onSelect, disabled, dataItem } = this.props;
    if (onSelect && !disabled)
      onSelect(dataItem, event)
  }
  render() {
    let { className, children, focused, selected, disabled, activeId } = this.props;

    let props = Props.omitOwn(this);

    let classes = {
      'rw-state-focus': focused,
      'rw-state-selected': selected,
      'rw-state-disabled': disabled,
    };

    let id = focused ? activeId : undefined;

    return (
      <li
        id={id}
        role='option'
        tabIndex={!disabled ? '-1' : undefined}
        aria-selected={!!selected}
        className={cn('rw-list-option', className, classes)}
        onClick={this.handleSelect}
        {...props}
      >
        {children}
      </li>
    );
  }
}

export default ListOption;
