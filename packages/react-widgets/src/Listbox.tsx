/* eslint-disable @typescript-eslint/no-empty-function */
import cn from 'classnames'
import PropTypes from 'prop-types'
import React, {
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import { useUncontrolledProp } from 'uncontrollable'
import BaseListbox from './BaseListbox'
import ListOption, { ListOptionProps } from './ListOption'
import ListOptionGroup from './ListOptionGroup'
import { getList, useClearListOptions } from './ListboxContext'
import { UserProvidedMessages, useMessagesWithDefaults } from './messages'
import { WidgetHTMLProps } from './shared'
import { DataItem, RenderProp, Value } from './types'
import * as CustomPropTypes from './util/PropTypes'
import * as Props from './util/Props'
import { groupBySortedKeys, makeArray, toItemArray } from './util/_'
import { DataKeyAccessor, TextAccessor } from './util/dataHelpers'
import { useAccessors } from './util/getAccessors'
import { notify } from './util/widgetHelpers'

const propTypes = {
  data: PropTypes.array,

  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,

  onSelect: PropTypes.func,
  onMove: PropTypes.func,
  onHoverOption: PropTypes.func,

  activeId: PropTypes.string,

  optionComponent: CustomPropTypes.elementType,
  renderItem: PropTypes.func,
  renderGroup: PropTypes.func,

  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  searchTerm: PropTypes.string,

  disabled: CustomPropTypes.disabled.acceptsArray,

  messages: PropTypes.shape({
    emptyList: PropTypes.func.isRequired,
  }),
}

type GroupedItem = { __isGroup: string }

const isGroup = (item: unknown): item is GroupedItem =>
  typeof item === 'object' && item != null && '__isGroup' in item

const defaultProps = {
  onSelect: () => {},
  data: [],
  optionComponent: ListOption,
}

function useFlattenedData<T>(
  data: T[],
  groupBy?: GroupBy<T>,
): Array<T | GroupedItem> {
  return useMemo(() => {
    if (!groupBy) return data

    const flatData = [] as Array<T | GroupedItem>

    const keys: string[] = []
    const grouped = groupBySortedKeys<T>(groupBy, data, keys)

    keys.forEach(group => {
      flatData.push({ __isGroup: group }, ...grouped[group])
    }, [])

    return flatData
  }, [data, groupBy])
}

export type GroupBy<TDataItem> = string | ((item: TDataItem) => string)

export interface ListboxHandle {
  scrollIntoView(): void
}

export type RenderItemProp<TDataItem> = RenderProp<{
  item: TDataItem
  searchTerm?: string
  index: number
  text: string
  value: unknown
  disabled: boolean
}>

export type RenderGroupProp = RenderProp<{
  group: string
}>

export type OptionComponentProp = React.ComponentType<ListOptionProps<any>>

export interface BaseListboxProps<TDataItem> extends WidgetHTMLProps {
  bordered?: boolean
  data: TDataItem[]
  focusedItem?: TDataItem
  className?: string
  disabled?: boolean | TDataItem[]
  messages?: UserProvidedMessages
  textField?: TextAccessor
  dataKey?: DataKeyAccessor
  renderItem?: RenderItemProp<TDataItem>
  renderGroup?: RenderGroupProp
  activeId?: string
  searchTerm?: string
  groupBy?: GroupBy<TDataItem>
  optionComponent?: OptionComponentProp
  onMove?(
    selectedElement: Element,
    listElement: HTMLDivElement,
    focusedItem: TDataItem,
  ): void
}

export type SingleChangeHandler<TDataItem> = (
  dataItem: TDataItem,
  metadata: {
    lastValue: Value
    originalEvent?: React.SyntheticEvent
  },
) => void

export interface SingleListboxProps<TDataItem>
  extends BaseListboxProps<TDataItem> {
  value?: Value
  defaultValue?: Value
  multiple?: false
  onChange?: SingleChangeHandler<TDataItem>
}

export type MultipleChangeHandler<TDataItem> = (
  dataItem: TDataItem[],
  metadata: {
    action: 'insert' | 'remove'
    dataItem: TDataItem
    lastValue: Value
    originalEvent?: React.SyntheticEvent
  },
) => void

export interface MultipleListboxProps<TDataItem>
  extends BaseListboxProps<TDataItem> {
  value?: Value[]
  defaultValue?: Value[]
  multiple: true
  onChange?: MultipleChangeHandler<TDataItem>
}

export type ListboxProps<TDataItem> =
  | SingleListboxProps<TDataItem>
  | MultipleListboxProps<TDataItem>

declare interface Listbox {
  <TDataItem = DataItem>(
    props: ListboxProps<TDataItem> & React.RefAttributes<ListboxHandle>,
  ): React.ReactElement | null

  displayName?: string
}

const Listbox: Listbox = React.forwardRef(function Listbox<TDataItem>(
  {
    multiple = false,
    focusedItem: propsFocusedItem,

    data,

    value,
    defaultValue,
    onChange,

    className,
    messages,
    disabled,
    renderItem,
    textField,
    dataKey,
    renderGroup,
    activeId,
    searchTerm,
    groupBy,
    bordered = true,
    optionComponent: Option = ListOption,
    onKeyDown,
    ...props
  }: ListboxProps<TDataItem>,
  outerRef: React.Ref<ListboxHandle>,
) {
  const [focusedItem, setFocusedItem] = useUncontrolledProp(
    propsFocusedItem,
    null,
    (_: TDataItem) => {},
  )
  const [rawValue, handleChange] = useUncontrolledProp(
    value,
    defaultValue,
    onChange,
  )

  const accessors = useAccessors(textField, dataKey)

  const currentValue = makeArray(rawValue)

  const dataItems = useMemo(
    () => currentValue!.map(item => accessors.findOrSelf(data, item)),
    [data, currentValue, accessors],
  )

  const ref = useRef<HTMLDivElement>(null)
  const disabledItems = toItemArray(disabled)
  const { emptyList } = useMessagesWithDefaults(messages)
  const flatData = useFlattenedData(data, groupBy)
  const list = getList(flatData, accessors.text, disabledItems)

  const handleSelect = (dataItem: TDataItem, event: React.MouseEvent) => {
    if (multiple === false) {
      const handler = handleChange as SingleChangeHandler<TDataItem>
      handler(dataItem, {
        lastValue: value,
        originalEvent: event,
      })
      return
    }
    const handler = handleChange as MultipleChangeHandler<TDataItem>
    const checked = dataItems.includes(dataItem)
    handler(
      checked
        ? dataItems.filter(d => d !== dataItem)
        : [...dataItems, dataItem],
      {
        dataItem,
        lastValue: value,
        action: checked ? 'remove' : 'insert',
        originalEvent: event,
      },
    )
  }

  const scrollIntoView = useCallback(() => {
    let list = ref.current
    if (!list || !focusedItem) return

    let selectedItem = list.querySelector('[data-rw-focused]')

    if (selectedItem && selectedItem.scrollIntoView) {
      selectedItem.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }, [focusedItem])

  useLayoutEffect(scrollIntoView, [scrollIntoView])

  useClearListOptions()

  let elementProps = Props.pickElementProps(props)

  useImperativeHandle(outerRef, () => ({ scrollIntoView }), [scrollIntoView])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let { key, shiftKey } = e
    const currentFocused = focusedItem || currentValue[currentValue.length - 1]

    notify(onKeyDown, [e])

    if (e.defaultPrevented) return

    if (key === 'End' && !shiftKey) {
      e.preventDefault()
      setFocusedItem(list.last())
    } else if (key === 'Home' && !shiftKey) {
      e.preventDefault()
      setFocusedItem(list.first())
    } else if (key === 'Enter') {
      e.preventDefault()
      if (focusedItem) handleSelect(focusedItem, e as any)
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      setFocusedItem(list.next(currentFocused))
    } else if (key === 'ArrowUp') {
      e.preventDefault()

      setFocusedItem(list.prev(currentFocused))
    }
  }

  return (
    <BaseListbox
      ref={ref}
      {...elementProps}
      multiple={multiple}
      onKeyDown={handleKeyDown}
      className={cn(className, bordered && 'rw-listbox rw-widget-container')}
      emptyListMessage={emptyList()}
    >
      {flatData.map((item, idx) => {
        if (isGroup(item))
          return (
            <ListOptionGroup key={`group_${item.__isGroup}`}>
              {renderGroup
                ? renderGroup({ group: item.__isGroup })
                : item.__isGroup}
            </ListOptionGroup>
          );

        let isFocused = focusedItem === item

        const textValue = accessors.text(item)

        const itemIsDisabled = disabledItems.includes(item)
        const itemIsSelected = dataItems.includes(item)

        return (
          <Option
            dataItem={item}
            key={`item_${idx}`}
            activeId={activeId}
            focused={isFocused}
            onSelect={handleSelect}
            disabled={itemIsDisabled}
            selected={itemIsSelected}
          >
            {renderItem
              ? renderItem({
                  item,
                  searchTerm,
                  index: idx,
                  text: textValue,
                  // TODO: probably remove
                  value: accessors.value(item),
                  disabled: itemIsDisabled,
                })
              : textValue}
          </Option>
        );
      })}
    </BaseListbox>
  )
})

Listbox.displayName = 'Listbox'
export default Object.assign(Listbox, {
  defaultProps,
  propTypes,
})
