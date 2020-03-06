import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useInstanceId } from './util/widgetHelpers'

const propTypes = {
  className: PropTypes.string,
  role: PropTypes.string,
  emptyListMessage: PropTypes.node,
}

export interface BaseListBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  emptyListMessage?: React.ReactNode
  className?: string
  multiple?: boolean,
  children?: React.ReactNode
}

const BaseListBox = React.forwardRef(function BaseListBox
  (
    { className, role, multiple, children, emptyListMessage, ...props }: BaseListBoxProps,
    ref : React.Ref<HTMLDivElement>,
  ) {
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
);

(BaseListBox as any).propTypes = propTypes;

export default BaseListBox;
