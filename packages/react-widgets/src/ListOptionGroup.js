import cn from 'classnames';
import React from 'react';

const propTypes = {
  className: React.PropTypes.string,
  component: React.PropTypes.string,
};

function ListOptionGroup({ children, className, component = 'li' }) {
  let Tag = component
  return (
    <Tag
      tabIndex='-1'
      role="separator"
      className={cn(className, 'rw-list-optgroup')}
    >
      {children}
    </Tag>
  );
}

ListOptionGroup.propTypes = propTypes;

export default ListOptionGroup;
