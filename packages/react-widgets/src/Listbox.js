import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { instanceId } from './util/widgetHelpers';

const propTypes = {
  className: PropTypes.string,
  role: PropTypes.string,
  emptyListMessage: PropTypes.node,
};

class Listbox extends React.Component {
  render() {
    let { className, role, children, emptyListMessage, ...props } = this.props
    let id = instanceId(this)
    return (
      <ul
        id={id}
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
}

Listbox.propTypes = propTypes;

export default Listbox;
