import React, { ReactNode } from 'react'
import MultiselectTag, { MultiselectTagProps } from './MultiselectTag'
import { RenderProp } from './types'
import { DataKeyAccessorFn, dataIndexOf, TextAccessorFn } from './Accessors'

// FIXME: just do data items
// disabled === true || [1, 2, 3, etc]
function isDisabled<TDataItem>(
  item: TDataItem,
  list: unknown[] | undefined,
  value: DataKeyAccessorFn,
) {
  return !!(Array.isArray(list) ? ~dataIndexOf(list, item, value) : list)
}

export type RenderTagProp<TDataItem> = RenderProp<{ item: TDataItem }>

export type TagComponentProp = React.ComponentType<MultiselectTagProps>

interface MultiselectTagListProps<TDataItem> {
  id: string
  label?: string
  value: TDataItem[]
  focusedItem?: TDataItem
  clearTagIcon: React.ReactNode
  dataKeyAccessor: DataKeyAccessorFn
  textAccessor: TextAccessorFn
  onDelete: (
    dataItem: TDataItem,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  renderTagValue?: RenderTagProp<TDataItem>
  tagOptionComponent?: TagComponentProp

  disabled?: TDataItem[]
  children?: ReactNode
}

function MultiselectTagList<TDataItem>({
  id,
  value,
  dataKeyAccessor,
  textAccessor,
  label,
  disabled,
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
      className="rw-multiselect-taglist"
    >
      {value.map((item, i) => {
        return (
          <TagOption
            key={i}
            dataItem={item}
            onRemove={onDelete}
            clearTagIcon={clearTagIcon}
            disabled={isDisabled(item, disabled, dataKeyAccessor)}
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
