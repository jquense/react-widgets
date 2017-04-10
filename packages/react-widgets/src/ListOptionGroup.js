import cn from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  component: PropTypes.string,
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
