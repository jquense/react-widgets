import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const propTypes = {
  activeId: PropTypes.string,
  dataItem: PropTypes.any,
  index: PropTypes.number,
  focused: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  component: PropTypes.string,
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
  index: _,
  component: Tag = 'div',
  ...props
}) {
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
      tabIndex={!disabled ? '-1' : undefined}
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
