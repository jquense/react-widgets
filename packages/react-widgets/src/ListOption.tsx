import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useListOption } from './ListboxContext'

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
  activeId?: string
  focused: boolean
  selected: boolean
  disabled: boolean
  onSelect: (dataItem: TDataItem, event: React.MouseEvent) => void
  component?: React.ElementType | null
}

function ListOption<TDataItem>({
  className,
  children,
  activeId,
  dataItem,
  focused,
  selected,
  disabled,
  onSelect,
  tabIndex = -1,
  component,
  ...props
}: ListOptionProps<TDataItem>) {
  const Tag = component || 'div'

  useListOption(dataItem)

  const handleSelect = event => {
    if (onSelect && !disabled) onSelect(dataItem, event)
  }

  let classes = {
    'rw-state-focus': focused,
    'rw-state-selected': selected,
    'rw-state-disabled': disabled,
  }

  let id = focused ? activeId : undefined

  return (
    <Tag
      id={id}
      role="option"
      data-rw-focused={focused ? '' : undefined}
      tabIndex={disabled ? undefined : tabIndex}
      aria-selected={!!selected}
      className={cn('rw-list-option', className, classes)}
      onClick={handleSelect}
      {...props}
    >
      {children}
    </Tag>
  )
}

// @ts-ignore
ListOption.propTypes = propTypes

export default ListOption
