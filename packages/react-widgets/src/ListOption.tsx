import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useListOption } from './FocusListContext'

const propTypes = {
  activeId: PropTypes.string,
  dataItem: PropTypes.any,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  component: PropTypes.any,
}

export interface ListOptionProps<TDataItem>
  extends Omit<React.HTMLProps<HTMLDivElement>, 'onSelect'> {
  dataItem: TDataItem
  focused?: boolean
  selected: boolean
  searchTerm?: string
  disabled?: boolean
  onSelect: (dataItem: TDataItem, event: React.MouseEvent) => void
  component?: React.ElementType | null
  children?: React.ReactNode
}

function ListOption<TDataItem>({
  className,
  children,
  dataItem,
  selected,
  disabled,
  onSelect,
  searchTerm: _,
  ...props
}: ListOptionProps<TDataItem>) {
  const [ref, focused, id] = useListOption<TDataItem, HTMLDivElement>(dataItem)

  const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
    if (onSelect && !disabled) onSelect(dataItem, event)
  }

  let classes = {
    'rw-state-focus': focused,
    'rw-state-selected': selected,
    'rw-state-disabled': disabled,
  }

  return (
    <div
      id={id}
      ref={ref}
      role="option"
      data-rw-option=""
      data-rw-focused={focused ? '' : undefined}
      data-rw-focusable={!disabled ? '' : undefined}
      tabIndex={-1}
      aria-selected={!!selected}
      className={cn('rw-list-option', className, classes)}
      onClick={handleSelect}
      {...props}
    >
      {children}
    </div>
  )
}

// @ts-ignore
ListOption.propTypes = propTypes

export default ListOption
