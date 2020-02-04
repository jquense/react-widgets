import cn from 'classnames'
import React from 'react'
import Button from './Button'
import { useListOption } from './FocusListContext'
import { DataItem } from './types'

export interface MultiselectTagProps {
  id?: string
  className?: string
  dataItem: DataItem
  disabled?: boolean
  readOnly?: boolean
  label?: string
  style?: React.CSSProperties
  tabIndex?: number
  onRemove: (
    dataItem: DataItem,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  clearTagIcon: React.ReactNode
  children: React.ReactNode
}

function MultiselectTag({
  className,
  children,
  style,
  label,
  disabled,
  readOnly,
  onRemove,
  tabIndex = -1,
  clearTagIcon,
  dataItem,
}: MultiselectTagProps) {
  const [ref, focused, id] = useListOption<any, HTMLDivElement>(dataItem)

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) onRemove(dataItem, event)
  }

  return (
    <div
      ref={ref}
      role="option"
      id={id}
      tabIndex={disabled ? undefined : tabIndex}
      data-rw-option=""
      data-rw-focused={focused ? '' : undefined}
      className={cn(
        className,
        'rw-multiselect-tag',
        disabled && 'rw-state-disabled',
        focused && !disabled && 'rw-state-focus',
      )}
      style={style}
    >
      <span className="rw-multiselect-tag-label">{children}</span>
      <Button
        variant={null}
        onClick={handleRemove}
        className="rw-multiselect-tag-btn"
        disabled={disabled || readOnly}
        label={label || 'Remove item'}
      >
        {clearTagIcon}
      </Button>
    </div>
  )
}

export default MultiselectTag
