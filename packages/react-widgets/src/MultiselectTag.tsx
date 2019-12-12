import cn from 'classnames'
import React from 'react'
import Button from './Button'
import { useListOption } from './ListboxContext'
import { DataItem } from './types'

export interface MultiselectTagProps {
  id?: string
  className?: string
  dataItem: DataItem
  focused: boolean
  disabled?: boolean
  readOnly?: boolean
  label?: string
  style?: React.CSSProperties
  onRemove: (
    dataItem: DataItem,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  clearTagIcon: React.ReactNode
  children: React.ReactNode
}

function MultiselectTag({
  id,
  className,
  children,
  focused,
  style,
  label,
  disabled,
  readOnly,
  onRemove,
  clearTagIcon,
  dataItem,
}: MultiselectTagProps) {
  useListOption(dataItem)

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) onRemove(dataItem, event)
  }

  return (
    <div
      id={id}
      role="option"
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
