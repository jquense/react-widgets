import * as PropTypes from 'prop-types'
import React, { ReactNode } from 'react'
import cn from 'classnames'
import { useListOption } from './FocusListContext'

export const CREATE_OPTION = {}

const propTypes = {
  searchTerm: PropTypes.string,
  focused: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  activeId: PropTypes.string,
}

export interface AddToListOptionProps {
  children: ReactNode
  onSelect: (event: React.MouseEvent) => void
}

function AddToListOption({
  children,
  onSelect,
  ...props
}: AddToListOptionProps) {
  const [ref, focused, id] = useListOption(CREATE_OPTION)

  return (
    <button
      id={id}
      ref={ref as any}
      data-rw-focusable
      data-rw-focused={focused ? '' : undefined}
      className={cn('rw-list-option-create', focused && 'rw-state-focus')}
      onClick={onSelect}
      {...props}
    >
      {children}
    </button>
  )
}

AddToListOption.propTypes = propTypes

export default AddToListOption
