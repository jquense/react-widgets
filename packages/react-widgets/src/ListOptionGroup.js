import cn from 'classnames';
import React from 'react';

const propTypes = {
  className: React.PropTypes.string,
};

function ListOptionGroup({ children, className }) {
  return (
    <li
      tabIndex='-1'
      role="separator"
      className={cn(className, 'rw-list-optgroup')}
    >
      {children}
    </li>
  );
}

ListOptionGroup.propTypes = propTypes;

export default ListOptionGroup;
