import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { useInstanceId } from './util/widgetHelpers'

const propTypes = {
  className: PropTypes.string,
  role: PropTypes.string,
  nodeRef: PropTypes.func,
  emptyListMessage: PropTypes.node,
}

const Listbox = React.forwardRef(
  ({ className, role, children, emptyListMessage, nodeRef, ...props }, ref) => {
    let id = useInstanceId()

    return (
      <div
        id={id}
        ref={ref}
        tabIndex="-1"
        ref={nodeRef}
        className={cn(className, 'rw-list')}
        role={role === undefined ? 'listbox' : role}
        {...props}
      >
        {React.Children.count(children) ? (
          children
        ) : (
          <div className="rw-list-empty">{emptyListMessage}</div>
        )}
      </div>
    )
  },
)

Listbox.displayName = Listbox

Listbox.propTypes = propTypes

export default Listbox
