import React, { ReactNode } from 'react'
import { useClearListOptions } from './ListboxContext'
import MultiselectTag, { MultiselectTagProps } from './MultiselectTag'
import { RenderProp } from './types'
import {
  DataKeyAccessorFn,
  TextAccessorFn,
  dataIndexOf,
} from './util/dataHelpers'

// FIXME: just do data items
// disabled === true || [1, 2, 3, etc]
function isDisabled<TDataItem>(item : TDataItem, list: unknown[] | undefined, value: DataKeyAccessorFn) {
  return !!(Array.isArray(list) ? ~dataIndexOf(list, item, value) : list);
}

export type RenderTagProp<TDataItem> = RenderProp<{ item: TDataItem }>

export type TagComponentProp = React.ComponentType<MultiselectTagProps>

interface MultiselectTagListProps<TDataItem> {
  id: string
  activeId: string
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
  activeId,
  dataKeyAccessor,
  textAccessor,
  label,
  disabled,
  onDelete,
  focusedItem,
  children,
  clearTagIcon,
  renderTagValue,
  tagOptionComponent: TagOption = MultiselectTag,
}: MultiselectTagListProps<TDataItem>) {
  useClearListOptions()

  return (
    <div
      id={id}
      role="listbox"
      aria-label={label}
      className="rw-multiselect-taglist"
    >
      {value.map((item, i) => {
        let isFocused = focusedItem === item

        return (
          <TagOption
            key={i}
            id={isFocused ? activeId : undefined}
            dataItem={item}
            focused={isFocused}
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
