import React from 'react';
import cn from 'classnames';

const propTypes = {
  className: React.PropTypes.string,
  role: React.PropTypes.string,
  emptyListMessage: React.PropTypes.node,
};

function Listbox({ className, role, children, emptyListMessage, ...props }) {
  return (
    <ul
      tabIndex='-1'
      className={cn(className, 'rw-list')}
      role={role === undefined ? 'listbox' : role }
      {...props}
    >
      {React.Children.count(children)
        ? children
        : (
          <li className='rw-list-empty'>
            {emptyListMessage}
          </li>
        )}
    </ul>
  )
}
Listbox.propTypes = propTypes;

export default Listbox;
