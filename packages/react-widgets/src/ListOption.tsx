import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
  activeId: PropTypes.string,
  dataItem: PropTypes.any,
  index: PropTypes.number,
  // focused: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  component: PropTypes.string,
  tabIndex: PropTypes.number,
}

export interface ListOptionProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'onSelect'> {
  dataItem: object
  activeId?: string
  focused: boolean
  selected: boolean
  disabled: boolean
  onSelect: (dataItem: object, event: React.MouseEvent) => void
  index?: number
  component?: React.ElementType
}

function ListOption({
  className,
  children,
  activeId,
  dataItem,
  focused,
  selected,
  disabled,
  onSelect,
  tabIndex = -1,
  index: _,
  component: Tag = 'div',
  ...props
}: ListOptionProps) {
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

ListOption.propTypes = propTypes

export default ListOption
