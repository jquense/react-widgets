import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useInstanceId } from './util/widgetHelpers'

const propTypes = {
  className: PropTypes.string,
  role: PropTypes.string,
  emptyListMessage: PropTypes.node,
}

interface Props {
  emptyListMessage: React.ReactNode
  role?: string
  className?: string
  multiple?: boolean
}

const Listbox = React.forwardRef<HTMLDivElement, Props>(
  (
    { className, role, multiple, children, emptyListMessage, ...props },
    ref,
  ) => {
    const id = useInstanceId()

    return (
      <div
        id={id}
        ref={ref as any}
        tabIndex={0}
        aria-multiselectable={!!multiple}
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

Listbox.displayName = 'Listbox'

Listbox.propTypes = propTypes

export default Listbox
