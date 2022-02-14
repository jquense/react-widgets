import React, { ReactNode } from 'react'
import MultiselectTag, { MultiselectTagProps } from './MultiselectTag'
import { RenderProp } from './types'
import { TextAccessorFn } from './Accessors'

export type RenderTagProp<TDataItem> = RenderProp<{ item: TDataItem }>

export type TagComponentProp = React.ComponentType<MultiselectTagProps>

export interface MultiselectTagListProps<TDataItem> {
  id: string
  label?: string
  value: readonly TDataItem[]
  focusedItem?: TDataItem
  clearTagIcon: React.ReactNode
  textAccessor: TextAccessorFn
  onDelete: (
    dataItem: TDataItem,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  renderTagValue?: RenderTagProp<TDataItem>
  tagOptionComponent?: TagComponentProp

  disabled?: readonly TDataItem[] | boolean
  readOnly?: boolean
  children?: ReactNode
}

function MultiselectTagList<TDataItem>({
  id,
  value,
  textAccessor,
  label,
  disabled,
  readOnly,
  onDelete,
  children,
  clearTagIcon,
  renderTagValue,
  tagOptionComponent: TagOption = MultiselectTag,
}: MultiselectTagListProps<TDataItem>) {
  return (
    <div
      id={id}
      role="listbox"
      aria-label={label}
      aria-multiselectable="true"
      aria-orientation="horizontal"
      className="rw-multiselect-taglist"
    >
      {value.map((item, i) => {
        const itemDisabled = Array.isArray(disabled)
          ? disabled.includes(item)
          : !!disabled
        return (
          <TagOption
            key={i}
            dataItem={item}
            onRemove={onDelete}
            clearTagIcon={clearTagIcon}
            disabled={itemDisabled}
            readOnly={readOnly}
          >
            {renderTagValue ? renderTagValue({ item }) : textAccessor(item)}
          </TagOption>
        )
      })}
      {children}
    </div>
  )
}

export default MultiselectTagList
